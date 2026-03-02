import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logoImage from '../../assets/logo/logoD.png'; // Logo superior izquierda
import logoImage2 from '../../assets/logo/iconoL.svg';
import servi from '../../assets/logo/servi.png';


// Componentes de contenido para cada cara
const HomeContent = () => (
  <div className="content-section">
    <div className="hero-section">
      <div className="brand-logo">
        <img src={logoImage2} alt="Logo" className="logo-image-center" />
      </div>
      
      <div className="brand-subtitle">ARQUITECTOS DE SOLUCIONES</div>
      
      <h1 className="main-title">
        Desarrollo 
        <br />
        <span className='other-font-weight'>de Software</span>
        <br />
        <em> <span className="title-year">Personalizado</span></em>
      </h1>
    </div>

    <div className="info-sections">
      <div className="info-card">
        <h3 className="info-title">OBJETIVO</h3>
        <p className="info-description">
          Nuestro objetivo es transformar ideas 
          en software potenciado con Inteligencia Artificial, 
          creando soluciones inteligentes, adaptativas y capaces 
          de evolucionar junto a tu negocio.
        </p>
      </div>
      
      <div className="info-card">
        <h3 className="info-title">INTEGRACIÓN</h3>
        <p className="info-description">
          Integramos cada desarrollo como un traje a 
          medida, asegurando que la tecnología refleje 
          la identidad de tu empresa y se ajuste de 
          forma natural a tus procesos.
        </p>
      </div>
    </div>
  </div>
);

const ServiciosContent = () => (
  <div className="content-section">
    <div className="servicios-container">
      <div className="servicios-hero">
        <div className="servicios-hero-content">
          <div className="servicios-hero-text">
            <h1 className="servicios-main-title">
              <div className="servicio-tech-label">ARQUITECTURA EDITORIAL DE SOFTWARE</div>
              Nuestros <br/> <span>Servicios</span>
            </h1>
            <p className="servicios-subtitle">
              Dividimos nuestra maestría en dos pilares fundamentales que definen el ecosistema APOFIS.
            </p>
          </div>
          <div className="servicios-hero-image">
            <img src={servi} alt="APOFIS Services" className="servicios-hero-img" />
          </div>
        </div>
      </div>
      
      <div className="servicios-grid">
        <div className="servicio-card">
          <div className="servicio-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="servicio-tech-label">PYTHON & REACT ENGINEER</div>
          <h2 className="servicio-title">Geoprocesos en Línea</h2>
          <p className="servicio-desc">
            Implementamos algoritmos de precisión espacial integrando motores Python avanzados. 
            Transformamos datos geográficos masivos en decisiones estratégicas visualizadas en tiempo real.
          </p>
          <ul className="servicio-features">
            <li>• ANÁLISIS ESPACIAL VECTORIAL</li>
            <li>• INTEGRACIÓN GIS EN LA NUBE</li>
          </ul>
          <button className="servicio-btn">
            Ver Especificaciones →
          </button>
        </div>

        <div className="servicio-card">
          <div className="servicio-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61A5.5 5.5 0 0 0 16.5 2.03A5.5 5.5 0 0 0 12 5.96A5.5 5.5 0 0 0 7.5 2.03A5.5 5.5 0 0 0 3.16 4.61C1.9 6.64 1.9 9.56 3.16 11.59L12 21L20.84 11.59C22.1 9.56 22.1 6.64 20.84 4.61Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="servicio-tech-label">PYTHON & REACT ENGINEER</div>
          <h2 className="servicio-title">ConviveEdu</h2>
          <p className="servicio-desc">
            Una interfaz humana y fluida diseñada para priorizar el bienestar. 
            Utilizamos React para crear experiencias reactivas que acompañan al estudiante en cada etapa de su desarrollo.
          </p>
          <ul className="servicio-features">
            <li>• INTERFACES HUMAN-CENTRIC</li>
            <li>• MÉTRICAS DE BIENESTAR</li>
          </ul>
          <button className="servicio-btn">
            Ver Experiencia →
          </button>
        </div>
      </div>
    </div>
  </div>
);

const IdentidadContent = () => (
  <div className="content-section">
    <div className="simple-content">
      <h1>Hola Mundo - Identidad</h1>
      <p>Contenido de identidad aquí...</p>
    </div>
  </div>
);

