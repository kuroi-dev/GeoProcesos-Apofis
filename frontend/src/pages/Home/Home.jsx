import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logoImage from '../../assets/logo/logoD.png'; // Logo superior izquierda
import logoImage2 from '../../assets/logo/iconoL.svg';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
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
            <a href="#" className="nav-link">IDENTIDAD</a>
            <a href="#" className="nav-link" onClick={handleLoginClick} >SERVICIOS</a>
            <a href="#" className="nav-link">TECNOLOGIAS</a>
            <a href="#" className="nav-link">INNOVACIÓN</a>
            <button 
              className="start-project-btn"
              onClick={handleLoginClick}
            >
              HABLEMOS
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
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
    </div>
  );
};

export default Home;