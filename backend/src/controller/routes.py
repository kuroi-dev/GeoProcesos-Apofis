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


def _revoke_token(token: str):
    if token in _tokens:
        _tokens.pop(token, None)
        # optional: log
        print(f"Token revoked: {token}")


# Database (JSON file) for temporary storage
_DB_DIR = os.path.abspath(os.path.join(_THIS_DIR, '..', '..', 'database'))
_DB_FILE = os.path.join(_DB_DIR, 'tokens.json')


def _ensure_db_dir():
    try:
        os.makedirs(_DB_DIR, exist_ok=True)
    except Exception:
        pass


def _save_token_entry(token: str, mail: str, exp: int):
    """Append an entry to the JSON database with correo, token, fecha and hora."""
    _ensure_db_dir()
    now_ts = int(time.time())
    fecha = datetime.datetime.utcfromtimestamp(now_ts).strftime('%Y-%m-%d')
    hora = datetime.datetime.utcfromtimestamp(now_ts).strftime('%H:%M:%S')
    entry = {
        'correo': mail,
        'token': token,
        'fecha': fecha,
        'hora': hora,
        'exp': exp
    }
    try:
        if os.path.isfile(_DB_FILE):
            with open(_DB_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f) or []
        else:
            data = []
    except Exception:
        data = []
    data.append(entry)
    with open(_DB_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# Simple in-memory store for testing user insert/list
_users = []
_next_id = 1

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

    now = int(time.time())
    exp = now + 30 * 60  # 30 minutes
    payload = {'mail': mail, 'iat': now, 'exp': exp}
    token = _jwt_encode(payload, SECRET)

    # store token with expiry and schedule revocation
    _tokens[token] = exp
    timer = threading.Timer(30 * 60, _revoke_token, args=(token,))
    timer.daemon = True
    timer.start()

    # persist entry in temporary JSON DB (correo, token, fecha, hora)
    try:
        _save_token_entry(token, mail, exp)
    except Exception as e:
        # log error but still return ACCESS true for now
        print(f"Error saving token entry: {e}")

    # Return ACCESS true (include token for frontend use)
    return jsonify({'ACCESS': True, 'token': token})


# Item-specific/user-specific routes are commented out for now
# @bp.route('/users/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     for u in _users:
#         if u['id'] == user_id:
#             return jsonify(u)
#     return jsonify({'error': 'not found'}), 404


# @bp.route('/users/<int:user_id>', methods=['PATCH'])
# def update_user(user_id):
#     data = request.get_json() or {}
#     for u in _users:
#         if u['id'] == user_id:
#             for k, v in data.items():
#                 if k != 'id':
#                     u[k] = v
#             return jsonify(u)
#     return jsonify({'error': 'not found'}), 404


# @bp.route('/users/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     for i, u in enumerate(_users):
#         if u['id'] == user_id:
#             _users.pop(i)
#             return jsonify({'deleted': user_id})
#     return jsonify({'error': 'not found'}), 404


# Serve root index and static files from backend/static via site_bp
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