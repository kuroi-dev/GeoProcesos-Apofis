import React from 'react';
import {
  AnalisisEspacialMenu,
  VisualizacionAvanzadaMenu,
  ImagenesSatelitalesMenu,
  AutomatizacionMenu
} from './SpecialToolMenus';
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
  const [secondsLeft, setSecondsLeft] = React.useState(30 * 60); // 30 minutos

  React.useEffect(() => {
    if (secondsLeft <= 0) {
      // Redirigir al login
      window.location.href = '/';
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft(s => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Formatear mm:ss
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Cambia el borde a rojo si quedan 5 minutos o menos
  const danger = secondsLeft <= 5 * 60;
  return (
    <div className={`title-windows${danger ? ' danger-border' : ''}`}>
      <div className="title-header">
          <p>{formatted}</p>
      </div>
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
      
      
    </div>
  );
}

export function NuevoPanelWindow({ agregarFeatureLayer }) {
  const [visible, setVisible] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  // Estado para parámetros por herramienta
  const [toolParams, setToolParams] = React.useState({});
  // Solo ocultar una vez al inicio
  React.useEffect(() => {
    let timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  const tools = [
    {
      imgSrc: logoGeo1,
      title: <span> Análisis Espacial <span style={{color:'#1ec31e', fontWeight:'bold', marginLeft:6}}>PROXIMAMENTE</span></span>,
      summary: "Trabaja con archivos en distintos formatos (SHP, GeoJSON, KML, CSV, etc). Realiza operaciones de clip y buffer sobre capas vectoriales. Modifica colores y estilos de capas fácilmente. Agrega y gestiona múltiples capas en el mapa."
    },
    {
      imgSrc: logoGeo2,
      title: <span> Visualización Avanzada <span style={{color:'#1ec31e', fontWeight:'bold', marginLeft:6}}>PROXIMAMENTE</span></span>,
      summary: "Genera reportes y crea mapas temáticos de manera intuitiva. Realiza análisis de superposición para explorar relaciones espaciales complejas."
    },
    {
      imgSrc: logoGeo3,
      title: <span> Imágenes Satelitales <span style={{color:'#1ec31e', fontWeight:'bold', marginLeft:6}}>PROXIMAMENTE</span></span>,
      summary: "Descarga imágenes desde Sentinel o Landsat, carga tus propias imágenes y edítalas. Genera polígonos en base a índices espectrales, configura bandas para cálculos, obtén percentiles máximos/mínimos de índices, y calcula hotspots mediante densidad de color."
    },
    {
      imgSrc: logoGeo4,
      title: <span> Automatización (Solo empresas) <span style={{color:'#1ec31e', fontWeight:'bold', marginLeft:6}}>PROXIMAMENTE</span></span>,
      summary: "Carga tus propios scripts de Python para realizar cálculos avanzados (soporte para numpy, math, etc). Automatiza el ingreso de datos a distintas entidades. (Funcionalidad solo para empresas: requiere conexión directa a SharePoint, bases de datos o directorios específicos)."
    }
  ];
  return (
    <>
      <div
        className={`tools-windows${visible ? '' : ' hidden'}`}
        style={{ transition: 'right 0.4s',
          right: visible ? 10 : '-380px',
          top: 10,
          position: 'fixed',
          width: 345, }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0, width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', gap: 12 }}>
            <img src={logoPro} alt="GeoProcesos Logo" className="title-logo-img" />
            <h2 className="tools-panel-title" style={{ marginBottom: 0 }}>Geoprocesos<br />en línea</h2>
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
              →
            </button>
          </div>
          {/* Módulo de usuario debajo del título y logo */}
          <div style={{ background: '#222', color: '#b6ffb6', borderRadius: 8, padding: '8px 14px', minWidth: 180, fontSize: 13, marginTop: 8, marginBottom: 0, alignSelf: 'stretch', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
            <div style={{ fontWeight: 'bold', color: '#fff', fontSize: 14, marginBottom: 2 }}>Usuario</div>
            <div style={{ wordBreak: 'break-all', marginBottom: 2 }}>
              <span style={{ color: '#b6ffb6' }}>{sessionStorage.getItem('userEmail') || 'Sin email'}</span>
            </div>
            <div style={{ fontSize: 12, marginBottom: 2 }}>
              IP: <span style={{ color: '#b6ffb6' }}>{sessionStorage.getItem('ip_user') || 'Sin IP'}</span>
            </div>
            <div style={{ fontSize: 12 }}>
              Nivel de privilegios: <span style={{ color: '#b6ffb6', fontWeight: 'bold' }}>{sessionStorage.getItem('privilegio') || '0'}</span>
            </div>  
          </div>
        </div>


        <div style={{ height: 18 }} />
        {/* Ocultar el contenido del panel principal cuando la ventana está activa */}
        <div style={{ display: selectedIndex === -1 ? 'block' : 'none' }}>
          {tools.map((tool, idx) => (
            idx === 7? (
              <SpecialToolCard
                key={tool.title}
                imgSrc={tool.imgSrc}
                title={tool.title}
                summary={tool.summary}
                selected={false}
                onSelect={() => setSelectedIndex(idx)}
              />
            ) : (
              <div className="disabled-tool-menu" key={tool.title}>
                <SpecialToolCard
                  imgSrc={tool.imgSrc}
                  title={tool.title}
                  summary={tool.summary}
                  selected={false}
                  onSelect={() => {}}
                />
              </div>
            )
          ))}
        </div>
        {selectedIndex === 0 && (
          <div className="">
            <AnalisisEspacialMenu onBack={() => setSelectedIndex(-1)} />
          </div>
        )}
        {selectedIndex === 1 && (
          <div className="disabled-tool-menu">
            <VisualizacionAvanzadaMenu onBack={() => setSelectedIndex(-1)} />
          </div>
        )}
        {selectedIndex === 2 && (
          <div className="disabled-tool-menu">
            <ImagenesSatelitalesMenu onBack={() => setSelectedIndex(-1)} />
          </div>
        )}
        {selectedIndex === 3 && (
          <div className="disabled-tool-menu">
            <AutomatizacionMenu onBack={() => setSelectedIndex(-1)} />
          </div>
        )}
      </div>
      {!visible && (
        <button
          className="show-tools-panel-btn"
          title="Mostrar herramientas"
          onClick={() => setVisible(true)}
        >
          <img src={logoPro} alt="GeoProcesos Logo" className="title-logo-img2" />
         
        </button>
      )}
    </>
  );
}
