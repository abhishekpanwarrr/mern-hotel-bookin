import { useEffect, useState } from "react";
import Skeletorn from "../Skeletorn";
import { useQuery } from "@tanstack/react-query";
import Hotel from "../Hotel";

const RecommendedHotels = () => {
  const [hotels, setHotels] = useState([]);
  const fetchAllHotels = async () => {
    return (
      await fetch("http://localhost:8000/api/v1/hotel", { method: "GET" })
    ).json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["recommendedHotels"],
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
    <>
      <h3 className="my-4 text-base font-semibold px-2 underline">Recommended hotels</h3>
      {isLoading ? (
        <div className="flex gap-3 my-4">
          {[1, 2, 3].map((_, index) => (
            <Skeletorn key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col flex-wrap md:flex-nowrap md:flex-row gap-2 px-1 justify-center items-center ">
          {hotels.length > 0 &&
            hotels
              ?.slice(0, 3)
              .map((item: any, index: number) => (
                <Hotel key={index} className={""} item={item} />
              ))}
        </div>
      )}
    </>
  );
};

export default RecommendedHotels;
