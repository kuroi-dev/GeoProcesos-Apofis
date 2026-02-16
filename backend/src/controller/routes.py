
# --- SMTP para envío de correos ---
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import redirect

def send_validation_email(to_email, validation_token):
    smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
    smtp_port = int(os.environ.get('SMTP_PORT', 587))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')
    from_email = smtp_user
    subject = 'Validación de correo'
    # Cambia la URL base según tu frontend
    base_url = os.environ.get('VALIDATION_URL_BASE', 'http://127.0.0.1:5000')
    validation_link = f"{base_url}/validar-correo?token={validation_token}&email={to_email}"
    body = f"Para validar tu correo, haz clic en el siguiente enlace:\n\n{validation_link}\n\nSi no solicitaste este acceso, ignora este mensaje."

    print(smtp_server, smtp_port, smtp_user, '****' if smtp_pass else None)  # Debug info (oculta contraseña)

    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.sendmail(from_email, to_email, msg.as_string())
        server.quit()
        print(f"Correo de validación enviado a {to_email}")

        # Guardar el token de validación en la base de datos (tokens.json)
        if os.path.isfile(_DB_FILE):
            with open(_DB_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f) or []
        else:
            data = []
        updated = False
        for entry in data:
            if entry.get('correo') == to_email:
                entry['validation_token'] = validation_token
                updated = True
        if updated:
            with open(_DB_FILE, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)

        return True
    except Exception as e:
        print(f"Error enviando correo: {e}")
        return False
    

#############################################################################


from flask import Blueprint, jsonify, request, send_from_directory
import os
import time
import hmac
import hashlib
import base64
import json
import threading
import datetime
from . import bp  

# API blueprint
bp = Blueprint('api', __name__)

# Site blueprint to serve static files from backend/static at app root
site_bp = Blueprint('site', __name__)

# compute path to backend/static (routes.py is at backend/src/controller)
_THIS_DIR = os.path.dirname(os.path.abspath(__file__))
_STATIC_DIR = os.path.abspath(os.path.join(_THIS_DIR, '..', '..', 'static'))

# Secret for signing JWTs (override with env var in production)
SECRET = os.environ.get('SECRET_KEY', 'devsecret')

# In-memory token store: token -> expiry_timestamp
_tokens = {}

# Database (JSON file) for temporary storage
_DB_DIR = os.path.abspath(os.path.join(_THIS_DIR, '..', '..', 'database'))
_DB_FILE = os.path.join(_DB_DIR, 'tokens.json')

_users = []
_next_id = 1

def _base64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode('ascii')

def _jwt_encode(payload: dict, secret: str) -> str:
    header = {'alg': 'HS256', 'typ': 'JWT'}
    header_b = _base64url_encode(json.dumps(header, separators=(',', ':')).encode('utf-8'))
    payload_b = _base64url_encode(json.dumps(payload, separators=(',', ':')).encode('utf-8'))
    signing_input = f"{header_b}.{payload_b}".encode('ascii')
    sig = hmac.new(secret.encode('utf-8'), signing_input, hashlib.sha256).digest()
    sig_b = _base64url_encode(sig)
    return f"{header_b}.{payload_b}.{sig_b}"

def _get_next_id():
    global _next_id
    nid = _next_id
    _next_id += 1
    return nid

@bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})


@bp.route('/users', methods=['GET'])
def list_users():
    return jsonify(_users)


@bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json() or {}
    # expected fields: username, email, ... (adapt as needed)
    user = {
        'id': _get_next_id(),
        'username': data.get('username'),
        'email': data.get('email'),
        'meta': data.get('meta')
    }
    _users.append(user)
    return jsonify(user), 201


