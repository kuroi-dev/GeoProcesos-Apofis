import psycopg2
import bleach

#para evitar xss y sql injection
def save_comment(user_input):
    # Esto elimina cualquier rastro de código malicioso
    clean_html = bleach.clean(user_input) 
    # Ahora 'clean_html' es seguro para guardar en Postgres
    db.session.execute("INSERT INTO comments (text) VALUES (%s)", (clean_html,))
    

# para evitar sql injection
def get_user_secure(email):
    conn = psycopg2.connect(dsn="tu_conexion")
    cur = conn.cursor()
    
    # El '%' o el valor se pasa como un segundo argumento, NO dentro del string
    cur.execute("SELECT id, name FROM users WHERE email = %s", (email,))
    
    user = cur.fetchone()
    cur.close()
    conn.close()
    return user