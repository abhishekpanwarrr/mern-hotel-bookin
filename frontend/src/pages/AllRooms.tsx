import Product from "@/components/Product";
import Skeletorn from "@/components/Skeletorn";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const AllRooms = () => {
  const [items, setItems] = useState([]);
  const getTodos = async () => {
    return (await fetch("https://jsonplaceholder.typicode.com/photos")).json();
  };

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  useEffect(() => {
    if (todos) {
      setItems(todos);
    }
  }, [todos]);

  if (isError) {
    return (
      <h3 className="text-center font-bold text-red-600">
        Error fetching data
      </h3>
    );
  }
  if (isLoading) {
    return "Loading...";
  }
  return (
    <div className="">
      <div className=" px-5 py-2">
        <h3 className="my-4 font-semibold text-gray-700 text-lg md:text-xl lg:text-3xl underline">
          Rooms for booking
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 grid-rows-subgrid">
          {isLoading ? (
            <div className="flex gap-3 my-4">
              {[1, 2, 3].map((_, index) => (
                <Skeletorn key={index} />
              ))}
            </div>
          ) : (
            items.length > 0 &&
            items?.slice(0,100).map((item: any, index) => (
              <Product
                key={index}
                className={""}
                imageUrl={item.thumbnailUrl}
              />
            ))
          )}
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default AllRooms;
