import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import EnConstruccion from './pages/EnConstruccion/EnConstruccion'
import DashboardGeoPro from './pages/Dashboard/dashboard-geoPro'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/en-construccion" element={<EnConstruccion />} />
        <Route path="/dashboard" element={<DashboardGeoPro />} />
      </Routes>
    </Router>
  )
}

export default App