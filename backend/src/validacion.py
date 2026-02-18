from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, EmailStr

app = FastAPI()

# 1. Definimos el modelo del JSON que esperamosgit push origin develop

class UserValidation(BaseModel):
    email: EmailStr
    token: str

# Simulación de base de datos
db_usuarios = {
    "testing@testing.test": {"token_valido": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoidGVzdGluZ0B0ZXN0aW5nLnRlc3QiLCJpYXQiOjE3NzAzMjUxNTEsImV4cCI6MTc3MDMyNjk1MX0.uIUB73Ktk85hsq18d3ZXJPwEKMtdqsWbJRkx2Wmxv2I", "activo": False}
}

@app.post("/auth/validate")
async def validate_user(data: UserValidation):
    # El objeto 'data' ya está validado por Pydantic aquí
    email_cliente = data.email
    token_cliente = data.token

    # 2. Lógica de validación
    user_in_db = db_usuarios.get(email_cliente)

    if not user_in_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Usuario no encontrado"
        )

    if user_in_db["token_valido"] == token_cliente:
        # 3. Aquí actualizarías tu base de datos (SQLAlchemy/PostgreSQL)
        user_in_db["activo"] = True 
        return {"message": "Validación exitosa", "status": "active"}
    else:
        # Error de seguridad: el token no coincide
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Token de validación inválido o expirado"
        )