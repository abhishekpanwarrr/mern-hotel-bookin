import { Outlet } from "react-router-dom";
import TopNavbar from "./components/TopNavbar";
import Footer from "./components/Footer";

function Layout() {
  return (
    <div className="relative dark">
      <TopNavbar />
      <div className="min-h-screen space-x-2 pt-20 px-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
