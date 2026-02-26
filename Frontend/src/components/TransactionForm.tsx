// src/components/TransactionForm.tsx

import { useState } from 'react';

interface TransactionFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  evenements: any[];
  categories?: any[];
}

export default function TransactionForm({ onClose, onSubmit, evenements, categories }: TransactionFormProps) {
  const [formData, setFormData] = useState({
    date_mouvement: new Date().toISOString().split('T')[0],
    type: 'Débit',
    montant: '',
    description: '',
    id_evt: '',
    id_cat: '',
    id_partenaire: '',
    valide: false
  });

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
          <h3 className="font-bold text-orange-500 uppercase text-sm tracking-widest">Nouvelle Transaction</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
        </div>

        <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
              <input type="date" required className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.date_mouvement}
                onChange={(e) => setFormData({...formData, date_mouvement: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
              <select className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={(e) => setFormData({...formData, type: e.target.value})}>
                <option value="Débit">Débit (Dépense)</option>
                <option value="Crédit">Crédit (Recette)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Montant (€)</label>
            <input type="number" step="0.01" required className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={(e) => setFormData({...formData, montant: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Catégorie</label>
              <select required className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={(e) => setFormData({...formData, id_cat: e.target.value})}>
                <option value="">Sélectionner...</option>
                {categories && categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>{cat.nom_categorie || cat.nom}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Événement</label>
              <select required className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={(e) => setFormData({...formData, id_evt: e.target.value})}>
                <option value="">Sélectionner...</option>
                {evenements.map((evt: any) => (
                  <option key={evt.id} value={evt.id}>{evt.titre}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
            <textarea className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" rows={2}
              onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="valide" className="w-4 h-4"
              onChange={(e) => setFormData({...formData, valide: e.target.checked})} />
            <label htmlFor="valide" className="text-xs font-bold text-slate-500 uppercase">Validée</label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 font-bold">ANNULER</button>
            <button type="submit" className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold">ENREGISTRER</button>
          </div>
        </form>
      </div>
    </div>
  );
}