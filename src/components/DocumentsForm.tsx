import { useState } from 'react';

interface DocFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  evenements?: any[];
}

export default function DocumentForm({ onClose, onSubmit, evenements }: DocFormProps) {
  const [formData, setFormData] = useState({ 
    nom_fichier: '', 
    type_document: 'Facture', 
    file: null as File | null,
    id_evt: '',
    id_transac: '',
    id_cr: ''
  });

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
          <h3 className="font-bold text-orange-500 text-sm uppercase">Ajouter un document</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
        </div>
        <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nom du document</label>
            <input type="text" placeholder="ex: Facture_janvier.pdf" required className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setFormData({...formData, nom_fichier: e.target.value})} />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type de document</label>
            <select className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500" 
              onChange={(e) => setFormData({...formData, type_document: e.target.value})}>
              <option value="Facture">Facture</option>
              <option value="Devis">Devis</option>
              <option value="Contrat">Contrat</option>
              <option value="Rapport">Rapport</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Lier à un événement (optionnel)</label>
            <select className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setFormData({...formData, id_evt: e.target.value})}>
              <option value="">Aucun</option>
              {evenements && evenements.map((evt: any) => (
                <option key={evt.id} value={evt.id}>{evt.titre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Fichier</label>
            <input type="file" required className="w-full p-2 border border-dashed rounded-lg bg-gray-50 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" 
              onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})} />
          </div>

          <button type="submit" className="w-full py-2.5 bg-orange-500 text-white rounded-lg font-bold mt-4 hover:bg-orange-600 transition-all">TÉLÉVERSER</button>
        </form>
      </div>
    </div>
  );
}