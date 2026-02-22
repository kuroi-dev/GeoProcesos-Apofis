#LIBRERIA PSYCOG2 PARA CONECTAR CON POSTGRESQL 17 (VERSION CON LA QUE TRABAJAREMOS)

import psycopg2
from psycopg2 import sql

# Datos de conexión (Ajusta con las credenciales de Postgres 17)
DB_CONFIG = {
    "host": "localhost",
    "port": "5432",
    "user": "postgres",        # Usuario por defecto de Postgres
    "password": "", # La que se pone al instalar
    "database": "",     # El nombre de la DB que se crea en pgAdmin
    "instancia": "CONEXION CON OTRO SERVER"
}

def crear_db():
    conn = None
    try:
        # Establecer conexión
        print("Conectando a PostgreSQL 17...")
        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()

        # Habilitamos la extensión para generar UUIDs
        cur.execute("CREATE EXTENSION IF NOT EXISTS \"pgcrypto\";")

        # Definir la tabla 
        # se usa DEFAULT para automatizar fecha, hora y privilegios básicos
        #UUID es la mejor opción para el ID ya que es único y difícil de adivinar, lo que mejora la seguridad.
        query_tabla = """
        CREATE TABLE IF NOT EXISTS UsuarioCharcha (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            nombre VARCHAR(150) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            fecha DATE DEFAULT CURRENT_DATE,
            hora TIME DEFAULT CURRENT_TIME,
            token VARCHAR(255) NOT NULL,
            privilegio INTEGER DEFAULT 1,
            conexion_verificada BOOLEAN DEFAULT FALSE,
            token_verificado BOOLEAN DEFAULT FALSE
        );
        """

        # Ejecutar la creación
        cur.execute(query_tabla)
        
        # Guardar los cambios permanentemente
        conn.commit()
        print("¡Éxito! Tabla 'UsuarioCharcha' creada o verificada correctamente.")

        # Cerrar herramientas
        cur.close()

    except Exception as e:
        print(f"Error al crear la base de datos: {e}")
    
    finally:
        if conn is not None:
            conn.close()
            print("Conexión cerrada.")

if __name__ == "__main__":
    crear_db()