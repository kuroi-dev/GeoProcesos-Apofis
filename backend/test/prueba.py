import requests

def buffer():

    url = "https://ags.cuzk.cz/arcgis/rest/services/Utilities/Geometry/GeometryServer/buffer"

    payload = {
        'geometries': '{"geometryType":"esriGeometryPoint","geometries":[{"x":14.43, "y":50.07}]}',
        'inSR': '4326',
        'outSR': '4326',
        'distances': '100',
        'unit': '9001', # Metros
        'f': 'json'
    }

    response = requests.get(url, params=payload)
    print(response.json())
if __name__ == "__main__":
    buffer()