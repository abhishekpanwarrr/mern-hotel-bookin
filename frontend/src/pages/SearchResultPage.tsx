import Hotel from "@/components/Hotel";
import Loader from "@/components/Loader";
import { useFetchHotels } from "@/hooks/useFetchHotels";
import { HotelType } from "@/types";
import { useLocation } from "react-router-dom";

const SearchResultPage = () => {
  const location = useLocation();
  const query = location.state?.query;
  const { isError, data, isLoading } = useFetchHotels({
    endpoint: `hotel/search?address=${query}`,
  });

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
      ) : data?.hotels?.length > 0 ? (
        data?.hotels?.map((item: HotelType) => {
          return <Hotel key={item._id} item={item} />;
        })
      ) : (
        <h3>No hotel found on this location</h3>
      )}
    </div>
  );
};

export default SearchResultPage;
