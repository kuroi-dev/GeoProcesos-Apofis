import React, { useState, useEffect } from 'react';
import BaseWidget from '../common/BaseWidget.jsx';

/**
 * Widget de Visualización Avanzada
 * Generación de gráficos y visualizaciones de datos
 */
const VisualizationWidget = ({ mapView, onClose }) => {
  const [chartType, setChartType] = useState('bar');
  const [data, setData] = useState([]);
  const [selectedField, setSelectedField] = useState('');

  const chartTypes = [
    { id: 'bar', name: 'Gráfico de Barras', icon: 'graph-bar' },
    { id: 'pie', name: 'Gráfico Circular', icon: 'pie-chart' },
    { id: 'line', name: 'Gráfico de Líneas', icon: 'graph-time-series' },
    { id: 'scatter', name: 'Diagrama de Dispersión', icon: 'scatter-plot' },
    { id: 'histogram', name: 'Histograma', icon: 'histogram' }
  ];

  const generateSampleData = () => {
    const sampleData = [
      { label: 'Zona A', value: 45, color: '#4CAF50' },
      { label: 'Zona B', value: 32, color: '#2196F3' },
      { label: 'Zona C', value: 67, color: '#FF9800' },
      { label: 'Zona D', value: 23, color: '#9C27B0' },
      { label: 'Zona E', value: 56, color: '#F44336' }
    ];
    setData(sampleData);
  };

  useEffect(() => {
    generateSampleData();
  }, []);

  const handleChartTypeChange = (type) => {
    setChartType(type);
    console.log(`📊 Tipo de gráfico cambiado a: ${type}`);
  };

  const exportChart = () => {
    console.log('📄 Exportando gráfico...', { chartType, data });
    alert(`Gráfico ${chartType} exportado`);
  };

  return (
    <BaseWidget
      title="Visualización Avanzada"
      icon="graph-bar"
      width="380px"
      closeable={true}
      onClose={onClose}
      mapView={mapView}
    >
      <div className="widget-section">
        <div className="widget-section-title">Tipo de Gráfico</div>
        <div className="chart-types-grid">
          {chartTypes.map(chart => (
            <div
              key={chart.id}
              className={`chart-type-item ${chartType === chart.id ? 'selected' : ''}`}
              onClick={() => handleChartTypeChange(chart.id)}
            >
              <calcite-icon icon={chart.icon} scale="s"></calcite-icon>
              <span>{chart.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="widget-section">
        <div className="widget-section-title">Vista Previa</div>
        <div className="chart-preview">
          <div className="chart-container">
            {chartType === 'bar' && (
              <div className="bar-chart">
                {data.map((item, index) => (
                  <div key={index} className="bar-item">
                    <div 
                      className="bar" 
                      style={{ 
                        height: `${(item.value / 67) * 100}%`,
                        backgroundColor: item.color 
                      }}
                    ></div>
                    <span className="bar-label">{item.label}</span>
                  </div>
                ))}
              </div>
            )}
            
            {chartType === 'pie' && (
              <div className="pie-chart">
                <div className="pie-legend">
                  {data.map((item, index) => (
                    <div key={index} className="legend-item">
                      <div 
                        className="legend-color" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span>{item.label}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {['line', 'scatter', 'histogram'].includes(chartType) && (
              <div className="chart-placeholder">
                <calcite-icon icon={chartTypes.find(c => c.id === chartType)?.icon} scale="l"></calcite-icon>
                <p>Vista previa del {chartTypes.find(c => c.id === chartType)?.name}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="widget-section">
        <div className="widget-section-title">Configuración</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <select className="widget-input" value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
            <option value="">Seleccionar campo</option>
            <option value="population">Población</option>
            <option value="area">Área</option>
            <option value="density">Densidad</option>
          </select>
          
          <button className="widget-button" onClick={generateSampleData}>
            <calcite-icon icon="refresh" scale="s"></calcite-icon>
            Actualizar Datos
          </button>
          
          <button className="widget-button" onClick={exportChart}>
            <calcite-icon icon="export" scale="s"></calcite-icon>
            Exportar Gráfico
          </button>
        </div>
      </div>

      <style jsx>{`
        .chart-types-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        
        .chart-type-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 12px 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 11px;
          text-align: center;
        }
        
        .chart-type-item:hover {
          background: rgba(255, 255, 255, 0.08);
        }
        
        .chart-type-item.selected {
          background: rgba(76, 175, 80, 0.15);
          border-color: rgba(76, 175, 80, 0.4);
        }
        
        .chart-preview {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          padding: 16px;
          height: 200px;
        }
        
        .chart-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .bar-chart {
          display: flex;
          align-items: end;
          justify-content: space-around;
          width: 100%;
          height: 100%;
          gap: 4px;
        }
        
        .bar-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          height: 100%;
          max-width: 40px;
        }
        
        .bar {
          width: 100%;
          border-radius: 2px 2px 0 0;
          min-height: 10px;
          transition: all 0.3s ease;
        }
        
        .bar-label {
          font-size: 10px;
          margin-top: 4px;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .pie-legend {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
        }
        
        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }
        
        .chart-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.5);
          text-align: center;
        }
        
        .chart-placeholder p {
          margin: 8px 0 0 0;
          font-size: 12px;
        }
      `}</style>
    </BaseWidget>
  );
};

export default VisualizationWidget;