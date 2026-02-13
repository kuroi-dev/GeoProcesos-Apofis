# 🗺️ GeoProcesos Apofis - Plataforma GIS en Línea

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB.svg?logo=react)
![ArcGIS](https://img.shields.io/badge/ArcGIS-JavaScript%20SDK-007AC2.svg)
![Flask](https://img.shields.io/badge/Flask-3.x-000000.svg?logo=flask)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 Descripción

GeoProcesos Apofis es una plataforma web moderna y profesional para análisis geoespacial en línea. Combina las tecnologías más avanzadas en desarrollo web con las herramientas GIS más potentes del mercado, ofreciendo una experiencia de usuario intuitiva y funcionalidades profesionales.

### ✨ Características Principales

🗺️ **Mapas Interactivos de Alta Calidad**
- Integración completa con ArcGIS JavaScript SDK
- Múltiples capas base (satelital, calles, topográfico)
- Renderizado fluido y optimizado

🛠️ **Herramientas Especializadas**
- 📊 **Análisis Espacial**: Operaciones geométricas, buffers, intersecciones
- 📈 **Visualización Avanzada**: Mapas temáticos y gráficos estadísticos
- 🛰️ **Imágenes Satelitales**: Procesamiento multispectral, NDVI, clasificación
- ⚙️ **Automatización**: Flujos de trabajo programados y geoprocesamiento batch

🎛️ **Widgets Profesionales**
- Selector de mapas base con transiciones suaves
- Herramientas de medición (distancia, área, volumen)
- Leyenda dinámica y gestión de capas
- Búsqueda geoespacial avanzada
- Brújula y controles de navegación

🔒 **Sistema de Autenticación Seguro**
- JWT (JSON Web Tokens) con expiración automática
- Sesiones de 30 minutos con renovación automática
- Protección de rutas y API endpoints

🎨 **Interfaz Moderna y Responsive**
- Diseño dark theme profesional
- Glassmorphism y efectos visuales avanzados
- Adaptable a dispositivos móviles y escritorio
- Iconografía de Calcite Design System

## 🚀 Tecnologías Utilizadas

### Frontend
```javascript
React 18.x          // Framework principal
ArcGIS JS SDK       // Funcionalidades GIS
Vite                // Build tool moderna
Calcite Components  // Sistema de diseño ESRI
CSS3 + Glassmorphism // Estilos avanzados
```

### Backend
```python
Flask 3.x           // Framework web ligero
JWT                 // Autenticación segura
Flask-CORS          // Manejo de CORS
Werkzeug            // Utilidades WSGI
```

## 📁 Estructura del Proyecto

```
GeoProcesos-Apofis/
├── 📱 frontend/                 # Aplicación React
│   ├── src/
│   │   ├── components/          # Componentes reutilizables
│   │   │   └── MapWidgets/      # Widgets del mapa
│   │   ├── pages/
│   │   │   └── Dashboard/       # Dashboard principal
│   │   ├── assets/              # Recursos estáticos
│   │   │   └── logo/           # Logos y gráficos
│   │   └── widgets/            # Sistema de widgets personalizados
│   ├── public/                 # Archivos públicos
│   ├── package.json
│   └── vite.config.js
├── 🐍 backend/                  # API Flask
│   ├── src/
│   │   ├── app.py              # Aplicación principal
│   │   ├── controller/         # Controladores de rutas
│   │   ├── models/             # Modelos de datos
│   │   └── views/              # Vistas de respuesta
│   ├── test/                   # Pruebas del backend
│   └── requirements.txt
└── 📖 README.md                # Este archivo
```

## ⚡ Instalación y Configuración

### Prerrequisitos
- **Node.js** 18+ y npm
- **Python** 3.8+
- **Git**

### 🔧 Configuración del Frontend

```bash
# Clonar el repositorio
git clone <repository-url>
cd GeoProcesos-Apofis

# Instalar dependencias del frontend
cd frontend
npm install

# Instalar Calcite Components
npm install @esri/calcite-components

# Iniciar servidor de desarrollo
npm run dev
```

### 🐍 Configuración del Backend

```bash
# Navegar al directorio backend
cd backend

# Crear entorno virtual (recomendado)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# o
venv\Scripts\activate     # Windows

# Instalar dependencias
pip install -r requirements.txt

# Iniciar servidor Flask
python src/app.py
```

## 🖥️ Uso

1. **Acceso a la plataforma**: Navega a `http://localhost:5173` (frontend)
2. **Autenticación**: Usa las credenciales proporcionadas por el administrador
3. **Exploración del mapa**: Interactúa con las herramientas del panel derecho
4. **Herramientas especializadas**: Accede a las funciones avanzadas desde el panel izquierdo

### 🎯 Flujo de Trabajo Típico

1. **Login** con credenciales válidas
2. **Seleccionar herramienta** especializada (Análisis, Visualización, etc.)
3. **Configurar widgets** según necesidades específicas
4. **Realizar análisis** geoespacial
5. **Exportar resultados** en formatos estándar

## 🗺️ Widgets Disponibles

| Widget | Función | Icono |
|--------|---------|-------|
| **Basemap Toggle** | Cambio de mapas base | 🗺️ |
| **Scale Bar** | Escala del mapa | 📏 |
| **Compass** | Orientación norte | 🧭 |
| **Home** | Vista inicial | 🏠 |
| **Locate** | Geolocalización | 📍 |
| **Search** | Búsqueda geoespacial | 🔍 |
| **Legend** | Leyenda de capas | 📋 |
| **Layer List** | Gestión de capas | 📚 |
| **Measurement** | Herramientas de medición | 📐 |

## 🔐 API Endpoints

### Autenticación
```http
POST /api/login
Content-Type: application/json

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}
```

**Respuesta exitosa:**
```json
{
  "access_token": "jwt-token-aqui",
  "user": {
    "email": "usuario@ejemplo.com"
  }
}
```

## 🤝 Contribución

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. **Commit** tus cambios (`git commit -m 'Add amazing feature'`)
4. **Push** a la rama (`git push origin feature/amazing-feature`)
5. **Abre** un Pull Request

### 📋 Estándares de Código

- **Frontend**: ESLint + Prettier configurados
- **Backend**: PEP 8 Python Style Guide
- **Commits**: Conventional Commits format
- **Testing**: Pruebas unitarias requeridas

## 📊 Estado del Proyecto

- ✅ **Autenticación JWT** completamente funcional
- ✅ **Integración ArcGIS** con widgets profesionales
- ✅ **Interfaz responsive** con diseño moderno
- ✅ **Sistema de widgets** extensible
- 🚧 **Herramientas avanzadas** de análisis (en desarrollo)
- 📋 **API REST** expandida (roadmap)

## 🏢 Desarrollado por

**Apofis SPA**  
*Soluciones GIS Innovadoras*

---

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

## 📞 Soporte

Para soporte técnico y consultas:

- 📧 **Email**: soporte@apofisgeo.cl
- 🌐 **Web**: www.apofisgeo.cl
- 📱 **Teléfono**: +56 9 XXXX XXXX

---

<p align="center">
  <img src="frontend/src/assets/logo/logoL.svg" alt="Apofis Logo" width="180"/>
</p>

<p align="center">
  <em>Transformando datos geoespaciales en decisiones inteligentes</em>
</p>