import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import CompteRenduForm from "../components/CompteRenduForm";

interface ReportItem {
  id_cr: number;
  titre: string;
  date_reunion: string;
  notes: string;
  id_evt: number;
}

interface EventItem {
  id: number;
  titre: string;
}

export default function Reports() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // RÉCUPÉRATION - Port 8090
  const fetchReports = async () => {
    try {
      const [reportsRes, eventsRes] = await Promise.all([
        axios.get("http://localhost:8090/api/reports"),
        axios.get("http://localhost:8090/api/events")
      ]);
      setReports(reportsRes.data);
      setEvents(eventsRes.data);
    } catch (error) {
      console.error("Erreur de connexion au serveur (8090):", error);
    }
  };

  useEffect(() => { fetchReports(); }, []);

  // CRÉATION - Port 8090
  const handleAdd = async (data: any) => {
    const reportToSend = {
      titre: data.titre,
      date_reunion: data.date_reunion,
      notes: data.notes || "",
      id_evt: data.id_evt ? parseInt(data.id_evt) : null
    };

    try {
      await axios.post("http://localhost:8090/api/reports", reportToSend);
      fetchReports();
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Erreur serveur:", error.response?.data);
      alert("Erreur d'enregistrement sur le port 8090.");
    }
  };

  // SUPPRESSION - Port 8090
  const deleteReport = async (id: number) => {
    if (window.confirm("Supprimer ce compte rendu ?")) {
      try {
        await axios.delete(`http://localhost:8090/api/reports/${id}`);
        fetchReports();
      } catch (error) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  const getEventName = (eventId: number | null) => {
    if (!eventId) return "Événement supprimé";
    const event = events.find(e => e.id === eventId);
    return event?.titre || "Événement supprimé";
  };

  return (
    <Layout title="Comptes Rendus" searchTerm={searchTerm} onSearch={setSearchTerm}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-700">Suivi des décisions</h3>
        <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 text-white px-5 py-2 rounded-xl font-bold hover:bg-orange-600 transition-all">
          + Nouveau CR
        </button>
      </div>

      <div className="space-y-4">
        {reports
          .filter(r => r.titre?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      r.notes?.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(r => (
          <div key={r.id_cr} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-orange-500 uppercase">{getEventName(r.id_evt)}</span>
                <h4 className="text-lg font-bold text-gray-800">{r.titre}</h4>
                <p className="text-xs text-gray-400 mb-3">Réunion du {r.date_reunion}</p>
              </div>
              <button
                onClick={() => deleteReport(r.id_cr)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
            {r.notes && <p className="text-sm text-gray-600 line-clamp-2 italic">"{r.notes}"</p>}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <CompteRenduForm 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleAdd} 
          evenements={events} 
        />
      )}
    </Layout>
  );
}