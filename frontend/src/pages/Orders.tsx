import { ChangeEvent, useEffect, useState } from "react";
import { HotelType } from "@/types";
import { FaStar } from "react-icons/fa6";
import Cookies from "js-cookie";
import { useFetchHotels } from "@/hooks/useFetchHotels";

const Orders = () => {
  const [hotel, setHotel] = useState<HotelType[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const hotelUser: string | undefined = Cookies.get("hotelUser");
  let parsedUser: Record<string, any>;

  if (hotelUser !== undefined) {
    parsedUser = JSON.parse(hotelUser);
  } else {
    parsedUser = {};
  }
  const { isError, data, isLoading } = useFetchHotels({
    endpoint: `payment/${parsedUser?._id}`,
  });
  // const fetchAllHotels = async () => {
  //   if (!parsedUser?._id) {
  //     return toast.error("Plese login to get orders");
  //   }
  //   return (
  //     await fetch(`https://hotel-backend-taupe.vercel.app/api/v1/payment/${parsedUser?._id}`, {
  //       method: "GET",
  //     })
  //   ).json();
  // };

  useEffect(() => {
    if (data?.hotels) {
      const orderItemsArray = data?.hotels?.map((item: any) => item?.orderItems);
      setHotel(orderItemsArray);
    }
  }, [data?.hotels]);
  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked === true) {
      setSelected((prev) => [...prev, id]);
    } else {
      setSelected((prev) => prev.filter((value) => value !== id));
    }
  };
  if (isError) {
    return (
      <h3 className="text-center font-bold text-red-600">
        Something went wrong. Please try again later
      </h3>
    );
  }
  if (isLoading) {
    return <h3 className="text-center font-bold text-red-600">Loading....</h3>;
  }

  if (!parsedUser?._id) {
    return (
      <h3 className="font-bold text-xl text-center">
        Please login to get your orders
      </h3>
    );
  }
  return (
    <div>
      <h3 className="text-gray-700 my-5 font-bold ml-1 text-xl lg:text-2xl flex gap-3 items-center">
        <span className="underline">All orders</span>

        <div className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-teal-600 border-2 border-white rounded-full">
          {selected.length}
        </div>
      </h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Hotel Name
              </th>
              <th scope="col" className="px-6 py-3">
                Ratings
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {hotel?.length > 0 ? (
              hotel?.map((hotel: HotelType, index) => {
                return (
                  <tr
                    key={hotel?._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => handleCheckBox(e, index.toString())}
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        src={hotel?.imageUrl || "https://google.com"}
                        className="min-w-24 h-14 object-cover"
                      />
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {hotel?.hotelName}
                    </th>
                    <td className="px-6 py-4 mt-5 flex items-center gap-2">
                      <FaStar color="yellow" /> 3
                    </td>
                    <td className="px-6 py-4">Hotel</td>
                    <td className="px-6 py-4 capitalize">
                      {/* @ts-ignore */}
                      {hotel?.roomType}
                    </td>
                    <td className="px-6 py-4">
                      {/* @ts-ignore */}₹ {hotel?.price}
                    </td>
                  </tr>
                );
              })
            ) : (
              <h3>No record found</h3>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
