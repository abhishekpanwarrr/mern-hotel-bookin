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
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

const TopCarousel = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const fetchAllHotels = async () => {
    return (
      await fetch("https://hotel-backend-taupe.vercel.app/api/v1/hotel", { method: "GET" })
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
        Error fetching data
      </h3>
    );
  }
  return (
    <div>
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
        <div className="absolute -bottom-6  w-full hidden md:block">
          <div className="">
            <div className="max-w-lg mx-auto flex gap-4 items-center bg-white px-6 py-2 shadow-lg">
              <div>
                <label htmlFor="" className="text-gray-500 text-sm font-light">
                  Check in date{" "}
                </label>
                <DatePicker
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-min p-2.5 dark:bg-gray-700 dark:border-gray-600 max-w-max dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  selected={startDate}
                  placeholderText="Check in date"
                  onChange={(date: any) => setStartDate(date)}
                />
              </div>
              <div>
                <label htmlFor="" className="text-gray-500 text-sm font-light">
                  Check out date
                </label>
                <DatePicker
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-min p-2.5 dark:bg-gray-700 dark:border-gray-600 max-w-max dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  selected={endDate}
                  placeholderText="Check in date"
                  onChange={(date: any) => setEndDate(date)}
                />
              </div>
              <Button
                variant={"default"}
                className="bg-gray-700 text-white mt-6 px-5"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default TopCarousel;
