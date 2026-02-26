import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const { pathname } = useLocation();
  
  const linkClass = (path: string) => 
    `flex items-center p-3 rounded-lg transition ${
      pathname === path ? 'bg-orange-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-700'
    }`;

  return (
    <div className="w-64 bg-slate-800 text-white flex flex-col hidden md:flex h-screen sticky top-0">
      <div className="p-6 text-2xl font-bold text-orange-500">
        <i className="fa-solid fa-calendar-check mr-2" /> EventManager
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-bold text-slate-500 uppercase px-3 mb-2 tracking-widest">Menu Principal</p>
        
        <Link to="/" className={linkClass('/')}>
          <i className="fa-solid fa-chart-line w-6" /> Tableau de bord
        </Link>
        
        <Link to="/events" className={linkClass('/events')}>
          <i className="fa-solid fa-calendar-day w-6" /> Événements
        </Link>

        <p className="text-[10px] font-bold text-slate-500 uppercase px-3 mt-6 mb-2 tracking-widest">Finance & Suivi</p>
        
        <Link to="/budget" className={linkClass('/budget')}>
          <i className="fa-solid fa-euro-sign w-6" /> Transactions
        </Link>

        <Link to="/categories" className={linkClass('/categories')}>
          <i className="fa-solid fa-tags w-6" /> Catégories Budget
        </Link>

        <p className="text-[10px] font-bold text-slate-500 uppercase px-3 mt-6 mb-2 tracking-widest">Relations & Docs</p>

        <Link to="/partners" className={linkClass('/partners')}>
          <i className="fa-solid fa-handshake w-6" /> Partenaires
        </Link>

        <Link to="/reports" className={linkClass('/reports')}>
          <i className="fa-solid fa-file-lines w-6" /> Comptes Rendus
        </Link>

        <p className="text-[10px] font-bold text-slate-500 uppercase px-3 mt-6 mb-2 tracking-widest">Administration</p>

        <Link to="/users" className={linkClass('/users')}>
          <i className="fa-solid fa-users-gear w-6" /> Utilisateurs
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-xs">A</div>
          <div className="ml-3">
            <p className="text-sm font-medium">Antoisse</p>
            <p className="text-[10px] text-slate-400">Administrateur</p>
          </div>
        </div>
      </div>
    </div>
  );
}