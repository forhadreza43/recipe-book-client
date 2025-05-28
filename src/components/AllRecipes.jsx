import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      fetch("https://recipe-book-app-server-chi.vercel.app/recipes")
        .then((res) => res.json())
        .then((data) => setRecipes(data));
    };
    fetchRecipes();
  }, []);
console.log(recipes);
  return (
    <div className="px-6 py-10">
      <h1 className="mb-6 text-center text-3xl font-bold">All Recipes</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="flex flex-col justify-between rounded-xl border p-4 shadow"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="mb-3 h-40 w-full rounded-md object-cover"
            />
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <p className="text-sm text-gray-600">Cuisine: {recipe.cuisine}</p>
            <p className="text-sm text-gray-600">
              Prep Time: {recipe.prepTime} mins
            </p>
            <p className="text-sm text-gray-600">Likes: {recipe.likes || 0}</p>
            <Link
              to={`/recipes/${recipe.id}`}
              className="mt-3 rounded bg-blue-500 py-2 text-center text-white hover:bg-blue-600"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
