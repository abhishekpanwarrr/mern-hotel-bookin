import { HotelType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecentAddedHotels = () => {
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const fetchAllHotels = async () => {
    return (
      await fetch("https://hotel-backend-taupe.vercel.app/api/v1/hotel", { method: "GET" })
    ).json();
  };

  const { data, isError } = useQuery({
    queryKey: ["recentAddedHotels"],
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
        Error fetching data
      </h3>
    );
  }
  return (
    <div className="w-1/2 p-5 hidden lg:block">
      <p className="text-base font-bold mb-2 text-gray-700">Recent searches</p>
      <div className="flex flex-col gap-3">
        {hotels?.slice(0, 4)?.map((hotel: HotelType) => (
          <Hotel key={hotel?._id} hotel={hotel} />
        ))}
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
