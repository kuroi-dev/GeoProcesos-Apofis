import requests
import json

def generar_buffer(tipo_geometria, coordenadas, distancia_metros=100):
    """
    Genera un buffer usando el GeometryServer de ArcGIS 11.5
    
    tipo_geometria: 'point', 'polyline' o 'polygon'
    coordenadas: Lista de coordenadas según el formato de ArcGIS
    distancia_metros: Radio del buffer
    """
    
    url = "https://ags.cuzk.cz/arcgis/rest/services/Utilities/Geometry/GeometryServer/buffer"
    
    # Mapeo de tipos para el servidor
    tipos_arcgis = {
        'point': 'esriGeometryPoint',
        'polyline': 'esriGeometryPolyline',
        'polygon': 'esriGeometryPolygon'
    }
    
    # Estructura de la geometría según el tipo
    if tipo_geometria == 'point':
        # Formato: {"x": long, "y": lat}
        geoms = [{"x": coordenadas[0], "y": coordenadas[1]}]
    elif tipo_geometria == 'polyline':
        # Formato: {"paths": [[[x1,y1], [x2,y2]]]}
        geoms = [{"paths": [coordenadas]}]
    elif tipo_geometria == 'polygon':
        # Formato: {"rings": [[[x1,y1], [x2,y2], [x1,y1]]]}
        geoms = [{"rings": [coordenadas]}]
    else:
        return "Tipo no soportado"

    payload = {
        'geometries': json.dumps({"geometryType": tipos_arcgis[tipo_geometria], "geometries": geoms}),
        'inSR': '4326',   # WGS84 (GPS)
        'outSR': '4326',  # WGS84 (Resultado)
        'distances': str(distancia_metros),
        'unit': '9001',   # Código para Metros
        'f': 'json'
    }

    try:
        response = requests.get(url, params=payload)
        return response.json()
    except Exception as e:
        return f"Error: {e}"


# Punto 
print("Buffer de Punto:", generar_buffer('point', [14.43, 50.07], 50))

# 2. Línea 
linea = [[14.43, 50.07], [14.44, 50.08]]
print("\nBuffer de Línea:", generar_buffer('polyline', linea, 20))

# 3. Polígono 
triangulo = [[14.43, 50.07], [14.44, 50.07], [14.435, 50.08], [14.43, 50.07]]
print("\nBuffer de Polígono:", generar_buffer('polygon', triangulo, 10))