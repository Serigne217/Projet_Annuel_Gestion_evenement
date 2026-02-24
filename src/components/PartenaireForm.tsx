import { useState } from 'react';

interface PartenaireFormProps {
  onClose: () => void;
  onSubmit: (data: { nom: string; type_activite: string; contact: string; adresse: string }) => void;
  evenements?: any[];
}

export default function PartenaireForm({ onClose, onSubmit }: PartenaireFormProps) {
  const [formData, setFormData] = useState({
    nom: '',
    type_activite: '',
    contact: '',
    adresse: ''
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
            <i className="fa-solid fa-handshake mr-2"></i> Ajouter un Partenaire
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nom du Partenaire</label>
            <input 
              type="text" 
              required 
              placeholder="ex: Traiteur Royal"
              className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={(e) => setFormData({...formData, nom: e.target.value})} 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type d'Activité</label>
            <input 
              type="text" 
              required 
              placeholder="ex: Restauration, Technique, Transport..."
              className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={(e) => setFormData({...formData, type_activite: e.target.value})} 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Contact</label>
            <input 
              type="text" 
              required 
              placeholder="ex: 01 23 45 67 89 ou contact@email.com"
              className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={(e) => setFormData({...formData, contact: e.target.value})} 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Adresse</label>
            <input 
              type="text" 
              placeholder="ex: 123 Rue de Paris, 75000 Paris"
              className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={(e) => setFormData({...formData, adresse: e.target.value})} 
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 font-bold hover:text-slate-600">
              ANNULER
            </button>
            <button type="submit" className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 shadow-lg transition-all">
              AJOUTER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}