import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import { BsFillDice6Fill } from "react-icons/bs";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopNavbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 w-full z-10">
      <Sheet>
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://img.freepik.com/premium-vector/hotel-logo-vector-illustration_969863-5246.jpg"
              className="h-8 rounded-full"
              alt="Flowbite Logo"
            />
            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              PIXELS
            </span> */}
          </Link>
          <div className="flex md:order-1">
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
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
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
                  className="block py-2 px-3 text-white rounded "
                  aria-current="page"
                >
                  <FiHome />
                </Link>
              </li>
              <li>
                <Link
                  to="/liked"
                  className="block py-2 px-3 text-gray-900 rounded  dark:text-white"
                >
                  <FaRegHeart />
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  className=" block py-2 px-3 text-gray-900 rounded  dark:text-white "
                >
                  <IoNotificationsOutline />
                </Link>
              </li>
              <li>
                <Link
                  to={"/rooms"}
                  className=" block py-2 px-3 text-gray-900 rounded  dark:text-white "
                >
                  <BsFillDice6Fill />
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
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <Separator
                      className="bg-gray-500"
                      orientation="horizontal"
                    />
                    <DropdownMenuItem className="gap-2">
                      <TbLogout /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            </ul>
          </div>
        </div>
        {/* @ts-ignore */}
        <SheetContent className="bg-black text-white">
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center">
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-3 text-white"
                    aria-current="page"
                  >
                    <FiHome />
                  </Link>
                </li>
                <li>
                  <Link to="/" className="block py-2 px-3 text-white">
                    <FaRegHeart />
                  </Link>
                </li>
                <li>
                  <Link to={"/"} className=" block py-2 px-3text-white ">
                    <IoNotificationsOutline />
                  </Link>
                </li>
              </ul>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default TopNavbar;
