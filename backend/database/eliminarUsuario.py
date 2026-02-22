import conexionPythonDb

# ESTO SERIA ELIMINAR EN BASE A TOKE.

def eliminar_registro(token1, token2):
    conn = conexionPythonDb()
    if not conn: return

    try:
        cur = conn.cursor()
        
        # Primero verificamos si ese token existe y a quién pertenece
        query_verificar = "SELECT nombre, email FROM usuarios_acceso WHERE token1 = %s AND token2 = %s"
        cur.execute(query_verificar, (token1, token2))
        usuario = cur.fetchone()

        if usuario:
            nombre, email = usuario
            print(f"Registro encontrado: {nombre} ({email})")
            confirmar = input(f"¿Deseas eliminar este registro vinculado al token? (s/n): ")
            
            if confirmar.lower() == 's':
                # 2. Ejecutamos el DELETE
                query_delete = "DELETE FROM usuarios_acceso WHERE token = %s"
                cur.execute(query_delete, (token1, token2))
                conn.commit()
                print(f"El registro con el token proporcionado ha sido eliminado.")
            else:
                print("Operación cancelada.")
        else:
            print("No se encontró ningún registro con ese token.")

    except Exception as e:
        print(f"Error en la base de datos: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    # Esto es lo que el administrador o el sistema ingresaría
    token_input = input("Ingresa el TOKEN del registro a eliminar: ")
    eliminar_registro(token_input)