import requests
import json

def ejecutar_difference(geometria_base_json, geometria_resta_json):
    """
    Calcula la diferencia (A - B) usando el GeometryServer de CUZK (v11.5).
    Recibe los JSON tal cual vienen del Front-End.
    """
    url = "https://ags.cuzk.cz/arcgis/rest/services/Utilities/Geometry/GeometryServer/difference"
    
    # El servidor espera 'geometries' (lista) y 'geometry' (objeto único)
    payload = {
        'geometries': json.dumps(geometria_base_json), # Lo que queda (Base)
        'geometry': json.dumps(geometria_resta_json),   # Lo que quita (Cuchillo)
        'sr': '4326',
        'f': 'json'
    }

    try:
        # Usamos POST por seguridad y tamaño de datos
        response = requests.post(url, data=payload)
        return response.json()
    except Exception as e:
        return {"error": str(e)}

# --- EJEMPLO DE USO (BACK-FRONT) ---

# Supongamos que el Front envía un polígono grande (un cuadrado)
poligono_a = {
    "geometryType": "esriGeometryPolygon",
    "geometries": [{
        "rings": [[[14.4, 50.0], [14.6, 50.0], [14.6, 50.2], [14.4, 50.2], [14.4, 50.0]]]
    }]
}

# Y otro polígono pequeño que está dentro o encima (un círculo o cuadrado pequeño)
poligono_b = {
    "geometryType": "esriGeometryPolygon",
    "rings": [[[14.45, 50.05], [14.55, 50.05], [14.55, 50.15], [14.45, 50.15], [14.45, 50.05]]]
}

# Ejecutamos la operación
resultado_json = ejecutar_difference(poligono_a, poligono_b)

# El resultado será el polígono 'A' con un "agujero" donde estaba el 'B'
print(json.dumps(resultado_json, indent=2))