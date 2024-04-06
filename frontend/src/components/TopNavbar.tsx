import { Link, useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import { BsFillDice6Fill } from "react-icons/bs";
import Cookies from "js-cookie";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface Props {
  openLogin: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setOpenLogin: Dispatch<SetStateAction<boolean>>;
}
const TopNavbar = ({ open, openLogin, setOpen, setOpenLogin }: Props) => {
  const [user, setUser] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("hotelUser");
    window.location.reload();
  };

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!searchQuery) {
      return toast.error("Please enter to search");
    }

    navigate("/search", { state: { query: searchQuery } });
  };

  useEffect(() => {
    (async () => {
      const user = Cookies.get("hotelUser");
      if (user) {
        setUser(JSON.parse(user));
      }
    })();
  }, [open, openLogin]);
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 w-full z-10">
      <Sheet>
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            className="flex items-center gap-1 space-x-3 rtl:space-x-reverse text-white"
          >
            <img
              src="https://img.freepik.com/premium-vector/hotel-logo-vector-illustration_969863-5246.jpg"
              className="h-8 rounded-full"
              alt="Flowbite Logo"
            />
            HOTEL TAJ
          </Link>
          <div className="flex md:order-1">
            <div className="hidden md:relative md:block md:min-w-[550px]">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <form className="" onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
                <button
                  type="submit"
                  className="text-white absolute end-0 bottom-0 bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
                >
                  Search
                </button>
              </form>
            </div>
            <button
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="false"
            >
              <SheetTrigger>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                  onClick={() => {}}
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </SheetTrigger>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-2 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-3 hover:bg-blue-400 py-2 px-3 text-white rounded "
                  aria-current="page"
                >
                  <FiHome />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/liked"
                  className="flex items-center gap-3 hover:bg-blue-400 py-2 px-3 text-gray-900 rounded  dark:text-white"
                >
                  <FaRegHeart />
                  Saved hotels
                </Link>
              </li>
              <li>
                <Link
                  to={"/orders"}
                  className="flex items-center gap-3 hover:bg-blue-400 py-2 px-3 text-gray-900 rounded  dark:text-white "
                >
                  <IoNotificationsOutline />
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to={"/hotels"}
                  className="flex items-center gap-3 hover:bg-blue-400 py-2 px-3 text-gray-900 rounded  dark:text-white "
                >
                  <BsFillDice6Fill />
                  All hotels
                </Link>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <button className=" block py-2 px-3 text-gray-900 rounded  dark:text-white ">
                      <CgProfile />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="bg-gray-800 text-white min-w-[12rem] bottom-0 outline-none">
                    <DropdownMenuItem>
                      {user?.fullName ? (
                        user?.fullName
                      ) : (
                        <span onClick={() => setOpenLogin(true)}>Login</span>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                      Profile
                    </DropdownMenuItem>
                    <Separator
                      className="bg-gray-500"
                      orientation="horizontal"
                    />
                    <DropdownMenuItem>Orders</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    {user?.fullName && (
                      <>
                        <Separator
                          className="bg-gray-500"
                          orientation="horizontal"
                        />
                        <DropdownMenuItem
                          className="gap-2"
                          onClick={handleLogout}
                        >
                          <TbLogout /> Logout
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
        {/* @ts-ignore */}
        <SheetContent className="bg-black text-white border-0">
          <SheetHeader>
            <SheetTitle className="underline">HOTEL TAJ</SheetTitle>
            <SheetDescription>
              <div className="relative md:block md:min-w-[550px]">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search icon</span>
                </div>
                <input
                  type="text"
                  id="search-navbar"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                  placeholder="Search..."
                />
              </div>
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-2 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center justify-start">
                <Link
                  to="/"
                  className="flex w-full border items-center gap-3 hover:bg-blue-400 py-2 px-3 text-gray-900 dark:text-white rounded "
                  aria-current="page"
                >
                  <FiHome />
                  Home
                </Link>
                <Link
                  to="/liked"
                  className="flex w-full border items-center gap-3 hover:bg-blue-400 py-2 px-3 text-gray-900 rounded  dark:text-white"
                >
                  <FaRegHeart />
                  Saved hotels
                </Link>
                <Link
                  to={"/orders"}
                  className="flex w-full border items-center gap-3 hover:bg-blue-400 py-2 px-3 text-gray-900 rounded  dark:text-white "
                >
                  <IoNotificationsOutline />
                  Orders
                </Link>
                <Link
                  to={"/hotels"}
                  className="flex w-full items-center border gap-3 hover:bg-blue-400 py-2 px-3 text-gray-900 rounded  dark:text-white "
                >
                  <BsFillDice6Fill />
                  All hotels
                </Link>
                <Button className="flex w-full mt-4 items-center border gap-3 hover:bg-blue-400 py-2 px-3 text-gray-900 rounded  dark:text-white ">
                  {user?.fullName ? (
                    user?.fullName
                  ) : (
                    <span onClick={() => setOpenLogin(true)}>Login</span>
                  )}
                </Button>
                <Button
                  className="flex w-full mt-2 items-center border gap-3 hover:bg-blue-400 py-2 px-3 text-gray-900 rounded  dark:text-white "
                  onClick={handleLogout}
                >
                  <TbLogout /> Logout
                </Button>
              </ul>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default TopNavbar;
