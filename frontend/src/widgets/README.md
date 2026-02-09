# Sistema de Widgets Personalizado

Sistema modular de widgets inspirado en Experience Builder de ArcGIS, diseñado para GeoProcesos-Apofis.

## 🏗️ Estructura del Sistema

```
src/widgets/
├── index.js                    # Entrada principal del sistema
├── WidgetRegistry.js          # Registro central de widgets
├── WidgetManager.jsx          # Gestor principal de widgets
├── WidgetManager.css          # Estilos del gestor
├── common/
│   ├── BaseWidget.jsx         # Componente base para widgets
│   └── BaseWidget.css         # Estilos base de widgets
├── analysis/
│   └── SpatialAnalysisWidget.jsx  # Widget de análisis espacial
├── visualization/
│   └── VisualizationWidget.jsx    # Widget de visualización
├── satellite/                 # Widgets de procesamiento satelital
└── automation/               # Widgets de automatización
```

## 🚀 Funcionalidades Principales

### WidgetRegistry
- **Registro automático** de widgets al inicializar
- **Categorización** por tipo de funcionalidad
- **Búsqueda** de widgets por nombre o descripción
- **Gestión de metadatos** y manifiestos

### BaseWidget
- **Estructura consistente** para todos los widgets
- **Controles estándar** (minimizar, cerrar)
- **Estilos unificados** con tema oscuro
- **Integración automática** con MapView

### WidgetManager
- **Panel dinámico** de selección de widgets
- **Gestión flotante** de widgets activos
- **Categorización visual** de herramientas
- **Estado persistente** de widgets abiertos

## 📦 Widgets Incluidos

### 🔍 Análisis Espacial
- **Buffer/Área de Influencia**: Crea zonas de influencia
- **Intersección**: Encuentra superposiciones entre capas
- **Unión**: Combina múltiples geometrías
- **Recorte**: Recorta capas usando moldes
- **Proximidad**: Análisis de elementos cercanos

### 📊 Visualización Avanzada
- **Gráfico de Barras**: Visualización de datos categóricos
- **Gráfico Circular**: Representación de proporciones
- **Gráfico de Líneas**: Tendencias temporales
- **Dispersión**: Correlaciones entre variables
- **Histogramas**: Distribución de frecuencias

## 🔧 Cómo Usar el Sistema

### 1. Importar en tu Dashboard

```jsx
import WidgetManager from '../widgets/WidgetManager.jsx';

// En tu componente principal
<WidgetManager mapView={mapView} />
```

### 2. Crear un Nuevo Widget

```jsx
import React from 'react';
import BaseWidget from '../common/BaseWidget.jsx';

const MiNuevoWidget = ({ mapView, onClose }) => {
  return (
    <BaseWidget
      title="Mi Nuevo Widget"
      icon="widget"
      closeable={true}
      onClose={onClose}
      mapView={mapView}
    >
      <div>
        {/* Contenido de tu widget */}
      </div>
    </BaseWidget>
  );
};

export default MiNuevoWidget;
```

### 3. Registrar el Widget

```jsx
// En widgets/index.js
import MiNuevoWidget from './categoria/MiNuevoWidget.jsx';

widgetRegistry.registerWidget({
  id: 'mi-nuevo-widget',
  name: 'Mi Nuevo Widget',
  category: 'categoria',
  component: MiNuevoWidget,
  manifest: {
    description: 'Descripción de mi widget',
    version: '1.0.0',
    capabilities: ['funcionalidad1', 'funcionalidad2']
  }
});
```

## 📱 Características de UI/UX

- **Tema oscuro consistente** con glassmorphism
- **Iconografía profesional** usando Calcite Design System
- **Responsive design** para desktop y mobile
- **Animaciones suaves** y transiciones
- **Scrollbars personalizados** para mejor experiencia
- **Estados visuales** (hover, active, loading)

## 🔍 Integración con ArcGIS

Todos los widgets reciben automáticamente:
- **mapView**: Instancia del MapView de ArcGIS
- **onClose**: Callback para cerrar el widget
- **Acceso completo** a la API de ArcGIS JavaScript

### Ejemplo de uso con ArcGIS:

```jsx
const handleBufferAnalysis = () => {
  if (!mapView) return;
  
  // Usar API de ArcGIS
  const geometryEngine = await import('@arcgis/core/geometry/geometryEngine');
  const buffer = geometryEngine.buffer(geometry, distance, unit);
  
  // Actualizar el mapa
  mapView.graphics.add(new Graphic({ geometry: buffer }));
};
```

## 🎯 Próximas Funcionalidades

- [ ] **Widgets de Satélite**: Procesamiento NDVI, clasificación
- [ ] **Widgets de Automatización**: Workflows, batch processing
- [ ] **Drag & Drop**: Reordenamiento de widgets
- [ ] **Persistencia**: Guardar configuración de widgets
- [ ] **Temas personalizados**: Light/Dark mode toggle
- [ ] **Widgets compartidos**: Importar/exportar configuraciones

## 🚀 Performance

- **Registro lazy**: Widgets se cargan solo cuando se activan
- **Cleanup automático**: Componentes se desmontan correctamente
- **Memory management**: Referencias limpias a MapView
- **CSS optimizado**: Animaciones con GPU acceleration

## 🔧 Extensibilidad

El sistema está diseñado para ser altamente extensible:
- **Categorías dinámicas**: Nuevas categorías se crean automáticamente
- **Hooks personalizados**: useWidgets() para acceso programático
- **Eventos de ciclo de vida**: Callbacks de inicialización y destrucción
- **API consistente**: Misma interfaz para todos los widgets

---

**🎉 ¡El sistema está listo para usar y extender!**

Para más información sobre desarrollo de widgets específicos, consulta los ejemplos en las carpetas `analysis/` y `visualization/`.
