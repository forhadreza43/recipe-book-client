import { useEffect, useState } from "react";
import { Link } from "react-router";
import GlobalLoader from "../components/GlobalLoader";
import RecipeCard from "./RecipeCard";
import Hero from "./Hero";
import { LuChefHat } from "react-icons/lu";
import { SiCodechef } from "react-icons/si";
import { PiChefHat } from "react-icons/pi";
import { IoIosTimer, IoMdTimer } from "react-icons/io";
import { MdOutlineFamilyRestroom } from "react-icons/md";

export default function Home() {
  const [topRecipes, setTopRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRecipes = async () => {
      try {
        const res = await fetch("http://localhost:3000/top-recipes");
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
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
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

      
    </>
  );
}
