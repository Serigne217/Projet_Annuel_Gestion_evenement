import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Budget from './pages/Budget';
import Partners from './pages/Partners';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Categories from './pages/Categories';
import Login from './pages/Login';

function AppContent() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Login onLogin={(user) => {}} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/events" element={<Events />} />
      <Route path="/budget" element={<Budget />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/users" element={<Users />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/login" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;