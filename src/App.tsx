import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Budget from './pages/Budget';

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
      </Routes>
    </Router>
  );
}

export default App;