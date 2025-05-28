import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
console.log(id);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://recipe-book-app-server-chi.vercel.app/recipes/${id}`,
        );
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);
  console.log(recipe);
  if (loading) return <div className="mt-10 text-center">Loading...</div>;

  if (!recipe) return <div className="mt-10 text-center">Recipe not found</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="mb-6 h-64 w-full rounded-lg object-cover"
      />
      <h1 className="mb-2 text-3xl font-bold">{recipe.title}</h1>
      <p className="mb-1 text-gray-600">
        <strong>Cuisine:</strong> {recipe.cuisine}
      </p>
      <p className="mb-1 text-gray-600">
        <strong>Prep Time:</strong> {recipe.prepTime} minutes
      </p>
      <p className="mb-1 text-gray-600">
        <strong>Likes:</strong> {recipe.likes || 0}
      </p>
      <p className="mb-1 text-gray-600">
        <strong>Categories:</strong> {recipe.categories?.join(", ")}
      </p>
      <p className="mb-4 text-gray-600">
        <strong>Added by:</strong> {recipe.user?.name || "Anonymous"}
      </p>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Ingredients:</h2>
        <p className="whitespace-pre-line">{recipe.ingredients}</p>
      </div>

      <div>
        <h2 className="mb-2 text-xl font-semibold">Instructions:</h2>
        <p className="whitespace-pre-line">{recipe.instructions}</p>
      </div>
    </div>
  );
}
