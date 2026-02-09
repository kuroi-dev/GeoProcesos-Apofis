import React from 'react';
import './SpecialToolWindows.css';
import logoPro from '../../assets/logo/logoL.svg';
import logoGeo from '../../assets/logo/logogeo.svg';
import { SpecialToolCard } from './SpecialToolCard';
export function GeoProcesosWindow() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="special-window title-windows">
      <div className={`title-header${open ? ' open' : ' closed'}`} onClick={() => setOpen(o => !o)}>
        <div className="title-logo-container">
          <img src={logoGeo} alt="GeoProcesos Logo" className="title-logo-img" />
        </div>
        <div className="title-content-container">
          <span className="title-text">Geoprocesos<br />en línea</span>
          <div className="modo-flecha-container">
            <span className="title-label">Modo de uso</span>
            <span className={`title-arrow${open ? ' open' : ''}`}>▼</span>
          </div>
        </div>
      </div>
      {open && (
        <div className="title-info info-bottom-right open">
          <span className="info-label">ℹ️ Información de uso:</span>
          <p className="info-text">Utiliza las herramientas del mapa para explorar, analizar y visualizar datos geoespaciales en tiempo real.</p>
        </div>
      )}
      {!open && (
        <div className="title-info info-bottom-right closed"></div>
      )}
    </div>
  );
}

export function ApofisWindow() {
  return (
    <div className="special-window marca-windows">
      <div className="apofis-container">
        <img src={logoPro} className='apofis-logo' />
      </div>
    </div>
  );
}

export function EstadoWindow({ estado }) {
  return (
    <div className="special-window status-windows">
      <div className="estado-panel">
        <div>
          <h2 className='estadoTitle'>Estado App</h2>
        </div>
        <div className="estado-item">
          <span className="estado-dot estado-ok"></span>
          <span className="estado-label">Mapa</span>
        </div>
        <div className="estado-item">
          <span className="estado-dot estado-ok"></span>
          <span className="estado-label">Base de datos</span>
        </div>
        <div className="estado-item">
          <span className="estado-dot estado-ok"></span>
          <span className="estado-label">Widgets</span>
        </div>
      </div>
    </div>
  );
}

export function NuevoPanelWindow() {
  return (
    <div className="special-window tools-windows">
      <h2 style={{color: '#fff', fontSize: '1.5rem', fontWeight: 700, marginBottom: 24}}>Herramienta Personalizada</h2>
      <SpecialToolCard
        imgSrc={logoGeo}
        title="Satélite NDVI/NWDI"
        summary="Con esta herramienta podrás utilizar imágenes satelitales y agregar NDVI, NWDI u otros índices, y trabajar con capas."
      />
      <SpecialToolCard
        imgSrc={logoGeo}
        title="Geoprocesos Avanzados"
        summary="Realiza análisis espacial, buffers, intersecciones y operaciones complejas sobre capas geográficas."
      />
      <SpecialToolCard
        imgSrc={logoGeo}
        title="Automatización de Descargas"
        summary="Descarga automáticamente datos geoespaciales, imágenes y reportes para tu área de interés."
      />
      <SpecialToolCard
        imgSrc={logoGeo}
        title="IA para Mapas"
        summary="Utiliza inteligencia artificial para clasificar, segmentar y analizar datos geográficos en tiempo real."
      />
    </div>
  );
}
