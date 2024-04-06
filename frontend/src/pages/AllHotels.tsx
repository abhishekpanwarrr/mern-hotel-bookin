import Hotel from "@/components/Hotel";
import Loader from "@/components/Loader";
import Skeleton from "@/components/Skeleton";
import { HotelType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const AllHotels = () => {
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const fetchAllHotels = async () => {
    return (
      await fetch("https://hotel-backend-taupe.vercel.app/api/v1/hotel", {
        method: "GET",
      })
    ).json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allHotels"],
    queryFn: fetchAllHotels,
  });
  useEffect(() => {
    if (data) {
      setHotels(data.hotels);
    }
  }, [data]);

  if (isError) {
    return (
      <h3 className="text-center font-bold text-red-600">
        Something went wrong. Please try again later
      </h3>
    );
  }
  return (
    <div className="">
      <div className=" px-5 py-2">
        <h3 className="my-4 font-semibold text-gray-700 text-lg md:text-xl lg:text-3xl underline">
          Rooms for booking
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 min-w-[100%]">
          {isLoading ? (
            <div className="flex flex-col md:flex-row gap-3 my-4 ">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Loader key={index} />
              ))}
            </div>
          ) : (
            hotels.length > 0 &&
            hotels.map((item: HotelType) => {
              return <Hotel key={item._id} item={item} />;
            })
          )}
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default AllHotels;
