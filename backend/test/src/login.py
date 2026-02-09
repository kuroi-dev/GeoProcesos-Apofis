import sqlite3
import hashlib
from typing import Optional

class SecureLogin:
    def __init__(self, db_path: str = "users.db"):
        self.db_path = db_path
        self.init_db()
    
    def init_db(self):
        """Initialize database with users table if it doesn't exist"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Create users table with proper constraints
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        ''')
        
        conn.commit()
        conn.close()
    
    def hash_password(self, password: str) -> str:
        """Securely hash password using SHA-256"""
        return hashlib.sha256(password.encode()).hexdigest()
    
    def register_user(self, username: str, password: str, email: str) -> bool:
        """Register new user with proper validation"""
        # Input validation
        if not all([username, password, email]):
            raise ValueError("All fields required")
            
        hashed_password = self.hash_password(password)
        
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Parameterized query prevents SQL injection
            cursor.execute(
                "INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)",
                (username, hashed_password, email)
            )
            
            conn.commit()
            return True
            
        except sqlite3.IntegrityError as e:
            print(f"Registration failed: {e}")
            return False
        finally:
            conn.close()
    
    def authenticate_user(self, username: str, password: str) -> Optional[dict]:
        """Authenticate user with parameterized query"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Parameterized query prevents SQL injection
        cursor.execute(
            "SELECT id, username, email FROM users WHERE username = ? AND password_hash = ?",
            (username, self.hash_password(password))
        )
        
        result = cursor.fetchone()
        conn.close()
        
        if result:
            return {
                "id": result[0],
                "username": result[1],
                "email": result[2]
            }
        return None

# Example usage
if __name__ == "__main__":
    login_system = SecureLogin()
    
    # Register a user
    login_system.register_user("testuser", "securepassword123", "test@example.com")
    
    # Authenticate user
    user = login_system.authenticate_user("testuser", "securepassword123")
    if user:
        print(f"Login successful! Welcome, {user['username']}")
    else:
        print("Authentication failed")