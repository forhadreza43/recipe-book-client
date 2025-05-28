import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import GlobalLoader from "../components/GlobalLoader";
import LoadingSpinner from "../components/LoadingSpinner";

const Root = () => {
  const navigation = useNavigation();
  const { loading } = useContext(AuthContext);
  const isLoading = loading || navigation.state === "loading";
  return (
    <>
      <Navbar />
      {isLoading && <LoadingSpinner />}
      {/* {isLoading && <GlobalLoader />} */}
      <main className="duration-900 min-h-dvh">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
