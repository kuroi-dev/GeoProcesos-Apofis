import React, { useRef, useEffect, useState } from 'react';

import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-search";
import "@arcgis/map-components/components/arcgis-basemap-gallery";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-compass";
import "@arcgis/map-components/components/arcgis-home";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-scale-bar";
import "@arcgis/map-components/components/arcgis-sketch";
import "@arcgis/map-components/components/arcgis-area-measurement-2d";
import "@arcgis/map-components/components/arcgis-basemap-toggle";
import "@arcgis/map-components/components/arcgis-print";
import "@arcgis/map-components/components/arcgis-popup";
import "@arcgis/map-components/components/arcgis-coordinate-conversion";



import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";


import './EsriWidgetManager.css';
import { GeoProcesosWindow, ApofisWindow, EstadoWindow, NuevoPanelWindow } from './SpecialToolWindows';
import { createPortal } from 'react-dom';


const EsriWidgetManager = ({ onMapReady }) => {

  const [showSketch, setShowSketch] = React.useState(false);
  const [showPrint, setShowPrint] = React.useState(false);
  const printRef = useRef(null);
  const [printKey, setPrintKey] = useState(0);
  const [selectGeometryActive, setSelectGeometryActive] = useState(false);
  const selectGeometryHandlerRef = useRef(null);
  
  // Estado para estilos responsivos del scale-bar
  const [scaleBarStyle, setScaleBarStyle] = useState({ position: 'absolute', left: 0, bottom: 0, zIndex: 1100 });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 500) {
        setScaleBarStyle({ position: 'absolute', left: 0, bottom: 0, zIndex: 1100, width: '98vw' });
      } else {
        setScaleBarStyle({ position: 'absolute', left: 0, bottom: -16, zIndex: 1100 });
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize(); // Inicial
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const printElement = printRef.current;
    if (!printElement) return;
    const handleSubmit = (e) => {
      console.log('Print component submit', e);
    };
    const handleComplete = (e) => {
      console.log('Print component complete', e);
    };
    printElement.addEventListener('arcgisSubmit', handleSubmit);
    printElement.addEventListener('arcgisComplete', handleComplete);
    return () => {
      printElement.removeEventListener('arcgisSubmit', handleSubmit);
      printElement.removeEventListener('arcgisComplete', handleComplete);
    };
  }, []);

  // No widget refs needed for map-components
  // Widget visibility state
  const [widgetStates, setWidgetStates] = useState({
    basemapGallery: false,
    layerList: false,
    legend: false,
    measurement: false,
    sketch: false,
    print: false,
    status: false
  });

  // Función para alternar la visibilidad de un widget (solo uno activo a la vez)
  const toggleWidget = (widgetName) => {
    setWidgetStates(prev => {
      const newState = {};
      Object.keys(prev).forEach(name => {
        newState[name] = false;
      });
      newState[widgetName] = !prev[widgetName];
      return newState;
    });
    // If toggling a widget other than sketch, close sketch
    if (widgetName !== 'sketch') {
      setShowSketch(false);
    }
  };

  const mostrarSketch = () => {
    // Close all other widgets when opening sketch
    setWidgetStates({
      basemapGallery: false,
      layerList: false,
      legend: false,
      measurement: false,
      sketch: false,
      print: false,
      status: false
    });
    setShowSketch(prev => !prev);
  };
  const mostrarPrint = () => {
    // Close all other widgets when opening sketch
    setWidgetStates({
      basemapGallery: false,
      layerList: false,
      legend: false,
      measurement: false,
      sketch: false,
      print: false,
      status: false
    });
    setShowSketch(false);
  };

  useEffect(() => {
    const arcgisMap = document.querySelector("arcgis-map");;
    if (!arcgisMap) return;

    let observer;
    let featureLayerAdded = false;

    const tryAddFeatureLayer = () => {
      // El objeto map se expone como propiedad del custom element
      const map = arcgisMap.map;
      if (map && !featureLayerAdded) {
        featureLayerAdded = true;
        console.log('Mapa detectado por MutationObserver:', map);
        const featureLayer = new FeatureLayer({
          url: "https://arcgis.mma.gob.cl/server/rest/services/MMA/LIMITES_URBANOS/MapServer/0",
          renderer: {
            type: "simple",
            symbol: {
              type: "simple-fill", // Para polígonos
              color: [255, 255, 0, 0.1], // Fondo negro, 0.1 opacidad
              outline: {
                color: [8, 252, 252, 1], // Borde verde 
                width: 3 // Grosor del borde
              }
            }
          }
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
  }, []);

  useEffect(() => {
    const popupComponent = document.querySelector("arcgis-popup");
    if (popupComponent) {
      popupComponent.dockOptions = {
        breakpoint: false,
      };
    }
  }, []);


//Captura de geometrias

  function handleSelectGeometry() {
    const arcgisMap = document.querySelector("arcgis-map");
    if (!arcgisMap || !arcgisMap.map) return;
    const view = arcgisMap.view;
    if (!view) {
      alert("El mapa aún no está listo.");
      return;
    }
    if (!selectGeometryActive) {
      // Activar selección
      const layers = arcgisMap.map.layers.items.filter(
        l =>
          l.type === "feature" &&
          l.visible &&
          ["polygon", "point", "polyline"].includes(l.geometryType)
      );
      if (layers.length === 0) {
        alert("No hay capas visibles para seleccionar.");
        return;
      }
      view.graphics.removeAll();
      const handler = view.on("click", async (event) => {
        const hit = await view.hitTest(event);
        const graphic = hit.results.find(
          r => r.graphic && r.graphic.layer && layers.includes(r.graphic.layer)
        );
        if (graphic) {
          view.graphics.removeAll();
          let symbol;
          switch (graphic.graphic.geometry.type) {
            case "polygon":
              symbol = {
                type: "simple-fill",
                color: [255, 255, 0, 0.3],
                outline: { color: [255, 128, 0, 1], width: 3 }
              };
              break;
            case "polyline":
              symbol = {
                type: "simple-line",
                color: [0, 128, 255, 1],
                width: 3
              };
              break;
            case "point":
              symbol = {
                type: "simple-marker",
                color: [255, 0, 128, 0.7],
                size: 12,
                outline: { color: [0, 0, 0, 1], width: 2 }
              };
              break;
            default:
              symbol = null;
          }
          if (symbol) {
            view.graphics.add({
              geometry: graphic.graphic.geometry,
              symbol
            });
          }
          view.popup.open({
            features: [graphic.graphic],
            location: event.mapPoint
          });
        }
      });
      selectGeometryHandlerRef.current = handler;
      setSelectGeometryActive(true);
    } else {
      // Desactivar selección
      if (selectGeometryHandlerRef.current) {
        selectGeometryHandlerRef.current.remove();
        selectGeometryHandlerRef.current = null;
      }
      setSelectGeometryActive(false);
      if (view) {
        view.graphics.removeAll();
        view.popup.close();
      }
    }
  }

  return (

    <div className="esri-widget-manager">
      <arcgis-map 
        basemap="osm"
        center="-72.220106, -39.287310"
        zoom="14"
        className="arcgis-map-full"
      >
     

        <arcgis-search
          slot="top-left"
          style={{ position: 'absolute', left: 0, top: 0, zIndex: 1100 , width: 300}}
          scale="m"
        ></arcgis-search>

        <arcgis-compass
          slot="bottom-right"
          style={{ position: 'absolute', right: 0, bottom:190, zIndex: 1100 }}
        ></arcgis-compass>

        <arcgis-home
          slot="bottom-right"
          style={{ position: 'absolute', right: 0, bottom:150, zIndex: 1100 }}
        ></arcgis-home>

        <arcgis-zoom
          slot="bottom-right"
          style={{ position: 'absolute', right: 0, bottom:80, zIndex: 1100 }}
        ></arcgis-zoom>

        <arcgis-scale-bar
          slot="bottom-left"
          unit="metric"
          style={{ position: 'absolute', left: 0, bottom: -15, zIndex: 1100 }}
        ></arcgis-scale-bar>

        <arcgis-sketch
          slot="bottom-right"
          creation-mode="continuous"
          layout="vertical"
          scale="s"
          hide-duplicate-button
          hide-undo-redo-menu
          style={{ position: 'absolute', right: 0, bottom: 235, zIndex: 1100}}
          toolbar-kind="floating"
          className={` ${showSketch ? 'panel-visible' : 'panel-hidden'}`}
        ></arcgis-sketch>

        <arcgis-basemap-toggle
          slot="bottom-left"
          style={{ position: 'absolute', left: 0, bottom: 80, zIndex: 1100 , width: 210}}
          next-basemap="hybrid"
        ></arcgis-basemap-toggle>

        <arcgis-coordinate-conversion
          slot="top-left"
          mode="live"
          orientation="auto"
          hide-expand-button
    multiple-conversions-disabled
          style={{ position: 'absolute', left: 1, top: 35, zIndex: 1100 , overflow: 'hidden', width: 297, height : 40 , display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          scale="s"
        ></arcgis-coordinate-conversion>
      
      
      <div className="custom-widget-manager">
        <button
          className={`manager-btn${selectGeometryActive ? ' active-select' : ''}`}
          onClick={handleSelectGeometry}
          title={selectGeometryActive ? "Terminar selección de geometría" : "Seleccionar geometría de capa"}
          style={selectGeometryActive ? { background: '#2196f3', color: '#fff' } : {}}
        >
          <calcite-icon icon="cursor-marquee" scale="l"></calcite-icon>
        </button>
          
        <button 
          className={`manager-btn ${widgetStates.basemapGallery ? 'active' : ''}`}
          onClick={() => toggleWidget('basemapGallery')}
          title="Galería de Mapas Base"
        >
          <calcite-icon icon="basemap" scale="l"></calcite-icon>
        </button>
        <button 
          className={`manager-btn ${widgetStates.layerList ? 'active' : ''}`}
          onClick={() => toggleWidget('layerList')}
          title="Lista de Capas"
        >
          <calcite-icon icon="layers" scale="l"></calcite-icon>
        </button>
        <button 
          className={`manager-btn ${widgetStates.legend ? 'active' : ''}`}
          onClick={() => toggleWidget('legend')}
          title="Leyenda"
        >
          <calcite-icon icon="legend" scale="l"></calcite-icon>
        </button>
        <button 
          className={`manager-btn ${widgetStates.measurement ? 'active' : ''}`}
          onClick={() => toggleWidget('measurement')}
          title="Herramientas de Medición"
        >
          <calcite-icon icon="measure" scale="l"></calcite-icon>
        </button>
        <button 
          className={`manager-btn ${widgetStates.sketch ? 'active' : ''}`}
          onClick={() => mostrarSketch()}
          title="Herramientas de Dibujo"
        >
          <calcite-icon icon="pencil" scale="l"></calcite-icon>
        </button>
        <button 
          className={`manager-btn ${widgetStates.print ? 'active' : ''}`}
           onClick={() => toggleWidget('print')}
          title="Imprimir mapa"
        >
          <calcite-icon icon="print" scale="l"></calcite-icon>
        </button>
         <button 
          className={`manager-btn ${widgetStates.status ? 'active' : ''}`}
          onClick={() => toggleWidget('status')}
          title="Estado de la aplicación"
        >
          <calcite-icon icon="activity-monitor" scale="l"></calcite-icon>
        </button>

      </div>
      <div
        id="panel"
        className={`esri-widget-panel ${Object.values(widgetStates).some(Boolean) ? 'panel-visible' : 'panel-hidden'}`}
      >
        {widgetStates.basemapGallery && (
          <div className="widget-panel-content">
            <arcgis-basemap-gallery></arcgis-basemap-gallery>
          </div>
        )}
        {widgetStates.layerList && (
          <div className="widget-panel-content">
            <arcgis-layer-list></arcgis-layer-list>
          </div>
        )}
        {widgetStates.legend && (
          <div className="widget-panel-content">
            <arcgis-legend></arcgis-legend>
          </div>
        )}
        {widgetStates.measurement && (
          <div className="widget-panel-content">
            <arcgis-area-measurement-2d></arcgis-area-measurement-2d>
          </div>
        )}
        {widgetStates.status && (
          <div className="widget-panel-content">
              <div className="estado-panel">
                <div>
                  <h2 className='estadoTitle'>Estado App</h2>
                </div>
                <div className="estado-item">
                  <span className="estado-dot estado-ok"></span>
                  <span className="estado-label">Mapa</span>
                </div>
                <div className="estado-item">
                  <span className="estado-dot estado-ok"></span>
                  <span className="estado-label">Base de datos</span>
                </div>
                <div className="estado-item">
                  <span className="estado-dot estado-ok"></span>
                  <span className="estado-label">Widgets</span>
                </div>
              </div>
            </div>
        )}
        {widgetStates.print && ( 
          <div className="widget-panel-content">
            <arcgis-print
              allowed-formats="all"
              allowed-layouts="all"
              ref={printRef}
            ></arcgis-print> 
          </div>
            
        )}

      </div>
      </arcgis-map>

      
      {createPortal(
        <>
          <GeoProcesosWindow />
          <ApofisWindow />
          <EstadoWindow estado={null} />
          <NuevoPanelWindow />
        </>,
        document.body
      )}
    </div>
    
  );
}
export default EsriWidgetManager;