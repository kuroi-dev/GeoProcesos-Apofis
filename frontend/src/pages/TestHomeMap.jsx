import React, { useEffect } from 'react';
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-home";

const TestHomeMap = () => {
  useEffect(() => {
    // Patch arcgis-home button for centering
    function patchHomeButton() {
      const homeEl = document.querySelector('arcgis-home');
      if (!homeEl) return;
      const shadowRoot = homeEl.shadowRoot;
      if (shadowRoot) {
        let btn = shadowRoot.querySelector('button');
        if (btn) {
          btn.className = '';
          btn.setAttribute('style', 'padding-left:0px !important;margin:0 auto !important;justify-content:center !important;width:100% !important;display:flex !important;align-items:center !important;');
          const icon = btn.querySelector('calcite-icon');
          if (icon) {
            icon.setAttribute('style', 'margin:0 auto !important;display:flex !important;align-items:center !important;justify-content:center !important;');
          }
        }
      }
    }
    const observer = new MutationObserver(() => {
      patchHomeButton();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    patchHomeButton();
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#222' }}>
      <arcgis-map item-id="45b3b2fb35e94ab09381d0caa0da5946">
        <arcgis-home slot="top-left"></arcgis-home>
    </arcgis-map>
    </div>
  );
};

export default TestHomeMap;
