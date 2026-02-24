import { useState } from "react";
import Layout from "../components/Layout";
import EventForm from "../components/EventForm";
import { fullEvents } from "../data/mockData";

// 1. DÉFINITION DE L'INTERFACE (Pour supprimer les erreurs de type)
interface EventItem {
  id: number;
  titre: string;
  category: string;
  date: string;
  date_fin?: string;
  location: string;
  status: string;
  budget: string;
  icon?: string;
  color?: string;
}

export default function Events() {
  // On précise que c'est un tableau d'EventItem
  const [events, setEvents] = useState<EventItem[]>(fullEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // 2. FILTRAGE SÉCURISÉ
  const filteredEvents = events.filter((event) => {
    const nameToSearch = event.titre || "";
    return nameToSearch.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // 3. LOGIQUE D'AJOUT
  const handleCreate = (data: any) => {
    const newEvent: EventItem = {
      id: Date.now(),
      titre: data.titre,
      category: data.categorie,
      date: data.date_debut,
      date_fin: data.date_fin,
      location: data.lieu || "Non spécifié",
      status: data.statut || "En attente",
      budget: data.budget_alloue ? `${data.budget_alloue} €` : "0 €",
      icon: "fa-calendar-check",
      color: "orange"
    };

    setEvents([newEvent, ...events]);
  };

  const deleteEvent = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet événement ?")) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  return (
    <Layout title="Gestion des Événements" searchTerm={searchTerm} onSearch={setSearchTerm}>
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-600 font-medium text-lg">Liste des projets</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-bold shadow-md flex items-center"
        >
          <i className="fa-solid fa-plus mr-2"></i> Nouvel Événement
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase">Événement</th>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase">Dates & Lieu</th>
              <th className="px-5 py-3 text-center text-xs font-bold text-gray-600 uppercase">Statut</th>
              <th className="px-5 py-3 text-right text-xs font-bold text-gray-600 uppercase">Budget</th>
              <th className="px-5 py-3 text-center text-xs font-bold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50 transition">
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                      <i className={`fa-solid ${event.icon || 'fa-calendar'}`}></i>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 font-bold">{event.titre}</p>
                      <p className="text-gray-500 text-xs">{event.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 text-sm">
                  <p className="text-gray-900">Du {event.date} au {event.date_fin || '...'}</p>
                  <p className="text-gray-500 text-xs">{event.location}</p>
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
                  <button onClick={() => deleteEvent(event.id)} className="text-red-400 hover:text-red-600">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALE */}
      {isModalOpen && (
        <EventForm 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleCreate}
        />
      )}
    </Layout>
  );
}