# --- Cargar variables de entorno desde .env ---
from flask import Blueprint, jsonify, request, send_from_directory, redirect
from dotenv import load_dotenv
import os
import time
import json
import uuid
import datetime
import uuid
import logging

from .helpers import send_validation_email, _jwt_encode

BASE_URL = os.environ.get('BASE_URL_FRONTEND', 'https://www.apofis.cl')  # Asegúrate de configurar esto en tu entorno


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


env_path = os.path.join(os.path.dirname(__file__), '../../.env')
load_dotenv(env_path)

def _get_next_id():
    global _next_id
    nid = _next_id
    _next_id += 1
    return nid

@bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})

def list_users():
    return jsonify(_users)

# Nueva ruta para descarga de TIFF
@bp.route('/downloadTif', methods=['POST'])
def download_tif():
    """
    Espera un JSON con:
      - extent: lista de 5 puntos (EPSG:4326)
      - satellite: 'landsat' o 'sentinel'
      - date: 'YYYY-MM-DD'
      - hour: 'HH:MM' (opcional)
      - centroid: [lon, lat]
      - (opcional) image_id
    """
    data = request.get_json() or {}
    extent = data.get('extent')
    satellite = data.get('satellite')
    date = data.get('date')
    hour = data.get('hour')
    centroid = data.get('centroid')
    image_id = data.get('image_id')
    token = data.get('token')

    # Validación básica
    if not (extent and satellite and date and centroid and token):
        return jsonify({'success': False, 'error': 'Faltan parámetros obligatorios'}), 400

    # Llamar a la función controladora (a implementar)
    from .helpers import handle_download_tif
    try:
        result = handle_download_tif(extent, satellite, date, hour, centroid, image_id, token)
        if result.get('success'):
            return jsonify(result)
        else:
            return jsonify(result), 400
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


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

from flask import g
import threading

# --- Rate limiting simple en memoria ---
_rate_limit_data = {}
_rate_limit_lock = threading.Lock()
RATE_LIMIT = 20
RATE_PERIOD = 60  # segundos

def check_rate_limit(ip):
    now = int(time.time())
    with _rate_limit_lock:
        entry = _rate_limit_data.get(ip)
        if entry:
            # Limpiar timestamps viejos
            entry = [t for t in entry if now - t < RATE_PERIOD]
        else:
            entry = []
        if len(entry) >= RATE_LIMIT:
            return False
        entry.append(now)
        _rate_limit_data[ip] = entry
        return True

@bp.route('/access', methods=['POST'])
def request_access():
    """Receive JSON with mail:"testing@testing.test", generate JWT token,
    schedule revocation after 30 minutes and return ACCESS true.
    """
    
    # --- Rate limiting por IP ---
    ip_addr = request.remote_addr or data.get('ip_user') or 'unknown'
    if not check_rate_limit(ip_addr):
        return jsonify({'ACCESS': False, 'error': 'Demasiadas solicitudes. Intenta de nuevo en unos segundos.'}), 429

    data = request.get_json() or {}
    mail = data.get('mail') or data.get('email')
    token = data.get('token')

    if not mail and not token:
        return jsonify({'ACCESS': False, 'error': 'Se requiere mail o token'}), 400

    found = False
    now = int(time.time())
    db_data = []
    if os.path.isfile(_DB_FILE):
        with open(_DB_FILE, 'r', encoding='utf-8') as f:
            db_data = json.load(f) or []

    # 1. Buscar por correo si se proporciona mail
    if mail:
        for entry in db_data:
            if entry.get('correo') == mail:
                found = True
                # Validación de correo_verificado
                if not entry.get('correo_verificado', False):
                    return jsonify({
                        'ACCESS': False,
                        'error': 'Correo no verificado. Por favor verifica tu correo antes de acceder.'
                    })
                if now < entry.get('exp', 0):
                    validation_token = str(uuid.uuid4())
                    send_validation_email(mail, validation_token)

                    return jsonify({
                        'ACCESS': False,
                        'error': 'Te enviamos un correo de acceso. Por favor revisa tu bandeja de entrada y, si no lo encuentras, revisa también la carpeta de SPAM o correo no deseado para validar tu correo antes de acceder.'
                    })
                else:
                    return jsonify({
                        'ACCESS': False,
                        'error': 'Sesión diaria agotada. Vuelve mañana a partir de las 6:00 AM.'
                    })

    # 2. Buscar por token si no se encontró por correo y se proporciona token
    if not found and token:
        for entry in db_data:
            if entry.get('token') == token:
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
                        'userEmail': entry.get('correo'),
                        'token': entry.get('token'),
                        'session_duration': '30 minutes',
                        'session_remaining': max(0, entry.get('exp', 0) - now),
                        'privilegio': entry.get('privilegio', 1),
                        'ip_user': entry.get('ip_user'),
                        'city': entry.get('city'),
                        'region': entry.get('region'),
                        'country': entry.get('country')
                    })
                else:
                    return jsonify({
                        'ACCESS': False,
                        'error': 'Sesión diaria agotada. Vuelve mañana a partir de las 6:00 AM.'
                    })

    # 3. Si no se encontró, crear nuevo usuario temporal y enviar correo de validación
    if not found and mail:
        exp = now + 1800  # 30 minutos
        payload = {'mail': mail, 'iat': now, 'exp': exp}
        new_token = _jwt_encode(payload, SECRET)
        ip_user = data.get('ip_user')
        print(f"ubicación del usuario: { data.get('city')}, {data.get('country')}")
        entry = {
            'correo': mail,
            'token': new_token,
            'fecha': datetime.datetime.utcfromtimestamp(now).strftime('%Y-%m-%d'),
            'hora': datetime.datetime.utcfromtimestamp(now).strftime('%H:%M:%S'),
            'exp': exp,
            'privilegio': 1,
            'correo_verificado': False,
            'ip_user': ip_user,
            'city': data.get('city'),
            'region': data.get('region'),
            'country': data.get('country'),
            'recaptcha_token': data.get('recaptcha_token')
        }
        db_data.append(entry)
        with open(_DB_FILE, 'w', encoding='utf-8') as f:
            json.dump(db_data, f, ensure_ascii=False, indent=2)

        # Enviar correo de validación
        validation_token = str(uuid.uuid4())
        send_validation_email(mail, validation_token)

        return jsonify({
            'ACCESS': False,
            'error': 'Te enviamos un correo de validación. Por favor revisa tu bandeja de entrada y, si no lo encuentras, revisa también la carpeta de spam o correo no deseado para validar tu correo antes de acceder.'
        })

    # Si no se encontró y no hay mail para crear usuario
    if not found:
        return jsonify({'ACCESS': False, 'error': 'No se encontró usuario y no se proporcionó mail para crear uno.'}), 404


