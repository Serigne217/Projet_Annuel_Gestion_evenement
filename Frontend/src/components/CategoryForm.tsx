import { useState } from 'react';

interface CatFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CategoryForm({ onClose, onSubmit }: CatFormProps) {
  const [nom, setNom] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TRÈS IMPORTANT : La clé doit être "nom_categorie" pour correspondre au Backend
    onSubmit({ nom_categorie: nom });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-700 flex items-center gap-2">
            <i className="fa-solid fa-tags text-orange-500"></i>
            Nouvelle Catégorie
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Formulaire */}
        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
              Nom de la catégorie
            </label>
            <input 
              type="text" 
              placeholder="ex: Logistique, Communication..." 
              required 
              autoFocus
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              value={nom}
              onChange={(e) => setNom(e.target.value)} 
            />
          </div>

          <div className="flex flex-col gap-2">
            <button 
              type="submit" 
              className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold shadow-lg shadow-orange-100 hover:bg-orange-600 hover:-translate-y-0.5 transition-all"
            >
              AJOUTER LA CATÉGORIE
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className="w-full py-2 text-sm text-gray-400 font-medium hover:text-gray-600"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}