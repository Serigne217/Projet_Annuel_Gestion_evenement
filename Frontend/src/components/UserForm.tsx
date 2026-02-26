import { useState } from 'react';

interface UserFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function UserForm({ onClose, onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    statut: 'Actif'
  });

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
          <h3 className="font-bold text-orange-500 uppercase text-sm tracking-widest">Nouvel Utilisateur</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
        </div>

        <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Nom" required className="w-full p-2.5 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setFormData({...formData, nom: e.target.value})} />
            <input type="text" placeholder="Prénom" required className="w-full p-2.5 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setFormData({...formData, prenom: e.target.value})} />
          </div>
          <input type="email" placeholder="Email Professionnel" required className="w-full p-2.5 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Mot de passe" required className="w-full p-2.5 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setFormData({...formData, mot_de_passe: e.target.value})} />
          
          <select className="w-full p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-orange-500" required
            onChange={(e) => setFormData({...formData, statut: e.target.value})}>
            <option value="Actif">Actif</option>
            <option value="Inactif">Inactif</option>
            <option value="Suspendu">Suspendu</option>
          </select>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-400 font-bold">ANNULER</button>
            <button type="submit" className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold">CRÉER</button>
          </div>
        </form>
      </div>
    </div>
  );
}