import React from 'react';
import './SpecialToolWindows.css';

export function GeoProcesosWindow() {
  return (
    <div className="special-window geo-procesos-window">
      <img src="/assets/logo-geoprocesos.png" alt="GeoProcesos" className="window-logo" />
      <h3>Herramientas GeoProcesos</h3>
      {/* Aquí puedes agregar botones o controles específicos */}
    </div>
  );
}

export function ApofisWindow() {
  return (
    <div className="special-window apofis-window">
      <img src="/assets/logo-apofis.png" alt="Apofis" className="window-logo" />
      <h3>Herramientas Apofis</h3>
      {/* Aquí puedes agregar botones o controles específicos */}
    </div>
  );
}

export function EstadoWindow({ estado }) {
  return (
    <div className="special-window estado-window">
      <h3>Estado</h3>
      <div className="estado-content">{estado || 'Sin información'}</div>
    </div>
  );
}
