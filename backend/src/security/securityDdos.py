# Configuración con protección de saturación. esto se de app para la proteccion de ataque DDOS.
try:
    app.db_pool = psycopg2.pool.ThreadedConnectionPool(
        minconn=1, 
        maxconn=20, # No permitas que Python abra más de 20 conexiones a Postgres
        dbname="tu_db",
        user="app_user_limitado",
        password="tu_password",
        host="localhost"
    )
except Exception as e:
    print(f"Error creando el pool: {e}")

# Función segura para obtener conexión
def get_db_connection():
    try:
        # Si el pool está lleno, esto fallará rápido en lugar de colgar el servidor
        return app.db_pool.getconn()
    except psycopg2.pool.PoolError:
        return None # Luego manejas el error 503 en Flask