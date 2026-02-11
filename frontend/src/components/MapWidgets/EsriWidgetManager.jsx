import React, { useEffect, useRef, useState } from 'react';
import esriConfig from '@arcgis/core/config';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import LayerList from '@arcgis/core/widgets/LayerList';
import Legend from '@arcgis/core/widgets/Legend';
import Search from '@arcgis/core/widgets/Search';
import Home from '@arcgis/core/widgets/Home';
import Measurement from '@arcgis/core/widgets/Measurement';
import Compass from '@arcgis/core/widgets/Compass';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import Sketch from '@arcgis/core/widgets/Sketch';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Zoom from '@arcgis/core/widgets/Zoom';
import './EsriWidgetManager.css';
import { GeoProcesosWindow, ApofisWindow, EstadoWindow, NuevoPanelWindow } from './SpecialToolWindows';
import { createPortal } from 'react-dom';

const EsriWidgetManager = ({ onMapReady }) => {
  const mapDiv = useRef(null);
  const mapView = useRef(null);
  const widgetsRef = useRef({});
  // Estados para controlar la visibilidad de los widgets
  const [widgetStates, setWidgetStates] = useState({
    basemapGallery: false,
    layerList: false,
    legend: false,
    measurement: false,
    sketch: false
  });

  // Función para alternar la visibilidad de un widget
  const toggleWidget = (widgetName) => {
    setWidgetStates(prev => ({
      ...prev,
      [widgetName]: !prev[widgetName]
    }));
  };

  useEffect(() => {
    // Configurar idioma global a español y cargar recursos
    esriConfig.locale = 'es';
    // Forzar carga de recursos de idioma español
    const script = document.createElement('script');
    script.src = 'https://js.arcgis.com/4.34/esri/themes/base/nls/es/core.js';
    script.async = true;
    document.head.appendChild(script);
    if (mapDiv.current && !mapView.current) {
      console.log('🗺️ Creando mapa...');
      
      // Crear capa de gráficos para dibujo
      const graphicsLayer = new GraphicsLayer({
        title: 'Sketches'
      });

      // Crear el mapa 
      const map = new Map({
        basemap: 'satellite',
        layers: [graphicsLayer]
      });

      // Crear la vista del mapa
      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [-72.2322, -39.2764], // Villarrica, Chile
        zoom: 12
      });

      mapView.current = view;
      console.log('🗺️ Mapa satelital creado');

      // Esperar a que la vista esté lista
      view.when(() => {
        console.log('✅ MapView está listo');

        // SOLO WIDGETS BÁSICOS SIEMPRE VISIBLES
        
        // HOME - Vista inicial (icono simple)
        const homeWidget = new Home({
          view: view
        });
        view.ui.add(homeWidget, {
          position: 'bottom-right',
          index: 0
        });

        // COMPASS - Brújula (siempre visible)
        const compass = new Compass({
          view: view
        });
        view.ui.add(compass, {
          position: 'bottom-right',
          index: 1
        });

        // ZOOM - Controles de zoom (siempre visible)
        const zoom = new Zoom({
          view: view
        });
        view.ui.add(zoom, {
          position: 'bottom-right',
          index: 2
        });

        // SCALE BAR - Escala (siempre visible)
        const scaleBar = new ScaleBar({
          view: view,
          unit: 'metric'
        });
        view.ui.add(scaleBar, {
          position: 'bottom-left',
          index: 0
        });

        // SEARCH - Búsqueda (siempre visible en top-right)
        const searchWidget = new Search({
          view: view,
          searchButtonTooltip: 'Buscar',
          searchButtonText: 'Buscar'
        });
        widgetsRef.current.search = searchWidget;
        view.ui.add(searchWidget, {
          position: 'top-right',
          index: 0
        });

        // Hack: Forzar el texto del botón a 'Buscar' tras renderizar el widget
        // Forzar cambio de texto y placeholder varias veces para asegurar que el DOM esté listo
        let tries = 0;
        const interval = setInterval(() => {
          const btn = document.querySelector('.esri-search__submit-button');
          if (btn) btn.textContent = 'Buscar';
          // Buscar el input por el placeholder original en inglés
          const input = document.querySelector('input[placeholder="Find address or place"]');
          if (input) input.placeholder = 'Buscar dirección o lugar';
          tries++;
          if ((btn && input) || tries > 15) clearInterval(interval);
        }, 300);

        // WIDGETS CONTROLADOS POR MANAGER (creados pero no agregados al UI)
        
          // SEARCH - Búsqueda (solo uno, siempre visible en top-right)
          view.ui.add(widgetsRef.current.search, {
            position: 'top-right',
            index: 0
          });

        // BASEMAP GALLERY
        widgetsRef.current.basemapGallery = new BasemapGallery({
          view: view
        });

        // LAYER LIST
        widgetsRef.current.layerList = new LayerList({
          view: view
        });

        // LEGEND
        widgetsRef.current.legend = new Legend({
          view: view
        });

        // MEASUREMENT
        widgetsRef.current.measurement = new Measurement({
          view: view
        });

        // SKETCH
        widgetsRef.current.sketch = new Sketch({
          layer: graphicsLayer,
          view: view
        });

        console.log('✅ Todos los widgets creados y listos para el manager');
        
        // Notificar que el mapa está listo
        if (onMapReady) {
          onMapReady(view, map);
        }
      });
    }

    return () => {
      if (mapView.current) {
        mapView.current.destroy();
        mapView.current = null;
      }
    };
  }, [onMapReady]);

  // Efecto para manejar la visibilidad de los widgets
  useEffect(() => {
    if (mapView.current && widgetsRef.current) {
      const view = mapView.current;

      // Search SIEMPRE visible en top-right (solo si existe el widget)
      if (widgetsRef.current.search && !view.ui.find('searchWidget')) {
        widgetsRef.current.search.id = 'searchWidget';
        view.ui.add(widgetsRef.current.search, 'top-right');
      }

      // BasemapGallery
      if (widgetStates.basemapGallery) {
        view.ui.add(widgetsRef.current.basemapGallery, 'top-right');
      } else {
        view.ui.remove(widgetsRef.current.basemapGallery);
      }

      // LayerList
      if (widgetStates.layerList) {
        view.ui.add(widgetsRef.current.layerList, 'bottom-left');
      } else {
        view.ui.remove(widgetsRef.current.layerList);
      }

      // Legend
      if (widgetStates.legend) {
        view.ui.add(widgetsRef.current.legend, 'bottom-left');
      } else {
        view.ui.remove(widgetsRef.current.legend);
      }

      // Measurement
      if (widgetStates.measurement) {
        view.ui.add(widgetsRef.current.measurement, 'top-right');
      } else {
        view.ui.remove(widgetsRef.current.measurement);
      }

      // Sketch
      if (widgetStates.sketch) {
        view.ui.add(widgetsRef.current.sketch, 'bottom-right');
      } else {
        view.ui.remove(widgetsRef.current.sketch);
      }
    }
  }, [widgetStates]);

  return (
    <div className="esri-widget-manager">
      <div ref={mapDiv} className="esri-map-container"></div>
      {/* Paneles de herramientas especializadas en el body usando Portal */}
      {createPortal(
        <>
          <GeoProcesosWindow />
          <ApofisWindow />
          <EstadoWindow estado={null} />
          <NuevoPanelWindow />
        </>,
        document.body
      )}
      {/* WIDGET MANAGER - CENTRO INFERIOR */}
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
          onClick={() => toggleWidget('sketch')}
          title="Herramientas de Dibujo"
        >
          <calcite-icon icon="pencil" scale="l"></calcite-icon>
        </button>
      </div>
    </div>
  );
  
};

export default EsriWidgetManager;