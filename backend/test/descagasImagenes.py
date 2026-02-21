# Usar Sentinel para descargar imágenes de satélite.
# Librería sentinelsat: https://sentinelsat.readthedocs.io
#la mejor union entre descargar imagenes y el esri


import os
import json
from datetime import date
from sentinelsat import SentinelAPI, geojson_to_wkt

class SentinelMaster:
    def __init__(self, user, password, host_url='http://localhost'):
        self.api = SentinelAPI(user, password, 'https://catalogue.dataspace.copernicus.eu/resto/api/collections/Sentinel2/search.json')
        self.host_url = host_url
        self.download_dir = os.path.join(os.path.dirname(__file__), 'static', 'raster_images')
        os.makedirs(self.download_dir, exist_ok=True)

    def descargar_y_preparar(self, lon, lat, fecha_inicio='20240101'):
        """Busca, descarga y devuelve el descriptor ESRI-compatible."""
        
        # Definir área (WKT)
        footprint = geojson_to_wkt({"type": "Point", "coordinates": [lon, lat]})

        # Query a la API
        print(f"🛰️ Buscando en Sentinel-2 para coordenadas: {lat}, {lon}...")
        products = self.api.query(footprint,
                                 date=(fecha_inicio, date.today()),
                                 platformname='Sentinel-2',
                                 cloudcoverpercentage=(0, 20))

        if not products:
            print("No se encontraron imágenes con menos del 20% de nubes.")
            return None

        # Seleccionar el mejor producto y descargar
        df = self.api.to_dataframe(products).sort_values(['cloudcoverpercentage'])
        uuid = df.index[0]
        meta_prod = df.iloc[0]
        
        print(f"Descargando imagen con {meta_prod['cloudcoverpercentage']}% de nubes...")
        download_info = self.api.download(uuid, directory_path=self.download_dir)
        
        # Generar el descriptor para el front
        entry = {
            'filename': os.path.basename(download_info['path']),
            'extent': meta_prod.get('footprint'),
            'lon': lon,
            'lat': lat,
            'date': meta_prod['beginposition'].strftime('%Y-%m-%d')
        }
        
        return self.descriptor_for(entry)

    def descriptor_for(self, entry):
        """Genera el JSON para el front ."""
        return {
            'type': '',
           # 'url': f"{self.host_url}/static/raster_images/{entry['filename']}",
            'spatialReference': {'wkid': 4326},
            'extent': entry.get('extent'),
            'lon': entry.get('lon'),
            'lat': entry.get('lat'),
            'date': entry.get('date'),
            'status': 'verified' # Flag de seguridad 
        }


if __name__ == "__main__":
    # Credenciales (Cámbialas o úsalas desde variables de entorno)
    USER = "usuario"
    PASS = "password"
    
    # Instanciar el motor
    motor = SentinelMaster(USER, PASS)
    
    # Ejecutar una descarga de prueba (Ejemplo: Nueva York o tus coordenadas)
    # El front nos enviaría este JSON, aquí lo simulamos:
    resultado = motor.descargar_y_preparar(lon=-74.006, lat=40.7128)
    
    if resultado:
        print("\n DESCRIPTOR GENERADO EXITOSAMENTE PARA EL FRONT:")
        print(json.dumps(resultado, indent=2))
        