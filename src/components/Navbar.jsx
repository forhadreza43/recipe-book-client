import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "text-orange-600 font-semibold"
      : "text-gray-700 hover:text-orange-500 dark:text-gray-200";

  return (
    <nav className="bg-white shadow-md dark:border-b dark:border-b-gray-600 dark:bg-gray-900">
      <div className="mx-auto flex w-11/12 max-w-7xl items-center justify-between py-3">

        <Link to="/" className="text-2xl font-bold text-orange-600">
          Recipe Book
        </Link>

        <div className="hidden items-center gap-6 md:flex ">
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
        <DarkModeToggle />
        {/* User Auth */}
        <div className="hidden md:block">
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mx-auto w-11/12 max-w-7xl border-t border-orange-100 bg-white px-4 pb-4 md:hidden">
          <div className="mt-2 flex flex-col gap-3">
            <NavLink
              to="/"
              className={navLinkClasses}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/recipes"
              className={navLinkClasses}
              onClick={() => setMobileMenuOpen(false)}
            >
              All Recipes
            </NavLink>
            <NavLink
              to="/addRecipe"
              className={navLinkClasses}
              onClick={() => setMobileMenuOpen(false)}
            >
              Add Recipe
            </NavLink>
            <NavLink
              to="/myRecipe"
              className={navLinkClasses}
              onClick={() => setMobileMenuOpen(false)}
            >
              My Recipes
            </NavLink>
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="rounded bg-orange-500 px-4 py-2 text-center text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded border border-orange-500 px-4 py-2 text-center text-orange-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="mt-2 flex items-center gap-3">
                  <img
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                    }
                    alt="avatar"
                    className="h-8 w-8 rounded-full border border-orange-500"
                  />
                  <span className="text-gray-800">{user.displayName}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="mt-2 w-full rounded py-2 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
