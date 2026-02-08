import React from 'react';
import EsriWidgetManager from '../../components/MapWidgets/EsriWidgetManager';
import './dashboard-geoPro.css';

const DashboardGeoPro = () => {
  return (
    <div className="dashboard-container">
      <EsriWidgetManager />
    </div>
  );
};

export default DashboardGeoPro;