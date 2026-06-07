# GeoProcesos Apofis

Plataforma web para visualización y análisis geoespacial basada en ArcGIS JS API + Flask.

---

## Qué es esto

GeoProcesos Apofis es una aplicación web que permite trabajar con información geográfica en un entorno interactivo. Está pensada para análisis espacial básico y avanzado usando herramientas GIS en el navegador.

No es un demo decorativo: es una base funcional para una plataforma GIS real.

---

## Stack

### Frontend
- React 18
- ArcGIS JavaScript SDK
- Vite
- Calcite Components (Esri)

### Backend
- Flask
- JWT (autenticación)
- Flask-CORS
- Werkzeug

---

## Funcionalidades

### Mapas
- Mapa interactivo con ArcGIS JS API
- Capas base (satélite, calles, topográfico)
- Manejo de capas dinámico

### Herramientas GIS
- Medición de distancia y áreas
- Buffers e intersecciones
- Búsqueda geográfica
- Leyenda y control de capas

### Sistema de usuario
- Login con JWT
- Sesiones con expiración
- Protección de rutas API

### UI
- Dashboard centralizado
- Interacción por widgets
- Diseño responsive

---

## Estructura del proyecto

GeoProcesos-Apofis/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── widgets/
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── app.py
│   │   ├── controller/
│   │   ├── models/
│   │   └── views/
│   └── requirements.txt

---

## Instalación

### Frontend

cd frontend
npm install
npm run dev

### Backend

cd backend
python -m venv venv

# Linux / Mac
source venv/bin/activate

# Windows
venv\\Scripts\\activate

pip install -r requirements.txt
python src/app.py

---

## Uso

1. Levantar frontend y backend
2. Iniciar sesión
3. Abrir dashboard principal
4. Usar herramientas GIS desde el panel
5. Interactuar con capas y análisis

---

## API

### Login

POST /api/login

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}

### Respuesta

{
  "access_token": "jwt-token",
  "user": {
    "email": "usuario@ejemplo.com"
  }
}

---

## Estado del proyecto

- Autenticación JWT funcional
- Integración ArcGIS operativa
- Dashboard base implementado
- Sistema de widgets en desarrollo
- API en expansión

---

## Notas

Proyecto en evolución. Base para una plataforma GIS más completa.

---

## Contacto

David Riquelme  
Chile  
david.riquelme.sb@gmail.com  

---

## Licencia

MIT

<p align="center">
  <em>Transformando datos geoespaciales en decisiones inteligentes</em>
</p>
