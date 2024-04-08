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

const TopCarousel = () => {
  const { isError, data, isLoading } = useFetchHotels({ endpoint: "hotel" });

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
            {data?.hotels?.map((hotel: HotelType) => (
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
