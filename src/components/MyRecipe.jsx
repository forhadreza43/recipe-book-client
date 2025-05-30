import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import UpdateRecipeModal from "./UpdateRecipeModal";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import NoRecipesFound from "./NoRecipesFound";

export default function MyRecipes() {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/recipes`);
        const data = await response.json();
        const usersData = data.filter((rec) => rec.userEmail === user.email);
        setRecipes(usersData);
      } catch (error) {
        toast.error("Failed to fetch your recipes.");
        console.log(error.message);
      }
    };
    fetchUserRecipes();
  }, [recipes, user.email]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `https://recipe-book-app-server-chi.vercel.app/recipes/${id}`,
            {
              method: "DELETE",
            },
          );
          if (res.ok) {
            setRecipes((prev) => prev.filter((r) => r._id !== id));
            toast.success("Recipe deleted.");
          } else {
            toast.error("Failed to delete recipe.");
          }
        } catch {
          toast.error("Something went wrong.");
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleUpdate = (updatedRecipe) => {
    setRecipes((prev) =>
      prev.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r)),
    );
    setSelectedRecipe(null);
  };

  return (
    <div className="px-6 py-10">
      {recipes.length === 0 ? (
        <NoRecipesFound />
      ) : (
        <>
          <h1 className="mb-6 text-center text-3xl font-bold">My Recipes</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="rounded-lg border border-orange-300 p-4 shadow flex flex-col justify-between">
                <div>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="h-40 w-full rounded object-cover"
                  />
                  <h2 className="mt-2 text-xl font-semibold">{recipe.title}</h2>
                  <p>
                    <strong>Cuisine:</strong> {recipe.cuisine}
                  </p>
                  <p>
                    <strong>Time:</strong> {recipe.prepTime} mins
                  </p>
                  <p>
                    <strong>Likes:</strong> {recipe.likes}
                  </p>
                  <p>
                    <strong>Category:</strong> {recipe.categories?.join(", ")}
                  </p>
                  <p>
                    <strong>Ingredients:</strong> {recipe.ingredients}
                  </p>
                  <p>
                    <strong>Instructions:</strong> {recipe.instructions}
                  </p>
                </div>
                <div className="mt-2 flex justify-between">
                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="rounded bg-orange-500 px-3 py-1 text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="rounded bg-red-500 px-3 py-1 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {selectedRecipe && (
            <UpdateRecipeModal
              recipe={selectedRecipe}
              onClose={() => setSelectedRecipe(null)}
              onUpdate={handleUpdate}
            />
          )}
        </>
      )}
    </div>
  );
}
