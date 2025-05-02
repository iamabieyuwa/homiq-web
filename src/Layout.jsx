// components/Layout.jsx
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20"> {/* Enough top padding for navbar height */}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
