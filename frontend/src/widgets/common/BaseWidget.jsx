import React, { useState, useEffect } from 'react';
import './BaseWidget.css';

/**
 * Componente Base para todos los widgets personalizados
 * Proporciona estructura común y funcionalidades base
 */
const BaseWidget = ({ 
  title, 
  icon, 
  children, 
  width = '320px',
  height = 'auto',
  collapsible = true,
  closeable = false,
  onClose,
  className = '',
  mapView = null,
  ...props 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleToggleCollapse = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleClose = () => {
    if (closeable && onClose) {
      setIsVisible(false);
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`base-widget ${className}`}
      style={{ width, height: isCollapsed ? 'auto' : height }}
    >
      {/* Header del widget */}
      <div className="widget-header">
        <div className="widget-header-left">
          {icon && (
            <span className="widget-icon">
              {typeof icon === 'string' ? (
                <calcite-icon icon={icon} scale="s"></calcite-icon>
              ) : (
                icon
              )}
            </span>
          )}
          <h3 className="widget-title">{title}</h3>
        </div>
        
        <div className="widget-header-controls">
          {collapsible && (
            <button 
              className="widget-control-btn"
              onClick={handleToggleCollapse}
              title={isCollapsed ? 'Expandir' : 'Contraer'}
            >
              <calcite-icon 
                icon={isCollapsed ? 'chevron-down' : 'chevron-up'} 
                scale="s"
              ></calcite-icon>
            </button>
          )}
          
          {closeable && (
            <button 
              className="widget-control-btn widget-close-btn"
              onClick={handleClose}
              title="Cerrar"
            >
              <calcite-icon icon="x" scale="s"></calcite-icon>
            </button>
          )}
        </div>
      </div>

      {/* Contenido del widget */}
      {!isCollapsed && (
        <div className="widget-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default BaseWidget;