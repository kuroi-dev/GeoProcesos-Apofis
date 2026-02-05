import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import logoImage from '../assets/logo/logoD.png'; // Logo superior izquierda
import './EnConstruccion.css';

const EnConstruccion = () => {
  const location = useLocation();
  const userEmail = location.state?.userEmail || '';
  const [wantsNotification, setWantsNotification] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (wantsNotification && userEmail) {
      // Aquí iría la lógica para guardar la suscripción con el email del usuario
      console.log(`Suscribiendo notificaciones para: ${userEmail}`);
      setIsSubscribed(true);
      setWantsNotification(false);
    }
  };

  return (
    <div className="construccion-container">
      <div className="construccion-content">
        <div className="logo-section">
          <img src={logoImage} alt="Logo Apofis" className="construccion-logo" />
        </div>
        
        <div className="status-section">
          <h2>EN CONSTRUCCIÓN</h2>
          <p className="construction-message">
            Estamos trabajando arduamente para traerte la mejor experiencia en geoprocesos.
            Nuestro aplicativo estará disponible muy pronto.
          </p>
        </div>

        <div className="notification-section">
          <h3>¿Quieres ser notificado cuando esté listo?</h3>
          {userEmail ? (
            <>
              <p>Te enviaremos un correo a <strong>{userEmail}</strong> cuando el aplicativo esté disponible.</p>
              
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="subscription-form">
                  <label className="checkbox-container">
                    <input 
                      type="checkbox" 
                      checked={wantsNotification}
                      onChange={(e) => setWantsNotification(e.target.checked)}
                      required
                    />
                    <span className="checkmark"></span>
                    Sí, quiero recibir notificaciones en {userEmail}
                  </label>
                  
                  <button type="submit" className="subscribe-button">
                    📧 Notificarme cuando esté listo
                  </button>
                </form>
              ) : (
                <div className="success-message">
                  <div className="success-icon">✅</div>
                  <h4>¡Gracias por tu interés!</h4>
                  <p>Te notificaremos a <strong>{userEmail}</strong> tan pronto como el aplicativo esté disponible.</p>
                </div>
              )}
            </>
          ) : (
            <>
              <p>Te enviaremos un correo cuando el aplicativo esté disponible para su uso.</p>
              <div className="no-email-message">
                <p style={{color: '#e60023', fontWeight: 'bold'}}>No se encontró el email del login.</p>
                <button 
                  onClick={() => window.history.back()} 
                  className="back-to-login-button"
                >
                  ← Volver al login
                </button>
              </div>
            </>
          )}
        </div>

        <div className="back-section">
          <button 
            onClick={() => window.history.back()} 
            className="back-button"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>

      <div className="footer-credits">
        <span>© 2026 Apofis SPA - Todos los derechos reservados</span>
      </div>
    </div>
  );
};

export default EnConstruccion;