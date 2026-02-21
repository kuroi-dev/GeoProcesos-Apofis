import requests
import json

def ejecutar_proyeccion(geometrias_json, wkid_entrada=4326, wkid_salida=102067):
    """
    Transforma geometrías entre diferentes sistemas de referencia.
    Default: De WGS84 (4326) a S-JTSK (102067 - Sistema Checo).
    """
    url = "https://ags.cuzk.cz/arcgis/rest/services/Utilities/Geometry/GeometryServer/project"
    
    payload = {
        'geometries': json.dumps(geometrias_json),
        'inSR': str(wkid_entrada),
        'outSR': str(wkid_salida),
        'f': 'json'
    }

    try:
        # POST es preferible para listas largas de coordenadas
        response = requests.post(url, data=payload)
        return response.json()
    except Exception as e:
        return {"error": str(e)}

# --- EJEMPLO DE FLUJO BACK <-> FRONT ---

# El Front-End envía un punto capturado con el GPS (WGS84)
datos_front = {
    "geometryType": "esriGeometryPoint",
    "geometries": [
        {"x": 14.43, "y": 50.07}
    ]
}

# El Back-End lo proyecta al sistema local de la República Checa (EPSG:5514 / WKID:102067)
resultado = ejecutar_proyeccion(datos_front, wkid_entrada=4326, wkid_salida=102067)

# El JSON resultante tendrá las coordenadas en metros según el sistema checo
print(json.dumps(resultado, indent=2))