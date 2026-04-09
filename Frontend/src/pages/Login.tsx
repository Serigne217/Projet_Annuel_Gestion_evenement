import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Récupérer tous les utilisateurs
      const response = await axios.get('http://localhost:8090/api/users');
      const users = response.data;

      // Trouver l'utilisateur avec les bonnes credentials
      const user = users.find((u: any) =>
        u.email === formData.email && u.mot_de_passe === formData.mot_de_passe
      );

      if (user) {
        // Connecter l'utilisateur via le contexte
        login(user);
        navigate('/');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-slate-800 p-8 text-center">
          <div className="text-4xl font-bold text-orange-500 mb-2">
            <i className="fa-solid fa-calendar-check mr-2"></i>
            EventManager
          </div>
          <p className="text-slate-300 text-sm">Connectez-vous à votre compte</p>
        </div>

        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="votre.email@exemple.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Mot de passe</label>
            <input
              type="password"
              required
              value={formData.mot_de_passe}
              onChange={(e) => setFormData({...formData, mot_de_passe: e.target.value})}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Connexion...
              </span>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        <div className="px-8 pb-8 text-center">
          <p className="text-sm text-gray-600">
            Comptes de test disponibles :
          </p>
          <div className="mt-2 text-xs text-gray-500 space-y-1">
            <div>Admin: jean.dupont@email.com / password123</div>
            <div>User: marie.martin@email.com / password123</div>
          </div>
        </div>
      </div>
    </div>
  );
}