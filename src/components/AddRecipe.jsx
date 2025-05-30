import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { cuisineTypes } from "../utils/utils";
const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"];

export default function AddRecipe() {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    ingredients: "",
    instructions: "",
    cuisine: "",
    time: "",
    categories: [],
    likes: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        categories: checked
          ? [...prev.categories, value]
          : prev.categories.filter((cat) => cat !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = {
      ...formData,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      createdAt: Timestamp.now(),
    };

    try {
      fetch("https://recipe-book-app-server-chi.vercel.app/recipes", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.insertedId) {
            toast.success("Recipe added successfully!");
            setFormData({
              image: "",
              title: "",
              ingredients: "",
              instructions: "",
              cuisine: "",
              time: "",
              categories: [],
              likes: 0,
            });
          }
        });
    } catch (error) {
      toast.error("Failed to add recipe");
      console.error(error);
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-3xl rounded border border-orange-300 p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">Add a New Recipe</h2>
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
            <option key={type}>{type}</option>
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
          <p className="mb-2 font-medium">Categories:</p>
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2">
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

        <button
          type="submit"
          className="cursor-pointer rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}
