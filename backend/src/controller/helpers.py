import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import json
import hmac
import hashlib
import base64
import datetime

_THIS_DIR = os.path.dirname(os.path.abspath(__file__))
_DB_FILE = os.path.join(_THIS_DIR, '..', '..', 'database', 'tokens.json')

def send_validation_email(to_email, validation_token):
    smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
    smtp_port = int(os.environ.get('SMTP_PORT', 587))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_pass = os.environ.get('SMTP_PASS')
    from_email = smtp_user
    subject = 'Validación de correo'
    base_url = os.environ.get('VALIDATION_URL_BASE', 'http://127.0.0.1:5000')
    validation_link = f"{base_url}/validar-correo?token={validation_token}&email={to_email}"
    body = f"Para validar tu correo, haz clic en el siguiente enlace:\n\n{validation_link}\n\nSi no solicitaste este acceso, ignora este mensaje."

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