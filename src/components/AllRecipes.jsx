import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import GlobalLoader from "./GlobalLoader";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/recipes");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [recipes]);

  if (loading) {
    return <GlobalLoader mini />;
  }

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
