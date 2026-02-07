import React, { useState } from 'react';
import BaseWidget from '../common/BaseWidget.jsx';

/**
 * Widget de Análisis Espacial
 * Herramientas para análisis geométrico y spatial
 */
const SpatialAnalysisWidget = ({ mapView, onClose }) => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [buffer, setBuffer] = useState({ distance: 100, unit: 'meters' });

  const analysisTools = [
    {
      id: 'buffer',
      name: 'Buffer / Área de Influencia',
      icon: 'circle',
      description: 'Crea área de influencia alrededor de geometrías'
    },
    {
      id: 'intersect',
      name: 'Intersección',
      icon: 'intersect',
      description: 'Encuentra áreas donde se superponen capas'
    },
    {
      id: 'union',
      name: 'Unión',
      icon: 'union',
      description: 'Combina múltiples geometrías en una sola'
    },
    {
      id: 'clip',
      name: 'Recortar',
      icon: 'cut',
      description: 'Recorta una capa usando otra como molde'
    },
    {
      id: 'proximity',
      name: 'Análisis de Proximidad',
      icon: 'distance',
      description: 'Encuentra elementos más cercanos'
    }
  ];

  const handleToolSelect = (toolId) => {
    setSelectedTool(toolId === selectedTool ? null : toolId);
    console.log(`🔧 Herramienta seleccionada: ${toolId}`);
  };

  const handleBufferAnalysis = () => {
    if (!mapView) {
      alert('MapView no disponible');
      return;
    }
    
    console.log(`📊 Ejecutando análisis de buffer:`, {
      distance: buffer.distance,
      unit: buffer.unit,
      mapView: mapView
    });
    
    // Aquí iría la lógica real de análisis con ArcGIS
    alert(`Buffer de ${buffer.distance} ${buffer.unit} ejecutado`);
  };

  return (
    <BaseWidget
      title="Análisis Espacial"
      icon="analysis"
      width="340px"
      closeable={true}
      onClose={onClose}
      mapView={mapView}
    >
      <div className="widget-section">
        <div className="widget-section-title">Herramientas Disponibles</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {analysisTools.map(tool => (
            <div
              key={tool.id}
              className={`analysis-tool-item ${selectedTool === tool.id ? 'selected' : ''}`}
              onClick={() => handleToolSelect(tool.id)}
            >
              <div className="tool-header">
                <calcite-icon icon={tool.icon} scale="s"></calcite-icon>
                <span className="tool-name">{tool.name}</span>
              </div>
              <p className="tool-description">{tool.description}</p>
              
              {selectedTool === tool.id && tool.id === 'buffer' && (
                <div className="tool-config">
                  <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                    <input
                      type="number"
                      value={buffer.distance}
                      onChange={(e) => setBuffer({...buffer, distance: e.target.value})}
                      placeholder="Distancia"
                      className="widget-input"
                      style={{ flex: '2' }}
                    />
                    <select
                      value={buffer.unit}
                      onChange={(e) => setBuffer({...buffer, unit: e.target.value})}
                      className="widget-input"
                      style={{ flex: '1' }}
                    >
                      <option value="meters">m</option>
                      <option value="kilometers">km</option>
                      <option value="feet">ft</option>
                    </select>
                  </div>
                  <button 
                    className="widget-button" 
                    onClick={handleBufferAnalysis}
                    style={{ marginTop: '8px' }}
                  >
                    <calcite-icon icon="play" scale="s"></calcite-icon>
                    Ejecutar Buffer
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="widget-section">
        <div className="widget-section-title">Estado del Análisis</div>
        <div style={{ 
          padding: '12px', 
          background: 'rgba(76, 175, 80, 0.1)', 
          borderRadius: '6px',
          fontSize: '13px'
        }}>
          {selectedTool 
            ? `Herramienta activa: ${analysisTools.find(t => t.id === selectedTool)?.name}` 
            : 'Selecciona una herramienta para comenzar'
          }
        </div>
      </div>

      <style jsx>{`
        .analysis-tool-item {
          padding: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .analysis-tool-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(76, 175, 80, 0.3);
        }
        
        .analysis-tool-item.selected {
          background: rgba(76, 175, 80, 0.12);
          border-color: rgba(76, 175, 80, 0.4);
        }
        
        .tool-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }
        
        .tool-name {
          font-weight: 500;
          font-size: 13px;
          color: white;
        }
        
        .tool-description {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          line-height: 1.3;
        }
        
        .tool-config {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 8px;
        }
      `}</style>
    </BaseWidget>
  );
};

export default SpatialAnalysisWidget;