import { useState } from "react";
import Layout from "../components/Layout";
import PartenaireForm from "../components/PartenaireForm";
import { Partenaire } from "../types/Partenaire";

export default function Partners() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partners, setPartners] = useState<Partenaire[]>([
    new Partenaire(1, "Traiteur Saveurs", "Restauration", "06 12 34 56 78", "123 Rue de Paris, 75000 Paris"),
    new Partenaire(2, "LocaEvent", "Location matériel", "contact@loca.fr", "456 Avenue Lyon, 69000 Lyon")
  ]);

  const handleAdd = (data: any) => {
    const newPartner = new Partenaire(
      Date.now(),
      data.nom,
      data.type_activite,
      data.contact,
      data.adresse
    );
    setPartners([...partners, newPartner]);
    setIsModalOpen(false);
  };

  return (
    <Layout title="Partenaires & Prestataires">
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-500">Gérez vos contacts et fournisseurs externes.</p>
        <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg">
          + Ajouter un partenaire
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {partners.map(p => (
          <div key={p.id_partenaire} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 transition-all">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xl">
                {p.nom.charAt(0)}
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-gray-800">{p.nom}</h4>
                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 uppercase font-bold">{p.type_activite}</span>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p><i className="fa-solid fa-phone mr-2 text-gray-400"></i> {p.contact}</p>
              <p><i className="fa-solid fa-location-dot mr-2 text-gray-400"></i> {p.adresse}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && <PartenaireForm onClose={() => setIsModalOpen(false)} onSubmit={handleAdd} evenements={[]} />}
    </Layout>
  );
}