@bp.route('/access', methods=['POST'])
def request_access():
    """Receive JSON with mail:"testing@testing.test", generate JWT token,
    schedule revocation after 30 minutes and return ACCESS true.
    """
   
    
    data = request.get_json() or {}
    mail = data.get('mail') or data.get('email')
    if not mail:
        return jsonify({'ACCESS': False, 'error': 'mail field required'}), 400

    found = False
    if os.path.isfile(_DB_FILE):
        with open(_DB_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f) or []
        for entry in data:
            if entry.get('correo') == mail:
                now = int(time.time())
                found = True
                # Validación de correo_verificado
                if not entry.get('correo_verificado', False):
                    return jsonify({
                        'ACCESS': False,
                        'error': 'Correo no verificado. Por favor verifica tu correo antes de acceder.'
                    })
                if now < entry.get('exp', 0):
                    return jsonify({
                        'ACCESS': True,
                        'token': entry.get('token'),
                        'session_duration': '30 minutes',
                        'session_remaining': f"{max(0, entry.get('exp', 0) - now)} seconds",
                        'privilegio': entry.get('privilegio', 1)
                    })
                else:
                    return jsonify({
                        'ACCESS': False,
                        'error': 'Sesión diaria agotada. Vuelve mañana a partir de las 6:00 AM.'
                    })
    if not found:
        now = int(time.time())
        exp = now + 1800  # 30 minutos
        payload = {'mail': mail, 'iat': now, 'exp': exp}
        token = _jwt_encode(payload, SECRET)
        entry = {
            'correo': mail,
            'token': token,
            'fecha': datetime.datetime.utcfromtimestamp(now).strftime('%Y-%m-%d'),
            'hora': datetime.datetime.utcfromtimestamp(now).strftime('%H:%M:%S'),
            'exp': exp,
            'privilegio': 1,
            'correo_verificado': False
        }
        if os.path.isfile(_DB_FILE):
            with open(_DB_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f) or []
        else:
            data = []
        data.append(entry)
        with open(_DB_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        # Enviar correo de validación
        import uuid
        validation_token = str(uuid.uuid4())
        send_validation_email(mail, validation_token)

        return jsonify({
            'ACCESS': False,
            'error': 'Te enviamos un correo de validación. Por favor revisa tu bandeja de entrada y valida tu correo antes de acceder.'
        })



# Nueva ruta para iniciar validación de correo
import uuid


@site_bp.route('/validar-correo', methods=['GET'])
def site_validate_mail():
    token = request.args.get('token')
    mail = request.args.get('email')
    print(f"Validación recibida (site): token={token}, email={mail}")
    if not token or not mail:
        return jsonify({'success': False, 'error': 'Faltan parámetros'}), 400
    # Validar token usando la base de datos
    if os.path.isfile(_DB_FILE):
        with open(_DB_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f) or []
        updated = False
        for entry in data:
            if entry.get('correo') == mail:
                if entry.get('validation_token') != token:
                    return jsonify({'success': False, 'error': 'Token de validación inválido'}), 400
                entry['correo_verificado'] = True
                entry['validation_token'] = ""
                updated = True
        if updated:
            with open(_DB_FILE, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            # Redirigir al frontend tras validar
            return redirect("http://localhost:5173/")
        else:
            return jsonify({'success': False, 'error': 'Usuario no encontrado'}), 404
    else:
        return jsonify({'success': False, 'error': 'Base de datos no encontrada'}), 500
    


@site_bp.route('/')
def site_index():
    if os.path.isdir(_STATIC_DIR):
        return send_from_directory(_STATIC_DIR, 'index.html')
    return ('Static directory not found', 404)


@site_bp.route('/<path:path>')
def site_static(path):
    if os.path.isdir(_STATIC_DIR):
        target = os.path.join(_STATIC_DIR, path)
        if os.path.isfile(target):
            return send_from_directory(_STATIC_DIR, path)
        return send_from_directory(_STATIC_DIR, 'index.html')
    return ('Static directory not found', 404)


#enrutamiento del validador de token e emails.

@bp.route('/validate-user', methods=['POST'])
def validate_user():
    try:
        # 1. Recibimos el JSON del aplicativo
        data = request.get_json()
        
        # 2. Extraemos los datos
        email = data.get('email')
        token = data.get('token')

        # 3. Validación de campos obligatorios
        if not email or not token:
            return jsonify({
                "valid": False, 
                "message": "Faltan datos obligatorios (email o token)."
            }), 400

        # 4. Lógica de validación (Aquí es donde evitarás Inyecciones SQL)
        # Por ahora, una validación manual para tus pruebas:
        if email == "email@email.com" and token == "123456":
            return jsonify({
                "valid": True,
                "message": "Usuario legitimado correctamente."
            }), 200
        else:
            return jsonify({
                "valid": False,
                "message": "Email o código incorrectos."
            }), 401

    except Exception as e:
        return jsonify({"valid": False, "message": f"Error en el servidor: {str(e)}"}), 500