import React from 'react';

export function VisualizacionAvanzadaMenu({ onBack }) {
  return (
    <div className="special-tool-modal">
      <div className="special-tool-modal-header">
        <h2 className="special-tool-modal-title">Visualización Avanzada</h2>
        <div className="special-tool-modal-header-btns">
          <button className="special-tool-modal-btn" title="Volver al panel" onClick={onBack}>Volver</button>
        </div>
      </div>
      <div className="special-tool-modal-content">
        {/* Inputs y lógica específica para Visualización Avanzada */}
        <label className="special-tool-modal-label">
          Tipo de mapa:
          <select className="special-tool-modal-select">
            <option value="">Elige un tipo</option>
            <option value="tematico">Temático</option>
            <option value="grafico">Gráfico</option>
          </select>
        </label>
        <div className="special-tool-modal-btn-group">
          <button className="special-tool-modal-action-btn ejecutar">Ejecutar</button>
        </div>
      </div>
    </div>
  );
}
