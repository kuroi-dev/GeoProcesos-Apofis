import requests
import json

def obtener_distancia(geom1_json, geom2_json, unidad='9001'):
    """
    Calcula la distancia mínima entre dos geometrías enviadas desde el Front-End.
    """
    url = "https://ags.cuzk.cz/arcgis/rest/services/Utilities/Geometry/GeometryServer/distance"
    
    # Preparamos los parámetros para ArcGIS 11.5
    payload = {
        'geometry1': json.dumps(geom1_json),
        'geometry2': json.dumps(geom2_json),
        'sr': '4326',           # WGS84
        'distanceUnit': unidad, # Metros
        'geodesic': 'true',     # Cálculo real sobre la curvatura terrestre
        'f': 'json'
    }

    try:
        response = requests.get(url, params=payload)
        resultado = response.json()
        
        # El servidor devuelve un JSON con la clave 'distance'
        return resultado.get('distance', 0)
    except Exception as e:
        return {"error": str(e)}

# --- EJEMPLO DE DATOS DESDE EL FRONT-END ---

# Geometría 1: Un punto (ej. una torre de control)
punto_a = {
    "geometryType": "esriGeometryPoint",
    "x": 14.43, "y": 50.07
}

# Geometría 2: Una línea (ej. una carretera o río)
linea_b = {
    "geometryType": "esriGeometryPolyline",
    "paths": [[[14.45, 50.08], [14.46, 50.09]]]
}

# Ejecución
distancia_final = obtener_distancia(punto_a, linea_b)

print(f"La distancia mínima es: {distancia_final} metros")