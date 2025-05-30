import { useState } from "react";
import toast from "react-hot-toast";

const cuisineTypes = ["Italian", "Mexican", "Indian", "Chinese", "Others"];
const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];

export default function UpdateRecipeModal({ recipe, onClose, onUpdate }) {
  const [formData, setFormData] = useState({ ...recipe });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://recipe-book-app-server-chi.vercel.app/recipes/${recipe._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (res.ok) {
        const updated = await res.json();
        toast.success("Recipe updated!");
        onUpdate(updated);
      } else {
        toast.error("Update failed.");
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 dark:bg-gray-700/50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900">
        <h2 className="mb-4 text-xl font-bold dark:text-gray-200">
          Update Recipe
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="input-field"
            required
          />

          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={formData.title}
            onChange={handleChange}
            className="input-field"
            required
          />

          <textarea
            name="ingredients"
            placeholder="Ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="input-field"
            required
          />

          <textarea
            name="instructions"
            placeholder="Instructions"
            value={formData.instructions}
            onChange={handleChange}
            className="input-field"
            required
          />
          <select
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select Cuisine Type</option>
            {cuisineTypes.map((type) => (
              <option
                key={type}
                className="bg-white text-black dark:bg-gray-800 dark:text-gray-200"
              >
                {type}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="time"
            placeholder="Preparation Time (minutes)"
            value={formData.time}
            onChange={handleChange}
            className="input-field"
            required
          />
          <div>
            <p className="mb-2 font-medium dark:text-gray-200">Categories:</p>
            <div className="flex flex-wrap gap-4">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 dark:text-gray-200"
                >
                  <input
                    type="checkbox"
                    name="categories"
                    className=""
                    value={cat}
                    checked={formData.categories.includes(cat)}
                    onChange={handleChange}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded bg-gray-300 px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded bg-orange-600 px-4 py-2 text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
