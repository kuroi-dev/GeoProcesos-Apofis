import requests
import json

def convertir_string_a_coordenadas(lista_texto, tipo_formato='DMS'):
    """
    Convierte cadenas de texto (ej. 50°04'N 14°26'E) a puntos JSON.
    
    Formatos comunes para conversionType:
    - 'DMS': Grados, Minutos y Segundos.
    - 'MGRS': Military Grid Reference System.
    - 'UTM': Universal Transverse Mercator.
    - 'GEOREF': World Geographic Reference System.
    """
    url = "https://ags.cuzk.cz/arcgis/rest/services/Utilities/Geometry/GeometryServer/fromGeoCoordinateString"
    
    payload = {
        'sr': '4326', # Queremos que nos devuelva WGS84 (Lat/Long)
        'strings': json.dumps(lista_texto),
        'conversionType': tipo_formato,
        'f': 'json'
    }

    try:
        response = requests.post(url, data=payload)
        return response.json()
    except Exception as e:
        return {"error": str(e)}

# --- EJEMPLO DE FLUJO BACK <-> FRONT ---

# El Front-End recibe del usuario una coordenada en formato DMS (Grados, Minutos, Segundos)
entrada_usuario = ["50 05 19N 014 25 17E"] # Coordenada de Praga

# El Back-End procesa la conversión
resultado_conversion = convertir_string_a_coordenadas(entrada_usuario, tipo_formato='DMS')

# El resultado será una lista de puntos con formato: [{"x": 14.4213, "y": 50.0886}]
print(json.dumps(resultado_conversion, indent=2))