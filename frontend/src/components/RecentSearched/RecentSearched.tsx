import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HotelType } from "@/types";
import Hotel from "../Hotel";
import Loader from "../Loader";
import { useFetchHotels } from "@/hooks/useFetchHotels";

const RecentSearched = () => {
  const { isError, data, isLoading } = useFetchHotels({ endpoint: "hotel" });

  if (isError) {
    return (
      <h3 className="text-center font-bold text-red-600">
        Something went wrong. Please try again later
      </h3>
    );
  }
  return (
    <div className="px-5">
      <h3 className="pl-5 font-semibold text-lg my-2">Recently searched</h3>
      {isLoading ? (
        <div className="flex flex-row gap-3 my-5 overflow-hidden">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Loader key={index} />
          ))}
        </div>
      ) : (
        <Carousel className="mb-20 mx-10">
          <CarouselContent className="max-h-[450px]">
            {data?.hotels?.length > 0 &&
              data?.hotels?.map((item: HotelType) => (
                <CarouselItem
                  key={item?._id}
                  className="xl:basis-1/5 md:basis-1/3 lg:basis-1/5 pl-4"
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

export default RecentSearched;
