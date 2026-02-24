import { useState } from 'react';

interface CatFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function CategoryForm({ onClose, onSubmit }: CatFormProps) {
  const [nom, setNom] = useState('');

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-gray-700">Nouvelle Catégorie Budget</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><i className="fa-solid fa-xmark"></i></button>
        </div>
        <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit({ nom }); }}>
          <input type="text" placeholder="ex: Logistique, Traiteur..." required className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setNom(e.target.value)} />
          <button type="submit" className="w-full py-2.5 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-all">
            AJOUTER LA CATÉGORIE
          </button>
        </form>
      </div>
    </div>
  );
}