import { useState } from "react";
import Layout from "../components/Layout";
import TransactionForm from "../components/TransactionForm";

export default function Budget() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Données des catégories et événements
  const categories = [
    {id: 1, nom_categorie: "Logistique"},
    {id: 2, nom_categorie: "Traiteur"},
    {id: 3, nom_categorie: "Décoration"},
    {id: 4, nom_categorie: "Animation"},
    {id: 5, nom_categorie: "Fournitures"}
  ];
  
  const evenements = [
    {id: 1, titre: "Budget Général"},
    {id: 2, titre: "Événement Été"}
  ];
  
  // Fonctions pour trouver les noms par ID
  const getCategoryName = (id: string | number) => {
    const cat = categories.find(c => c.id === Number(id));
    return cat ? cat.nom_categorie : "Non catégorisée";
  };
  
  const getEventName = (id: string | number) => {
    const evt = evenements.find(e => e.id === Number(id));
    return evt ? evt.titre : "Non lié";
  };
  
  // Données fictives pour l'affichage initial
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Achat Fournitures Bureau", montant: "150", type: "Débit", date: "2026-02-10", id_evt: 1, id_cat: 5, valide: true },
    { id: 2, description: "Subvention CSE Q1", montant: "5000", type: "Crédit", date: "2026-01-05", id_evt: 1, id_cat: 1, valide: true }
  ]);

  const handleAddTransaction = (data: any) => {
    const newTrans = { 
      id: Date.now(), 
      description: data.description, 
      montant: data.montant, 
      type: data.type, 
      date: data.date_mouvement, 
      id_evt: data.id_evt,
      id_cat: data.id_cat,
      valide: data.valide || false
    };
    setTransactions([newTrans, ...transactions]);
    setIsModalOpen(false);
  };

  return (
    <Layout title="Gestion Budgétaire 2026">
      
      {/* 1. LES JAUGES (Ton code original amélioré) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Budget CSE */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700 text-lg">Budget CSE Annuel</h3>
            <span className="text-sm font-semibold text-gray-500">Total : 20 000 €</span>
          </div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-green-600 font-bold">Consommé : 12 450 €</span>
            <span className="text-gray-400">Reste : 7 550 €</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-green-500 h-4 rounded-full" style={{ width: "62%" }}></div>
          </div>
        </div>

        {/* Frais fonctionnement */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700 text-lg">Frais de Fonctionnement</h3>
            <span className="text-sm font-semibold text-gray-500">Total : 5 000 €</span>
          </div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-orange-600 font-bold">Consommé : 4 100 €</span>
            <span className="text-gray-400">Reste : 900 €</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-orange-500 h-4 rounded-full" style={{ width: "82%" }}></div>
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
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 transition border-b border-gray-100 last:border-0">
                <td className="px-5 py-4">
                  <p className="font-bold text-gray-800">{t.description}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-medium">{getEventName(t.id_evt)}</p>
                </td>
                <td className="px-5 py-4 text-sm text-gray-500">{t.date}</td>
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-600 font-medium">{getCategoryName(t.id_cat)}</span>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${t.type === 'Crédit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {t.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${t.valide ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {t.valide ? "✓ OUI" : "⏳ NON"}
                  </span>
                </td>
                <td className={`px-5 py-4 text-right font-bold ${t.type === 'Crébit' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'Débit' ? '-' : '+'}{t.montant} €
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. MODALE DE TRANSACTION */}
      {isModalOpen && (
        <TransactionForm 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleAddTransaction}
          evenements={evenements}
          categories={categories}
        />
      )}

    </Layout>
  );
}