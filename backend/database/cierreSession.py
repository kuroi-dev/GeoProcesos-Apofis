import psycopg2
from datetime import datetime

DB_CONFIG = {
    "dbname": "tu_db",
    "user": "app_user_limitado",
    "password": "tu_password",
    "host": "localhost"
}

def purge_trial_data(user_id):
    """
    Elimina todas las modificaciones hechas por el usuario durante su trial.
    Asegúrate de que tus tablas tengan una columna 'user_id'.
    """
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()
    
    try:
        # 1. Borrar datos de tablas específicas (ejemplos)
        cur.execute("DELETE FROM temporal_modifications WHERE user_id = %s", (user_id,))
        cur.execute("DELETE FROM user_uploads WHERE user_id = %s", (user_id,))
        
        # 2. Resetear el estado del usuario si es necesario
        cur.execute("UPDATE users SET trial_active = False WHERE id = %s", (user_id,))
        
        conn.commit()
        return True
    except Exception as e:
        print(f"Error limpiando trial: {e}")
        conn.rollback()
        return False
    finally:
        cur.close()
        conn.close()

def get_trial_seconds():
    """Retorna los 30 minutos convertidos a segundos para el Front."""
    return 30 * 60  # 1800 segundos