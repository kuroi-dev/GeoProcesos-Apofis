import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import EnConstruccion from './pages/EnConstruccion/EnConstruccion'
import DashboardGeoPro from './pages/Dashboard/dashboard-geoPro'
import TestWidgetMap from './pages/TestWidgetMap';
import './App.css'

// Componente de ruta protegida por parámetro en la URL
import { useLocation } from 'react-router-dom';

// Memoria temporal de tokens (máximo 5) con expiración
const tokenMemory = [];

function cleanExpiredTokens() {
  const now = Date.now();
  // Elimina tokens expirados
  for (let i = tokenMemory.length - 1; i >= 0; i--) {
    if (now - tokenMemory[i].timestamp > 30 * 60 * 1000) {
      tokenMemory.splice(i, 1);
    }
  }
}

function ProtectedRoute({ children }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const auth = params.get('auth');

  cleanExpiredTokens();

  // Buscar token en memoria
  const tokenIndex = tokenMemory.findIndex(t => t.value === auth);

  // Si el token existe y no está en memoria, lo agregamos
  if (auth && tokenIndex === -1) {
    if (tokenMemory.length < 5) {
      tokenMemory.push({ value: auth, timestamp: Date.now() });
    }
  }

  // Recalcular index por si se acaba de agregar
  const validTokenIndex = tokenMemory.findIndex(t => t.value === auth);

  // Solo permitimos acceso si el token está en memoria y hay menos de 6
  if (auth && validTokenIndex !== -1 && tokenMemory.length <= 5) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/en-construccion" element={<EnConstruccion />} />


        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardGeoPro />
          </ProtectedRoute>
        } />


        
        <Route path="/test-widget-map" element={<TestWidgetMap />} />
      </Routes>
    </Router>
  )
}

export default App