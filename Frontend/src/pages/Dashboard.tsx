import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

interface EventItem {
  id: number;
  titre: string;
  date_debut: string;
  date_fin?: string;
  statut: string;
  budget_alloue: number;
}

interface TransactionItem {
  id_transac: number;
  date_mouvement: string;
  type: string;
  montant: number;
  description: string;
  valide: boolean;
  id_evt: number;
  id_cat: number;
  id_partenaire: number;
}

export default function Dashboard() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);

  // RÉCUPÉRATION - Port 8090
  const fetchData = async () => {
    try {
      const [eventsRes, transRes] = await Promise.all([
        axios.get("http://localhost:8090/api/events"),
        axios.get("http://localhost:8090/api/transactions")
      ]);
      setEvents(eventsRes.data);
      setTransactions(transRes.data);
    } catch (error) {
      console.error("Erreur de connexion au serveur (8090):", error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Calcul du budget total
  const totalBudget = events.reduce((sum, evt) => sum + (evt.budget_alloue || 0), 0);
  const totalDepenses = transactions
    .filter(t => t.type === "Dépense" && t.valide)
    .reduce((sum, t) => sum + t.montant, 0);
  const budgetRestant = totalBudget - totalDepenses;

  // Événements actifs (à venir)
  const activeEvents = events.filter((e) => {
    const eventDate = new Date(e.date_debut);
    const today = new Date();
    return eventDate >= today;
  });

  const deleteEvent = async (id: number) => {
    if (window.confirm("Supprimer cet événement ?")) {
      try {
        await axios.delete(`http://localhost:8090/api/events/${id}`);
        fetchData();
      } catch (error) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  return (
    <Layout title="Tableau de Bord">
      {/* 1. Statistiques du haut */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
          <p className="text-sm text-gray-500">Budget Restant</p>
          <h3 className="text-2xl font-bold text-gray-800">{budgetRestant.toFixed(2)} €</h3>
          <p className="text-xs text-gray-400 mt-2">Dépenses: {totalDepenses.toFixed(2)} € / {totalBudget.toFixed(2)} €</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Événements à venir</p>
          <h3 className="text-2xl font-bold text-gray-800">{activeEvents.length} Actifs</h3>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Budget Total</p>
          <h3 className="text-2xl font-bold text-gray-800">{totalBudget.toFixed(2)} €</h3>
        </div>
      </div>

      {/* 2. Grille principale */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-gray-700 mb-4">Événements Récents</h3>

          {/* Liste des événements */}
          <div className="space-y-4">
            {activeEvents.length > 0 ? (
              activeEvents.slice(0, 5).map((event) => (
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
                      <p className="text-xs text-gray-500">{event.date_debut}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      event.statut === "À venir" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {event.statut}
                    </span>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm italic">Aucun événement à venir</p>
            )}
          </div>
        </div>

        {/* 3. Top transactions validées */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-gray-700 mb-4">Dernières Transactions</h3>
          <div className="space-y-4">
            {transactions.filter(t => t.valide).length > 0 ? (
              transactions
                .filter(t => t.valide)
                .sort((a, b) => new Date(b.date_mouvement).getTime() - new Date(a.date_mouvement).getTime())
                .slice(0, 5)
                .map((trans) => (
                <div
                  key={trans.id_transac}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      trans.type === "Dépense" ? "bg-red-500" : "bg-green-500"
                    }`}>
                      <i className={`fa-solid ${trans.type === "Dépense" ? "fa-arrow-down" : "fa-arrow-up"}`}></i>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{trans.description || trans.type}</p>
                      <p className="text-xs text-gray-500">{trans.date_mouvement}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${trans.type === "Dépense" ? "text-red-600" : "text-green-600"}`}>
                    {trans.type === "Dépense" ? "-" : "+"}{trans.montant.toFixed(2)} €
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm italic">Aucune transaction validée</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}