const TecnologiasContent = () => (
  <div className="content-section">
    <div className="simple-content">
      <h1>Hola Mundo - Tecnologías</h1>
      <p>Contenido de tecnoloías aquí...</p>
    </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('home');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPanelDuringAnimation, setShowPanelDuringAnimation] = useState(false); // Nuevo estado para controlar superposición
  const [animationData, setAnimationData] = useState({
    outgoingContent: null,
    incomingContent: null
  });

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleNavClick = (section) => {
    if (section !== currentSection && !isAnimating) {
      // Preparar la animación
      setAnimationData({
        outgoingContent: renderContent(currentSection), // Contenido actual va a cara frontal del cubo
        incomingContent: renderContent(section) // Nuevo contenido va a cara derecha del cubo
      });
      
      setIsAnimating(true);
      setShowPanelDuringAnimation(false); // Ocultar panel al inicio
      
      // PRIMERO: Mostrar panel principal DURANTE la animación para crear superposición
      setTimeout(() => {
        setCurrentSection(section); // Actualizar contenido del panel
        setShowPanelDuringAnimation(true); // Mostrar panel para crear superposición
      }, 900); // Panel fijo aparece a los 500ms para superponerse con el cubo
      
      // SEGUNDO: Mantener superposición - el cubo mantiene contenido hasta después de terminar rotación
      setTimeout(() => {
        setAnimationData({ outgoingContent: null, incomingContent: null }); // Quitar contenido del cubo
      }, 1100); // 1000ms (rotación) + 100ms (superposición) = 1100ms
      
      // TERCERO: Finalizar estados después del fade out
      setTimeout(() => {
        setIsAnimating(false); // Cubo vuelve transparente/invisible
        setShowPanelDuringAnimation(false); // Reset estado
      }, 1100); // Después del fade out de las caras (300ms adicionales)
    }
  };

  // Función para renderizar el contenido según la sección
  const renderContent = (section) => {
    switch(section) {
      case 'home': return <HomeContent />;
      case 'servicios': return <ServiciosContent />;
      case 'identidad': return <IdentidadContent />;
      case 'tecnologias': return <TecnologiasContent />;
      default: return <HomeContent />;
    }
  };

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <img src={logoImage} alt="Logo" className="logo-image-dark" />
          </div>
          <div className="nav-links">
            <a href="#" className={`nav-link ${currentSection === 'home' ? 'active' : ''}`} onClick={() => handleNavClick('home')}>HOME</a>
            <a href="#" className={`nav-link ${currentSection === 'servicios' ? 'active' : ''}`} onClick={() => handleNavClick('servicios')}>SERVICIOS</a>
            <a href="#" className={`nav-link ${currentSection === 'identidad' ? 'active' : ''}`} onClick={() => handleNavClick('identidad')}>IDENTIDAD</a>
            <a href="#" className={`nav-link ${currentSection === 'tecnologias' ? 'active' : ''}`} onClick={() => handleNavClick('tecnologias')}>TECNOLOGIAS</a>
            <button 
              className="start-project-btn"
            >
              HABLEMOS
            </button>
          </div>
        </div>
      </nav>

      {/* Panel Frontal Principal - ESTÁTICO, controlado para superposición */}
      <div className={`panel-principal ${isAnimating && !showPanelDuringAnimation ? 'hidden-during-animation' : ''}`}>
        {renderContent(currentSection)}
      </div>

      {/* Cubo 3D - Solo para animaciones, transparente */}
      <div className="espacio3D">
        <div className={`cubo3D ${isAnimating ? 'sliding' : ''}`}>
          <div className="base"></div>
          
          {/* Cara Frontal del cubo - Contenido saliente durante animación */}
          {animationData.outgoingContent && (
            <aside className="cara cara-frontal">
              {animationData.outgoingContent}
            </aside>
          )}
          
          {/* Cara Derecha del cubo - Contenido entrante durante animación */}
          {animationData.incomingContent && (
            <aside className="cara cara-derecha">
              {animationData.incomingContent}
            </aside>
          )}
        </div>
      </div>

      {/* Navegación Inferior para Móviles */}
      <nav className="bottom-nav-mobile">
        <div className="bottom-nav-content">
          <button 
            className={`bottom-nav-btn ${currentSection === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            <span>HOME</span>
          </button>
          <button 
            className={`bottom-nav-btn ${currentSection === 'servicios' ? 'active' : ''}`}
            onClick={() => handleNavClick('servicios')}
          >
            <span>SERVICIOS</span>
          </button>
          <button 
            className={`bottom-nav-btn ${currentSection === 'identidad' ? 'active' : ''}`}
            onClick={() => handleNavClick('identidad')}
          >
            <span>IDENTIDAD</span>
          </button>
          <button 
            className={`bottom-nav-btn ${currentSection === 'tecnologias' ? 'active' : ''}`}
            onClick={() => handleNavClick('tecnologias')}
          >
            <span>TECNOLOGÍAS</span>
          </button>
        </div>
      </nav>
    </div>
  );
};


export default Home;