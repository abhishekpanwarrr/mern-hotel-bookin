import { HotelType } from "@/types";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { useFetchHotels } from "@/hooks/useFetchHotels";
import { useEffect, useState } from "react";

const RecentAddedHotels = () => {
  const [hotels, setHotels] = useState<Array<HotelType>>([]);
  const { isError, data, isLoading } = useFetchHotels({ endpoint: "hotel" });

  if (isError) {
    return (
      <h3 className="text-center font-bold text-red-600">
        Something went wrong. Please try again later
      </h3>
    );
  }
  useEffect(() => {
    if (data?.hotels) {
      return setHotels(data?.hotels);
    }
  }, [data?.hotels]);
  return (
    <div className="w-1/2 p-5 hidden lg:block">
      <p className="text-base font-bold mb-2 text-gray-700">
        Recently added hotels
      </p>
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <div className="flex flex-col md:flex-row gap-3 my-4">
            {[1, 2, 3].map((_, index) => (
              <Loader key={index} />
            ))}
          </div>
        ) : (
          hotels.length &&
          hotels
            ?.slice(0, 4)
            ?.map((hotel: HotelType) => (
              <Hotel key={hotel?._id} hotel={hotel} />
            ))
        )}
      </div>
    </div>
  );
};

export default RecentAddedHotels;

const Hotel = ({ hotel }: { hotel: HotelType }) => {
  return (
    <Link
      to={`/hotel/${hotel?._id}`}
      key={hotel?._id}
      className="flex flex-row md:flex-col items-center  shadow lg:flex-row md:max-w-xl rounded-2xl"
    >
      <img
        className="object-cover w-full h-50 md:h-auto md:w-48 rounded-2xl"
        src={hotel.imageUrl}
        alt=""
      />
      <div className="flex flex-col justify-between px-4 w-full">
        <p className="mb-1 text-base font-bold text-gray-700 flex justify-between w-full basis-1/2">
          {hotel.hotelName}
          <span className="font-bold basis-1/2">
            {/* ₹{hotel.roomType[0]?.deluxe} */}
            <span className="font-normal text-xs">/ 24 hours</span>
          </span>
        </p>
        <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
          {hotel.address}
        </p>
      </div>
    </Link>
  );
};
