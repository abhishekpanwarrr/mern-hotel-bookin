import { HotelType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Skeletorn from "../Skeletorn";
import Hotel from "../Hotel";

const NewHotels = () => {
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const fetchAllHotels = async () => {
    return (
      await fetch("https://hotel-backend-taupe.vercel.app/api/v1/hotel", { method: "GET" })
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
            {hotels.length > 0 &&
              hotels?.reverse().map((item: HotelType) => (
                <CarouselItem
                  key={item?._id}
                  className="basis-1/2 xl:basis-1/5 md:basis-1/3 lg:basis-1/5 pl-4"
                >
                  <Hotel className={"h-[100%]"} item={item} />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};

export default NewHotels;
