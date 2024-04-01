import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Product = ({
  className,
  imageUrl,
}: {
  className: string;
  imageUrl: string;
}) => {
  return (
    <Link
      to={"/"}
      className={`w-full h-full rounded-2xl shadow bg-white ${className}`}
    >
      <div className="relative p-2">
        <img
          className="rounded-2xl"
          src={imageUrl}
          alt="product image"
        />
        <div className="flex absolute top-10 right-10 bg-white rounded-full p-2 items-center justify-center">
          <FaRegHeart className=" size-5 " />
        </div>
      </div>
      <div className="px-3 pb-5">
        <p className="text-lg font-semibold text-gray-700 tracking-tight">
          Opula haven hotel
        </p>
        <p className="text-sm font-normal text-gray-400 mb-4">Rewari,Haryana</p>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold">
            <span className="font-bold">$599</span>{" "}
            <span className="font-normal text-xs">/ 24 hours</span>
          </span>
          <span className="bg-gray-500 font-semibold px-2.5 py-0.5 rounded flex items-center justify-between gap-2">
            <svg
              className="w-2 h-2 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>{" "}
            <span className="text-gray-300">4.5</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Product;
