import { Outlet } from "react-router-dom";
import TopNavbar from "./components/TopNavbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Profile from "./components/Profile";
import Login from "./components/Login";

function Layout() {
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  console.log("🚀 ~ Layout ~ openLogin:", openLogin);
  useEffect(() => {
    const handleScroll = (e: { preventDefault: () => void }) => {
      e.preventDefault();
    };

    if (open || openLogin) {
      document.body.style.overflow = "hidden";
      window.addEventListener("scroll", handleScroll, { passive: false });
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open, openLogin]);
  return (
    <div className="relative dark">
      <TopNavbar
        open={open}
        openLogin={openLogin}
        setOpen={setOpen}
        setOpenLogin={setOpenLogin}
      />
      <div className="min-h-screen space-x-2 pt-20 px-5">
        <Outlet />
        <Profile open={open} setOpen={setOpen} />
        <Login openLogin={openLogin} setOpenLogin={setOpenLogin} />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default Layout;
