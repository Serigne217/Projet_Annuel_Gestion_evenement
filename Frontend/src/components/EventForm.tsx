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
    statut: 'En attente',
    id_responsable: '1' // On l'ajoute ici
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
          <h3 className="font-bold text-orange-500 uppercase text-sm tracking-widest">Détails de l'Événement</h3>
          <button onClick={onClose} type="button" className="text-slate-400 hover:text-white">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form className="p-6 space-y-4 max-h-[85vh] overflow-y-auto" onSubmit={handleSubmit}>
          {/* Titre */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Titre de l'événement *</label>
            <input 
              type="text" required value={formData.titre}
              className="w-full p-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setFormData({...formData, titre: e.target.value})} 
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date Début *</label>
              <input 
                type="date" required value={formData.date_debut}
                className="w-full p-2 bg-gray-50 border rounded-lg outline-none"
                onChange={(e) => setFormData({...formData, date_debut: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date Fin</label>
              <input 
                type="date" value={formData.date_fin}
                className="w-full p-2 bg-gray-50 border rounded-lg outline-none"
                onChange={(e) => setFormData({...formData, date_fin: e.target.value})} 
              />
            </div>
          </div>

          {/* Lieu et Responsable */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Lieu</label>
              <input 
                type="text" value={formData.lieu}
                className="w-full p-2 bg-gray-50 border rounded-lg outline-none"
                onChange={(e) => setFormData({...formData, lieu: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Responsable (ID) *</label>
              <select 
                value={formData.id_responsable}
                className="w-full p-2 bg-gray-50 border rounded-lg outline-none"
                onChange={(e) => setFormData({...formData, id_responsable: e.target.value})}
              >
                <option value="1">Administrateur (ID 1)</option>
              </select>
            </div>
          </div>

          {/* Budget et Statut */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Budget (€)</label>
              <input 
                type="number" step="0.01" value={formData.budget_alloue}
                className="w-full p-2 bg-gray-50 border rounded-lg outline-none"
                onChange={(e) => setFormData({...formData, budget_alloue: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Statut</label>
              <select 
                value={formData.statut}
                className="w-full p-2 bg-gray-50 border rounded-lg outline-none"
                onChange={(e) => setFormData({...formData, statut: e.target.value})}
              >
                <option value="En attente">En attente</option>
                <option value="Validé">Validé</option>
                <option value="Terminé">Terminé</option>
                <option value="Annulé">Annulé</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
            <textarea 
              rows={3} value={formData.description}
              className="w-full p-2 bg-gray-50 border rounded-lg outline-none"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 font-bold">ANNULER</button>
            <button type="submit" className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold shadow-lg">ENREGISTRER</button>
          </div>
        </form>
      </div>
    </div>
  );
}