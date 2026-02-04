from flask import Blueprint, jsonify, request

bp = Blueprint('api', __name__)


@bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})


@bp.route('/items', methods=['GET'])
def list_items():
    # placeholder: should call models to fetch data
    sample = [{'id': 1, 'name': 'example'}]
    return jsonify(sample)


@bp.route('/items', methods=['POST'])
def create_item():
    data = request.get_json() or {}
    # placeholder: should validate and use models to persist
    return jsonify({'created': data}), 201
