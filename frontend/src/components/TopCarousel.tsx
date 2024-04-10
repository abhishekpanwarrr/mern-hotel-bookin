import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HotelType } from "@/types";
// @ts-ignore
import DatePicker from "react-datepicker";
import Loader from "./Loader";
import { useFetchHotels } from "@/hooks/useFetchHotels";
import { useEffect, useState } from "react";

const TopCarousel = () => {
  const [hotels, setHotels] = useState<Array<HotelType>>([]);
  const { isError, data, isLoading } = useFetchHotels({
    endpoint: "hotel",
    key: "carouselImage",
  });

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
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Carousel className="relative mb-20 mx-10">
          <CarouselContent className="max-h-[550px]">
            {hotels?.length > 0 ? (
              hotels?.map((hotel: HotelType) => (
                <CarouselItem key={hotel?._id} className="">
                  <img
                    src={
                      hotel?.imageUrl ||
                      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    }
                    className=" w-full h-full object-cover"
                  />
                </CarouselItem>
              ))
            ) : (
              <h3 className="text-center my-30 font-bold text-blue-900">
                No hotel found
              </h3>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};

export default TopCarousel;
