import requests
import json

def ejecutar_densify(geometria_json, max_distancia=1000, es_geodesico=True):
    """
    Toma una geometría del Front-End y le añade puntos intermedios cada 'max_distancia' metros.
    """
    url = "https://ags.cuzk.cz/arcgis/rest/services/Utilities/Geometry/GeometryServer/densify"
    
    # Preparamos el payload para el servidor 11.5
    payload = {
        'geometries': json.dumps(geometria_json),
        'sr': '4326',                # Sistema WGS84
        'maxSegmentLength': max_distancia,
        'lengthUnit': '9001',        # 9001 = Metros
        'geodesic': str(es_geodesico).lower(),
        'f': 'json'
    }

    try:
        # Usamos POST porque las geometrías densificadas pueden ser muy pesadas para un GET
        response = requests.post(url, data=payload)
        return response.json()
    except Exception as e:
        return {"error": str(e)}

# --- EJEMPLO DE FLUJO JSON ---

# Una línea simple con solo 2 puntos (Praga a Brno, aprox 200km)
linea_desde_front = {
    "geometryType": "esriGeometryPolyline",
    "geometries": [
        {
            "paths": [[[14.4, 50.0], [16.6, 49.2]]]
        }
    ]
}

# Queremos que haya un punto cada 10km (10000 metros)
resultado = ejecutar_densify(linea_desde_front, max_distancia=10000)

# El JSON resultante tendrá muchos más puntos en el array 'paths'
print(json.dumps(resultado, indent=2))