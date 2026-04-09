import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import PartenaireForm from "../components/PartenaireForm";

interface PartenaireItem {
  id_partenaire: number;
  nom: string;
  type_activite: string;
  contact: string;
  adresse: string;
}

export default function Partners() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partners, setPartners] = useState<PartenaireItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // RÉCUPÉRATION - Port 8090
  const fetchPartners = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/partners");
      setPartners(response.data);
    } catch (error) {
      console.error("Erreur de connexion au serveur (8090):", error);
    }
  };

  useEffect(() => { fetchPartners(); }, []);

  // CRÉATION - Port 8090
  const handleAdd = async (data: any) => {
    const partnerToSend = {
      nom: data.nom,
      type_activite: data.type_activite || "Non spécifié",
      contact: data.contact || "",
      adresse: data.adresse || ""
    };

    try {
      await axios.post("http://localhost:8090/api/partners", partnerToSend);
      fetchPartners();
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Erreur serveur:", error.response?.data);
      alert("Erreur d'enregistrement sur le port 8090.");
    }
  };

  // SUPPRESSION - Port 8090
  const deletePartner = async (id: number) => {
    if (window.confirm("Supprimer ce partenaire ?")) {
      try {
        await axios.delete(`http://localhost:8090/api/partners/${id}`);
        fetchPartners();
      } catch (error) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  return (
    <Layout title="Partenaires & Prestataires" searchTerm={searchTerm} onSearch={setSearchTerm}>
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-500">Gérez vos contacts et fournisseurs externes.</p>
        <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-orange-600 transition-all">
          + Ajouter un partenaire
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {partners
          .filter(p => p.nom?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      p.type_activite?.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(p => (
          <div key={p.id_partenaire} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xl">
                  {p.nom.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-800">{p.nom}</h4>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 uppercase font-bold">{p.type_activite || "Non spécifié"}</span>
                </div>
              </div>
              <button
                onClick={() => deletePartner(p.id_partenaire)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              {p.contact && <p><i className="fa-solid fa-phone mr-2 text-gray-400"></i> {p.contact}</p>}
              {p.adresse && <p><i className="fa-solid fa-location-dot mr-2 text-gray-400"></i> {p.adresse}</p>}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && <PartenaireForm onClose={() => setIsModalOpen(false)} onSubmit={handleAdd} />}
    </Layout>
  );
}