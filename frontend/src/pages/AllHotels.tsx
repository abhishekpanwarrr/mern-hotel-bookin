import Hotel from "@/components/Hotel";
import Loader from "@/components/Loader";
import { useFetchHotels } from "@/hooks/useFetchHotels";
import { HotelType } from "@/types";

const AllHotels = () => {
  const { isError, data, isLoading } = useFetchHotels({ endpoint: "hotel" });
  if (isError) {
    return (
      <h3 className="text-center font-bold text-red-600">
        Something went wrong. Please try again later
      </h3>
    );
  }
  return (
    <div className="">
      <div className=" px-5 py-2">
        <h3 className="mt-4 mb-2 font-semibold text-gray-700 text-lg md:text-xl lg:text-3xl underline">
          Rooms for booking
        </h3>

        <form className="max-w-sm shadow-xl mb-3 py-3 px-3 rounded-xl">
          <label
            htmlFor="range"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Filter hotels
          </label>
          <select
            id="range"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
            <option value="AS">Select a range</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </form>

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
            <h3 className="text-center font-bold text-lg">Hotels not found</h3>
          )}
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default AllHotels;
