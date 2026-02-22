import requests
import json

def ejecutar_union(lista_geometrias_json, wkid=4326):
    """
    Fusiona múltiples geometrías en una sola usando el servidor de CUZK (v11.5).
    """
    url = "https://ags.cuzk.cz/arcgis/rest/services/Utilities/Geometry/GeometryServer/union"
    
    # Preparamos el payload
    # geometries debe ser el objeto que contiene la lista de anillos o puntos
    payload = {
        'geometries': json.dumps(lista_geometrias_json),
        'sr': str(wkid),
        'f': 'json'
    }

    try:
        # Usamos POST ya que la unión de muchas geometrías puede generar un JSON muy largo
        response = requests.post(url, data=payload)
        return response.json()
    except Exception as e:
        return {"error": str(e)}

# --- EJEMPLO DE DATOS DESDE EL FRONT-END ---

# El Front envía tres cuadrados que se tocan o solapan
datos_de_entrada = {
    "geometryType": "esriGeometryPolygon",
    "geometries": [
        {"rings": [[[14.40, 50.00], [14.42, 50.00], [14.42, 50.02], [14.40, 50.02], [14.40, 50.00]]]},
        {"rings": [[[14.41, 50.01], [14.43, 50.01], [14.43, 50.03], [14.41, 50.03], [14.41, 50.01]]]},
        {"rings": [[[14.42, 50.02], [14.44, 50.02], [14.44, 50.04], [14.42, 50.04], [14.42, 50.02]]]}
    ]
}

# Ejecución en el Back-End
geometria_fusionada = ejecutar_union(datos_de_entrada)

# El resultado será UN SOLO polígono que abarca el área de los tres originales
print(json.dumps(geometria_fusionada, indent=2))