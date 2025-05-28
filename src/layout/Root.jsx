import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";


const Root = () => {

  return (
    <>
      <Navbar />
      <main className="duration-900 min-h-dvh w-11/12 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
