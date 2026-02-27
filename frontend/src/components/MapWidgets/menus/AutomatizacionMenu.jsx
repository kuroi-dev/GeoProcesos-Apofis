import React from 'react';

export function AutomatizacionMenu({ onBack }) {
  return (
    <div className="special-tool-modal">
      <div className="special-tool-modal-header">
        <h2 className="special-tool-modal-title">Automatización</h2>
        <div className="special-tool-modal-header-btns">
          <button className="special-tool-modal-btn" title="Volver al panel" onClick={onBack}>Volver</button>
        </div>
      </div>
      <div className="special-tool-modal-content">
        {/* Inputs y lógica específica para Automatización */}
        <label className="special-tool-modal-label">
          Flujo:
          <input className="special-tool-modal-input" type="text" placeholder="Nombre del flujo" />
        </label>
        <div className="special-tool-modal-btn-group">
          <button className="special-tool-modal-action-btn ejecutar">Ejecutar</button>
        </div>
      </div>
    </div>
  );
}
