"""Generate ESRI-compatible layer descriptors for images in test/static.
Usage: python esri_helper.py [filename]
If filename omitted, prints descriptors for all images in test/static/metadata.json
"""
import os
import json
import sys

STATIC_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), 'static'))


def load_metadata():
    metadata_file = os.path.join(STATIC_DIR, 'metadata.json')
    if not os.path.isfile(metadata_file):
        return []
    with open(metadata_file, 'r', encoding='utf-8') as f:
        return json.load(f) or []


def descriptor_for(entry, host_url='http://127.0.0.1:5001'):
    return {
        'type': 'raster',
        'url': f"{host_url}/test_static/{entry['filename']}",
        'spatialReference': {'wkid': 4326},
        'extent': entry.get('extent'),
        'lon': entry.get('lon'),
        'lat': entry.get('lat'),
        'date': entry.get('date')
    }


if __name__ == '__main__':
    meta = load_metadata()
    if len(sys.argv) > 1:
        name = sys.argv[1]
        e = next((m for m in meta if m.get('filename') == name), None)
        if not e:
            print('Not found')
            sys.exit(1)
        print(json.dumps(descriptor_for(e), indent=2))
    else:
        host = os.environ.get('TEST_HOST', 'http://127.0.0.1:5001')
        out = [descriptor_for(e, host_url=host) for e in meta]
        print(json.dumps(out, indent=2))
