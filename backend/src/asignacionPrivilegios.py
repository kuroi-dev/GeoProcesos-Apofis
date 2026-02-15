#funcion a crear de privilegios

def update_user_privilege(email, new_level):
    if not (1 <= new_level <= 4):
        return "Nivel no válido"
    
    # Supongamos que usas un cursor de base de datos
    query = "UPDATE users SET privilege_level = %s WHERE email = %s"
    # El driver limpia los datos para evitar inyecciones SQL
    cursor.execute(query, (new_level, email))
    connection.commit()
    return f"Usuario {email} actualizado al nivel {new_level}"


# conectividad con routes

def has_required_privilege(user_level, required_level):
    """Retorna True si el nivel del usuario es suficiente"""
    return user_level >= required_level

@bp.route('/download-tif', methods=['POST'])
def download_tif_route():
    data = request.get_json()
    user_email = data.get('email')
    
    # 1. Buscas el nivel del usuario en la DB de forma segura
    # user_level = get_user_level_from_db(user_email)
    user_level = 2  # Ejemplo: usuario nivel 2
    
    # 2. Definimos que esta herramienta requiere Nivel 4
    if not has_required_privilege(user_level, 4):
        return jsonify({
            "error": "Acceso denegado",
            "message": "Esta herramienta requiere una cuenta Premium (Nivel 4)."
        }), 403 # Código 403: Prohibido

    # 3. Si tiene permiso, corre el script de Sentinel
    return jsonify({"message": "Iniciando descarga..."}), 200