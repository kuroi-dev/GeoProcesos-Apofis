import os
import sys
import json
import traceback

STATIC_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'static'))


def dms_to_decimal(deg, minutes, seconds, hemisphere):
    dec = float(deg) + float(minutes) / 60.0 + float(seconds) / 3600.0
    if hemisphere in ('S', 'W'):
        dec = -dec
    return dec


def main():
    # Coordinates: 50° 05′ 15″ N, 14° 25′ 17″ E
    lat = dms_to_decimal(50, 5, 15, 'N')
    lon = dms_to_decimal(14, 25, 17, 'E')
    date_start = '2026-01-01'
    date_end = '2026-02-01'

    os.makedirs(STATIC_DIR, exist_ok=True)

    try:
        import requests
    except Exception:
        print('ERROR: missing "requests" package. Install with: pip install requests')
        sys.exit(2)

    try:
        import ee
    except Exception as e:
        print('ERROR: earthengine API not available. Install with: pip install earthengine-api')
        print('Also authenticate with: earthengine authenticate')
        print('Exception:', e)
        sys.exit(3)

    try:
        try:
            ee.Initialize()
        except Exception:
            # try to give a helpful message
            print('Attempting to initialize Earth Engine...')
            ee.Authenticate()
            ee.Initialize()

        point = ee.Geometry.Point(lon, lat)
        region = point.buffer(500).bounds()

        # Try Sentinel-2 SR first
        col = ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(point).filterDate(date_start, date_end)
        size = col.size().getInfo()
        if size == 0:
            # fallback to top-of-atmosphere Sentinel-2
            col = ee.ImageCollection('COPERNICUS/S2').filterBounds(point).filterDate(date_start, date_end)
            size = col.size().getInfo()

        if size == 0:
            print('No images found in the requested date range and location.')
            sys.exit(4)

        # Prefer least cloudy
        try:
            col = col.sort('CLOUDY_PIXEL_PERCENTAGE')
        except Exception:
            pass

        img = ee.Image(col.first())

        # Prepare download as GeoTIFF
        bands = ['B4', 'B3', 'B2']
        region_geo = region.getInfo()  # GeoJSON-like dict

        print('Requesting GEO_TIFF download URL from Earth Engine...')
        download_url = img.getDownloadURL({
            'bands': bands,
            'region': region_geo['coordinates'],
            'scale': 10,
            'filePerBand': False,
            'format': 'GEO_TIFF'
        })

        print('Downloading GeoTIFF...')
        r = requests.get(download_url, stream=True, timeout=120)
        if r.status_code != 200:
            print('Failed to download GeoTIFF, status:', r.status_code)
            try:
                print('Response text:', r.text[:1000])
            except Exception:
                pass
            sys.exit(5)

        fname = f"gee_image_{lat:.6f}_{lon:.6f}.tif"
        out_path = os.path.join(STATIC_DIR, fname)
        with open(out_path, 'wb') as f:
            for chunk in r.iter_content(8192):
                if chunk:
                    f.write(chunk)

        # Save/update metadata.json
        meta_file = os.path.join(STATIC_DIR, 'metadata.json')
        meta = []
        if os.path.isfile(meta_file):
            try:
                with open(meta_file, 'r', encoding='utf-8') as f:
                    meta = json.load(f) or []
            except Exception:
                meta = []

        entry = {
            'filename': fname,
            'lat': lat,
            'lon': lon,
            'date': f'{date_start} to {date_end}',
            'extent': region.getInfo()
        }
        meta.append(entry)
        with open(meta_file, 'w', encoding='utf-8') as f:
            json.dump(meta, f, ensure_ascii=False, indent=2)

        print('Saved image to', out_path)
        print('Metadata updated at', meta_file)
    except Exception as e:
        print('ERROR: unexpected failure')
        traceback.print_exc()
        sys.exit(10)


if __name__ == '__main__':
    main()
