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
import Hotel from "../Hotel";
import Loader from "../Loader";

const NewHotels = () => {
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const fetchAllHotels = async () => {
    return (
      await fetch("https://hotel-backend-taupe.vercel.app/api/v1/hotel", {
        method: "GET",
      })
    ).json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["newhotels"],
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
    <div className="px-5">
      <h3 className="pl-5 font-semibold text-lg my-2">Newly added hotels</h3>
      {isLoading ? (
        <div className="flex flex-row gap-3 my-5 overflow-hidden">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Loader key={index} />
          ))}
        </div>
      ) : (
        <Carousel className=" mb-20 mx-10">
          <CarouselContent className="max-h-[450px]">
            {hotels.length > 0 &&
              hotels?.reverse().map((item: HotelType) => (
                <CarouselItem
                  key={item?._id}
                  className="w-full xl:basis-1/5 md:basis-1/3 lg:basis-1/5 pl-4"
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
