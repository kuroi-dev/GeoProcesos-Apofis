import os
import time
import json
import requests
from typing import Optional


def download_image_from_gee(lon: float, lat: float, date: str, out_dir: str, simulate: bool = False) -> Optional[str]:
    """Download an image from Google Earth Engine for the given lon/lat and date.

    - lon, lat: decimal coordinates
    - date: YYYY-MM-DD (searched for images on that date +/- small window)
    - out_dir: directory where the TIFF will be saved
    - simulate: if True, do not call GEE, create a small dummy TIF for testing

    Returns the path to the saved TIFF or None on error.
    """
    os.makedirs(out_dir, exist_ok=True)

    ts = int(time.time())
    filename = f"img_{ts}.tif"
    out_path = os.path.join(out_dir, filename)

    if simulate:
        # create a tiny placeholder TIFF (not georeferenced) so frontend can fetch a file
        try:
            with open(out_path, 'wb') as f:
                f.write(b"SIMULATED_TIF\n")
            return out_path
        except Exception:
            return None

    # Real GEE flow (requires earthengine-api and authenticated user)
    try:
        import ee
    except Exception as e:
        raise RuntimeError("earthengine-api not installed. Install with `pip install earthengine-api` and authenticate using `earthengine authenticate`.\nOriginal error: " + str(e))

    try:
        ee.Initialize()
    except Exception:
        # try to authenticate guidance
        raise RuntimeError("Could not initialize Earth Engine. Ensure you ran `earthengine authenticate` and have network access.")

    from datetime import datetime, timedelta

    # build date window: the exact date and the next day
    try:
        dt = datetime.strptime(date, '%Y-%m-%d')
    except Exception:
        raise ValueError('date must be YYYY-MM-DD')

    start = dt
    end = dt + timedelta(days=1)

    point = ee.Geometry.Point([float(lon), float(lat)])

    # Choose a sensible collection (Sentinel-2 SR). Adjust as needed.
    coll = ee.ImageCollection('COPERNICUS/S2_SR').filterDate(start.strftime('%Y-%m-%d'), end.strftime('%Y-%m-%d')).filterBounds(point)
    img = coll.sort('CLOUDY_PIXEL_PERCENTAGE').first()
    if img is None:
        # try without SR collection fallback to S2
        coll = ee.ImageCollection('COPERNICUS/S2').filterDate(start.strftime('%Y-%m-%d'), end.strftime('%Y-%m-%d')).filterBounds(point)
        img = coll.sort('CLOUDY_PIXEL_PERCENTAGE').first()
    if img is None:
        return None

    # define a small region around the point (in lon/lat degrees), ~0.01 deg ~1km
    buffer_m = 500  # meters
    region = point.buffer(buffer_m).bounds().getInfo()['coordinates']

    params = {
        'scale': 10,
        'crs': 'EPSG:4326',
        'region': region,
        'format': 'GEO_TIFF'
    }

    try:
        url = img.getDownloadURL(params)
    except Exception as e:
        raise RuntimeError('Failed to get download URL from Earth Engine: ' + str(e))

    # download
    r = requests.get(url, stream=True)
    if r.status_code != 200:
        raise RuntimeError(f'Download failed, status {r.status_code}')

    # write to disk
    with open(out_path, 'wb') as fh:
        for chunk in r.iter_content(chunk_size=8192):
            if chunk:
                fh.write(chunk)

    return out_path


def test_descarga_imagen(latitud, longitud, fecha_inicio, fecha_fin):
    """Wrapper used for basic testing. Searches for images between fecha_inicio and fecha_fin
    and attempts to download the first match (simulate=True by default to avoid GEE dependency).
    """
    # For this test helper we pick the start date
    out_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'static'))
    # prefer simulation for local tests; change simulate=False to attempt real GEE download
    try:
        path = download_image_from_gee(longitud, latitud, fecha_inicio, out_dir, simulate=True)
    except Exception as e:
        return {"ok": False, "error": str(e)}

    return {"rutaImg": path}


if __name__ == "__main__":
    print(test_descarga_imagen(-39.270163, -72.190533, '2024-01-01', '2024-01-31'))
