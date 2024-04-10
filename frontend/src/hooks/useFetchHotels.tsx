import { BACKEND_URL } from "@/constant";
import { useQuery } from "@tanstack/react-query";

interface GetFetchProps {
  endpoint: string;
  params?: object;
  key?: string;
}

const useFetchHotels = ({ endpoint = "", params = {}, key }: GetFetchProps) => {
  let url = `${BACKEND_URL + endpoint}`;
  if (Object.keys(params).length > 0) {
    const queryString = Object.entries(params)
      .map((param) => {
        return `${param[0]}=${param[1]}`;
      })
      .join("&");
    url += `?${queryString}`;
  }

  const fetchAllHotels = async () => {
    return (
      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    ).json();
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: [key  || "hotelList"], // unique cache key
    queryFn: fetchAllHotels,
  });

  return { data, isLoading, isError };
};

export default useFetchHotels;
// const useFetchHotels = ({ endpoint = "", params = {} }: GetFetchProps) => {
//   const queryString = Object.entries(params)
//     .map((param) => {
//       return `${param[0]}=${param[1]}`;
//     })
//     .join("&");
//   const url = `${BACKEND_URL + endpoint}?${queryString}`;
//   const fetchAllHotels = async () => {
//     return (
//       await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       })
//     ).json();
//   };
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["likedHotel"],
//     queryFn: fetchAllHotels,
//   });

//   return { data, isLoading, isError };
// };

// const usePostFetch = async (endpoint: any, payload?: any) => {};

export { useFetchHotels };
