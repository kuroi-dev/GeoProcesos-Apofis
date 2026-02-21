#Usar senentinal para descargar imagenes de satelite.
#Libreria sentinelsat: https://sentinelsat.readthedocs.io/en/stable/usage.html



from sentinelsat import SentinelAPI, read_geojson, geojson_to_wkt
from datetime import date

# Conexión a la API
api = SentinelAPI('tu_usuario', 'tu_contraseña', 'https://catalogue.dataspace.copernicus.eu/resto/api/collections/Sentinel2/search.json')

# Definir área de interés (puedes usar un GeoJSON o coordenadas)
# Formato: [Longitud, Latitud]
footprint = geojson_to_wkt({
    "type": "Point",
    "coordinates": [-74.006, 40.7128] # Ejemplo: Nueva York
})

# Buscar productos
products = api.query(footprint,
                     date=('20231001', date(2023, 12, 31)),
                     platformname='Sentinel-2',
                     cloudcoverpercentage=(0, 30)) # Máximo 30% de nubes

# Convertir a dataframe para visualizar qué se encontró
products_df = api.to_dataframe(products)

# Descargar el primer producto encontrado
api.download(products_df.index[0])