import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import GlobalLoader from "./GlobalLoader";
import { cuisineTypes } from "../utils/utils";

const cuisineOptions = ["All", ...cuisineTypes];
export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/recipes");
        const data = await response.json();
        setRecipes(data);
        setFilteredRecipes(data); // Initial state
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (selectedCuisine === "All") {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter((recipe) => recipe.cuisine === selectedCuisine),
      );
    }
  }, [selectedCuisine, recipes]);

  if (loading) {
    return <GlobalLoader mini />;
  }

  return (
    <div className="px-6 py-10">
      <div className="flex justify-between">
        <h1 className="mb-6 text-center text-3xl font-bold">All Recipes</h1>

        <div className="mb-6 text-center">
          <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="rounded border border-orange-300 px-4 py-2 shadow focus:outline-none"
          >
            {cuisineOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
