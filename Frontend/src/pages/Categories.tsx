import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import CategoryForm from "../components/CategoryForm";

interface Category {
  id_cat: number;
  nom_categorie: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Récupération des catégories depuis le Backend (Port 8090)
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSaveCategory = async (data: any) => {
    try {
      if (editingCategory?.id_cat) {
        await axios.put(`http://localhost:8090/api/categories/${editingCategory.id_cat}`, data);
      } else {
        await axios.post("http://localhost:8090/api/categories", data);
      }
      fetchCategories();
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      alert("Erreur lors de l'enregistrement de la catégorie");
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
      try {
        await axios.delete(`http://localhost:8090/api/categories/${id}`);
        fetchCategories();
      } catch (error) {
        alert("Erreur lors de la suppression de la catégorie");
      }
    }
  };

  const openEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingCategory(null);
    setIsModalOpen(false);
  };

  return (
    <Layout title="Catégories de Budget">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-gray-600 font-medium">Gestion des types de dépenses</h3>
          <p className="text-sm text-gray-400">Définissez les catégories pour vos transactions</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-orange-600 transition-all"
        >
          + Nouvelle Catégorie
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div key={cat.id_cat} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mr-3">
                  <i className="fa-solid fa-tag"></i>
                </div>
                <span className="font-bold text-gray-700">{cat.nom_categorie}</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => openEditCategory(cat)} className="text-blue-400 hover:text-blue-600 transition-colors">
                  <i className="fa-solid fa-pencil"></i>
                </button>
                <button onClick={() => handleDeleteCategory(cat.id_cat)} className="text-gray-300 hover:text-red-500 transition-colors">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 py-10 text-center text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed">
            Aucune catégorie définie. Cliquez sur le bouton pour en ajouter une.
          </div>
        )}
      </div>

      {/* Affichage du formulaire modal */}
      {isModalOpen && (
        <CategoryForm 
          onClose={closeModal} 
          onSubmit={handleSaveCategory} 
          initialData={editingCategory ? { nom_categorie: editingCategory.nom_categorie } : undefined}
          submitLabel={editingCategory ? "Modifier" : "Ajouter"}
        />
      )}
    </Layout>
  );
}