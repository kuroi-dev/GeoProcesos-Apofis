import requests
import json

def ejecutar_corte_geometry(target_json, cutter_json):
    """
    Simula el proceso de un Back-End recibiendo JSON del Front
    y consultando al GeometryServer de CUZK (v11.5)
    """
    url = "https://ags.cuzk.cz/arcgis/rest/services/Utilities/Geometry/GeometryServer/cut"
    
    # El servidor espera estos parámetros específicos
    payload = {
        'sr': '4326', # Sistema de referencia (WGS84)
        'target': json.dumps(target_json), # El polígono a cortar
        'cutter': json.dumps(cutter_json), # La línea que corta
        'f': 'json'
    }

    try:
        response = requests.post(url, data=payload) # Usamos POST para mayor seguridad con JSON largos
        resultado = response.json()
        
        # El servidor devuelve un JSON con una lista 'geometries' 
        # que contiene las partes resultantes del corte.
        return resultado
    except Exception as e:
        return {"error": str(e)}

# --- EJEMPLO DE DATOS (Lo que recibirías de tu Front-End) ---

# Un polígono cuadrado (Target)
mi_poligono = {
    "geometryType": "esriGeometryPolygon",
    "geometries": [
        {
            "rings": [[[14.4, 50.0], [14.5, 50.0], [14.5, 50.1], [14.4, 50.1], [14.4, 50.0]]]
        }
    ]
}

# Una línea que atraviesa el cuadrado (Cutter)
mi_linea_corte = {
    "paths": [[[14.3, 50.05], [14.6, 50.05]]]
}

# Ejecución
respuesta_servidor = ejecutar_corte_geometry(mi_poligono, mi_linea_corte)

# Este es el JSON que tu Back-End le devolvería al Front-End
print(json.dumps(respuesta_servidor, indent=2))