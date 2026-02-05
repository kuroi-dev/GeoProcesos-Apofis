#!/usr/bin/env python3
"""Simple test script to POST an email to /api/access.
It will try to install `requests` if it's not available.
"""
import sys
try:
    import requests
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'requests'])
    import requests

import argparse


def test_access(url: str, mail: str):
    payload = {'mail': mail}
    try:
        resp = requests.post(url, json=payload, timeout=10)
    except Exception as e:
        print('Request failed:', e)
        return 1

    print('Status:', resp.status_code)
    try:
        print('JSON:', resp.json())
    except Exception:
        print('Text:', resp.text)
    return 0


if __name__ == '__main__':
    p = argparse.ArgumentParser(description='Test POST /api/access')
    p.add_argument('--url', default='http://127.0.0.1:5000/api/access')
    p.add_argument('--mail', default='testing@testing.test')
    args = p.parse_args()
    sys.exit(test_access(args.url, args.mail))
