import React, { useEffect, useState } from 'react';
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-home";


const TestWidgetMap = () => {
  const [printKey, setPrintKey] = useState(0);

 

  const handleResetPrint = () => {
    setPrintKey(k => k + 1);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#222' }}>
      <button
        style={{ position: 'absolute', top: 20, right: 20, zIndex: 2000 }}
        onClick={handleResetPrint}
      >
        Resetear impresora
      </button>
      <arcgis-map item-id="d6d830a7184f4971b8a2f42cd774d9a7">
        <arcgis-print position="bottom-right" allowed-formats="png32,png8,jpg" allowed-layouts="a3-landscape,a4-landscape" show-print-area-enabled></arcgis-print>
      </arcgis-map>
    </div>
  );
};

export default TestWidgetMap;
