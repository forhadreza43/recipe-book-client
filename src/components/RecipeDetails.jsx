import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import GlobalLoader from "./GlobalLoader";

export default function RecipeDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://recipe-book-app-server-chi.vercel.app/recipes/${id}`,
        );
        const data = await response.json();
        setRecipe(data);
        setLikeCount(data.likes || 0);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleLike = async () => {
    if (user?.email === recipe.userEmail) {
      toast.error("You can't like your own recipe!");
      return;
    }

    try {
      const response = await fetch(
        `https://recipe-book-app-server-chi.vercel.app/recipes/${id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
        },
      );
      if (response.ok) {
        const updatedRecipe = await response.json();
        setLikeCount(updatedRecipe.likes);
        toast.success("You liked the recipe!");
      } else {
        toast.error("Failed to like the recipe.");
      }
    } catch (error) {
      console.error("Error liking recipe:", error);
      toast.error("Something went wrong.");
    }
  };

  if (loading) return <GlobalLoader mini={true} />;

  if (!recipe) return <div className="mt-10 text-center">Recipe not found</div>;

  return (
    <div className="mx-auto py-10">
      <p className="mb-4 text-xl font-semibold text-orange-500">
        {likeCount} people interested in this recipe
      </p>

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
        <strong>Likes:</strong> {likeCount}
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

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Instructions:</h2>
        <p className="whitespace-pre-line">{recipe.instructions}</p>
      </div>

      <button
        onClick={handleLike}
        className="mt-4 rounded bg-orange-500 px-6 py-2 text-white hover:bg-orange-600 disabled:cursor-not-allowed"
        disabled={user?.email === recipe.userEmail}
      >
        Like
      </button>
    </div>
  );
}
