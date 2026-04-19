import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import EnConstruccion from './pages/EnConstruccion/EnConstruccion'
import DashboardGeoPro from './pages/Dashboard/dashboard-geoPro'
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
  // Buscar token en URL o en location.state
  const auth = params.get('token') || location.state?.token;

  cleanExpiredTokens();

  const tokenIndex = tokenMemory.findIndex(t => t.value === auth);

  if (auth && tokenIndex === -1) {
    if (tokenMemory.length < 5) {
      tokenMemory.push({ value: auth, timestamp: Date.now() });
    }
  }

  const validTokenIndex = tokenMemory.findIndex(t => t.value === auth);

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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/en-construccion" element={<EnConstruccion />} />


        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardGeoPro />
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  )
}

export default App