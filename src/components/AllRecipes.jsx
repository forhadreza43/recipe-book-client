import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          "https://recipe-book-app-server-chi.vercel.app/recipes",
        );
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="px-6 py-10">
      <h1 className="mb-6 text-center text-3xl font-bold">All Recipes</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
