import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../components/NotFound";
import Login from "../components/Login";
import Register from "../components/Register";
import { lazy, Suspense } from "react";
import GlobalLoader from "../components/GlobalLoader";
import RecipeDetails from "../components/RecipeDetails";
import Home from "../components/Home";

// Lazy-loaded pages
const AllRecipes = lazy(() => import("../components/AllRecipes"));
const AddRecipe = lazy(() => import("../components/AddRecipe"));
const MyRecipe = lazy(() => import("../components/MyRecipe"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<GlobalLoader mini={true} />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/recipes",
        element: (
          <Suspense fallback={<GlobalLoader mini={true} />}>
            <AllRecipes />
          </Suspense>
        ),
      },
      {
        path: "/recipes/:id",
        element: (
          <PrivateRoute>
            <Suspense fallback={<GlobalLoader mini={true} />}>
              <RecipeDetails />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/addRecipe",
        element: (
          <PrivateRoute>
            <Suspense fallback={<GlobalLoader mini={true} />}>
              <AddRecipe />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/myRecipe",
        element: (
          <PrivateRoute>
            <Suspense fallback={<GlobalLoader mini={true} />}>
              <MyRecipe />
            </Suspense>
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
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
