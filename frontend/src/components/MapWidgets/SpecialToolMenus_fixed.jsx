import React from 'react';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import KMLLayer from "@arcgis/core/layers/KMLLayer.js";   
import CSVLayer from "@arcgis/core/layers/CSVLayer.js";

import Button from '@mui/material/Button';

import './SpecialToolMenus.css';

export function AnalisisEspacialMenu({ onBack }) {
  const [urlLayer, setUrlLayer] = React.useState("");
  const [inputFile, setInputFile] = React.useState(null);
  const [polygonColor, setPolygonColor] = React.useState("#ff0000");
  const [polygonOpacity, setPolygonOpacity] = React.useState(0.5);
  // Estados para colapsar categorías
  const [openSection, setOpenSection] = React.useState('');
  // Estados para drag and drop
  const [isDragOver, setIsDragOver] = React.useState(false);
  // Estados de loading
  const [isLoadingUrl, setIsLoadingUrl] = React.useState(false);
  const [isLoadingFile, setIsLoadingFile] = React.useState(false);

  // Cargar capa por URL
  const cargarLayer = async () => {
    if (!urlLayer.trim()) return;
    
    setIsLoadingUrl(true);
    
    try {
      const arcgisMap = document.querySelector("arcgis-map");
      if (!arcgisMap) {
        throw new Error('Mapa no encontrado');
      }

      let observer;
      let featureLayerAdded = false;
      
      const tryAddFeatureLayer = () => {
        const map = arcgisMap.map;
        if (map && !featureLayerAdded) {
          featureLayerAdded = true;
          const featureLayer = new FeatureLayer({ url: urlLayer });
          map.add(featureLayer);
          
          // Simular tiempo de carga para mostrar el spinner
          setTimeout(() => {
            setIsLoadingUrl(false);
            setUrlLayer(''); // Limpiar el input después de cargar
          }, 1500);
        }
      };
      
      tryAddFeatureLayer();
      observer = new MutationObserver(() => { tryAddFeatureLayer(); });
      observer.observe(arcgisMap, { attributes: true, childList: false, subtree: false });
      
      // Cleanup function
      setTimeout(() => {
        if (observer) observer.disconnect();
      }, 5000);
      
    } catch (error) {
      console.error('Error al cargar la capa:', error);
      setIsLoadingUrl(false);
      alert('Error al cargar la capa. Verifica la URL.');
    }
  };

  // Handlers para drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setInputFile(files[0]);
    }
  };
  
  // Handler para limpiar archivo seleccionado
  const clearSelectedFile = () => {
    setInputFile(null);
    // Limpiar el input también
    const fileInput = document.getElementById('customFileInput');
    if (fileInput) fileInput.value = '';
  };

  // Handler para archivos geoespaciales
  const handleInputFileChange = (e) => setInputFile(e.target.files[0]);

  // Función para parsear KML y convertir a GeoJSON
  const parseKMLToGeoJSON = (kmlText) => {
    const parser = new DOMParser();
    const kmlDoc = parser.parseFromString(kmlText, 'text/xml');
    
    // Verificar si hay errores de parsing
    const parseError = kmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error('Error al parsear el archivo KML');
    }
    
    const features = [];
    
    // Buscar elementos Placemark
    const placemarks = kmlDoc.querySelectorAll('Placemark');
    
    placemarks.forEach(placemark => {
      try {
        // Obtener nombre y descripción
        const name = placemark.querySelector('name')?.textContent || 'Sin nombre';
        const description = placemark.querySelector('description')?.textContent || '';
        
        // Buscar geometría
        const point = placemark.querySelector('Point coordinates');
        const lineString = placemark.querySelector('LineString coordinates');
        const polygon = placemark.querySelector('Polygon outerBoundaryIs LinearRing coordinates');
        
        let geometry = null;
        
        if (point) {
          // Procesar punto: lon,lat,alt
          const coordsText = point.textContent.trim();
          const coords = coordsText.split(',').map(c => parseFloat(c.trim()));
          geometry = {
            type: 'Point',
            coordinates: [coords[0], coords[1]] // [lon, lat]
          };
        } else if (lineString) {
          // Procesar línea
          const coordsText = lineString.textContent.trim();
          const coordinates = coordsText.split(/\s+/).map(coordPair => {
            const parts = coordPair.trim().split(',');
            return [parseFloat(parts[0]), parseFloat(parts[1])]; // [lon, lat]
          }).filter(coord => !isNaN(coord[0]) && !isNaN(coord[1]));
          
          geometry = {
            type: 'LineString', 
            coordinates: coordinates
          };
        } else if (polygon) {
          // Procesar polígono - KML format puede tener espacios o nuevas líneas
          const coordsText = polygon.textContent.trim();
          console.log('Coordenadas raw del polígono:', coordsText);
          
          // Limpiar y dividir coordenadas
          const cleanText = coordsText.replace(/\s+/g, ' ').trim();
          const coordParts = cleanText.split(' ');
          const coordinates = [];
          
          coordParts.forEach(part => {
            if (part.includes(',')) {
              const coords = part.split(',');
              if (coords.length >= 2) {
                const lon = parseFloat(coords[0].trim());
                const lat = parseFloat(coords[1].trim());
                if (!isNaN(lon) && !isNaN(lat)) {
                  coordinates.push([lon, lat]); // [longitud, latitud]
                  console.log(`Coordenada procesada: [${lon}, ${lat}]`);
                }
              }
            }
          });
          
          console.log('Total coordenadas:', coordinates);
          
          // Verificar que tengamos al menos 3 puntos para un polígono válido
          if (coordinates.length >= 3) {
            // Cerrar el polígono si no está cerrado
            const first = coordinates[0];
            const last = coordinates[coordinates.length - 1];
            if (first[0] !== last[0] || first[1] !== last[1]) {
              coordinates.push([first[0], first[1]]);
            }
            
            geometry = {
              type: 'Polygon',
              coordinates: [coordinates]
            };
          }
        }
        
        if (geometry) {
          features.push({
            type: 'Feature',
            geometry: geometry,
            properties: {
              name: name,
              description: description
            }
          });
        }
      } catch (err) {
        console.warn('Error procesando placemark:', err);
      }
    });
    
    return {
      type: 'FeatureCollection',
      features: features
    };
  };
  
  // Función para cargar archivo
  const cargarArchivo = async () => {
    if (!inputFile) return;
    
    setIsLoadingFile(true);
    
    try {
      const arcgisMap = document.querySelector("arcgis-map");
      if (!arcgisMap) {
        throw new Error('Mapa no encontrado');
      }

      // Obtener la extensión del archivo
      const fileExtension = inputFile.name.split('.').pop().toLowerCase();
      const fileName = inputFile.name.split('.')[0];
      
      // Crear URL del archivo para casos que lo necesiten
      const fileUrl = URL.createObjectURL(inputFile);
      
      let layer = null;

      // Procesar según el tipo de archivo
      switch (fileExtension) {
        case 'geojson':
        case 'json':
          // Leer el contenido del archivo GeoJSON directamente
          const geoJsonText = await inputFile.text();
          const geoJsonData = JSON.parse(geoJsonText);
          
          // Crear GraphicsLayer
          layer = new GraphicsLayer({
            title: fileName,
            listMode: "show"
          });
          
          // Convertir features a Graphics
          const features = geoJsonData.features || [geoJsonData];
          const graphics = features.map(feature => {
            // Convertir geometría de GeoJSON a formato ArcGIS
            let geometry = null;
            if (feature.geometry) {
              geometry = { ...feature.geometry };
              
              // Mapear tipos de GeoJSON a ArcGIS
              switch (feature.geometry.type) {
                case 'LineString':
                  geometry.type = 'polyline';
                  geometry.paths = [feature.geometry.coordinates];
                  delete geometry.coordinates;
                  break;
                case 'Polygon':
                  geometry.type = 'polygon';
                  geometry.rings = feature.geometry.coordinates;
                  delete geometry.coordinates;
                  break;
                case 'Point':
                  geometry.type = 'point';
                  geometry.x = feature.geometry.coordinates[0];
                  geometry.y = feature.geometry.coordinates[1];
                  delete geometry.coordinates;
                  break;
                default:
                  geometry.type = feature.geometry.type.toLowerCase();
              }
            }
            
            return new Graphic({
              geometry: geometry,
              attributes: feature.properties || {},
              popupTemplate: {
                title: "Datos GeoJSON",
                content: function(feature) {
                  let content = "";
                  for (const [key, value] of Object.entries(feature.graphic.attributes)) {
                    content += `<b>${key}:</b> ${value}<br>`;
                  }
                  return content || "Sin atributos";
                }
              }
            });
          });
          
          // Agregar graphics a la capa
          layer.addMany(graphics);
          break;

        case 'kml':
        case 'kmz':
          // Para archivos KML locales, parsearlos manualmente
          try {
            const kmlText = await inputFile.text();
            const geoJsonData = parseKMLToGeoJSON(kmlText);
            
            // Crear GraphicsLayer para KML parseado
            layer = new GraphicsLayer({
              title: fileName + ' (KML)',
              listMode: "show"
            });
            
            // Convertir features a Graphics
            const kmlGraphics = geoJsonData.features.map(feature => {
              // Convertir geometría de GeoJSON a formato ArcGIS
              let geometry = null;
              if (feature.geometry) {
                geometry = { ...feature.geometry };
                
                // Mapear tipos de GeoJSON a ArcGIS
                switch (feature.geometry.type) {
                  case 'LineString':
                    geometry.type = 'polyline';
                    geometry.paths = [feature.geometry.coordinates];
                    delete geometry.coordinates;
                    break;
                  case 'Polygon':
                    geometry.type = 'polygon';
                    geometry.rings = feature.geometry.coordinates;
                    delete geometry.coordinates;
                    break;
                  case 'Point':
                    geometry.type = 'point';
                    geometry.x = feature.geometry.coordinates[0];
                    geometry.y = feature.geometry.coordinates[1];
                    delete geometry.coordinates;
                    break;
                  default:
                    geometry.type = feature.geometry.type.toLowerCase();
                }
              }
              
              return new Graphic({
                geometry: geometry,
                attributes: feature.properties || {},
                popupTemplate: {
                  title: feature.properties?.name || "Elemento KML",
                  content: feature.properties?.description || "Sin descripción"
                }
              });
            });
            
            // Agregar graphics a la capa
            layer.addMany(kmlGraphics);
            
          } catch (parseError) {
            console.warn('Error parseando KML:', parseError);
            throw new Error(`Error al procesar el archivo KML: ${parseError.message}`);
          }
          break;

        case 'csv':
          // Para CSV, mostrar mensaje informativo
          alert('Los archivos CSV requieren configuración adicional de campos de coordenadas. Esta funcionalidad estará disponible próximamente.');
          setIsLoadingFile(false);
          URL.revokeObjectURL(fileUrl);
          return;

        case 'zip':
          alert('Los archivos Shapefile (.zip) requieren procesamiento adicional. Por favor, convierte a GeoJSON o KML.');
          setIsLoadingFile(false);
          URL.revokeObjectURL(fileUrl);
          return;

        case 'shp':
        case 'dbf':
        case 'prj':
          alert('Los archivos Shapefile individuales no son soportados. Por favor, sube el conjunto completo en formato ZIP o convierte a GeoJSON.');
          setIsLoadingFile(false);
          URL.revokeObjectURL(fileUrl);
          return;

        default:
          throw new Error(`Formato de archivo no soportado: .${fileExtension}`);
      }

      // Agregar la capa al mapa
      const addLayerToMap = () => {
        const map = arcgisMap.map;
        if (map && layer) {
          map.add(layer);
          
          // Zoom a la capa después de cargar
          if (layer.type === 'graphics') {
            // Para GraphicsLayer, hacer zoom a los graphics
            if (layer.graphics && layer.graphics.length > 0) {
              arcgisMap.view.goTo(layer.graphics.toArray());
            }
          } else {
            // Para otros tipos de layer
            layer.when(() => {
              if (layer.fullExtent) {
                arcgisMap.view.goTo(layer.fullExtent);
              }
            }).catch(err => {
              console.warn('No se pudo hacer zoom a la capa:', err);
            });
          }
          
          console.log(`Archivo ${inputFile.name} cargado exitosamente como ${layer.type}`);
          
          // Limpiar después de cargar exitosamente
          setTimeout(() => {
            clearSelectedFile();
            setIsLoadingFile(false);
            URL.revokeObjectURL(fileUrl);
          }, 1000);
        }
      };

      // Intentar agregar inmediatamente o esperar a que el mapa esté listo
      if (arcgisMap.map) {
        addLayerToMap();
      } else {
        // Si el mapa no está listo, usar observer
        const observer = new MutationObserver(() => {
          if (arcgisMap.map) {
            addLayerToMap();
            observer.disconnect();
          }
        });
        observer.observe(arcgisMap, { attributes: true, childList: false, subtree: false });
        
        // Timeout de seguridad
        setTimeout(() => {
          observer.disconnect();
          if (!arcgisMap.map) {
            URL.revokeObjectURL(fileUrl);
            throw new Error('Timeout esperando que el mapa esté listo');
          }
        }, 10000);
      }
      
    } catch (error) {
      console.error('Error al cargar archivo:', error);
      setIsLoadingFile(false);
      alert(`Error al cargar el archivo: ${error.message}`);
    }
  };

  // Handler para color y opacidad
  const handleColorChange = (e) => setPolygonColor(e.target.value);
  const handleOpacityChange = (e) => setPolygonOpacity(Number(e.target.value));

  return (
    <div className="special-tool-menus-container">
      <div className="special-tool-menu-title">Análisis Espacial</div>
      <div className="special-tool-menu-list">
        {/* Categoría: Cargar Datos */}
        <div className="special-tool-menu-item">
          <button
            className={`special-tool-menu-toggle ${openSection === 'datos' ? 'active' : ''}`}
            onClick={() => setOpenSection(openSection === 'datos' ? null : 'datos')}
          >
             Cargar Datos <span role="img" aria-label="database" style={{marginRight: 6}}></span>{openSection === 'datos' ? '▼' : '►'} 
          </button>

          {openSection === 'datos' && (
            <div className='contentToolSpecial'>
              <div className='special-tool-menu-item-inter'>
                <label className="special-tool-modal-label">URL Layer:</label>
                <input
                  type="text"
                  className="special-tool-modal-input-carga"
                  placeholder="Ingrese una URL de una capa"
                  value={urlLayer}
                  onChange={(e) => setUrlLayer(e.target.value)}
                  disabled={isLoadingUrl}
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={cargarLayer}
                  disabled={!urlLayer.trim() || isLoadingUrl}
                  startIcon={isLoadingUrl ? (
                    <div className="spinner"></div>
                  ) : null}
                >
                  {isLoadingUrl ? 'Cargando...' : 'Cargar'}
                </Button>
              </div>
              <div className='special-tool-menu-item-inter'>
                <label className="special-tool-modal-label">
                  Archivo Geoespacial:
                </label>
                <div 
                  className={`custom-dropzone ${isDragOver ? 'drag-over' : ''} ${inputFile ? 'file-selected' : ''}`}
                  onClick={() => document.getElementById('customFileInput').click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {inputFile ? (
                    <div className="file-info">
                      <span className="file-name">📁 {inputFile.name}</span>
                      <span className="file-size">({(inputFile.size / 1024).toFixed(1)} KB)</span>
                      <button 
                        className="clear-file-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          clearSelectedFile();
                        }}
                        title="Eliminar archivo"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <span className="dropzone-text">
                      {isDragOver ? 
                        '📥 Suelta el archivo aquí' : 
                        <>
                          Arrastra aquí tu archivo o haz click para seleccionar<br/>
                          <span className="dropzone-formats">KML, KMZ, GeoJSON, Shapefile, CSV</span>
                        </>
                      }
                    </span>
                  )}
                  <input
                    id="customFileInput"
                    type="file"
                    accept=".kml,.kmz,.geojson,.json,.shp,.dbf,.prj,.csv,.zip"
                    onChange={handleInputFileChange}
                    style={{ display: 'none' }}
                  />
                </div>
                <Button 
                  variant="contained" 
                  color="primary" 
                  style={{marginTop: 12}}
                  disabled={!inputFile || isLoadingFile}
                  onClick={cargarArchivo}
                  startIcon={isLoadingFile ? (
                    <div className="spinner"></div>
                  ) : null}
                >
                  {isLoadingFile ? 'Cargando...' : `Cargar${inputFile ? ` (${inputFile.name})` : ''}`}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Categoría: Herramientas */}
        <div className="special-tool-menu-item">
          <button
            className={`special-tool-menu-toggle ${openSection === 'herramientas' ? 'active' : ''}`}
            onClick={() => setOpenSection(openSection === 'herramientas' ? null : 'herramientas')}
          >
            Herramientas <span role="img" aria-label="tools" style={{marginRight: 6}}></span>   {openSection === 'herramientas' ? '▼' : '►'} 
          </button>
          {openSection === 'herramientas' && (
            <div>
              <div className='special-tool-menu-item'>
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
        <div className="special-tool-menu-item">
          <button
            className={`special-tool-menu-toggle ${openSection === 'colores' ? 'active' : ''}`}
            onClick={() => setOpenSection(openSection === 'colores' ? null : 'colores')}
          >
            Estilo de Polígonos <span role="img" aria-label="palette" style={{marginRight: 6}}></span>  {openSection === 'colores' ? '▼' : '►'} 
          </button>
          {openSection === 'colores' && (
            <div>
              <div className='special-tool-menu-item'>
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