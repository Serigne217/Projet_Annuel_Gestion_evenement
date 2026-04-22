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
    type: 'Dépense',
    montant: '',
    description: '',
    id_evt: '',
    id_cat: '',
    id_partenaire: '',
    valide: false
  });

  // Debug logging
  console.log('TransactionForm props:', { evenements, categories });

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
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setFormData({...formData, date_mouvement: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
              <select required className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}>
                <option value="Dépense">Débit (Dépense)</option>
                <option value="Recette">Crédit (Recette)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Montant (€)</label>
            <input type="number" min="0.01" step="0.01" required className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              value={formData.montant}
              onChange={(e) => setFormData({...formData, montant: String(Math.abs(parseFloat(e.target.value) || 0))})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Catégorie</label>
              <select required className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.id_cat}
                onChange={(e) => setFormData({...formData, id_cat: e.target.value})}>
                <option value="">Sélectionner...</option>
                {Array.isArray(categories) && categories.length > 0 ? (
                  categories.map((cat: any) => (
                    <option key={cat.id_cat} value={cat.id_cat}>{cat.nom_categorie}</option>
                  ))
                ) : (
                  <option disabled>Aucune catégorie disponible</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Événement</label>
              <select required className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.id_evt}
                onChange={(e) => setFormData({...formData, id_evt: e.target.value})}>
                <option value="">Sélectionner...</option>
                {Array.isArray(evenements) && evenements.length > 0 ? (
                  evenements.map((evt: any) => (
                    <option key={evt.id} value={evt.id}>{evt.titre}</option>
                  ))
                ) : (
                  <option disabled>Aucun événement disponible</option>
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
            <textarea className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" rows={2}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="valide" className="w-4 h-4"
              checked={formData.valide}
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