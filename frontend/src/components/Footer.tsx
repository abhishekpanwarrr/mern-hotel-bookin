import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="pl-24 bg-white shadow dark:bg-gray-900 w-full">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <Link to={"/"} className="hover:underline">
            PEXELS™
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link to={"/"} className="hover:underline me-4 md:me-6">
              About
            </Link>
          </li>
          <li>
            <Link to={"/privacy"} className="hover:underline me-4 md:me-6">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to={"/terms"} className="hover:underline me-4 md:me-6">
              Terms
            </Link>
          </li>
          <li>
            <Link to={"/contact"} className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
