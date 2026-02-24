import { useState } from "react";
import Layout from "../components/Layout";
import UserForm from "../components/UserForm"; // Import du formulaire

export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, nom: "Dupont", prenom: "Jean", email: "jean@societe.com", role: "Admin", statut: "Actif" }
  ]);

  const handleAddUser = (data: any) => {
    const newUser = { id: Date.now(), ...data };
    setUsers([...users, newUser]);
  };

  return (
    <Layout title="Gestion des Utilisateurs">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-600 font-medium">Membres de l'organisation</h3>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-orange-600 transition-all"
        >
          <i className="fa-solid fa-user-plus mr-2"></i> Ajouter un membre
        </button>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase">Utilisateur</th>
              <th className="px-5 py-3 text-left text-xs font-bold text-gray-600 uppercase">Rôle</th>
              <th className="px-5 py-3 text-center text-xs font-bold text-gray-600 uppercase">Statut</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 border-b border-gray-100">
                <td className="px-5 py-4 text-sm">
                  <p className="font-bold text-gray-800">{user.prenom} {user.nom}</p>
                  <p className="text-gray-500 text-xs">{user.email}</p>
                </td>
                <td className="px-5 py-4 text-sm text-gray-700">{user.role}</td>
                <td className="px-5 py-4 text-sm text-center">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                    {user.statut}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AFFICHER LE FORMULAIRE SI MODALE OUVERTE */}
      {isModalOpen && (
        <UserForm 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleAddUser} 
        />
      )}
    </Layout>
  );
}