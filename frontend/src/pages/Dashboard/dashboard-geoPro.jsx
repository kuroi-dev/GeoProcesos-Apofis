import React, { useState, useEffect } from 'react';
import EsriWidgetManager from '../../components/MapWidgets/EsriWidgetManager';
import logoApofis from '../../assets/logo/logoL.svg';
import logoApofisMobile from '../../assets/logo/iconoL.svg';
import logoGeo from '../../assets/logo/logogeo.svg';
import './dashboard-geoPro.css';

// Importar iconos de Calcite para consistencia


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
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
                    </svg>
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
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM1.173 8a6.829 6.829 0 0 0 6.827 6.827v-1.172A5.657 5.657 0 0 1 2.345 8H1.173z"/>
                      <path d="M9.5 3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-3 8.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>
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
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm7 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM8 14a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 14zM1.5 8a.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2zm9.743-4.036a.5.5 0 0 1-.707.707l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414zm-8.486 8.486a.5.5 0 0 1-.707.707l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414zm8.486 0a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707.707l-1.414 1.414zM4.464 4.464a.5.5 0 0 1-.707-.707L2.343 2.343a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z"/>
                    </svg>
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
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                    </svg>
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