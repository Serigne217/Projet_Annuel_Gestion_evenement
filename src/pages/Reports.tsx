import { useState } from "react";
import Layout from "../components/Layout";
import CompteRenduForm from "../components/CompteRenduForm";

export default function Reports() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reports, setReports] = useState([
    { id: 1, titre: "Réunion Préparatoire Noël", date_reunion: "2026-02-15", contenu: "Validation du traiteur et du budget décoration.", event: "Arbre de Noël" }
  ]);

  const handleAdd = (data: any) => {
    setReports([{ id: Date.now(), ...data, event: "Événement lié" }, ...reports]);
    setIsModalOpen(false);
  };

  return (
    <Layout title="Comptes Rendus">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-700">Suivi des décisions</h3>
        <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 text-white px-5 py-2 rounded-xl font-bold">
          + Nouveau CR
        </button>
      </div>

      <div className="space-y-4">
        {reports.map(r => (
          <div key={r.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-orange-500 uppercase">{r.event}</span>
                <h4 className="text-lg font-bold text-gray-800">{r.titre}</h4>
                <p className="text-xs text-gray-400 mb-3">Réunion du {r.date_reunion}</p>
              </div>
              <button className="text-gray-400 hover:text-blue-500"><i className="fa-solid fa-file-pdf"></i></button>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 italic">"{r.contenu}"</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <CompteRenduForm 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleAdd} 
          evenements={[{id: 1, titre: "Arbre de Noël"}]} 
        />
      )}
    </Layout>
  );
}