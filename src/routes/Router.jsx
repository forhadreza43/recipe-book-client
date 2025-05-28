import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../components/NotFound";
import Login from "../components/Login";
import Register from "../components/Register";
import AddRecipe from "../components/AddRecipe";
import AllRecipes from "../components/AllRecipes";
import RecipeDetails from "../components/RecipeDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <h1>Home Page</h1>,
      },
      {
        path: "/addRecipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "/myRecipe",
        element: (
          <PrivateRoute>
            {" "}
            <h1>My recipe page</h1>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/recipes",
        element: <AllRecipes />,
      },
      {
        path: "/recipes/:id",
        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
