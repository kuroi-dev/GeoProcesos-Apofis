import React from 'react';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";

export function AnalisisEspacialMenu({ onBack }) {
  const [urlLayer, setUrlLayer] = React.useState("");
  const [inputFile, setInputFile] = React.useState(null);
  const [polygonColor, setPolygonColor] = React.useState("#ff0000");
  const [polygonOpacity, setPolygonOpacity] = React.useState(0.5);
  const [openSection, setOpenSection] = React.useState('datos');

  const cargarLayer = () => {
    const arcgisMap = document.querySelector("arcgis-map");
    if (!arcgisMap || !urlLayer) return;
    let observer;
    let featureLayerAdded = false;
    const tryAddFeatureLayer = () => {
      const map = arcgisMap.map;
      if (map && !featureLayerAdded) {
        featureLayerAdded = true;
        const featureLayer = new FeatureLayer({ url: urlLayer });
        map.add(featureLayer);
      }
    };
    tryAddFeatureLayer();
    observer = new MutationObserver(() => { tryAddFeatureLayer(); });
    observer.observe(arcgisMap, { attributes: true, childList: false, subtree: false });
    return () => { if (observer) observer.disconnect(); };
  };

  const handleInputFileChange = (e) => setInputFile(e.target.files[0]);
  const handleColorChange = (e) => setPolygonColor(e.target.value);
  const handleOpacityChange = (e) => setPolygonOpacity(Number(e.target.value));

  return (
    <div className="special-tool-modal">
      <div className="special-tool-modal-header">
        <h2 className="special-tool-modal-title">Análisis Espacial</h2>
        <div className="special-tool-modal-header-btns">
          <button className="special-tool-modal-btn" title="Volver al panel" onClick={onBack}>Volver</button>
        </div>
      </div>
      <div className="special-tool-modal-content">
        {/* Categoría: Cargar Datos */}
        <div className="special-tool-category">
          <button
            className="special-tool-category-toggle"
            onClick={() => setOpenSection(openSection === 'datos' ? null : 'datos')}
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '1.1em',
              fontWeight: 'bold',
              background: openSection === 'datos' ? '#e3e6f7' : '#f7f7f7',
              color: openSection === 'datos' ? '#2a3a6c' : '#444',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 16px',
              marginBottom: '8px',
              boxShadow: openSection === 'datos' ? '0 2px 8px #b3b3b3' : 'none',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
            }}
          >
            {openSection === 'datos' ? '▼' : '►'} <span role="img" aria-label="database" style={{marginRight: 6}}>🗂️</span> Cargar Datos
          </button>
          {openSection === 'datos' && (
            <div>
              <div className='special-layerUp'>
                <label className="special-tool-modal-label">Cargar capa por URL:</label>
                <input
                  type="text"
                  className="special-tool-modal-input"
                  placeholder="Ingrese una URL de una capa"
                  value={urlLayer}
                  onChange={(e) => setUrlLayer(e.target.value)}
                />
                <button className="special-tool-modal-action-btn ejecutar" onClick={cargarLayer}>Cargar</button>
              </div>
              <div className='special-layerUp'>
                <label className="special-tool-modal-label">
                  Cargar archivo geoespacial:
                  <span style={{fontSize: '0.9em', color: '#888', marginLeft: 8}}>
                    (KML, KMZ, GeoJSON, Shapefile, CSV)
                  </span>
                </label>
                <input
                  type="file"
                  accept=".kml,.kmz,.geojson,.json,.shp,.dbf,.prj,.csv,.zip"
                  onChange={handleInputFileChange}
                />
                <button className="special-tool-modal-action-btn ejecutar" disabled={!inputFile}>Cargar</button>
              </div>
            </div>
          )}
        </div>

        {/* Categoría: Herramientas */}
        <div className="special-tool-category">
          <button
            className="special-tool-category-toggle"
            onClick={() => setOpenSection(openSection === 'herramientas' ? null : 'herramientas')}
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '1.1em',
              fontWeight: 'bold',
              background: openSection === 'herramientas' ? '#e3e6f7' : '#f7f7f7',
              color: openSection === 'herramientas' ? '#2a3a6c' : '#444',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 16px',
              marginBottom: '8px',
              boxShadow: openSection === 'herramientas' ? '0 2px 8px #b3b3b3' : 'none',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
            }}
          >
            {openSection === 'herramientas' ? '▼' : '►'} <span role="img" aria-label="tools" style={{marginRight: 6}}>🛠️</span> Herramientas
          </button>
          {openSection === 'herramientas' && (
            <div>
              <div className='special-layerUp'>
                <label className="special-tool-modal-label">Buffer:</label>
                <button>Capturar Geometría</button>
                <input className="special-tool-modal-input" type="number" placeholder="Distancia en metros" />
                <button className="special-tool-modal-action-btn ejecutar">Ejecutar</button>
              </div>
              <div className='special-layerUp'>
                <label className="special-tool-modal-label">Cut:</label>
                <button>Capturar Geometría</button>
                <input className="special-tool-modal-input" type="number" placeholder="Distancia en metros" />
                <button className="special-tool-modal-action-btn ejecutar">Ejecutar</button>
              </div>
              <div className='special-layerUp'>
                <label className="special-tool-modal-label">Intersection:</label>
                <button>Capturar Geometría</button>
                <button className="special-tool-modal-action-btn ejecutar">Ejecutar</button>
              </div>
              <div className='special-layerUp'>
                <label className="special-tool-modal-label">Distance:</label>
                <button>Capturar Geometría</button>
                <button className="special-tool-modal-action-btn ejecutar">Ejecutar</button>
              </div>
            </div>
          )}
        </div>

        {/* Categoría: Colores */}
        <div className="special-tool-category">
          <button
            className="special-tool-category-toggle"
            onClick={() => setOpenSection(openSection === 'colores' ? null : 'colores')}
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '1.1em',
              fontWeight: 'bold',
              background: openSection === 'colores' ? '#e3e6f7' : '#f7f7f7',
              color: openSection === 'colores' ? '#2a3a6c' : '#444',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 16px',
              marginBottom: '8px',
              boxShadow: openSection === 'colores' ? '0 2px 8px #b3b3b3' : 'none',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
            }}
          >
            {openSection === 'colores' ? '▼' : '►'} <span role="img" aria-label="palette" style={{marginRight: 6}}>🎨</span> Estilo de Polígonos
          </button>
          {openSection === 'colores' && (
            <div>
              <div className='special-layerUp'>
                <label className="special-tool-modal-label">Color del polígono:</label>
                <input type="color" value={polygonColor} onChange={handleColorChange} />
              </div>
              <div className='special-layerUp'>
                <label className="special-tool-modal-label">Transparencia:</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={polygonOpacity}
                  onChange={handleOpacityChange}
                />
                <span>{Math.round(polygonOpacity * 100)}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
