import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

interface Props {
  sidebarShow: boolean;
}
const SideNavbar = ({ sidebarShow }: Props) => {
  console.log("🚀 ~ SideNavbar ~ sidebarShow:", sidebarShow);
  return (
    <aside
      className={`fixed top-0 h-screen w-24 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-900 dark:border-gray-700"
      aria-label="Sidebar ${
        sidebarShow && "transition-transform -translate-x-full"
      }`}
    >
      <div className="h-full px-3 pb-4 pt-20 overflow-y-auto bg-white dark:bg-gray-900">
        <ul className="space-y-2 font-medium">
          {/* Home */}
          <li>
            <Link
              to="/"
              className="flex items-center p-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group flex-col"
            >
              <IoHomeOutline className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ms-3">Home</span>
            </Link>
          </li>
          {/* Search */}
          <li>
            <Link
              to="/"
              className="flex flex-col items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FaSearch className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></FaSearch>
              <span className="flex-1 ms-3 whitespace-nowrap">Search</span>
            </Link>
          </li>
          {/* Bookmark */}
          <li>
            <Link
              to="/"
              className="flex flex-col items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <IoBookmarkOutline className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></IoBookmarkOutline>
              <span className="flex-1 ms-3 whitespace-nowrap">Bookmark</span>
              {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                3
              </span> */}
            </Link>
          </li>
          {/* Liked */}
          <li>
            <Link
              to="/"
              className="flex flex-col items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FaRegHeart className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></FaRegHeart>
              <span className="flex-1 ms-3 whitespace-nowrap">Liked</span>
            </Link>
          </li>
          {/* Settings */}
          <li>
            <Link
              to="/"
              className="flex flex-col items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <IoSettingsOutline className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></IoSettingsOutline>
              <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
            </Link>
          </li>
          {/* Logout */}
          <li>
            <Link
              to="/"
              className="flex flex-col items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <TbLogout className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></TbLogout>
              <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideNavbar;
