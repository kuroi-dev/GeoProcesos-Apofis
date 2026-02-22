import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import loginImage from '../../assets/logo/logogeo2.svg'; // Imagen del login
import logoImage from '../../assets/logo/logoL.svg'; // Logo superior izquierda
import infoImage from '../../assets/logo/info.svg'; // Icono de información
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const mapDiv = useRef(null);
  const mapView = useRef(null);
  const [showTerms, setShowTerms] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar email
    if (!email.trim()) {
      setEmailError('Por favor, ingresa tu correo electrónico.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    
    // Validar aceptación de términos
    if (!termsAccepted) {
      setEmailError('Debes aceptar los términos y condiciones para continuar.');
      return;
    }
    
    // Enviar email al backend
    setLoading(true);
    setEmailError('');
    
    
    try {
      const response = await fetch('http://127.0.0.1:5000/api/access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail: email }),
      });
      
      const data = await response.json();
      // Imprimir respuesta del backend en consola
      console.log('Respuesta backend:', data);

      if (data.ACCESS) {
        // Si el acceso es exitoso, navegar al dashboard
        navigate('/dashboard', { state: { userEmail: email, token: data.token } });
      } else {
        // Si el acceso es denegado, mostrar error
        setEmailError(data.error || 'Acceso denegado. Verifica tu correo electrónico.');
      }
    } catch (error) {
      console.error('Error conectando con el servidor:', error);
      setEmailError('Error de conexión. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
      

   
  };

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
            }, zoom * 0); // 200ms entre cada nivel de zoom
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


  useEffect(() => {
    console.log("TESTING");
    const mail = searchParams.get("mail");
    if (mail) {
      fetch('http://127.0.0.1:5000/api/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'mail': mail })
      })
      .then(res => res.json())
      .then(async data => {
      // Imprimir respuesta del backend en consola
        console.log('Respuesta backend:', data);

        if (data.ACCESS) {
          // Si el acceso es exitoso, navegar al dashboard
          navigate('/dashboard', { state: { userEmail: email, token: data.token } });
        } else {
          // Si el acceso es denegado, mostrar error
          setEmailError(data.error || 'Acceso denegado. Verifica tu correo electrónico.');
        }
        })
        .catch(err => console.error("Error verificando", err));
      }
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
          <div className="copyright-container">
            <span>© Creado por Apofis SPA</span>
          </div>
          <div 
            className="info-icon-container"
            onClick={() => setShowInfoPopup(!showInfoPopup)}
          >
            <img src={infoImage} alt="Información" className="info-icon" />
          </div>
          {showInfoPopup && (
            <div className="info-popup">
              <div className="info-popup-content">
                <h4>¿Cómo acceder?</h4>
                <p>Ingresa tu correo en la casilla Email y podrás acceder al aplicativo.</p>
                <p><strong>Tendrás un límite de 30 minutos para probar el aplicativo.</strong></p>
                <button onClick={() => navigate('/test-widget-map')}>testWidgets</button>
                <button 
                  className="info-popup-close" 
                  onClick={() => setShowInfoPopup(false)}
                >
                  ✕
                </button>
              </div>
            </div>
          )}
          <div className={`login-box ${showTerms ? 'expanded' : ''}`}>
            <div className="login-content">
              <div className="login-header">
              <div className="login-image-placeholder">
                {/* <div className="image-placeholder">📷</div> */}
                <img src={loginImage} alt="Login" className="login-image" />
              </div>
              <div className="login-text">
                <h1>Geoprocesos en línea</h1>
                <p className="login-description">Plataforma especializada en análisis geoespacial y procesamiento de datos geográficos en tiempo real.</p>
              </div>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-container">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className={`login-input ${emailError ? 'error' : ''}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                />
                {emailError && <span className="error-message">{emailError}</span>}
              </div>
              
              <div className="app-info">
                <p>El uso del aplicativo queda asociado a tu correo electrónico.</p>
                <p>Límite de sesión: 30 minutos. Después de este tiempo, el mismo correo será bloqueado temporalmente.</p>
              </div>
              
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? 'Conectando...' : 'Acceder al Aplicativo'}
              </button>
              
              <button 
                type="button" 
                className="terms-button"
                onClick={() => setShowTerms(!showTerms)}
              >
                📋 Términos y Condiciones
              </button>
              <label className="terms-checkbox-container-inline">
                <input 
                  type="checkbox" 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="terms-checkbox"
                />
                <span className="terms-checkmark"></span>
                <span className="terms-checkbox-text">
                  Acepto los <strong>Términos y Condiciones de Uso</strong>
                </span>
              </label>
            </form>
            </div>
            
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
          </div>
   
        </div>
      </div>
    </div>
  );
};

export default Login;