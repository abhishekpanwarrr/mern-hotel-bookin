import { ChangeEvent, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HotelType } from "@/types";
import { FaStar } from "react-icons/fa6";
import { TbAirConditioning } from "react-icons/tb";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaDownload } from "react-icons/fa";

const LinkedPage = () => {
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const fetchAllHotels = async () => {
    return (
      await fetch("http://localhost:8000/api/v1/hotel", { method: "GET" })
    ).json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["likedHotel"],
    queryFn: fetchAllHotels,
  });
  useEffect(() => {
    if (data) {
      setHotels(data.hotels);
    }
  }, [data]);
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
        Error fetching data
      </h3>
    );
  }
  if (isLoading) {
    return <h3 className="text-center font-bold text-red-600">Loading....</h3>;
  }

  return (
    <div>
      <h3 className="text-gray-700 my-5 font-bold ml-1 text-xl lg:text-2xl flex gap-3 items-center">
        <span className="underline">Liked products</span>

        <div className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-teal-600 border-2 border-white rounded-full">
          {selected?.length}
        </div>
      </h3>
      {selected?.length > 0 && (
        <div className="my-1 flex w-full justify-end pr-5 gap-4 transition-all ease-in-out ">
          <FaDownload className="text-blue-600 cursor-pointer" size={20} />
          <RiDeleteBinFill className="cursor-pointer text-red-600" size={20} />
        </div>
      )}
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
                Ac avialble
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {hotels.length > 0 &&
              hotels?.map((hotel: HotelType) => {
                const calculateAverageRating = () => {
                  let sum = 0;
                  let totalCount = 0;

                  hotel?.ratings.forEach((ratingObj: any) => {
                    const ratingValue = parseInt(Object.keys(ratingObj)[0]);
                    const count = ratingObj[ratingValue];
                    sum += ratingValue * count;
                    totalCount += count;
                  });
                  const averageRating = sum / totalCount;
                  return averageRating.toFixed(2);
                };
                const averageRating = calculateAverageRating();
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
                          onChange={(e) => handleCheckBox(e, hotel?._id)}
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
                        src={hotel?.imageUrl}
                        className="min-w-24 h-14 object-cover"
                      />
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {hotel?.hotelName}
                    </th>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <FaStar color="yellow" /> {averageRating}
                    </td>
                    <td className="px-6 py-4">Hotel</td>
                    <td className="px-6 py-4">
                      {/* @ts-ignore */}
                      {hotel?.ameneties[0]?.AC ? (
                        <div className="flex items-center gap-1">
                          <TbAirConditioning /> Yes
                        </div>
                      ) : null}
                    </td>
                    <td className="px-6 py-4">
                      {/* @ts-ignore */}₹ {hotel?.roomType[0]?.deluxe}
                    </td>
                    <td className="flex items-center px-6 py-4">
                      {selected.length < 0 && (
                        <>
                          <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            <FaDownload />
                          </button>
                          <button className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">
                            <RiDeleteBinFill color="red" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LinkedPage;
