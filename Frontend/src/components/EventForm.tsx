import { useState, useEffect } from 'react';
import axios from 'axios';

interface EventFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: {
    id?: number;
    titre?: string;
    date_debut?: string;
    date_fin?: string;
    lieu?: string;
    categorie?: string;
    description?: string;
    budget_alloue?: number;
    id_responsable?: number;
  };
}

interface User {
  id_user: number;
  nom: string;
  prenom: string;
  email: string;
  statut: string;
}

export default function EventForm({ onClose, onSubmit, initialData }: EventFormProps) {
  const [formData, setFormData] = useState({
    titre: initialData?.titre || '',
    date_debut: initialData?.date_debut || '',
    date_fin: initialData?.date_fin || '',
    lieu: initialData?.lieu || '',
    categorie: initialData?.categorie || 'Innovation',
    description: initialData?.description || '',
    budget_alloue: initialData?.budget_alloue ? String(initialData.budget_alloue) : '',
    statut: 'À venir',
    id_responsable: initialData?.id_responsable ? String(initialData.id_responsable) : ''
  });

  const [administrators, setAdministrators] = useState<User[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des dates
    if (formData.date_debut && formData.date_fin) {
      const startDate = new Date(formData.date_debut);
      const endDate = new Date(formData.date_fin);

      if (startDate >= endDate) {
        alert('La date de début doit être antérieure à la date de fin.');
        return;
      }
    }

    onSubmit(formData);
  };
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Fonction pour obtenir la date/heure minimum pour la fin (début + 1 minute)
  const getMinEndDateTime = () => {
    if (!formData.date_debut) return getCurrentDateTime();
    const startDate = new Date(formData.date_debut);
    const minEndDate = new Date(startDate.getTime() + 60000); // +1 minute
    const year = minEndDate.getFullYear();
    const month = String(minEndDate.getMonth() + 1).padStart(2, '0');
    const day = String(minEndDate.getDate()).padStart(2, '0');
    const hours = String(minEndDate.getHours()).padStart(2, '0');
    const minutes = String(minEndDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Charger les administrateurs
  useEffect(() => {
    const fetchAdministrators = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/users');
        // Filtrer les administrateurs (ceux qui ont type_utilisateur = 'Admin' ou 'Administrateur')
        const admins = response.data.filter((user: any) =>
          user.type_utilisateur === 'Admin' || user.type_utilisateur === 'Administrateur'
        );
        setAdministrators(admins);
      } catch (error) {
        console.error('Erreur lors du chargement des administrateurs:', error);
      }
    };
    fetchAdministrators();
  }, []);

  // Mettre à jour formData quand initialData change
  useEffect(() => {
    if (initialData?.id) {
      setFormData({
        titre: initialData.titre || '',
        date_debut: initialData.date_debut || '',
        date_fin: initialData.date_fin || '',
        lieu: initialData.lieu || '',
        categorie: initialData.categorie || 'Innovation',
        description: initialData.description || '',
        budget_alloue: initialData.budget_alloue ? String(initialData.budget_alloue) : '',
        statut: 'À venir',
        id_responsable: initialData.id_responsable ? String(initialData.id_responsable) : ''
      });
    }
  }, [initialData?.id]);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
          <h3 className="font-bold text-orange-500 uppercase text-sm tracking-widest">{initialData?.id ? 'Modifier' : 'Créer'} l'Événement</h3>
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

          {/* Dates avec heures */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date & Heure Début *</label>
              <input 
                type="datetime-local" required value={formData.date_debut}
                min={getCurrentDateTime()}
                className="w-full p-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setFormData({...formData, date_debut: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date & Heure Fin</label>
              <input 
                type="datetime-local" value={formData.date_fin}
                min={getMinEndDateTime()}
                className="w-full p-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
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
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Responsable *</label>
              <select 
                required
                value={formData.id_responsable}
                className="w-full p-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setFormData({...formData, id_responsable: e.target.value})}
              >
                <option value="">Sélectionner un administrateur</option>
                {administrators.map((admin) => (
                  <option key={admin.id_user} value={admin.id_user}>
                    {admin.prenom} {admin.nom} ({admin.email})
                  </option>
                ))}
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
                className="w-full p-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setFormData({...formData, statut: e.target.value})}
              >
                <option value="À venir">À venir</option>
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