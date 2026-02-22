import conexionPythonDb

# CREATE - Insertar nuevo usuario
def crear_usuario(nombre, email, token, privilegio=1):
    conn = conexionPythonDb()
    if not conn: return
    try:
        cur = conn.cursor()
        query = """
            INSERT INTO usuarios_acceso (nombre, email, token, privilegio)
            VALUES (%s, %s, %s, %s) RETURNING id;
        """
        cur.execute(query, (nombre, email, token, privilegio))
        nuevo_id = cur.fetchone()[0]
        conn.commit()
        print(f"Usuario creado con UUID: {nuevo_id}")
        return nuevo_id
    finally:
        conn.close()

# READ - Obtener datos por email
def obtener_usuario(email):
    conn = conexionPythonDb()
    if not conn: return
    cur = conn.cursor()
    cur.execute("SELECT * FROM usuarios_acceso WHERE email = %s", (email,))
    user = cur.fetchone()
    conn.close()
    return user

# UPDATE - Cambiar estado de verificación
def verificar_token(email, estado=True):
    conn = conexionPythonDb()
    if not conn: return
    try:
        cur = conn.cursor()
        query = "UPDATE usuarios_acceso SET token_verificado = %s WHERE email = %s"
        cur.execute(query, (estado, email))
        conn.commit()
        print(f"✅ Estado de verificación actualizado para {email}")
    finally:
        conn.close()

if __name__ == "__main__":
  crear_usuario()
  obtener_usuario()
  verificar_token()