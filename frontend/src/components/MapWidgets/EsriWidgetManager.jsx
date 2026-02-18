import React, { useRef, useEffect, useState } from 'react';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Home from "@arcgis/core/widgets/Home";
import Zoom from "@arcgis/core/widgets/Zoom";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Compass from "@arcgis/core/widgets/Compass";
import Search from "@arcgis/core/widgets/Search";
import LayerList from "@arcgis/core/widgets/LayerList";
import Legend from "@arcgis/core/widgets/Legend";
import Print from "@arcgis/core/widgets/Print";
import AreaMeasurement2D from "@arcgis/core/widgets/AreaMeasurement2D";
import Sketch from "@arcgis/core/widgets/Sketch.js";
import Swipe from "@arcgis/core/widgets/Swipe.js";
import Slider from "@arcgis/core/widgets/Slider.js";
import Popup from "@arcgis/core/widgets/Popup.js";
import NavigationToggle from "@arcgis/core/widgets/NavigationToggle.js";
import HistogramRangeSlider from "@arcgis/core/widgets/HistogramRangeSlider.js";
import FeatureTable from "@arcgis/core/widgets/FeatureTable.js";
import Editor from "@arcgis/core/widgets/Editor.js";
import DistanceMeasurement2D from "@arcgis/core/widgets/DistanceMeasurement2D.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

import "@arcgis/map-components/components/arcgis-basemap-toggle";


import './EsriWidgetManager.css';
import { GeoProcesosWindow, ApofisWindow, EstadoWindow, NuevoPanelWindow } from './SpecialToolWindows';
import { createPortal } from 'react-dom';



const EsriWidgetManager = () => {
  // Estado para controlar qué widget está visible
  const [visibleWidget, setVisibleWidget] = useState(null);
  const mapDiv = useRef(null);
  // Refs para cada widget
  const homeDiv = useRef(null);
  const zoomDiv = useRef(null);
  const scaleBarDiv = useRef(null);
  const compassDiv = useRef(null);
  const searchDiv = useRef(null);
  const layerListDiv = useRef(null);
  const legendDiv = useRef(null);
  const printDiv = useRef(null);
  const measureDiv = useRef(null);
  const sketchDiv = useRef(null);
  const swipeDiv = useRef(null);
  const sliderDiv = useRef(null);
  const popupDiv = useRef(null);
  const navigationDiv = useRef(null);
  const histogramDiv = useRef(null);
  const featureTableDiv = useRef(null);
  const editorDiv = useRef(null);
  const distanceDiv = useRef(null);
  const basemapToggleDiv = useRef(null);

  useEffect(() => {
    if (!mapDiv.current) return;
    const map = new Map({ basemap: "satellite" });
    const view = new MapView({
      container: mapDiv.current,
      map,
      center: [-72.2322, -39.2764],
      zoom: 12,
    });

    const featureLayer = new FeatureLayer({
      url: "https://esri.ciren.cl/server/rest/services/LIMITES_ADMINISTRATIVOS/FeatureServer/3"
    });
    map.add(featureLayer);

    // GraphicsLayer para Sketch
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    view.when(() => {
      new Home({ view, container: homeDiv.current });
      new Zoom({ view, container: zoomDiv.current });
      new ScaleBar({ view, container: scaleBarDiv.current, unit: "metric" });
      new Compass({ view, container: compassDiv.current });
      new Search({ view, container: searchDiv.current });
      new LayerList({ view, container: layerListDiv.current });
      new Legend({ view, container: legendDiv.current });
      new Print({
        view: view, container: printDiv.current,
        // specify your own print service
        printServiceUrl:
          "https://arcgis.mma.gob.cl/server/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
      });
      new AreaMeasurement2D({ view, container: measureDiv.current });
      new Sketch({ view, layer: graphicsLayer, container: sketchDiv.current });
      new Swipe({ view, container: swipeDiv.current });
      new Slider({ container: sliderDiv.current, min: 0, max: 100, values: [50] });
      new Popup({ view, container: popupDiv.current });
      new NavigationToggle({ view, container: navigationDiv.current });
      new HistogramRangeSlider({ container: histogramDiv.current, min: 0, max: 100, values: [20, 80] });
      new FeatureTable({ view, layer: featureLayer, container: featureTableDiv.current });
      new Editor({ view, container: editorDiv.current });
      new DistanceMeasurement2D({ view, container: distanceDiv.current });
      new BasemapGallery({ view, container: basemapToggleDiv.current });
    });

    <arcgis-basemap-toggle view={view} />

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div className="esri-widget-manager">
      <div ref={mapDiv} style={{ width: '100%', height: '100vh', display: 'block' }} />

      {/* Dock tipo MacOS al centro abajo */}
      <div className={`dock-manager${visibleWidget ? ' dock-manager--active' : ''}`}>
        <button className="dock-btn" onClick={() => setVisibleWidget(visibleWidget === 'basemap' ? null : 'basemap')}>A</button>
        <button className="dock-btn" onClick={() => setVisibleWidget(visibleWidget === 'legend' ? null : 'legend')}>B</button>
        <button className="dock-btn" onClick={() => setVisibleWidget(visibleWidget === 'layerlist' ? null : 'layerlist')}>C</button>
        <button className="dock-btn" onClick={() => setVisibleWidget(visibleWidget === 'print' ? null : 'print')}>D</button>
        <button className="dock-btn" onClick={() => setVisibleWidget(visibleWidget === 'sketch' ? null : 'sketch')}>E</button>
        <button className="dock-btn" onClick={() => setVisibleWidget(visibleWidget === 'measurement' ? null : 'measurement')}>F</button>
      </div>
      <div className="custom-panel">
        <div className="bottom-right-panel position2" ref={zoomDiv} />
        <div className="bottom-right-panel" ref={homeDiv} />
        <div className="bottom-right-panel position3" ref={scaleBarDiv} /> 
        <div className="bottom-right-panel position3" ref={compassDiv} />

        <div className="top-center-search" ref={searchDiv} />

        {/* LayerList */}
        <div
          className="botom-center-panel"
          ref={layerListDiv}
          style={{ display: visibleWidget === 'layerlist' ? 'block' : 'none' }}
        />
        {/* Legend */}
        <div
          className="botom-center-panel"
          ref={legendDiv}
          style={{ display: visibleWidget === 'legend' ? 'block' : 'none' }}
        />
        {/* Print */}
        <div
          className="botom-center-panel"
          ref={printDiv}
          style={{ display: visibleWidget === 'print' ? 'block' : 'none' }}
        />
        {/* Measurement */}
        <div
          className="botom-center-panel"
          ref={measureDiv}
          style={{ display: visibleWidget === 'measurement' ? 'block' : 'none' }}
        />
        {/* Sketch */}
        <div
          className="botom-center-panel"
          ref={sketchDiv}
          style={{ display: visibleWidget === 'sketch' ? 'block' : 'none' }}
        />
        {/* BasemapToggle */}
        <div
          className="botom-center-panel"
          ref={basemapToggleDiv}
          style={{ display: visibleWidget === 'basemap' ? 'block' : 'none' }}
        />

        {/* El resto de widgets siguen igual, ocultos por defecto */}
        <div className="nodisplay" ref={swipeDiv} />
        <div className="nodisplay"  ref={sliderDiv} />
        <div className="nodisplay" ref={popupDiv} />
        <div className="nodisplay" ref={navigationDiv} />
        <div className="nodisplay"  ref={histogramDiv} />
        <div className="nodisplay" ref={featureTableDiv} />
        <div className="nodisplay" ref={editorDiv} />
        <div className="nodisplay" ref={distanceDiv} />
      </div>
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