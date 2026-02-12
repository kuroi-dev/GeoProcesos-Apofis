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


import './EsriWidgetManager.css';
import { GeoProcesosWindow, ApofisWindow, EstadoWindow, NuevoPanelWindow } from './SpecialToolWindows';
import { createPortal } from 'react-dom';


const EsriWidgetManager = ({ onMapReady }) => {

  const [showSketch, setShowSketch] = React.useState(false);

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
  };

  return (
    <div className="esri-widget-manager">
      
      <arcgis-map 
        basemap="satellite" 
        center="-72.2322, -39.2764" 
        zoom="12" 
        style={{ width: '100%', height: '100vh', display: 'block' }}
      >
        <arcgis-search 
          slot="top-right"
          style={{ position: 'absolute', top: '10px', right: '165px', zIndex: 1100, width: '320px' }}
        ></arcgis-search>

        <arcgis-compass 
          slot="bottom-right"
          style={{ position: 'absolute', bottom: '180px', right: '10px', zIndex: 1100 }}
        ></arcgis-compass>

        <arcgis-home 
          slot="bottom-right"
          style={{ position: 'absolute', bottom: '140px', right: '10px', zIndex: 1100 }}
        ></arcgis-home>


        <arcgis-zoom 
          slot="bottom-right"
          style={{ position: 'absolute', bottom: '70px', right: '10px', zIndex: 1100 }}
        ></arcgis-zoom>

        <arcgis-scale-bar 
          slot="bottom-left" 
          unit="metric"
          style={{ position: 'absolute', bottom: '-12px', left: '110px', zIndex: 1100 }}
        ></arcgis-scale-bar>

        <arcgis-sketch
          slot="top-right"
          creation-mode="continuous"
          layout="horizontal"
          scale="s"
          style={{ position: 'absolute', top: '45px', right: '180px', zIndex: 1100}}
          hide-undo-redo-menu
          hide-settings-menu
          className={showSketch ? 'panel-visible' : 'panel-hidden'}
        ></arcgis-sketch>

        <arcgis-basemap-toggle 
          slot="bottom-right" 
          style={{ position: 'absolute', bottom: '-10px', right: '0px', zIndex: 1100 }}
          next-basemap="topo"
        ></arcgis-basemap-toggle>
        
      
      <div className="custom-widget-manager">
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
          onClick={() =>  toggleWidget('print')}
          title="Herramientas de Dibujo"
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
          <div className="widget-panel-content">
             <arcgis-print
              allowed-formats="all"
              allowed-layouts="all"
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