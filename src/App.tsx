import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Budget from './pages/Budget';
import Partners from './pages/Partners';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <Routes>
        {/* La page d'accueil (ton ancienne maquette.html) */}
        <Route path="/" element={<Dashboard />} />
        
        {/* La page liste des événements */}
        <Route path="/events" element={<Events />} />
        
        {/* La page gestion budget */}
        <Route path="/budget" element={<Budget />} />

        {/* La page partenaires */}
        <Route path="/partners" element={<Partners />} />

        {/* La page comptes rendus */}  
        <Route path="/reports" element={<Reports />} />

      </Routes>
    </Router>
  );
}

export default App;