import React, { useEffect, useRef, useState } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import loginImage from '../assets/logo/icono.svg'; // Imagen del login comentada
import logoImage from '../assets/logo/logoL.svg'; // Logo superior izquierda
import './Login.css';

const Login = () => {
  const mapDiv = useRef(null);
  const mapView = useRef(null);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    if (mapDiv.current && !mapView.current) {
      // Crear el mapa de Esri
      const map = new Map({
        basemap: 'streets-night-vector'
      });

      // Crear la vista del mapa
      mapView.current = new MapView({
        container: mapDiv.current,
        map: map,
        center: [-72.190533, -39.270163], // Entre Licán Ray y Villarrica -39.270163, -72.190533
        zoom: 4
      });

      // Efecto de zoom animado directo después de cargar el mapa
      mapView.current.when(() => {
        setTimeout(() => {
          // Zoom gradual de 4 a 12 con pasos de 200ms
          for (let zoom = 5; zoom <= 12; zoom++) {
            setTimeout(() => {
              if (mapView.current) {
                mapView.current.goTo({
                  zoom: zoom,
                  animate: true
                });
              }
            }, zoom); // 200ms entre cada nivel de zoom
          }
        }, 1000); // Esperar 1 segundo después de cargar
      });
    }

    // Cleanup cuando el componente se desmonta
    return () => {
      if (mapView.current) {
        mapView.current.destroy();
        mapView.current = null;
      }
    };
  }, []);

  return (
    <div className="container-outer">
      <div className="container-inner">
        <div ref={mapDiv} className="esri-map"></div>
        <div className="estela-negra">
          <div className="logo-container">
            <img src={logoImage} alt="Logo" className="logo-image" />
            {/* <div className="logo-placeholder">🏔️ LOGO</div> */}
          </div>
          <div className="info-icon-container">
            ℹ️
          </div>
          <div className="login-box">
            <div className="login-header">
              <div className="login-image-placeholder">
                {/* <div className="image-placeholder">📷</div> */}
                <img src={loginImage} alt="Login" className="login-image" />
              </div>
              <div className="login-text">
                <h1>Geoprocesos en Linea</h1>
                <p className="login-description">Plataforma especializada en análisis geoespacial y procesamiento de datos geográficos en tiempo real.</p>
              </div>
            </div>
            <form className="login-form">
              <input 
                type="email" 
                placeholder="Email" 
                className="login-input"
              />
              
              <div className="app-info">
                <p>El uso del aplicativo queda asociado a tu correo electrónico.</p>
                <p>Límite de sesión: 30 minutos. Después de este tiempo, el mismo correo será bloqueado temporalmente.</p>
              </div>
              
              <button type="submit" className="login-button">
                Acceder al Aplicativo
              </button>
              
              <button 
                type="button" 
                className="terms-button"
                onClick={() => setShowTerms(!showTerms)}
              >
                📋 Términos y Condiciones
              </button>
              
              {showTerms && (
                <div className="terms-content">
                  <h3>Términos y Condiciones de Uso</h3>
                  
                  <div className="terms-section">
                    <h4>1. Aceptación de Términos</h4>
                    <p>Al utilizar este aplicativo, usted acepta estar sujeto a estos términos y condiciones de uso completos.</p>
                    <p>El uso del servicio constituye la aceptación automática de todas las políticas aquí establecidas.</p>
                  </div>
                  
                  <div className="terms-section">
                    <h4>2. Uso del Servicio</h4>
                    <p>• El acceso está limitado a 30 minutos por sesión por correo electrónico.</p>
                    <p>• Prohibido el uso comercial no autorizado o redistribución de datos.</p>
                    <p>• El usuario es responsable de mantener la confidencialidad de su cuenta.</p>
                    <p>• No se permite el uso automatizado o mediante bots del servicio.</p>
                  </div>
                  
                  <div className="terms-section">
                    <h4>3. Registro y Almacenamiento de Datos</h4>
                    <p><strong>Su dirección de correo electrónico será registrada y almacenada</strong> en nuestra base de datos del backend con los siguientes propósitos:</p>
                    <p>• Controlar el tiempo de acceso y uso del aplicativo.</p>
                    <p>• Implementar el sistema de bloqueo temporal después de 30 minutos de uso.</p>
                    <p>• Prevenir el uso abusivo mediante intentos repetidos de acceso con el mismo correo.</p>
                    <p>• Generar logs de auditoría y estadísticas de uso del sistema.</p>
                  </div>
                  
                  <div className="terms-section">
                    <h4>4. Sistema de Bloqueos y Restricciones</h4>
                    <p>Al superar el límite de 30 minutos de uso, su correo electrónico será marcado como <strong>"bloqueado temporalmente"</strong> en nuestro sistema backend.</p>
                    <p>Los intentos posteriores de acceso con el mismo correo resultarán en denegación automática de acceso.</p>
                    <p>El tiempo de bloqueo y las condiciones de reactivación están sujetos a políticas internas del sistema.</p>
                  </div>
                  
                  <div className="terms-section">
                    <h4>5. Tecnología de Mapas</h4>
                    <p>Este aplicativo utiliza tecnología de mapas proporcionada por <strong>Esri</strong> para la generación y visualización cartográfica. Los datos geoespaciales y servicios de mapas están sujetos a las condiciones de licencia de Esri.</p>
                    <p>El usuario acepta cumplir con los términos de uso de servicios de terceros integrados en la plataforma.</p>
                  </div>
                  
                  <div className="terms-section">
                    <h4>6. Protección de Datos Personales</h4>
                    <p>Sus datos son procesados conforme a las normativas de protección de datos aplicables.</p>
                    <p>No compartimos su información con terceros salvo lo requerido por las tecnologías integradas (Esri).</p>
                    <p>Los datos se mantienen el tiempo necesario para cumplir con el propósito del control de acceso.</p>
                  </div>
                  
                  <div className="terms-section">
                    <h4>7. Limitación de Responsabilidad</h4>
                    <p>El servicio se proporciona "tal como está" sin garantías de ningún tipo.</p>
                    <p>No nos responsabilizamos por interrupciones del servicio, pérdida de datos o problemas técnicos.</p>
                  </div>
                  
                  <div className="terms-section">
                    <h4>8. Modificaciones</h4>
                    <p>Nos reservamos el derecho de modificar estos términos en cualquier momento.</p>
                    <p>El uso continuado del servicio constituye aceptación de las modificaciones.</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;