const MyRecipeCard = ({ recipe, setSelectedRecipe, handleDelete }) => {
  return (
    <>
      <div className="flex flex-col justify-between rounded-lg border border-orange-300 p-4 shadow">
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
            <strong>Time:</strong> {recipe.time} mins
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
    </>
  );
};

export default MyRecipeCard;