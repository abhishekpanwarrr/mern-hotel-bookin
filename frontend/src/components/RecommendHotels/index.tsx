import Hotel from "../Hotel";
import Loader from "../Loader";
import { useFetchHotels } from "@/hooks/useFetchHotels";

const RecommendedHotels = () => {
  const { isError, data, isLoading } = useFetchHotels({ endpoint: "hotel" });
  if (isError) {
    return (
      <h3 className="text-center font-bold text-red-600">
        Something went wrong. Please try again later
      </h3>
    );
  }
  return (
    <>
      <h3 className="my-4 text-base font-semibold px-2 underline">
        Recommended hotels
      </h3>
      {isLoading ? (
        <div className="flex flex-col md:flex-row gap-3 my-4">
          {[1, 2, 3].map((_, index) => (
            <Loader key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col flex-wrap md:flex-nowrap md:flex-row gap-2 px-1 justify-center items-center ">
          {data?.hotels?.length > 0 &&
            data?.hotels
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
