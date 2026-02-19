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


import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";


import './EsriWidgetManager.css';
import { GeoProcesosWindow, ApofisWindow, EstadoWindow, NuevoPanelWindow } from './SpecialToolWindows';
import { createPortal } from 'react-dom';


const EsriWidgetManager = ({ onMapReady }) => {

  const [showSketch, setShowSketch] = React.useState(false);
  const [showPrint, setShowPrint] = React.useState(false);
  const printRef = useRef(null);
  const [printKey, setPrintKey] = useState(0);
  const [selectPolygonActive, setSelectPolygonActive] = useState(false);
  const selectPolygonHandlerRef = useRef(null);
  

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
    print: false
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
      print: false
    });
    setShowSketch(prev => !prev);
    setShowPrint(false);
  };
  const mostrarPrint = () => {
    // Close all other widgets when opening sketch
    setWidgetStates({
      basemapGallery: false,
      layerList: false,
      legend: false,
      measurement: false,
      sketch: false,
      print: false
    });
    setShowSketch(false);
    setShowPrint(prev => !prev);
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
          url: "https://esri.ciren.cl/server/rest/services/LIMITES_ADMINISTRATIVOS/FeatureServer/3",
          renderer: {
            type: "simple",
            symbol: {
              type: "simple-fill", // Para polígonos
              color: [0, 0, 0, 0], // Fondo negro, 0.1 opacidad
              outline: {
                color: [0, 255, 0, 1], // Borde verde 
                width: 2 // Grosor del borde
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


//Captura de poligono

  function handleSelectPolygon() {
    const arcgisMap = document.querySelector("arcgis-map");
    if (!arcgisMap || !arcgisMap.map) return;
    const view = arcgisMap.view;
    if (!view) {
      alert("El mapa aún no está listo.");
      return;
    }
    if (!selectPolygonActive) {
      // Activar selección
      const layers = arcgisMap.map.layers.items.filter(
        l => l.type === "feature" && l.visible && l.geometryType === "polygon"
      );
      if (layers.length === 0) {
        alert("No hay capas de polígonos visibles para seleccionar.");
        return;
      }
      view.popup.close();
      view.graphics.removeAll();
      // Guardar handler para poder removerlo
      const handler = view.on("click", async (event) => {
        const hit = await view.hitTest(event);
        const graphic = hit.results.find(r => r.graphic && r.graphic.layer && layers.includes(r.graphic.layer));
        if (graphic) {
          view.graphics.removeAll();
          view.graphics.add({
            geometry: graphic.graphic.geometry,
            symbol: {
              type: "simple-fill",
              color: [255, 255, 0, 0.3],
              outline: { color: [255, 128, 0, 1], width: 3 }
            }
          });
          view.popup.open({
            features: [graphic.graphic],
            location: event.mapPoint
          });
        }
      });
      selectPolygonHandlerRef.current = handler;
      setSelectPolygonActive(true);
      alert("Haz clic en un polígono para seleccionarlo. Pulsa el botón de nuevo para salir.");
    } else {
      // Desactivar selección
      if (selectPolygonHandlerRef.current) {
        selectPolygonHandlerRef.current.remove();
        selectPolygonHandlerRef.current = null;
      }
      setSelectPolygonActive(false);
      // Opcional: limpiar selección
      const view = arcgisMap.view;
      if (view) {
        view.graphics.removeAll();
        view.popup.close();
      }
    }
  }

  return (
    <div className="esri-widget-manager">
      <arcgis-map 
        basemap="satellite" 
        center="-72.2322, -39.2764" 
        zoom="12" 
        style={{ width: '100%', height: '100vh', display: 'block' }}
      >
        <arcgis-print
          slot="top-left"
          allowed-formats="all"
          allowed-layouts="all"
          //exclude-default-templates
          //exclude-organization-templates
          ref={printRef}
          style={{ position: 'absolute', top: '70px', zIndex: 1100, width: '320px' }}
          className={showPrint ? 'panel-visible' : 'panel-hidden'}
        ></arcgis-print>
        
        <arcgis-search 
          slot="top-left"
          style={{ position: 'absolute', top: '-3px', left: '165px', zIndex: 1100, width: '320px' }}
        ></arcgis-search>

        <arcgis-compass 
          slot="bottom-left"
          style={{ position: 'absolute', bottom: '180px', left: '10px', zIndex: 1100 }}
        ></arcgis-compass>

        <arcgis-home 
          slot="bottom-left"
          style={{ position: 'absolute', bottom: '140px', left: '10px', zIndex: 1100 }}
        ></arcgis-home>


        <arcgis-zoom 
          slot="bottom-left"
          style={{ position: 'absolute', bottom: '70px', left: '10px', zIndex: 1100 }}
        ></arcgis-zoom>

        <arcgis-scale-bar 
          slot="bottom-right" 
          unit="metric"
          style={{ position: 'absolute', bottom: '-12px', right: '100px', zIndex: 1100 }}
        ></arcgis-scale-bar>

        <arcgis-sketch
          slot="top-left"
          creation-mode="continuous"
          layout="horizontal"
          scale="s"
          hide-duplicate-button
          hide-undo-redo-menu
          toolbar-kind="floating"
          style={{ position: 'absolute', top: '32px', left: '166px', zIndex: 1100}}
          className={showSketch ? 'panel-visible' : 'panel-hidden'}
        ></arcgis-sketch>

        <arcgis-basemap-toggle 
          slot="bottom-left" 
          style={{ position: 'absolute', bottom: '-10px', left: '0px', zIndex: 1100 }}
          next-basemap="topo"
        ></arcgis-basemap-toggle>
      
      
      <div className="custom-widget-manager">
        <button
          className={`manager-btn${selectPolygonActive ? ' active-select' : ''}`}
          onClick={handleSelectPolygon}
          title={selectPolygonActive ? "Terminar selección de polígono" : "Seleccionar polígono de capa"}
          style={selectPolygonActive ? { background: '#2196f3', color: '#fff' } : {}}
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
          onClick={() => mostrarPrint()}
          title="Imprimir mapa"
        >
          <calcite-icon icon="print" scale="l"></calcite-icon>
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
        {widgetStates.print && (
          <div className="widget-panel-content"
            style={{ display: widgetStates.print ? 'block' : 'none' }}
          >
            
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