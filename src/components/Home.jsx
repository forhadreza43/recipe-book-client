import { useEffect, useState } from "react";
import { Link } from "react-router";
import GlobalLoader from "../components/GlobalLoader";
import RecipeCard from "./RecipeCard";
import Hero from "./Hero";
import { PiChefHat } from "react-icons/pi";
import { IoIosTimer, IoMdTimer } from "react-icons/io";
import { MdOutlineFamilyRestroom } from "react-icons/md";

export default function Home() {
  const [topRecipes, setTopRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRecipes = async () => {
      try {
        const res = await fetch(
          "https://recipe-book-app-server-chi.vercel.app/top-recipes",
        );
        const data = await res.json();
        setTopRecipes(data);
      } catch (error) {
        console.error("Error fetching top recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopRecipes();
  }, []);

  if (loading) return <GlobalLoader />;

  return (
    <>
      <Hero />

      <section className="py-12">
        <h2 className="mb-8 text-center text-3xl font-bold">Top Recipes</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topRecipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/recipes"
            className="inline-block rounded bg-orange-600 px-6 py-3 text-lg text-white hover:bg-orange-700"
          >
            See All Recipes
          </Link>
        </div>
      </section>

      <section className="rounded-lg bg-orange-50 px-6 py-12">
        <h2 className="mb-6 text-center text-2xl font-bold">Why Choose Us?</h2>
        <div className="grid gap-6 text-center sm:grid-cols-2 md:grid-cols-3">
          <div>
            <PiChefHat size={64} className="mx-auto mb-3 h-16" />
            <h4 className="text-lg font-semibold">Expert-Approved Recipes</h4>
            <p className="text-sm text-gray-600">
              All recipes are tested by top chefs.
            </p>
          </div>
          <div>
            <IoIosTimer size={64} className="mx-auto mb-3 h-16" />
            <h4 className="text-lg font-semibold">Quick & Easy</h4>
            <p className="text-sm text-gray-600">
              Meals ready in under 30 minutes.
            </p>
          </div>
          <div>
            <MdOutlineFamilyRestroom className="mx-auto mb-3 h-16" size={64} />
            <h4 className="text-lg font-semibold">Family-Friendly</h4>
            <p className="text-sm text-gray-600">
              Perfect for all ages and occasions.
            </p>
          </div>
        </div>
      </section>
      <section className="px-6 py-12">
        <h2 className="mb-6 text-center text-2xl font-bold">Cooking Tips</h2>
        <div className="mx-auto max-w-3xl space-y-4 text-gray-700">
          <p>✔️ Always prep your ingredients before you start cooking.</p>
          <p>✔️ Taste as you go to adjust seasonings perfectly.</p>
          <p>✔️ Clean as you cook for a smoother experience.</p>
        </div>
      </section>
    </>
  );
}
