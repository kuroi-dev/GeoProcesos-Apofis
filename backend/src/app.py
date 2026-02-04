import os
import sys
from flask import Flask

# Ensure `src` is on sys.path so sibling packages (controller, models, views)
# can be imported whether this file is run as a script or as a module.
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
	sys.path.insert(0, BASE_DIR)

from controller import bp as controller_bp


def create_app():
	app = Flask(__name__)
	app.register_blueprint(controller_bp, url_prefix='/api')
	print("App created and controller blueprint registered.")
	return app


app = create_app()


if __name__ == '__main__':
	app.run(debug=True)
