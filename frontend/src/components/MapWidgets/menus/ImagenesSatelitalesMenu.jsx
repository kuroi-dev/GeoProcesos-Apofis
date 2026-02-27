import React from 'react';

export function ImagenesSatelitalesMenu({ onBack }) {
  return (
    <div className="special-tool-modal">
      <div className="special-tool-modal-header">
        <h2 className="special-tool-modal-title">Imágenes Satelitales</h2>
        <div className="special-tool-modal-header-btns">
          <button className="special-tool-modal-btn" title="Volver al panel" onClick={onBack}>Volver</button>
        </div>
      </div>
      <div className="special-tool-modal-content">
        {/* Inputs y lógica específica para Imágenes Satelitales */}
        <label className="special-tool-modal-label">
          NDVI:
          <input className="special-tool-modal-input" type="checkbox" />
        </label>
        <label className="special-tool-modal-label">
          Clasificación:
          <select className="special-tool-modal-select">
            <option value="">Elige una clasificación</option>
            <option value="supervisada">Supervisada</option>
            <option value="no-supervisada">No supervisada</option>
          </select>
        </label>
        <div className="special-tool-modal-btn-group">
          <button className="special-tool-modal-action-btn ejecutar">Ejecutar</button>
        </div>
      </div>
    </div>
  );
}
