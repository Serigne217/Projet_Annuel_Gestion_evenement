import { useState } from 'react';

interface EventFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function EventForm({ onClose, onSubmit }: EventFormProps) {
  const [formData, setFormData] = useState({
    titre: '',
    date_debut: '',
    date_fin: '',
    lieu: '',
    categorie: 'Innovation',
    description: '',
    budget_alloue: '',
    statut: 'En attente'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
          <h3 className="font-bold text-orange-500 uppercase text-sm tracking-widest">
            <i className="fa-solid fa-calendar-plus mr-2"></i> Nouvel Événement
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form className="p-6 space-y-4 max-h-[80vh] overflow-y-auto" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Titre</label>
            <input 
              type="text" 
              required 
              placeholder="ex: Séminaire d'hiver"
              className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={(e) => setFormData({...formData, titre: e.target.value})} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date Début</label>
              <input 
                type="date" 
                required 
                className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={(e) => setFormData({...formData, date_debut: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date Fin</label>
              <input 
                type="date" 
                className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={(e) => setFormData({...formData, date_fin: e.target.value})} 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Lieu</label>
            <input 
              type="text" 
              placeholder="ex: Salle de conférence, Paris"
              className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={(e) => setFormData({...formData, lieu: e.target.value})} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Catégorie</label>
              <select 
                className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={(e) => setFormData({...formData, categorie: e.target.value})}
              >
                <option value="Innovation">Innovation</option>
                <option value="Cohésion">Cohésion</option>
                <option value="Formation">Formation</option>
                <option value="Réunion">Réunion</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Budget (€)</label>
              <input 
                type="number" 
                step="0.01"
                placeholder="0.00"
                className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={(e) => setFormData({...formData, budget_alloue: e.target.value})} 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
            <textarea 
              placeholder="Détails de l'événement..."
              rows={2}
              className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 font-bold hover:text-slate-600">
              ANNULER
            </button>
            <button type="submit" className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 shadow-lg transition-all">
              CRÉER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
