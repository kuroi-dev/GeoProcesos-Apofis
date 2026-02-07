import React, { useState, useEffect } from 'react';
import EsriWidgetManager from '../../components/MapWidgets/EsriWidgetManager';
import logoApofis from '../../assets/logo/logoL.svg';
import logoApofisMobile from '../../assets/logo/iconoL.svg';
import logoGeo from '../../assets/logo/logogeo.svg';
import './dashboard-geoPro.css';


const DashboardGeoPro = () => {
  const [userEmail, setUserEmail] = useState('');
  const [selectedTool, setSelectedTool] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [mapInstance, setMapInstance] = useState(null);
  const [mapView, setMapView] = useState(null);

  useEffect(() => {
    // Detectar cambios de tamaño de ventana para responsividad del logo
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Aquí podrías obtener el email del usuario desde el contexto, localStorage, etc.
    const storedEmail = localStorage.getItem('userEmail') || '';
    setUserEmail(storedEmail);
  }, []);

  // Callback cuando el mapa está listo desde EsriWidgetManager
  const handleMapReady = (view, map) => {
    setMapView(view);
    setMapInstance(map);
    console.log('Mapa listo:', { view, map });
  };

  return (
    <div className="dashboard-container">
      {/* Mapa con Widget Manager integrado */}
      <EsriWidgetManager onMapReady={handleMapReady} />
      
      {/* Paneles flotantes sobre el mapa */}
      <div className="floating-panels">
        {/* Título principal */}
        <div className="main-title-panel">
          <div className="title-container">
            <img src={logoGeo} alt="Geo" className="title-logo" />
            <h1 className="main-title">Geoprocesos<br/>en Línea</h1>
          </div>
        </div>
        
        {/* Logo Apofis - inferior izquierda */}
        <div className="company-credit-panel">
          <img 
            src={isMobile ? logoApofisMobile : logoApofis} 
            alt="Apofis SPA" 
            className={`company-logo ${isMobile ? 'mobile-logo' : ''}`} 
          />
        </div>
        
        {/* Panel de herramientas superior izquierda */}
        <div className="tools-floating-panel">
          <div className="panel-header">
            <h3>Herramientas Especializadas</h3>
            <p className="panel-description">Selecciona la herramienta que mejor se adapte a tus necesidades de análisis</p>
          </div>
          
          <div className="tools-grid-floating">
            <div 
              className={`tool-floating-card ${selectedTool === 'analysis' ? 'selected' : ''}`}
              onClick={() => setSelectedTool(selectedTool === 'analysis' ? null : 'analysis')}
            >
              <div className="tool-content">
                <div className="tool-header">
                  <span className="tool-icon">
                    📊
                  </span>
                  <h4>Análisis Espacial</h4>
                </div>
                <p>Operaciones geométricas, buffers, intersección, unión y análisis de proximidad entre capas vectoriales</p>
              </div>
            </div>
            
            <div 
              className={`tool-floating-card ${selectedTool === 'visualization' ? 'selected' : ''}`}
              onClick={() => setSelectedTool(selectedTool === 'visualization' ? null : 'visualization')}
            >
              <div className="tool-content">
                <div className="tool-header">
                  <span className="tool-icon">
                    📈
                  </span>
                  <h4>Visualización Avanzada</h4>
                </div>
                <p>Generación de mapas temáticos, gráficos estadísticos y reportes automáticos con datos georreferenciados</p>
              </div>
            </div>
            
            <div 
              className={`tool-floating-card ${selectedTool === 'satellite' ? 'selected' : ''}`}
              onClick={() => setSelectedTool(selectedTool === 'satellite' ? null : 'satellite')}
            >
              <div className="tool-content">
                <div className="tool-header">
                  <span className="tool-icon">
                    🛰️
                  </span>
                  <h4>Imágenes Satelitales</h4>
                </div>
                <p>Procesamiento de imágenes multiespectrales, cálculo de índices de vegetación (NDVI, EVI) y clasificación supervisada</p>
              </div>
            </div>
            
            <div 
              className={`tool-floating-card ${selectedTool === 'automation' ? 'selected' : ''}`}
              onClick={() => setSelectedTool(selectedTool === 'automation' ? null : 'automation')}
            >
              <div className="tool-content">
                <div className="tool-header">
                  <span className="tool-icon">
                    ⚙️
                  </span>
                  <h4>Automatización</h4>
                </div>
                <p>Ejecución de flujos de trabajo programados, geoprocesamiento batch y integración con servicios externos</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Panel de estado inferior derecha */}
        <div className="status-floating-panel">
          <div className="panel-header">
            <h4>Estado</h4>
          </div>
          
          <div className="status-items-floating">
            <div className="status-item-floating">
              <span className="status-dot active"></span>
              <span>Mapas OK</span>
            </div>
            <div className="status-item-floating">
              <span className="status-dot active"></span>
              <span>BD Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGeoPro;