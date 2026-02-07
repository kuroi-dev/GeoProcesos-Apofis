import os
import json
import math
import requests
from typing import Optional


STAC_SEARCH = 'https://earth-search.aws.element84.com/v0/search'
STATIC_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'static'))


def bbox_for_point(lon: float, lat: float, buffer_m: float = 500) -> list:
    # approximate buffer in degrees (very rough, OK for small distances)
    meters_per_deg = 111320
    d = buffer_m / meters_per_deg
    return [lon - d, lat - d, lon + d, lat + d]


def download_file(url: str, out_path: str) -> bool:
    try:
        r = requests.get(url, stream=True, timeout=60)
        if r.status_code != 200:
            return False
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        with open(out_path, 'wb') as fh:
            for chunk in r.iter_content(8192):
                if chunk:
                    fh.write(chunk)
        return True
    except Exception:
        return False


def download_sentinel_noauth(lon: float, lat: float, date_start: str, date_end: str, out_dir: str = STATIC_DIR, max_results: int = 5) -> Optional[str]:
    """Search public STAC for Sentinel-2 L2A COGs and download a GeoTIFF without authentication.

    Returns the path to the downloaded TIF or None on failure.
    """
    os.makedirs(out_dir, exist_ok=True)

    bbox = bbox_for_point(lon, lat, buffer_m=500)

    body = {
        'collections': ['sentinel-s2-l2a-cogs'],
        'bbox': bbox,
        'datetime': f'{date_start}/{date_end}',
        'limit': max_results,
        'query': {"eo:cloud_cover": {"lt": 80}}
    }

    try:
        resp = requests.post(STAC_SEARCH, json=body, timeout=30)
        resp.raise_for_status()
        data = resp.json()
    except Exception as e:
        raise RuntimeError('STAC search failed: ' + str(e))

    features = data.get('features', [])
    if not features:
        return None

    # prefer features with lower cloud cover
    features.sort(key=lambda f: f.get('properties', {}).get('eo:cloud_cover', 100))

    for feat in features:
        assets = feat.get('assets', {})
        # try True Color Image (TCI) asset first
        for key in ('TCI', 'visual', 'overview'):
            if key in assets:
                href = assets[key].get('href')
                if href:
                    fname = os.path.basename(href.split('?')[0])
                    out_path = os.path.join(out_dir, fname)
                    ok = download_file(href, out_path)
                    if ok:
                        return out_path
        # fallback: try to download band assets B04,B03,B02 and report their paths
        band_keys = ['B04', 'B03', 'B02']
        band_paths = []
        missing = False
        for b in band_keys:
            if b in assets:
                href = assets[b].get('href')
                fname = os.path.basename(href.split('?')[0])
                out_path = os.path.join(out_dir, fname)
                ok = download_file(href, out_path)
                if not ok:
                    missing = True
                    break
                band_paths.append(out_path)
            else:
                missing = True
                break
        if not missing and band_paths:
            # we downloaded separate band files; return a JSON list filename describing them
            info_path = os.path.join(out_dir, f'bands_{int(math.floor(feat.get("properties", {}).get("datetime", 0)))}.json')
            with open(info_path, 'w', encoding='utf-8') as fh:
                json.dump({'bands': band_paths}, fh, ensure_ascii=False, indent=2)
            return info_path

    return None


def test_noauth():
    # Coordinates: 50° 05′ 15″ N, 14° 25′ 17″ E
    lat = 50 + 5 / 60.0 + 15 / 3600.0
    lon = 14 + 25 / 60.0 + 17 / 3600.0
    start = '2026-01-01'
    end = '2026-02-01'
    try:
        path = download_sentinel_noauth(lon, lat, start, end)
    except Exception as e:
        return {'ok': False, 'error': str(e)}
    if not path:
        return {'ok': False, 'error': 'No images found or download failed.'}
    return {'ok': True, 'path': path}


if __name__ == '__main__':
    print(test_noauth())
