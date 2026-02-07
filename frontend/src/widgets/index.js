/**
 * Sistema de Widgets Personalizados
 * Índice principal para importar y registrar todos los widgets
 * Inspirado en Experience Builder
 */

import widgetRegistry from './WidgetRegistry.js';

// Importar widgets base
import BaseWidget from './common/BaseWidget.jsx';

// Importar widgets de análisis
import SpatialAnalysisWidget from './analysis/SpatialAnalysisWidget.jsx';

// Importar widgets de visualización
import VisualizationWidget from './visualization/VisualizationWidget.jsx';

// TODO: Importar widgets de satélite cuando se creen
// import SatelliteWidget from './satellite/SatelliteWidget.jsx';

// TODO: Importar widgets de automatización cuando se creen
// import AutomationWidget from './automation/AutomationWidget.jsx';

/**
 * Configuración y registro automático de todos los widgets
 */
const initializeWidgets = () => {
  console.log('🚀 Inicializando sistema de widgets...');

  // Registrar widgets de análisis
  widgetRegistry.registerWidget({
    id: 'spatial-analysis',
    name: 'Análisis Espacial',
    category: 'analysis',
    component: SpatialAnalysisWidget,
    manifest: {
      description: 'Herramientas de análisis geométrico y espacial',
      version: '1.0.0',
      author: 'GeoProcesos-Apofis',
      dependencies: ['@arcgis/core'],
      capabilities: ['buffer', 'intersect', 'union', 'clip', 'proximity']
    }
  });

  // Registrar widgets de visualización
  widgetRegistry.registerWidget({
    id: 'visualization',
    name: 'Visualización Avanzada',
    category: 'visualization',
    component: VisualizationWidget,
    manifest: {
      description: 'Generación de gráficos y visualizaciones de datos',
      version: '1.0.0',
      author: 'GeoProcesos-Apofis',
      dependencies: ['react'],
      capabilities: ['charts', 'export', 'statistics']
    }
  });

  // TODO: Registrar otros widgets cuando se creen
  /*
  widgetRegistry.registerWidget({
    id: 'satellite-processing',
    name: 'Procesamiento Satelital',
    category: 'satellite',
    component: SatelliteWidget,
    manifest: {
      description: 'Procesamiento de imágenes multiespectrales',
      version: '1.0.0',
      capabilities: ['ndvi', 'classification', 'enhancement']
    }
  });

  widgetRegistry.registerWidget({
    id: 'geoprocessing-automation',
    name: 'Automatización de Geoprocesos',
    category: 'automation',
    component: AutomationWidget,
    manifest: {
      description: 'Automatización y workflows de geoprocesos',
      version: '1.0.0',
      capabilities: ['workflow', 'batch', 'scheduling']
    }
  });
  */

  console.log(`✅ Sistema de widgets inicializado con ${widgetRegistry.getAllWidgets().length} widgets`);
  
  // Mostrar resumen de widgets registrados
  widgetRegistry.getCategories().forEach(category => {
    const widgets = widgetRegistry.getWidgetsByCategory(category);
    console.log(`📁 ${category}: ${widgets.length} widgets`, widgets.map(w => w.name));
  });
};

/**
 * Función helper para crear instancia de widget
 */
const createWidget = (widgetId, props = {}) => {
  const widget = widgetRegistry.getWidget(widgetId);
  if (!widget) {
    console.error(`❌ Widget no encontrado: ${widgetId}`);
    return null;
  }

  const WidgetComponent = widget.component;
  return <WidgetComponent key={widgetId} {...props} />;
};

/**
 * Hook personalizado para usar widgets
 */
const useWidgets = () => {
  return {
    registry: widgetRegistry,
    createWidget,
    getAllWidgets: () => widgetRegistry.getAllWidgets(),
    getWidget: (id) => widgetRegistry.getWidget(id),
    getByCategory: (category) => widgetRegistry.getWidgetsByCategory(category),
    search: (term) => widgetRegistry.searchWidgets(term)
  };
};

// Exportaciones
export {
  // Sistema base
  widgetRegistry,
  initializeWidgets,
  useWidgets,
  createWidget,
  
  // Componente base
  BaseWidget,
  
  // Widgets específicos
  SpatialAnalysisWidget,
  VisualizationWidget
};

// Inicializar automáticamente al importar - COMENTADO TEMPORALMENTE
// initializeWidgets();

export default widgetRegistry;