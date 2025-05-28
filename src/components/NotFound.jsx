import { Link } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-orange-50 px-6 text-center">
      <FaUtensils className="mb-4 animate-bounce text-6xl text-orange-500" />
      <h1 className="mb-2 text-6xl font-bold text-orange-600">404</h1>
      <h2 className="mb-4 text-2xl font-semibold text-orange-500">
        Page Not Found
      </h2>
      <p className="mb-6 max-w-md text-gray-600">
        Oops! Looks like the recipe you're looking for got overcooked or never
        existed.
      </p>
      <Link
        to="/"
        className="rounded-full bg-orange-500 px-6 py-3 text-lg font-medium text-white transition hover:bg-orange-600"
      >
        Go Back Home
      </Link>
    </div>
  );
}
