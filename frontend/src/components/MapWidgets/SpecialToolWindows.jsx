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


function UserMenu() {
  const [open, setOpen] = React.useState(false);
  const userEmail = sessionStorage.getItem('userEmail') || 'Sin email';
  const ipUser = sessionStorage.getItem('ip_user') || 'Sin IP';
  const privilegio = sessionStorage.getItem('privilegio') || '0';

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="user-menu-root">
      <button
        className="user-menu-btn"
        onClick={() => setOpen(o => !o)}
      >
        <span className="user-menu-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="6.5" r="3.5" fill="#bbb" />
            <ellipse cx="10" cy="15.5" rx="6.5" ry="3.5" fill="#bbb" />
          </svg>
        </span>
        <span className="user-menu-label">Usuario</span>
        <span className="user-menu-arrow">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="user-menu-dropdown">
          <div className="user-menu-info">User: <span className="user-menu-priv">{userEmail}</span></div>
          <div className="user-menu-info">Tu IP Publica: <span className="user-menu-priv">{ipUser}</span></div>
          <div className="user-menu-info">Ubicación: <span className="user-menu-priv">{`${sessionStorage.getItem('city') || 'Desconocida'}, ${sessionStorage.getItem('region') || 'Desconocida'}, ${sessionStorage.getItem('country') || 'Desconocido'}`}</span></div>
          <div className="user-menu-info">Nivel de privilegios: <span className="user-menu-priv">{privilegio === '1' ? 'Básico' : privilegio}</span></div>
          <button className="user-menu-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

export function GeoProcesosWindow() {
  const [open, setOpen] = React.useState(false);
  // Obtener el tiempo restante desde sessionStorage (en segundos)
  const getInitialSeconds = () => {
    const remaining = sessionStorage.getItem('session_remaining');
    const parsed = parseInt(remaining, 10);
    return (!isNaN(parsed) && parsed > 0) ? parsed : 30 * 60;
  };
  const [secondsLeft, setSecondsLeft] = React.useState(getInitialSeconds);

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

  // Formatear mm:ss o infinito
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  let formatted;
  if (minutes > 1000) {
    formatted = <span title="Sesión ilimitada" style={{fontSize:'1.3em'}}>&#8734;</span>; // símbolo infinito
  } else {
    formatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

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
      title: <span> Análisis Espacial <br /><span style={{color:'#1ec31e', fontWeight:'bold', marginLeft:6}}>PROXIMAMENTE</span></span>,
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
          <UserMenu />
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
