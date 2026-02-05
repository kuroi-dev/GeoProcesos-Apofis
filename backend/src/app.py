import os
import sys
from flask import Flask, send_from_directory

# Ensure `src` is on sys.path so sibling packages (controller, models, views)
# can be imported whether this file is run as a script or as a module.
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
	sys.path.insert(0, BASE_DIR)

from controller import bp as controller_bp, site_bp as site_bp

# Path to static directory inside backend (serve files from backend/static)
# BASE_DIR is backend/src, so static is one level up: backend/static
STATIC_DIR = os.path.abspath(os.path.join(BASE_DIR, '..', 'static'))


def create_app():
	# Serve the backend/static directory as static files if it exists
	static_folder = STATIC_DIR if os.path.isdir(STATIC_DIR) else None
	app = Flask(__name__, static_folder=static_folder, static_url_path='')
	app.register_blueprint(controller_bp, url_prefix='/api')
	# Register site blueprint at app root to serve static content
	if static_folder:
		app.register_blueprint(site_bp)

	print("App created and controller blueprint registered.")
	return app


app = create_app()


if __name__ == '__main__':
	app.run(debug=True)
