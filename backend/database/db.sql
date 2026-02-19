-- Crear el usuario para la aplicación (sin permisos de superusuario)
CREATE USER app_user_limitado WITH PASSWORD 'tu_password_seguro_aqui';

-- Revocar todos los permisos por defecto del esquema público para evitar fugas
REVOKE ALL ON SCHEMA public FROM PUBLIC;

-- Dar permiso solo de "uso" al esquema (no permite ver nada aún)
GRANT USAGE ON SCHEMA public TO app_user_limitado;

-- Dar permisos específicos tabla por tabla
-- Esto asegura que el atacante no pueda hacer 'DROP TABLE' ni 'TRUNCATE'
GRANT SELECT, INSERT, UPDATE ON TABLE users TO app_user_limitado;
GRANT SELECT, INSERT, UPDATE ON TABLE comments TO app_user_limitado;

-- Importante: Dar permiso a las secuencias (para que funcionen los IDs auto-incrementales)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user_limitado;

-- Impedir que el usuario cree nuevas tablas (bloquea inyecciones que intenten crear tablas temporales)
REVOKE CREATE ON SCHEMA public FROM app_user_limitado;

-- Limita a que este usuario solo pueda tener 40 conexiones simultáneas
ALTER ROLE app_user_limitado CONNECTION LIMIT 40;

-- Establece un tiempo de espera para consultas lentas (evita ataques de saturación)
-- Si una consulta tarda más de 30 segundos, Postgres la mata automáticamente.
ALTER ROLE app_user_limitado SET statement_timeout = '30s';

-- tabla de usuario para el periodo de prueba.
ALTER TABLE users ADD COLUMN trial_started_at TIMESTAMP;

-- Cierra el puerto: Configura el Firewall (ufw en Linux) para que SOLO la dirección IP de tu servidor Flask pueda hablar con el puerto 5432.

--esto debe estar en el app.py. paara la database. para que se conecte con el usuario limitado.
# En tu app.py o archivo de configuración
DB_CONFIG = {
    "dbname": "nombre_de_tu_db",
    "user": "app_user_limitado",  # El usuario que acabamos de crear
    "password": "tu_password_seguro_aqui",
    "host": "localhost",
    "port": "5432"
}