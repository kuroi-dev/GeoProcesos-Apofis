#Libreria para conectar con PostgreSQL 17 (versión con la que trabajaremos)
#Visualizador GUI a usar por recomedacion de postgres: pgAdmin 4 (https://www.pgadmin.org/download/pgadmin-4-windows/)
#Driver de conexión: psycopg2 (pip install psycopg2-binary)

import psycopg2

# Configuracion para conectar con la base de datos.
DB_PARAMS = {
    "host": "localhost",
    "port": "5432",
    "user": "postgres",
    "password": "",
    "database": ""
}

def get_connection():
    """
    Función que importaremos en routes.py.
    Uso: conn = obtener_conexion()
    """
    try:
        conn = psycopg2.connect(**DB_PARAMS)
        return conn
    except Exception as e:
        print(f"Error de conexión al aplicativo: {e}")
        return None

if __name__ == "__main__":
    get_connection()
    