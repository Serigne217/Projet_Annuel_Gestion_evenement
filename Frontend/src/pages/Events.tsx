import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import EventForm from "../components/EventForm";

interface EventItem {
  id: number;
  titre: string;
  date_debut: string;
  date_fin?: string;
  lieu: string;
  statut: string;
  budget_alloue: number;
  categorie: string;
}

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // RÉCUPÉRATION - Port 8090
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Erreur de connexion au serveur (8090):", error);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  // CRÉATION / MODIFICATION - Port 8090
  const handleCreateOrEdit = async (data: any) => {
    const eventToSend = {
      titre: data.titre,
      date_debut: data.date_debut,
      date_fin: data.date_fin || null,
      lieu: data.lieu || "Non spécifié",
      categorie: data.categorie || "Général",
      description: data.description || "",
      budget_alloue: data.budget_alloue ? parseFloat(data.budget_alloue) : 0,
      ...(editingEvent?.id ? {} : { statut: "À venir" }), // Statut seulement à la création
      id_responsable: data.id_responsable ? parseInt(data.id_responsable) : 1
    };

    try {
      if (editingEvent?.id) {
        // Modification - le backend recalculera le statut
        await axios.put(`http://localhost:8090/api/events/${editingEvent.id}`, eventToSend);
      } else {
        // Création - initialise le statut à "À venir"
        await axios.post("http://localhost:8090/api/events", eventToSend);
      }
      fetchEvents();
      setIsModalOpen(false);
      setEditingEvent(null);
    } catch (error: any) {
      console.error("Erreur serveur:", error.response?.data);
      alert("Erreur d'enregistrement sur le port 8090.");
    }
  };

  // SUPPRESSION - Port 8090
  const deleteEvent = async (id: number) => {
    if (window.confirm("Supprimer cet événement ?")) {
      try {
        await axios.delete(`http://localhost:8090/api/events/${id}`);
        fetchEvents();
      } catch (error) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  // Ouverture du formulaire en mode création
  const openCreateForm = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  // Ouverture du formulaire en mode édition
  const openEditForm = (event: EventItem) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  // Fermeture du modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  return (
    <Layout title="Gestion des Événements" searchTerm={searchTerm} onSearch={setSearchTerm}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-600 font-medium">Liste des projets</h3>
        <button onClick={openCreateForm} className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-orange-600 transition-all">
          + Nouvel Événement
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-bold uppercase text-gray-500">Événement</th>
              <th className="px-5 py-3 text-left text-xs font-bold uppercase text-gray-500">Dates</th>
              <th className="px-5 py-3 text-center text-xs font-bold uppercase text-gray-500">Statut</th>
              <th className="px-5 py-3 text-right text-xs font-bold uppercase text-gray-500">Budget</th>
              <th className="px-5 py-3 text-center text-xs font-bold uppercase text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.filter(e => e.titre?.toLowerCase().includes(searchTerm.toLowerCase())).map((event) => (
              <tr key={event.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 font-bold text-gray-800">{event.titre}</td>
                <td className="px-5 py-4 text-sm text-gray-600">
                  Du {event.date_debut} au {event.date_fin || '...'}
                </td>
                <td className="px-5 py-4 text-center">
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
                    {event.statut}
                  </span>
                </td>
                <td className="px-5 py-4 text-right font-medium">{event.budget_alloue} €</td>
                <td className="px-5 py-4 text-center space-x-2">
                  <button onClick={() => openEditForm(event)} className="text-blue-400 hover:text-blue-600 transition-colors">
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  <button onClick={() => deleteEvent(event.id)} className="text-red-400 hover:text-red-600 transition-colors">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <EventForm onClose={closeModal} onSubmit={handleCreateOrEdit} initialData={editingEvent || undefined} />
      )}
    </Layout>
  );
}