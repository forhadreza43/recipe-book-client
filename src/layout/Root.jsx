import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";


const Root = () => {

  return (
    <div className="dark:bg-gray-900">
      <Navbar />
      <main className="duration-900 mx-auto min-h-dvh w-11/12 max-w-7xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
