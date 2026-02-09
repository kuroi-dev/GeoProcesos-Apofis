// Panel DashboardGeoPro funcional (puede tener errores previos)
import React from 'react';
import EsriWidgetManager from '../../components/MapWidgets/EsriWidgetManager';
import ToolCard from '../../components/ToolCard';
import './dashboard-geoPro.css';

const DashboardGeoPro = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-map-area">
        <EsriWidgetManager />
      </div>
    
    </div>
  );
};

export default DashboardGeoPro;