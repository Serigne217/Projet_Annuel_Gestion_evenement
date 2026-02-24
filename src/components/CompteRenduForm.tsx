import { useState } from 'react';

interface CRFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  evenements: any[];
}

export default function CompteRenduForm({ onClose, onSubmit, evenements }: CRFormProps) {
  const [formData, setFormData] = useState({
    titre: '',
    date_reunion: new Date().toISOString().split('T')[0],
    notes: '',
    id_evt: ''
  });

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
          <h3 className="font-bold text-orange-500 uppercase text-sm tracking-widest"><i className="fa-solid fa-file-lines mr-2"></i>Nouveau Compte Rendu</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition"><i className="fa-solid fa-xmark"></i></button>
        </div>

        <form className="p-6 space-y-4 max-h-[80vh] overflow-y-auto" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Événement lié</label>
            <select required className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={(e) => setFormData({...formData, id_evt: e.target.value})}>
              <option value="">Sélectionner un événement...</option>
              {evenements.map((evt: any) => <option key={evt.id} value={evt.id}>{evt.titre}</option>)}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date de la réunion</label>
            <input type="date" required className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              value={formData.date_reunion}
              onChange={(e) => setFormData({...formData, date_reunion: e.target.value})} />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Titre</label>
            <input type="text" placeholder="Titre de la réunion" required className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={(e) => setFormData({...formData, titre: e.target.value})} />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Notes / Compte rendu</label>
            <textarea placeholder="Détails de la réunion..." rows={3} className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={(e) => setFormData({...formData, notes: e.target.value})}></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 font-bold hover:text-slate-600">ANNULER</button>
            <button type="submit" className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 shadow-lg transition-all">ENREGISTRER</button>
          </div>
        </form>
      </div>
    </div>
  );
}