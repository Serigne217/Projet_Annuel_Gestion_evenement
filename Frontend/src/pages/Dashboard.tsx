import { useState } from "react";
import Layout from "../components/Layout";
import { fullEvents as initialData } from "../data/mockData";

export default function Dashboard() {
  const [events, setEvents] = useState(initialData);

  const deleteEvent = (id: number) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  return (
    <Layout title="Tableau de Bord">
      {/* 1. Statistiques du haut */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
          <p className="text-sm text-gray-500">Budget Restant</p>
          <h3 className="text-2xl font-bold text-gray-800">12 450 €</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Événements ce mois</p>
          <h3 className="text-2xl font-bold text-gray-800">4 Actifs</h3>
        </div>
      </div>

      {/* 2. Grille principale */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-gray-700 mb-4">Événements Récents</h3>

          {/* Liste des événements */}
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                    {event.titre.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-gray-800">{event.titre}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    event.status === "Validé" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                  }`}>
                    {event.status}
                  </span>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Calendrier (Placeholder) */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-gray-700 mb-4">Calendrier</h3>
          <p className="text-gray-400 text-sm italic">Calendrier en cours de chargement...</p>
        </div>
      </div>
    </Layout>
  );
}