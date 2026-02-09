import React, { useState, useRef, useEffect } from 'react';
import { useWidgets, createWidget } from './index.js';
import './WidgetManager.css';

/**
 * Widget Manager Principal - Gestor de widgets personalizados
 * Similar a Experience Builder, permite administrar widgets dinámicamente
 */
const WidgetManager = ({ mapView }) => {
  const { getAllWidgets, getByCategory } = useWidgets();
  const [activeWidgets, setActiveWidgets] = useState(new Set());
  const [showWidgetPanel, setShowWidgetPanel] = useState(false);
  const [widgetPositions, setWidgetPositions] = useState({});
  const managerRef = useRef(null);

  const allWidgets = getAllWidgets();

  const toggleWidget = (widgetId) => {
    const newActiveWidgets = new Set(activeWidgets);
    
    if (newActiveWidgets.has(widgetId)) {
      newActiveWidgets.delete(widgetId);
    } else {
      newActiveWidgets.add(widgetId);
      
      // Posicionar nuevo widget
      if (!widgetPositions[widgetId]) {
        setWidgetPositions(prev => ({
          ...prev,
          [widgetId]: getNextPosition()
        }));
      }
    }
    
    setActiveWidgets(newActiveWidgets);
    console.log('🎛️ Widget toggled:', widgetId, newActiveWidgets.has(widgetId) ? 'activado' : 'desactivado');
  };

  const closeWidget = (widgetId) => {
    const newActiveWidgets = new Set(activeWidgets);
    newActiveWidgets.delete(widgetId);
    setActiveWidgets(newActiveWidgets);
  };

  const getNextPosition = () => {
    const existingCount = Object.keys(widgetPositions).length;
    const offset = existingCount * 30;
    
    return {
      top: 120 + offset,
      left: 20 + offset,
      zIndex: 1000 + existingCount
    };
  };

  const renderWidget = (widgetId) => {
    const position = widgetPositions[widgetId];
    const widget = allWidgets.find(w => w.id === widgetId);
    
    if (!widget) return null;

    const widgetElement = createWidget(widgetId, {
      mapView,
      onClose: () => closeWidget(widgetId)
    });

    return (
      <div
        key={widgetId}
        className="floating-widget"
        style={{
          position: 'absolute',
          top: position?.top || 120,
          left: position?.left || 20,
          zIndex: position?.zIndex || 1000
        }}
      >
        {widgetElement}
      </div>
    );
  };

  return (
    <>
      {/* Botón principal del Widget Manager */}
      <div className="widget-manager-trigger">
        <button
          className={`widget-manager-btn ${showWidgetPanel ? 'active' : ''}`}
          onClick={() => setShowWidgetPanel(!showWidgetPanel)}
          title="Gestor de Widgets"
        >
          🧰
        </button>
      </div>

      {/* Panel de selección de widgets */}
      {showWidgetPanel && (
        <div className="widget-selection-panel">
          <div className="widget-panel-header">
            <h3>Widgets Disponibles</h3>
            <button 
              className="panel-close-btn"
              onClick={() => setShowWidgetPanel(false)}
            >
              ❌
            </button>
          </div>

          <div className="widget-categories">
            {['analysis', 'visualization', 'satellite', 'automation'].map(category => {
              const categoryWidgets = getByCategory(category);
              if (categoryWidgets.length === 0) return null;

              return (
                <div key={category} className="widget-category">
                  <div className="category-header">
                    <span className="category-icon">{getCategoryIcon(category)}</span>
                    <span>{getCategoryName(category)}</span>
                  </div>

                  <div className="category-widgets">
                    {categoryWidgets.map(widget => (
                      <div
                        key={widget.id}
                        className={`widget-item ${activeWidgets.has(widget.id) ? 'active' : ''}`}
                        onClick={() => toggleWidget(widget.id)}
                      >
                        <div className="widget-item-content">
                          <div className="widget-item-header">
                            <span className="widget-name">{widget.name}</span>
                            <div className="widget-status">
                              {activeWidgets.has(widget.id) ? '✅' : '➕'}
                            </div>
                          </div>
                          <p className="widget-description">
                            {widget.manifest?.description || 'Sin descripción'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Status del manager */}
          <div className="widget-manager-status">
            <div className="status-info">
              <span>Activos: {activeWidgets.size}</span>
              <span>Disponibles: {allWidgets.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Renderizar widgets activos */}
      {Array.from(activeWidgets).map(widgetId => renderWidget(widgetId))}
    </>
  );
};

// Helper functions
const getCategoryIcon = (category) => {
  const icons = {
    analysis: '📊',
    visualization: '📈',
    satellite: '🛰️',
    automation: '⚙️'
  };
  return icons[category] || '🧩';
};

const getCategoryName = (category) => {
  const names = {
    analysis: 'Análisis',
    visualization: 'Visualización',
    satellite: 'Satélite',
    automation: 'Automatización'
  };
  return names[category] || category;
};

export default WidgetManager;