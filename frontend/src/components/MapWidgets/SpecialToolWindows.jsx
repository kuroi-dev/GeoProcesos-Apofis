import React from 'react';
import './SpecialToolWindows.css';
import logoApofis from '../../assets/logo/logoL.svg';
import logoPro from '../../assets/logo/logogeo.svg';
import logoGeo1 from '../../assets/logo/logoTools/logogeo3.png';
import logoGeo2 from '../../assets/logo/logoTools/logogeo1.png';
import logoGeo3 from '../../assets/logo/logoTools/logogeo4.png';
import logoGeo4 from '../../assets/logo/logoTools/logogeo2.png';
import { SpecialToolCard } from './SpecialToolCard';

export function GeoProcesosWindow() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className=" title-windows">
      <div className={`title-header${open ? ' open' : ' closed'}`} onClick={() => setOpen(o => !o)}>
        <div className="title-logo-container">
          <img src={logoPro} alt="GeoProcesos Logo" className="title-logo-img" />
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
    <div className=" marca-windows">
      <div className="apofis-container">
        <img src={logoApofis} className='apofis-logo' />
      </div>
    </div>
  );
}

export function EstadoWindow({ estado }) {
  return (
    <div className=" status-windows">
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

export function NuevoPanelWindow({ agregarFeatureLayer }) {
  const [visible, setVisible] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const tools = [
    {
      imgSrc: logoGeo1,
      title: "Análisis Espacial",
      summary: "Realiza buffers, intersecciones, uniones y recortes sobre capas vectoriales. Analiza relaciones espaciales y áreas de influencia."
    },
    {
      imgSrc: logoGeo2,
      title: "Visualización Avanzada",
      summary: "Crea mapas temáticos y gráficos interactivos para explorar y comunicar datos geoespaciales."
    },
    {
      imgSrc: logoGeo3,
      title: "Imágenes Satelitales",
      summary: "Procesa imágenes multiespectrales, calcula NDVI y realiza clasificaciones para monitoreo ambiental."
    },
    {
      imgSrc: logoGeo4,
      title: "Automatización",
      summary: "Automatiza flujos de trabajo GIS, integra datos y genera reportes de forma eficiente."
    }
  ];
  return (
    <>
      <div
        className={`tools-windows${visible ? '' : ' hidden'}`}
        style={{ transition: 'right 0.4s',
          right: visible ? 10 : '-350px',
          top: 10,
          position: 'fixed',
          width: 270, }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 className="tools-panel-title" style={{ marginBottom: 0 }}>Herramientas Especializadas</h2>
          <button
            className="close-tools-panel-btn"
            title="Cerrar panel"
            onClick={() => {
              setVisible(false);
              setSelectedIndex(-1);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '1.3rem',
              cursor: 'pointer',
              marginLeft: 8,
              padding: 0,
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>
        <div style={{ height: 18 }} />
        {/* Ocultar el contenido del panel principal cuando la ventana está activa */}
        <div style={{ display: selectedIndex === -1 ? 'block' : 'none' }}>
          {tools.map((tool, idx) => (
            <SpecialToolCard
              key={tool.title}
              imgSrc={tool.imgSrc}
              title={tool.title}
              summary={tool.summary}
              selected={false}
              onSelect={() => setSelectedIndex(idx)}
            />
          ))}
        </div>
        {selectedIndex !== -1 && (
          <div className="special-tool-modal">
            <div className="special-tool-modal-header">
              <h2 className="special-tool-modal-title">{tools[selectedIndex].title}</h2>
              <div className="special-tool-modal-header-btns">
                <button className="special-tool-modal-btn" title="Volver al panel" onClick={() => setSelectedIndex(-1)}>Volver</button>
              </div>
            </div>
            <div className="special-tool-modal-content">
              {/* Panel de inputs y botones para herramientas especializadas */}
              <label className="special-tool-modal-label">
                Parámetro 1:
                <input className="special-tool-modal-input" type="text" placeholder="Escribe un valor..." />
              </label>
              <label className="special-tool-modal-label">
                Parámetro 2:
                <input className="special-tool-modal-input" type="number" placeholder="Número" />
              </label>
              <label className="special-tool-modal-label">
                Selección:
                <select className="special-tool-modal-select">
                  <option value="">Elige una opción</option>
                  <option value="opcion1">Opción 1</option>
                  <option value="opcion2">Opción 2</option>
                  <option value="opcion3">Opción 3</option>
                </select>
              </label>
              <div className="special-tool-modal-btn-group">
                <button className="special-tool-modal-action-btn ejecutar">Ejecutar</button>
                {/* Botón para agregar capa Industria Forestal */}
                <button
                  className="special-tool-modal-action-btn"
                  style={{ background: '#00b4ff', color: '#fff', marginTop: 8 }}
                  onClick={() => {
                    if (agregarFeatureLayer) {
                      agregarFeatureLayer({
                        id: 'industria-forestal',
                        url: 'https://esri.ciren.cl/server/rest/services/INDUSTRIA_FORESTAL/FeatureServer/4',
                        popupTemplate: {
                          title: 'Industria Forestal',
                          content: '<b>Nombre:</b> {NOMBRE}<br><b>Tipo:</b> {TIPO}'
                        },
                        visible: true,
                        opacity: 1
                      });
                    }
                  }}
                >
                  Añadir capa Industria Forestal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {!visible && (
        <button
          className="show-tools-panel-btn"
          title="Mostrar herramientas"
          onClick={() => setVisible(true)}
        >
          ◀
        </button>
      )}
    </>
  );
}