@site_bp.route('/validar-correo', methods=['GET'])
def site_validate_mail():

    token = request.args.get('token')
    mail = request.args.get('email')
    logging.warning(f"Validando correo: {mail} con token: {token}")
    if not token or not mail:
        return jsonify({'success': False, 'error': 'Faltan parámetros'}), 400
    
    if os.path.isfile(_DB_FILE):
        with open(_DB_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f) or []
        updated = False
        tokeninterno = ""
        for entry in data:
            if entry.get('correo') == mail:
                if entry.get('validation_token') != token:
                    return jsonify({'success': False, 'error': 'Token de validación inválido'}), 400
                entry['correo_verificado'] = True
                entry['validation_token'] = ""
                tokeninterno = entry.get('token')
                updated = True
        if updated:
            with open(_DB_FILE, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)

            return redirect(f"{BASE_URL}/login?token={tokeninterno}")  # Redirige al frontend con el token como parámetro
        
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
<<<<<<< HEAD


    

#enrutamiento para evitar sql injection y xss
    
@current_app.route('/save-comment', methods=['POST'])
def save_comment_route():
    user_input = request.json.get('comment', '')
    
    # 1. Defensa Anti-XSS: Limpiamos el HTML
    clean_html = bleach.clean(user_input)
    
    # 2. Defensa Anti-SQLi: Consulta parametrizada
    query = "INSERT INTO comments (text) VALUES (%s)"
    success = execute_query(query, (clean_html,))
    
    if success:
        return jsonify({"status": "comentario guardado"}), 201
    return jsonify({"error": "error al guardar"}), 500

@current_app.route('/get-user', methods=['GET'])
def get_user_route():
    email = request.args.get('email')
    
    # Defensa Anti-SQLi: El email viaja como parámetro separado
    query = "SELECT id, name FROM users WHERE email = %s"
    user = execute_query(query, (email,), fetch=True)
    
    if user:
        return jsonify({"id": user[0], "name": user[1]})
    return jsonify({"error": "usuario no encontrado"}), 404

#esto seria el enrutamiento para los ataques de DDOS.
@app.route('/comentar', methods=['POST'])
def post_comment():
    comment = request.json.get('text', '')
    
    # Si el comentario es ridículamente largo (ataque de desbordamiento), recházalo
    if len(comment) > 5000:
        return {"error": "Contenido demasiado largo"}, 413
    
#ruta del timeout de 30 minutos. #trial es el periodo de prueba que dura 30 minutos, luego se borra todo lo que hizo el usuario en ese periodo.
@app.route('/api/start-trial', methods=['GET'])
def start_trial():
    # Enviamos al front el tiempo exacto para que sincronice su timer
    return jsonify({
        "trial_duration_seconds": get_trial_seconds(),
        "message": "Trial iniciado"
    })

@app.route('/api/expired-trial', methods=['POST'])
def expired_trial():
    user_id = request.json.get('user_id')
    
    # Ejecutamos la purga de datos en la base de datos
    if purge_trial_data(user_id):
        return jsonify({
            "status": "FINISH SESSION",
            "action": "CLEAR_ALL_DATA",
            "message": "El tiempo de Free Trial ha terminado. Todos los datos han sido borrados."
        }), 200
    
    return jsonify({"error": "No se pudo limpiar el trial"}), 500

#ruta de limpieza Automatica. despues de los 30 minutos o cierre de session voluntario.
@app.route('/api/activate-trial', methods=['POST'])
def activate_trial():
    user_id = request.json.get('user_id')
    
    conn = get_db_connection()
    cur = conn.cursor()
    # El daemon usará esta estampa de tiempo para saber cuándo pasen los 30 min
    cur.execute(""""""
        UPDATE users 
        SET trial_active = True, trial_started_at = %s 
        WHERE id = %s
    """""", (datetime.now(), user_id))
    conn.commit()
    cur.close()
    conn.close()
    
    return jsonify({"message": "Trial activado en servidor"})
"""