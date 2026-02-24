import { useState } from "react";
import Layout from "../components/Layout";
import { fullEvents } from "../data/mockData";

export default function Events() {
  // 1. INITIALISATION DU STATE
  // On utilise 'events' pour stocker la liste qui va évoluer
  const [events, setEvents] = useState(fullEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // State pour les champs du formulaire
  const [formData, setFormData] = useState({
    label: "",
    date: "",
    location: "",
    organizer: "",
    budget: ""
  });

  // 2. LOGIQUE DE FILTRAGE
  // On filtre 'events' (le state) et non 'fullEvents' (la constante)
  const filteredEvents = events.filter((event) =>
    event.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. FONCTION D'AJOUT
  const handleCreate = () => {
    if (!formData.label) return; // Sécurité : nom obligatoire

    const newEvent = {
      id: Date.now(),
      label: formData.label,
      category: "Événement", // Valeur par défaut
      date: formData.date || "À définir",
      location: formData.location || "Non spécifié",
      organizer: formData.organizer || "Moi",
      status: "En attente",
      budget: formData.budget ? `${formData.budget} €` : "0 €",
      icon: "fa-calendar-plus",
      color: "blue" // Couleur pour les nouveaux
    };

    // On ajoute le nouvel event au DEBUT de la liste
    setEvents([newEvent, ...events]);
    
    // Fermeture et Reset
    setIsModalOpen(false);
    setFormData({ label: "", date: "", location: "", organizer: "", budget: "" });
  };

  // 4. FONCTION DE SUPPRESSION
  const deleteEvent = (id: number) => {
  // On demande une confirmation pour éviter les erreurs
  if (window.confirm("Voulez-vous vraiment supprimer cet événement ?")) {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  }
};

  return (
    <Layout title="Gestion des Événements" searchTerm={searchTerm} onSearch={setSearchTerm}>
      
      {/* BARRE DE RECHERCHE */}
      <div className="mb-6 relative max-w-md">
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-gray-400"></i>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      {/* BOUTON CRÉER */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-bold shadow-md transition-all flex items-center justify-center"
        >
          <i className="fa-solid fa-plus mr-2"></i>
          Nouvel Événement
        </button>
      </div>

      {/* TABLEAU DYNAMIQUE */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase">Nom</th>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase">Date & Lieu</th>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase">Organisateur</th>
              <th className="px-5 py-3 text-center text-xs font-bold text-gray-600 uppercase">Statut</th>
              <th className="px-5 py-3 text-right text-xs font-bold text-gray-600 uppercase">Budget</th>
              <th className="px-5 py-3 text-center text-xs font-bold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* ICI : On boucle sur filteredEvents (qui vient de notre state events) */}
            {filteredEvents.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 bg-${event.color}-100 text-${event.color}-600 rounded-lg flex items-center justify-center`}>
                      <i className={`fa-solid ${event.icon}`}></i>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 font-bold">{event.label}</p>
                      <p className="text-gray-500 text-xs">{event.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900">{event.date}</p>
                  <p className="text-gray-500 text-xs">{event.location}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900">{event.organizer}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    event.status === "Validé" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                  }`}>
                    {event.status}
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm text-right font-medium">
                  {event.budget}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2"
                    title="Supprimer"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALE DE CRÉATION */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Nouvel Événement</h3>
            <div className="space-y-3">
              <input type="text" placeholder="Nom de l'événement" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setFormData({...formData, label: e.target.value})} />
              <input type="date" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setFormData({...formData, date: e.target.value})} />
              <input type="text" placeholder="Lieu" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setFormData({...formData, location: e.target.value})} />
              <input type="text" placeholder="Organisateur" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setFormData({...formData, organizer: e.target.value})} />
              <input type="number" placeholder="Budget (€)" className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setFormData({...formData, budget: e.target.value})} />
              
              <div className="flex justify-end gap-2 mt-6">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">Annuler</button>
                <button onClick={handleCreate} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-bold">Créer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}