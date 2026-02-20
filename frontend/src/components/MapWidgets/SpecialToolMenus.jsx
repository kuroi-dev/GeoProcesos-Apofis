import React from 'react';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";

export function AnalisisEspacialMenu({ onBack }) {

const [urlLayer, setUrlLayer] = React.useState("");

  const cargarLayer = () => {



    const arcgisMap = document.querySelector("arcgis-map");;
    if (!arcgisMap && !urlLayer) return;

    let observer;
    let featureLayerAdded = false;

    const tryAddFeatureLayer = () => {
      // El objeto map se expone como propiedad del custom element
      const map = arcgisMap.map;
      if (map && !featureLayerAdded) {
        featureLayerAdded = true;
        console.log('Mapa detectado por MutationObserver:', map);
        const featureLayer = new FeatureLayer({
          url: urlLayer
        });
        map.add(featureLayer);
      }
    };

    // Intenta inmediatamente por si ya está listo
    tryAddFeatureLayer();

    observer = new MutationObserver(() => {
      tryAddFeatureLayer();
    });
    observer.observe(arcgisMap, { attributes: true, childList: false, subtree: false });

    return () => {
      if (observer) observer.disconnect();
    };
    
  }

  return (
    <div className="special-tool-modal">
      <div className="special-tool-modal-header">
        <h2 className="special-tool-modal-title">Análisis Espacial</h2>
        <div className="special-tool-modal-header-btns">
          <button className="special-tool-modal-btn" title="Volver al panel" onClick={onBack}>Volver</button>
        </div>
      </div>
      <div className="special-tool-modal-content">

        <div className='special-layerUp' >
            <label className="special-tool-modal-label">Cargar capa:</label>
            <input
                type="text"
                className="special-tool-modal-input"
                placeholder="Ingrese una URL de una capa"
                value={urlLayer}
                onChange={(e) => setUrlLayer(e.target.value)}
            />
            <button
              className="special-tool-modal-action-btn ejecutar"
              onClick={cargarLayer}
            >Cargar</button>
        </div>

        <div className='special-layerUp' >
            <label className="special-tool-modal-label">Buffer:</label>

            <button>Capturar Geometria</button>

            <input className="special-tool-modal-input" type="number" placeholder="Distancia en metros" />
            <button className="special-tool-modal-action-btn ejecutar">Ejecutar</button>
        </div>
        <label className="special-tool-modal-label">
          Buffer:
          <input className="special-tool-modal-input" type="number" placeholder="Distancia en metros" />
        </label>
        <label className="special-tool-modal-label">
          Tipo de operación:
          <select className="special-tool-modal-select">
            <option value="">Elige una operación</option>
            <option value="interseccion">Intersección</option>
            <option value="union">Unión</option>
            <option value="recorte">Recorte</option>
          </select>
        </label>
        <div className="special-tool-modal-btn-group">
          <button className="special-tool-modal-action-btn ejecutar">Ejecutar</button>
        </div>
        
      </div>
    </div>
  );
}

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
