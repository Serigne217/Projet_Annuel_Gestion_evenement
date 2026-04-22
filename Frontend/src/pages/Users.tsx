import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import UserForm from "../components/UserForm"; // Le formulaire qu'on a corrigé ensemble

interface User {
  id_user: number;
  nom: string;
  prenom: string;
  email: string;
  statut: string;
}

export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // 1. Charger les utilisateurs depuis le Backend (Port 8090)
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Fonction pour ajouter ou modifier un utilisateur
  const handleSaveUser = async (userData: any) => {
    try {
      if (editingUser?.id_user) {
        await axios.put(`http://localhost:8090/api/users/${editingUser.id_user}`, userData);
      } else {
        await axios.post("http://localhost:8090/api/users", userData);
      }
      fetchUsers();
      setIsModalOpen(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      alert("Erreur : l'opération n'a pas pu être effectuée.");
    }
  };

  const openEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <Layout title="Gestion des Utilisateurs">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-gray-600 font-medium">Membres de l'organisation</h3>
          <p className="text-sm text-gray-400">Gérez les accès et les responsables d'événements</p>
        </div>
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
              <th className="px-5 py-3 text-center text-xs font-bold text-gray-600 uppercase">Statut</th>
              <th className="px-5 py-3 text-center text-xs font-bold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id_user} className="hover:bg-gray-50 border-b border-gray-100">
                  <td className="px-5 py-4 text-sm">
                    <p className="font-bold text-gray-800">{user.prenom} {user.nom}</p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.statut === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.statut}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button onClick={() => openEditUser(user)} className="text-blue-400 hover:text-blue-600 transition-colors">
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-5 py-10 text-center text-gray-400 italic">
                  Aucun utilisateur trouvé dans la base de données.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 3. APPEL DU FORMULAIRE : C'est ici que l'erreur est corrigée */}
      {isModalOpen && (
        <UserForm 
          onClose={closeModal} 
          onSubmit={handleSaveUser} 
          initialData={editingUser}
          submitLabel={editingUser ? "Modifier" : "Créer"}
        />
      )}
    </Layout>
  );
}