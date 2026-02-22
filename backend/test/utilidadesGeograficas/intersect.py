import requests
import json

def ejecutar_interseccion(geometrias_objetivo_json, geometria_herramienta_json):
    """
    Calcula la intersección entre un conjunto de geometrías y una geometría base.
    """
    url = "https://ags.cuzk.cz/arcgis/rest/services/Utilities/Geometry/GeometryServer/intersect"
    
    # Preparamos el payload para ArcGIS 11.5
    # geometries: Lista de objetos (target)
    # geometry: Objeto único (clipper/tool)
    payload = {
        'geometries': json.dumps(geometrias_objetivo_json),
        'geometry': json.dumps(geometria_herramienta_json),
        'sr': '4326',
        'f': 'json'
    }

    try:
        # Usamos POST debido a que las geometrías pueden ser extensas
        response = requests.post(url, data=payload)
        return response.json()
    except Exception as e:
        return {"error": str(e)}

# --- EJEMPLO DE DATOS DESDE EL FRONT-END ---

# 1. Las geometrías que queremos analizar (ej. una lista de parcelas)
objetivos = {
    "geometryType": "esriGeometryPolygon",
    "geometries": [
        {
            "rings": [[[14.42, 50.06], [14.44, 50.06], [14.44, 50.08], [14.42, 50.08], [14.42, 50.06]]]
        }
    ]
}

# 2. La geometría que intersecta (ej. el área de una inundación o una zona protegida)
herramienta = {
    "geometryType": "esriGeometryPolygon",
    "rings": [[[14.43, 50.07], [14.45, 50.07], [14.45, 50.09], [14.43, 50.09], [14.43, 50.07]]]
}

# Ejecución
resultado = ejecutar_interseccion(objetivos, herramienta)

# El JSON resultante contiene solo el área donde ambos polígonos se solapan
print(json.dumps(resultado, indent=2))