import Layout from "../components/Layout";

export default function Budget() {
  return (
    
    <Layout title="Gestion Budgétaire 2026">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-700">Historique des Dépenses</h3>
        </div>
        <table className="min-w-full leading-normal">
            {/* Insère ici le <thead> et <tbody> de ton fichier budget.html original */}
            {/* Attention : change class en className et style="width:X" en style={{width: "X"}} */}
        </table>
      </div>
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
    </Layout>
  );
}