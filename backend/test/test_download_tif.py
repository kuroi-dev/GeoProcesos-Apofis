import requests
import json

# Coordenadas de un extent cerca de Villarrica (Chile)
extent = [
    [-72.25, -39.25],
    [-72.25, -39.35],
    [-72.15, -39.35],
    [-72.15, -39.25],
    [-72.25, -39.25]
]
centroid = [-72.20, -39.30]

# Cambia esto por un token válido de tu base de datos para la prueba real
token = "REEMPLAZA_CON_TOKEN_VALIDO"

url = "http://127.0.0.1:5000/downloadTif"
headers = {"Content-Type": "application/json"}

# Fechas recientes conocidas con imágenes disponibles (ajusta si es necesario)
fechas = [
    ("landsat", "2024-12-01"),
    ("sentinel", "2024-12-01")
]

for sat, fecha in fechas:
    data = {
        "extent": extent,
        "satellite": sat,
        "date": fecha,
        "hour": "12:00",
        "centroid": centroid,
        "token": token
    }
    print(f"Probando descarga para {sat} en {fecha}...")
    resp = requests.post(url, headers=headers, data=json.dumps(data))
    print("Status:", resp.status_code)
    print("Respuesta:", resp.json())
    print("---")
