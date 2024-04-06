import { HotelType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const Hotel = ({
  className,
  item,
}: {
  className?: string;
  item: HotelType;
}) => {
  const queryClient = useQueryClient();
  const calculateAverageRating = () => {
    let sum = 0;
    let totalCount = 0;

    item?.ratings.forEach((ratingObj: any) => {
      const ratingValue = parseInt(Object.keys(ratingObj)[0]);
      const count = ratingObj[ratingValue];
      sum += ratingValue * count;
      totalCount += count;
    });
    const averageRating = sum / totalCount;
    return averageRating.toFixed(2);
  };
  const averageRating = calculateAverageRating();
  const fetchAllHotels = async () => {
    return (
      await fetch(
        "https://hotel-backend-taupe.vercel.app/api/v1/users/660d50fda80847a6bb79f1f7",
        { method: "GET" }
      )
    ).json();
  };

  const { data, isError } = useQuery({
    queryKey: ["userDetails"],
    queryFn: fetchAllHotels,
  });
  console.log("🚀 ~ data:", data);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("https://hotel-backend-taupe.vercel.app/api/v1/hotel/liked", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData; //
    },
    onSuccess: (data) => {
      toast.success(data?.msg);
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
    },
  });

  if (isError) {
    alert("Something went wrong");
  }
  const handleLiked = (id: string) => {
    // @ts-ignore
    mutation.mutate({
      userId: "660d50fda80847a6bb79f1f7",
      hotelId: id,
    });
  };
  return (
    <Link
      to={`/hotel/${item?._id}`}
      className={`w-full h-full rounded-2xl shadow bg-white ${className} overflow-hidden`}
    >
      <div className="relative p-2">
        <img
          className="rounded-2xl w-full xs:h-[150px] sm:h-[200px] md:h-[]"
          src={item?.imageUrl}
          alt="product image"
        />
        <div className="flex absolute top-10 right-10 bg-white rounded-full p-2 items-center justify-center">
          {data?.user?.likedHotel && (
            <FaRegHeart
              className={`size-5`}
              fill={data?.user?.likedHotel.includes(item?._id) ? "red" : ""}
              onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) => {
                e.preventDefault();
                handleLiked(item?._id);
              }}
            />
          )}
        </div>
      </div>
      <div className="px-3 pb-5">
        <p className="text-lg font-semibold text-gray-700 tracking-tight truncate">
          {item?.hotelName || "Opula haven hotel"}
        </p>
        <p className="text-sm font-normal text-gray-400 mb-4">
          {item?.address || "Rewari,Haryana"}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold">
            {/* @ts-ignore */}
            <span className="font-bold">₹{item?.roomType[0]?.deluxe}</span>{" "}
            <span className="font-normal text-xs">/ 24 hours</span>
          </span>
          <span className="bg-gray-500 font-semibold px-2.5 py-0.5 rounded flex items-center justify-between gap-2">
            <svg
              className="w-2 h-2 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>{" "}
            <span className="text-gray-300">{averageRating}</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Hotel;
