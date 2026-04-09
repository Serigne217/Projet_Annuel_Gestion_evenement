import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import TransactionForm from "../components/TransactionForm";

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

interface CategoryItem {
  id_cat: number;
  nom_categorie: string;
}

interface EventItem {
  id: number;
  titre: string;
}

export default function Budget() {
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // RÉCUPÉRATION - Port 8090
  const fetchData = async () => {
    try {
      const [transRes, catRes, eventsRes, partnersRes] = await Promise.all([
        axios.get("http://localhost:8090/api/transactions"),
        axios.get("http://localhost:8090/api/categories"),
        axios.get("http://localhost:8090/api/events"),
        axios.get("http://localhost:8090/api/partners")
      ]);
      setTransactions(transRes.data);
      setCategories(catRes.data);
      setEvents(eventsRes.data);
      setPartners(partnersRes.data);
    } catch (error) {
      console.error("Erreur de connexion au serveur (8090):", error);
    }
  };

  // CRÉATION - Port 8090
  const handleCreateTransaction = async (data: any) => {
    try {
      const transactionToSend = {
        date_mouvement: data.date_mouvement,
        type: data.type === 'Débit' ? 'Dépense' : 'Recette',
        montant: parseFloat(data.montant),
        description: data.description,
        valide: data.valide,
        id_evt: parseInt(data.id_evt),
        id_cat: parseInt(data.id_cat),
        id_partenaire: data.id_partenaire ? parseInt(data.id_partenaire) : null
      };

      await axios.post("http://localhost:8090/api/transactions", transactionToSend);
      fetchData(); // Recharger les données
    } catch (error) {
      console.error("Erreur lors de la création:", error);
    }
  };

  // CHARGEMENT DES DONNÉES AU MONTAGE
  useEffect(() => {
    fetchData();
  }, []);

  // Calcul des statistiques
  const getTotalBudget = () => {
    const depenses = transactions
      .filter(t => t.type === "Dépense" && t.valide)
      .reduce((sum, t) => sum + t.montant, 0);
    return depenses;
  };

  const getReceipts = () => {
    return transactions
      .filter(t => t.type === "Recette" && t.valide)
      .reduce((sum, t) => sum + t.montant, 0);
  };

  const getCategoryName = (id: number) => {
    const cat = categories.find(c => c.id_cat === id);
    return cat ? cat.nom_categorie : "Non catégorisée";
  };

  const totalReceipts = getReceipts();
  const totalExpenses = getTotalBudget();
  const budgetRemaining = 25000 - totalExpenses;

  return (
    <Layout title="Gestion Budgétaire 2026" searchTerm={searchTerm} onSearch={setSearchTerm}>
      
      {/* 1. LES JAUGES (Ton code original amélioré) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Budget Total */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700 text-lg">Budget Total</h3>
            <span className="text-sm font-semibold text-gray-500">25 000 €</span>
          </div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-red-600 font-bold">Dépenses : {totalExpenses.toFixed(2)} €</span>
            <span className="text-gray-400">Reste : {budgetRemaining.toFixed(2)} €</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-red-500 h-4 rounded-full" style={{ width: `${(totalExpenses / 25000) * 100}%` }}></div>
          </div>
        </div>

        {/* Recettes */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700 text-lg">Recettes</h3>
          </div>
          <div className="text-3xl font-bold text-green-600">{totalReceipts.toFixed(2)} €</div>
          <p className="text-xs text-gray-400 mt-2">Crédits validés</p>
        </div>

        {/* Solde */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700 text-lg">Solde Net</h3>
          </div>
          <div className={`text-3xl font-bold ${(totalReceipts - totalExpenses) >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            {(totalReceipts - totalExpenses).toFixed(2)} €
          </div>
        </div>
      </div>

      {/* 2. TABLEAU DES TRANSACTIONS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-700 uppercase text-xs tracking-wider">Historique des Flux Financiers</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition-all"
          >
            + Nouvelle Transaction
          </button>
        </div>
        
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-white border-b border-gray-200">
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase">Désignation</th>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase">Date</th>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase">Catégorie</th>
              <th className="px-5 py-3 text-center text-xs font-bold text-gray-400 uppercase">Type</th>
              <th className="px-5 py-3 text-center text-xs font-bold text-gray-400 uppercase">Validée</th>
              <th className="px-5 py-3 text-right text-xs font-bold text-gray-400 uppercase">Montant</th>
            </tr>
          </thead>
          <tbody>
            {transactions
              .filter(t => t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          getCategoryName(t.id_cat)?.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((t) => (
              <tr key={t.id_transac} className="hover:bg-gray-50 transition border-b border-gray-100 last:border-0">
                <td className="px-5 py-4">
                  <p className="font-bold text-gray-800">{t.description || "---"}</p>
                </td>
                <td className="px-5 py-4 text-sm text-gray-500">{t.date_mouvement}</td>
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-600 font-medium">{getCategoryName(t.id_cat)}</span>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${t.type === 'Recette' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {t.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${t.valide ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {t.valide ? "✓ OUI" : "⏳ NON"}
                  </span>
                </td>
                <td className={`px-5 py-4 text-right font-bold ${t.type === 'Recette' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'Dépense' ? '-' : '+'}{t.montant.toFixed(2)} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL FORMULAIRE TRANSACTION */}
      {isModalOpen && (
        <TransactionForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={(data) => {
            handleCreateTransaction(data);
            setIsModalOpen(false);
          }}
          evenements={events}
          categories={categories}
        />
      )}

    </Layout>
  );
}