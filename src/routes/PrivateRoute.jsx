import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import GlobalLoader from "../components/GlobalLoader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { pathname } = useLocation();
  // console.log(pathname);
  if (loading) {
    return <GlobalLoader/>;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/login" state={pathname}></Navigate>;
};

export default PrivateRoute;
