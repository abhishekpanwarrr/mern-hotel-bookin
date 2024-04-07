import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HotelType } from "@/types";
import { useEffect, useState } from "react";
// @ts-ignore
import DatePicker from "react-datepicker";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";

const TopCarousel = () => {
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const fetchAllHotels = async () => {
    return (
      await fetch("https://hotel-backend-taupe.vercel.app/api/v1/hotel", {
        method: "GET",
      })
    ).json();
  };

  const { data, isLoading, isError } = useQuery({
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
        Something went wrong. Please try again later
      </h3>
    );
  }
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Carousel className="relative mb-20 mx-10">
          <CarouselContent className="max-h-[550px]">
            {hotels.map((hotel: HotelType) => (
              <CarouselItem key={hotel?._id} className="">
                <img
                  src={
                    hotel?.imageUrl ||
                    "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  }
                  className=" w-full h-full object-cover"
                />
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

export default TopCarousel;
