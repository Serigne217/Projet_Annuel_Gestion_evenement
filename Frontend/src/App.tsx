import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Budget from './pages/Budget';
import Partners from './pages/Partners';
import Reports from './pages/Reports';
import Users from './pages/Users'; // À CRÉER
import Categories from './pages/Categories'; // À CRÉER

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/reports" element={<Reports />} />
        
        {/* Nouvelles routes pour accéder aux autres formulaires via leurs pages */}
        <Route path="/users" element={<Users />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </Router>
  );
}

export default App;