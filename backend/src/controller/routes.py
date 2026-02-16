import os
import time
import json
import uuid
import datetime
from .helpers import send_validation_email, _jwt_encode
import uuid
from flask import Blueprint, jsonify, request, send_from_directory, redirect

# Definiciones globales necesarias
_users = []
_DB_FILE = os.path.join(os.path.dirname(__file__), '../../database/tokens.json')
SECRET = os.environ.get('SECRET', 'mysecret')
_STATIC_DIR = os.path.join(os.path.dirname(__file__), '../../static')

# Definir Blueprint principal
bp = Blueprint('bp', __name__)
# Definir Blueprint para sitio
site_bp = Blueprint('site_bp', __name__)

# Definir Blueprint
bp = Blueprint('bp', __name__)




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
        
        validation_token = str(uuid.uuid4())
        send_validation_email(mail, validation_token)

        return jsonify({
            'ACCESS': False,
            'error': 'Te enviamos un correo de validación. Por favor revisa tu bandeja de entrada y valida tu correo antes de acceder.'
        })


@site_bp.route('/validar-correo', methods=['GET'])
def site_validate_mail():

    token = request.args.get('token')
    mail = request.args.get('email')

    if not token or not mail:
        return jsonify({'success': False, 'error': 'Faltan parámetros'}), 400
    
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

            return redirect("http://localhost:5173/login?mail="+mail)  # Redirige al frontend con el email como parámetro
        
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

"""

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

"""