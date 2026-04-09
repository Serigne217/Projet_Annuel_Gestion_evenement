import Sidebar from "./Sidebar";
import { useAuth } from "../contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  searchTerm?: string;
  onSearch?: (value: string) => void;
}

export default function Layout({ children, title, searchTerm, onSearch }: LayoutProps) {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <div className="flex items-center space-x-3">
            <div className="relative text-gray-400 focus-within:text-gray-600">
              <i className="fa-solid fa-magnifying-glass absolute top-3 left-3"></i>
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => onSearch?.(e.target.value)}
                className="py-2 pl-10 pr-4 bg-gray-100 rounded-full text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-200 transition"
              />
            </div>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              <i className="fa-solid fa-sign-out-alt mr-2"></i>
              Déconnexion
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
        {/* Affichage de l'utilisateur connecté en bas à gauche */}
        {user && (
          <footer className="bg-white border-t border-gray-200 px-8 py-4">
            <div className="flex items-center text-sm text-gray-600">
              <i className="fa-solid fa-user-circle text-gray-400 mr-3 text-lg"></i>
              <div>
                <span className="font-medium text-gray-800">
                  {user.prenom} {user.nom}
                </span>
                <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                  {user.type_utilisateur || 'Utilisateur'}
                </span>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}