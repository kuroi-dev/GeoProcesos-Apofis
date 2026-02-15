import psycopg2
from psycopg2 import extras
from datetime import datetime, timedelta
import time
import sys

#script de limpieza automática para eliminar los datos de los usuarios que hayan expirado su periodo de prueba de 30 minutos o ellos cierren su session.
#todo lo que diga trial es el periodo de prueba.


# Configuración centralizada. despoues al crear la database lo mejoramos.
DB_CONFIG = {
    "dbname": "tu_db",
    "user": "app_user_limitado",
    "password": "tu_password",
    "host": "localhost",
    "port": "5432"
}

def get_db_connection():
    try:
        return psycopg2.connect(**DB_CONFIG)
    except Exception as e:
        print(f"[{datetime.now()}] ERROR: No se pudo conectar a la DB: {e}")
        return None

def run_garbage_collector():
    """Busca trial expirados y purga datos huérfanos."""
    conn = get_db_connection()
    if not conn:
        return

    try:
        cur = conn.cursor(cursor_factory=extras.DictCursor)
        
        # Tiempo de corte: 30 minutos atrás
        expiration_threshold = datetime.now() - timedelta(minutes=30)

        # 1. Identificar usuarios expirados que aún tienen el trial activo
        cur.execute("""
            SELECT id, email 
            FROM users 
            WHERE trial_active = True AND trial_started_at <= %s
        """, (expiration_threshold,))
        
        expired_users = cur.fetchall()

        if not expired_users:
            # No hay nada que limpiar
            return

        for user in expired_users:
            u_id = user['id']
            print(f"[{datetime.now()}] EXPIRADO: Limpiando rastro del usuario {user['email']}...")

            # 2. Purga total de tablas relacionadas (Tu lógica de negocio aquí)
            cur.execute("DELETE FROM temporal_modifications WHERE user_id = %s", (u_id,))
            cur.execute("DELETE FROM user_uploads WHERE user_id = %s", (u_id,))
            
            # 3. Finalizar estado en la tabla maestra
            cur.execute("""
                UPDATE users 
                SET trial_active = False, 
                    trial_started_at = NULL 
                WHERE id = %s
            """, (u_id,))
        
        conn.commit()
        print(f"[{datetime.now()}] ÉXITO: Se limpiaron {len(expired_users)} sesiones.")

    except Exception as e:
        print(f"[{datetime.now()}] ERROR durante la limpieza: {e}")
        conn.rollback()
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    print(f"--- Iniciando Daemon de Limpieza de Trial (30 min) ---")
    while True:
        run_garbage_collector()
        # Se ejecuta cada 2 minutos para no sobrecargar la DB pero ser efectivo
        time.sleep(120)