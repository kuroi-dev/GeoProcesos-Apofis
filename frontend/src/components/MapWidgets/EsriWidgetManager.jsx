import React, { useEffect, useRef, useState } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import Compass from '@arcgis/core/widgets/Compass';
import Home from '@arcgis/core/widgets/Home';
import Locate from '@arcgis/core/widgets/Locate';
import Search from '@arcgis/core/widgets/Search';
import Legend from '@arcgis/core/widgets/Legend';
import LayerList from '@arcgis/core/widgets/LayerList';
import Measurement from '@arcgis/core/widgets/Measurement';
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D';
import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D';
import './EsriWidgetManager.css';

const EsriWidgetManager = ({ onMapReady }) => {
  const mapDiv = useRef(null);
  const mapView = useRef(null);
  const [activeWidgets, setActiveWidgets] = useState({
    basemapToggle: true,
    scaleBar: true,
    compass: true,
    home: true,
    locate: false,
    search: false,
    legend: false,
    layerList: false,
    measurement: false
  });

  const [widgets, setWidgets] = useState({});

  // Configuración de widgets disponibles con iconos SVG profesionales
  const availableWidgets = [
    {
      id: 'basemapToggle',
      name: 'Selector de Mapas Base',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M1 3h14v10H1V3zm1 1v8h12V4H2zm1 1h10v6H3V5zm1 1v4h8V6H4z"/>
        </svg>
      ),
      description: 'Alterna entre diferentes tipos de mapas base'
    },
    {
      id: 'scaleBar',
      name: 'Escala',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M1 7h14v2H1V7zm0-2h3v6H1V5zm13 0h2v6h-2V5z"/>
        </svg>
      ),
      description: 'Muestra la escala del mapa'
    },
    {
      id: 'compass',
      name: 'Brújula',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 2.5L6.5 8 8 13.5 9.5 8 8 2.5z"/>
        </svg>
      ),
      description: 'Indica la orientación norte del mapa'
    },
    {
      id: 'home',
      name: 'Inicio',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
          <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
        </svg>
      ),
      description: 'Vuelve a la vista inicial del mapa'
    },
    {
      id: 'locate',
      name: 'Mi Ubicación',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L2.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.464a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707z"/>
          <circle cx="8" cy="8" r="3"/>
        </svg>
      ),
      description: 'Centra el mapa en tu ubicación actual'
    },
    {
      id: 'search',
      name: 'Búsqueda',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      ),
      description: 'Busca lugares, direcciones y coordenadas'
    },
    {
      id: 'legend',
      name: 'Leyenda',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
          <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-.33 2.688 2.688 0 0 0 .491-.3c.115-.113.194-.272.194-.51 0-.075-.016-.45-.097-.518-.166-.14-.402-.2-.762-.116-.266.061-.51.152-.688.201-.264.073-.12.061-.383.061h-.108c-.264 0-.402-.077-.402-.77 0-.23.071-.421.212-.573.25-.272.620-.42.982-.51.407-.105.834-.14 1.295-.14.939 0 1.31.17 1.538.339.273.204.49.67.49 1.282 0 .597-.4 1.272-.906 1.538-.284.149-.66.269-1.069.343-.646.117-1.04.21-1.04.21-.104-.012-.826.04-.826.04-.104 0-.164-.012-.104.061v-.061z"/>
        </svg>
      ),
      description: 'Muestra la simbología de las capas'
    },
    {
      id: 'layerList',
      name: 'Listado de Capas',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0a1 1 0 0 1 .665.247L14.974 6.25a1 1 0 0 1 0 1.5L8.665 13.753a1 1 0 0 1-1.33 0L1.026 7.75a1 1 0 0 1 0-1.5L7.335.247A1 1 0 0 1 8 0z"/>
          <path d="M2.51 7.75 8 12.084 13.49 7.75 8 3.416 2.51 7.75z"/>
          <path d="M1.735 9.35a.5.5 0 0 1 .93.4L8 14.084l5.335-4.334a.5.5 0 0 1 .93-.4L8 15.916 1.735 9.35z"/>
        </svg>
      ),
      description: 'Administra la visibilidad de capas'
    },
    {
      id: 'measurement',
      name: 'Herramientas de Medición',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
          <path d="M3 0a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3 3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm0 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2 2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z"/>
          <path d="M13 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"/>
        </svg>
      ),
      description: 'Mide distancias y áreas en el mapa'
    }
  ];

  useEffect(() => {
    if (mapDiv.current && !mapView.current) {
      // Crear el mapa
      const map = new Map({
        basemap: 'satellite'
      });

      // Crear la vista del mapa
      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [-72.210533, -39.2902], // Chile central
        zoom: 13
      });

      mapView.current = view;

      // Esperar a que la vista esté lista antes de inicializar widgets
      view.when(() => {
        // Inicializar widgets por defecto
        initializeDefaultWidgets(view);

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
  }, []);

  const initializeDefaultWidgets = (view) => {
    const newWidgets = {};

    // BasemapToggle (activo por defecto)
    if (activeWidgets.basemapToggle) {
      newWidgets.basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: 'streets-vector'
      });
      view.ui.add(newWidgets.basemapToggle, 'bottom-right');
    }

    // ScaleBar (activo por defecto)
    if (activeWidgets.scaleBar) {
      newWidgets.scaleBar = new ScaleBar({
        view: view,
        unit: 'dual'
      });
      view.ui.add(newWidgets.scaleBar, 'bottom-left');
    }

    // Compass (activo por defecto)
    if (activeWidgets.compass) {
      newWidgets.compass = new Compass({
        view: view
      });
      view.ui.add(newWidgets.compass, 'top-left');
    }

    // Home (activo por defecto)
    if (activeWidgets.home) {
      newWidgets.home = new Home({
        view: view
      });
      view.ui.add(newWidgets.home, 'top-left');
    }

    setWidgets(newWidgets);
  };

  const toggleWidget = (widgetId) => {
    if (!mapView.current) return;

    const newActiveWidgets = { ...activeWidgets };
    const newWidgets = { ...widgets };

    if (activeWidgets[widgetId]) {
      // Desactivar widget
      if (widgets[widgetId]) {
        mapView.current.ui.remove(widgets[widgetId]);
        widgets[widgetId].destroy();
        delete newWidgets[widgetId];
      }
      newActiveWidgets[widgetId] = false;
    } else {
      // Activar widget
      newActiveWidgets[widgetId] = true;
      
      switch (widgetId) {
        case 'locate':
          newWidgets.locate = new Locate({
            view: mapView.current
          });
          mapView.current.ui.add(newWidgets.locate, 'top-left');
          break;
        
        case 'search':
          newWidgets.search = new Search({
            view: mapView.current
          });
          mapView.current.ui.add(newWidgets.search, 'top-right');
          break;
        
        case 'legend':
          newWidgets.legend = new Legend({
            view: mapView.current
          });
          mapView.current.ui.add(newWidgets.legend, 'bottom-right');
          break;
        
        case 'layerList':
          newWidgets.layerList = new LayerList({
            view: mapView.current
          });
          mapView.current.ui.add(newWidgets.layerList, 'top-right');
          break;
        
        case 'measurement':
          newWidgets.measurement = new Measurement({
            view: mapView.current
          });
          mapView.current.ui.add(newWidgets.measurement, 'top-right');
          break;
        
        default:
          break;
      }
    }

    setActiveWidgets(newActiveWidgets);
    setWidgets(newWidgets);
  };

  return (
    <>
      {/* Contenedor del mapa */}
      <div ref={mapDiv} className="esri-map-container"></div>
      
      {/* Panel de control de widgets */}
      <div className="widget-manager-panel">
        <div> 
          <h3>Widgets Analisis espacial</h3>
        </div>
        
        <div className="widget-list">
          {availableWidgets.map(widget => (
            <div 
              key={widget.id}
              className={`widget-item ${activeWidgets[widget.id] ? 'active' : ''}`}
              onClick={() => toggleWidget(widget.id)}
              title={widget.description}
            >
              <span className="widget-icon">{widget.icon}</span>
              <div className="widget-info">
                <span className="widget-name">{widget.name}</span>
                <span className="widget-status">
                  {activeWidgets[widget.id] ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <div className="widget-toggle">
                {activeWidgets[widget.id] ? '🟢' : '⚪'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EsriWidgetManager;