import Hotel from "@/components/Hotel";
import Loader from "@/components/Loader";
import { HotelType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResultPage = () => {
  const {
    state: { query },
  } = useLocation();
  const [hotels, setHotels] = useState<HotelType[]>([]);

  const fetchData = async () => {
    const response = await fetch(
      `https://hotel-backend-taupe.vercel.app/api/v1/hotel/search?address=${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["filterData", query],
    queryFn: fetchData,
  });

  useEffect(() => {
    document.title = `Search Results for "${query}" | Hotel taj`;
    if (data && data.status === 200) {
      setHotels(data.hotels as Array<HotelType>);
    }
  }, [query, data]);

  if (isError) {
    return (
      <h3 className="text-center font-bold text-red-600">
        Something went wrong. Please try again later
      </h3>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 min-w-[100%]">
      {isLoading ? (
        <div className="flex flex-col md:flex-row gap-3 my-4 ">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Loader key={index} />
          ))}
        </div>
      ) : hotels.length > 0 ? (
        hotels.map((item: HotelType) => {
          return <Hotel key={item._id} item={item} />;
        })
      ) : (
        <h3>No hotel found on this location</h3>
      )}
    </div>
  );
};

export default SearchResultPage;
