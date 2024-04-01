import Product from "@/components/Product";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Skeletorn from "@/components/Skeletorn";
const HomePage = () => {
  const [items, setItems] = useState([]);
  const getTodos = async () => {
    return (await fetch("https://jsonplaceholder.typicode.com/photos")).json();
  };

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  useEffect(() => {
    if (todos) {
      setItems(todos);
    }
  }, [todos]);

  if (isError) {
    return (
      <h3 className="text-center font-bold text-red-600">
        Error fetching data
      </h3>
    );
  }
  return (
    <div>
      <div className="flex flex-1 md:flex-row flex-col justify-between gap-10 bg-slate-100 rounded-2xl shadow-sm py-2">
        <div className="w-full lg:w-1/2">
          {/* User Details */}
          <div className="flex justify-between gap-3 pt-5 mb-5">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-normal text-gray-900 truncate">
                  Welcome back
                </p>
                <p className="text-base text-gray-500 truncate dark:text-gray-400">
                  Abhishek Panwar
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-2 md:gap-5 text-base font-semibold text-gray-900 dark:text-white">
                <p className="text-base text-gray-500 truncate dark:text-gray-400 bg-gray-200 px-4 py-2 rounded-full">
                  Rewari,Haryana
                </p>
                <p className="text-base text-gray-500 truncate dark:text-gray-400 bg-gray-200 px-4 py-2 rounded-full">
                  March 17-march 20, 2024
                </p>
              </div>
            </div>
          </div>

          {/* Hero */}
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              Work fast from anywhere
            </h5>
            <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
              Stay up to date and move work forward with Flowbite on iOS &
              Android. Download the app today.
            </p>
            <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
              <a
                href="#"
                className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <svg
                  className="me-3 w-7 h-7"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="apple"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  ></path>
                </svg>
                <div className="text-left rtl:text-right">
                  <div className="mb-1 text-xs">Download on the</div>
                  <div className="-mt-1 font-sans text-sm font-semibold">
                    Mac App Store
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                <svg
                  className="me-3 w-7 h-7"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google-play"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
                  ></path>
                </svg>
                <div className="text-left rtl:text-right">
                  <div className="mb-1 text-xs">Get in on</div>
                  <div className="-mt-1 font-sans text-sm font-semibold">
                    Google Play
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Recommended products */}
          {isLoading ? (
            <div className="flex gap-3 my-4">
              {[1, 2, 3].map((_, index) => (
                <Skeletorn key={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col flex-wrap md:flex-nowrap md:flex-row gap-1 px-1 justify-center items-center ">
              {items.length > 0 &&
                items.slice(0,100)
                  ?.slice(0, 3)
                  .map((item: any, index) => (
                    <Product
                      key={index}
                      className={""}
                      imageUrl={item.thumbnailUrl}
                    />
                  ))}
            </div>
          )}
        </div>
        <div className="w-1/2 p-5 hidden lg:block">
          <p className="text-base font-bold mb-2 text-gray-700">
            Recent searches
          </p>
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className="flex flex-row md:flex-col items-center  shadow lg:flex-row md:max-w-xl rounded-2xl"
            >
              <img
                className="object-cover w-full h-50 md:h-auto md:w-48 rounded-2xl"
                src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              <div className="flex flex-col justify-between px-4 ">
                <p className="mb-1 text-base font-bold text-gray-700">
                  Singapore hotel
                </p>
                <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                  Bantul yanioles
                </p>
              </div>
            </Link>
            <Link
              to="/"
              className="flex flex-row md:flex-col items-center  shadow lg:flex-row md:max-w-xl rounded-2xl"
            >
              <img
                className="object-cover w-full h-50 md:h-auto md:w-48 rounded-2xl"
                src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              <div className="flex flex-col justify-between px-4 ">
                <p className="mb-1 text-base font-bold text-gray-700">
                  Singapore hotel
                </p>
                <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                  Bantul yanioles
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* Recently added products */}
      <div className="px-5">
        <h3 className="pl-5 font-semibold text-lg my-2">
          Recently added in stock
        </h3>
        {isLoading ? (
          <div className="flex gap-3 my-5">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Skeletorn key={index} />
            ))}
          </div>
        ) : (
          <Carousel className="mb-20 mx-10">
            <CarouselContent className="max-h-[450px]">
              {items.length > 0 &&
                items?.slice(0,100).map((item: any, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/2 xl:basis-1/5 md:basis-1/3 lg:basis-1/5 pl-4"
                  >
                    <Product
                      className={"h-[100%]"}
                      imageUrl={item.thumbnailUrl}
                    />
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
      {/* Recent Products */}
      <div className="px-5">
        <h3 className="pl-5 font-semibold text-lg my-2">New Items in stock</h3>
        {isLoading ? (
          <div className="flex gap-3 my-5">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Skeletorn key={index} />
            ))}
          </div>
        ) : (
          <Carousel className=" mb-20 mx-10">
            <CarouselContent className="max-h-[450px]">
              {items.length > 0 &&
                items?.slice(0,100).reverse().map((item: any, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-1/2 xl:basis-1/5 md:basis-1/3 lg:basis-1/5 pl-4"
                  >
                    <Product
                      className={"h-[100%]"}
                      imageUrl={item.thumbnailUrl}
                    />
                  </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default HomePage;
