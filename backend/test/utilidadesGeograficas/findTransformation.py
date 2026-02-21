import requests
import json

def buscar_transformaciones(wkid_origen, wkid_destino, extent_json=None):
    """
    Busca los métodos de transformación más precisos entre dos sistemas.
    Ideal para configurar procesos de alta precisión en el Back-End.
    """
    url = "https://ags.cuzk.cz/arcgis/rest/services/Utilities/Geometry/GeometryServer/findTransformations"
    
    payload = {
        'inSR': str(wkid_origen),
        'outSR': str(wkid_destino),
        'numOfResults': 1,
        'f': 'json'
    }
    
    # Si el front nos pasa un área visible del mapa, la precisión mejora
    if extent_json:
        payload['extent'] = json.dumps(extent_json)

    try:
        response = requests.get(url, params=payload)
        return response.json()
    except Exception as e:
        return {"error": str(e)}

# --- EJEMPLO DE FLUJO ---

# El Front-End pregunta cómo pasar de GPS (4326) al sistema Checo (102067)
# en un área específica de Praga.
area_estudio = {
    "xmin": 14.3, "ymin": 50.0, "xmax": 14.5, "ymax": 50.1,
    "spatialReference": {"wkid": 4326}
}

resultado = buscar_transformaciones(4326, 102067, area_estudio)

# El JSON resultante contendrá una lista 'transformations' con nombres técnicos 
# como "WGS_1984_(ITRF08)_To_S-JTSK"
print(json.dumps(resultado, indent=2))