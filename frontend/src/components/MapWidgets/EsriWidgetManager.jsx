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

  // Widgets disponibles
  const availableWidgets = [
    { id: 'basemapToggle', icon: <calcite-icon icon="basemap" scale="s"></calcite-icon> },
    { id: 'scaleBar', icon: <calcite-icon icon="measure-line" scale="s"></calcite-icon> },
    { id: 'compass', icon: <calcite-icon icon="compass" scale="s"></calcite-icon> },
    { id: 'home', icon: <calcite-icon icon="home" scale="s"></calcite-icon> },
    { id: 'locate', icon: <calcite-icon icon="gps-on" scale="s"></calcite-icon> },
    { id: 'search', icon: <calcite-icon icon="search" scale="s"></calcite-icon> },
    { id: 'legend', icon: <calcite-icon icon="legend" scale="s"></calcite-icon> },
    { id: 'layerList', icon: <calcite-icon icon="layers" scale="s"></calcite-icon> },
    { id: 'measurement', icon: <calcite-icon icon="measure" scale="s"></calcite-icon> }
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

  const renderWidgetPanel = (panelClass) => (
    <div className={`widget-manager-panel ${panelClass}`}>
      <div className="widget-list">
        {availableWidgets.map(widget => (
          <div 
            key={widget.id}
            className={`widget-item ${activeWidgets[widget.id] ? 'active' : ''}`}
            onClick={() => toggleWidget(widget.id)}
          >
            <span className="widget-icon">{widget.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div ref={mapDiv} className="esri-map-container"></div>
      {renderWidgetPanel('widget-manager-panel-border1')}
      {renderWidgetPanel('widget-manager-panel-border2')}
      {renderWidgetPanel('widget-manager-panel-border3')}
      {renderWidgetPanel('widget-manager-panel-border4')}
    </>
  );
};

export default EsriWidgetManager;