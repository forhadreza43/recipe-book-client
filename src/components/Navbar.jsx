import { Link, NavLink, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-orange-600 font-semibold"
      : "text-gray-700 hover:text-orange-500";

  return (
    <nav className="px-4 py-3 shadow-md">
      <div className="flex items-center justify-between bg-white w-11/12 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold text-orange-600">
          Recipe Book
        </Link>

        <div className="flex items-center gap-6">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/recipes" className={navLinkClasses}>
            All Recipes
          </NavLink>
          <NavLink to="/addRecipe" className={navLinkClasses}>
            Add Recipe
          </NavLink>
          <NavLink to="/myRecipe" className={navLinkClasses}>
            My Recipes
          </NavLink>
        </div>

        <div className="relative">
          {!user ? (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded border border-orange-500 px-4 py-2 text-orange-500 hover:bg-orange-50"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              <img
                src={
                  user.photoURL ||
                  "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                }
                alt="avatar"
                className="h-10 w-10 cursor-pointer rounded-full border-2 border-orange-500"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded border border-orange-200 bg-white shadow-lg">
                  <div className="border-b border-b-orange-200 px-4 py-2 text-gray-800">
                    {user.displayName}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
