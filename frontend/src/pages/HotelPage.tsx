import { IoBedOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { HotelType } from "@/types";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axios from "axios";
//  @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// @ts-ignore
import { v4 as uuidv4 } from "uuid";
const schema = yup
  .object({
    room: yup.string().required("Room is required"),
    fullName: yup.string().required("Full name is required"),
    address: yup.string().min(10).required("Address is required"),
    email: yup.string().email("Invalid Email").required("Email is required"),
    zip: yup
      .number()
      .test(
        "len",
        "Zip must be exactly 4 digits",
        // @ts-ignore
        (val) => val && val.toString().length === 6
      )
      .required("Zip code is required"),
    phone: yup
      .number()
      .positive()
      .test(
        "len",
        "Phone Number must be exactly 10 digits",
        // @ts-ignore
        (val) => val && val.toString().length === 10
      )
      .required("Phone Number is required"),
    house: yup.number().required("House no is required"),
    checkInDate: yup.date().required("Check-in Date is required"),
    checkOutDate: yup.date().required("Check-out Date is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const HotelPage = () => {
  const params = useParams();
  const getHotelData = async () => {
    return (
      await fetch(`http://localhost:8000/api/v1/hotel/hotel/${params.id}`, {
        method: "GET",
      })
    ).json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["hotelData"],
    queryFn: getHotelData,
  });
  const [hotel, setHotel] = useState<HotelType>({} as HotelType);

  useEffect(() => {
    if (data) {
      setHotel(data?.hotel);
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  function loadScript(src: any) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay(hotelData: FormData) {
    const userData = Cookies.get("hotelUser");
    const parsedUser = JSON.parse(userData);
    console.log("parsedUSerId", parsedUser?._id);

    console.log("🚀 ~ displayRazorpay ~ data:", data);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const result = await axios.post(
      "http://localhost:8000/api/v1/payment/orders",
      {
        // @ts-ignore
        amount: hotelData?.room?.price,
        orderId: uuidv4(),
      }
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }
    const { amount, id: order_id, currency } = result.data.data;

    const options = {
      key: import.meta.env.RAZOR_KEY,
      amount: amount,
      currency: currency,
      name: "Abhishek Hotel",
      description: "Payment for hotel booking",
      order_id: order_id,
      handler: async function (response: any) {
        const data = {
          totalAmount: amount,
          orderItems: {
            hotelName: hotel?.hotelName,
            // @ts-ignore
            price: hotelData?.room?.price,
            // @ts-ignore
            roomType: hotelData?.room.type,
            userName: hotelData?.fullName,
            userEmail: hotelData?.email,
            userPhone: hotelData?.phone,
            userHouse: hotelData?.house,
            userAddress: hotelData?.address,
            userZip: hotelData?.zip,
            checkInDate:hotelData?.checkInDate,
            checkOutDate:hotelData?.checkOutDate,
          },
          userId: parsedUser?._id,
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:8000/api/v1/payment/verify",
          data
        );
        if (result.status === 200) {
          return toast.success("Order placed successfully");
        } else {
          alert("Something went wrong please connect with us.");
        }
      },
      notes: {
        address: "Abhishek Corporate Office",
      },
      theme: {
        color: "#00353F",
      },
    };
    // @ts-ignore
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const onSubmit = async (data: FormData) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    const userToken = Cookies.get("hotelToken");
    if (!userToken) {
      return toast.error("Please login first");
    }
    const roomData = JSON.parse(data.room);
    console.log("🚀 ~ onSubmit ~ roomData:", roomData);
    data.room = roomData;
    await displayRazorpay(data);
  };
  const today = new Date();

  return (
    <div className="w-full">
      <nav
        className="flex px-5 py-3 mb-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              to={"/"}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <Link
                to="/hotels"
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                hotel
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                {isLoading ? (
                  <>Loading...</>
                ) : isError ? null : (
                  hotel?.hotelName
                )}
              </span>
            </div>
          </li>
        </ol>
      </nav>
      {/* Room details */}
      {isLoading ? (
        <h3 className="text-center font-bold text-red-600">Loading....</h3>
      ) : isError ? (
        <h3 className="text-center font-bold text-red-600">
          Error fetching data
        </h3>
      ) : (
        <div className="flex md:flex-row flex-col justify-between gap-10">
          {/* Room details */}
          <div className="basis-1/2">
            <div className="w-full h-96">
              <img
                className="w-full h-full object-cover rounded-sm"
                src={
                  hotel.imageUrl ||
                  "https://images.pexels.com/photos/1499477/pexels-photo-1499477.jpeg?auto=compress&cs=tinysrgb&w=800"
                }
                alt="image description"
              />
            </div>

            <div className="flex justify-between items-center my-4">
              <div className="px-1 basis-2/3">
                <h3 className="font-semibold text-gray-700 text-lg">
                  {hotel.hotelName}
                </h3>
                <p className="flex gap-3">
                  <span className="flex items-center gap-2">
                    <IoBedOutline /> 2 Beds{" "}
                  </span>
                  |{" "}
                  <span className="flex items-center gap-2">
                    <FaRegCalendarAlt />
                    Tus. Jan 2024
                  </span>
                </p>
              </div>
              <div className=" basis-1/2">
                {/* ₹ {hotel?.roomType[0]?.deluxe}{" "} */}
                <div className="flex flex-col">
                  {hotel?.roomType?.map((room, index) => {
                    const [roomType, price] = Object.entries(room)[0];
                    return (
                      <div key={index} className="flex justify-between my-1">
                        <span className="capitalize font-semibold">
                          {roomType}
                        </span>
                        <span className="text-sm font-normal">
                          ₹{price}
                          {"  "} /night
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Hotel Description */}
            <div className="mb-2">
              <p className="text-sm text-gray-500 font-extralight pl-2">
                {hotel?.description}
              </p>
            </div>
            {/* Extra Info */}
            <div className="border border-gray-300 p-4 mb-20">
              <p className="text-sm text-gray-500 font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                repellat ad corporis eum facilis amet officia, iusto architecto
                officiis iure, molestiae, minima error cupiditate laudantium!
                Voluptas magni ut consequuntur maiores.
              </p>
            </div>
          </div>

          {/* Checkout details */}
          <div className="basis-1/2 py-4 px-10">
            <h3 className="font-semibold text-gray-700 mb-3 underline">
              Check out details
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Room Type */}
              <select
                id="rooms"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("room")}
              >
                <option selected>Choose room Type</option>
                {hotel?.roomType?.map((room, index) => {
                  const roomType = Object.keys(room)[0];
                  const roomPrice = Object.values(room)[0];
                  const value = JSON.stringify({
                    type: roomType,
                    price: roomPrice,
                  }); // Create the value here
                  return (
                    <option key={index} value={value}>
                      {roomType}
                    </option>
                  );
                })}
              </select>
              {errors.room && (
                <p className="text-red-500 text-xs italic">
                  {errors.room?.message}
                </p>
              )}
              {/* Check-in Date */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="checkInDate"
                >
                  Check-in Date
                </label>
                <input
                  type="date"
                  id="checkInDate"
                  min={today.toISOString().split("T")[0]}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("checkInDate")}
                />
                {errors.checkInDate && (
                  <p className="text-red-500 text-xs italic">
                    {errors.checkInDate.message}
                  </p>
                )}
              </div>
              {/* Check-out Date */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="checkOutDate"
                >
                  Check-out Date
                </label>
                {/* <DatePicker
                  id="checkOutDate"
                  selected={today}
                  dateFormat="MM/dd/yyyy"
                  onChange={(date: any) => {
                    setValue("checkOutDate", date, { shouldValidate: true });
                  }}
                  minDate={today}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  // {...register("checkOutDate")}
                /> */}
                <input
                  type="date"
                  id="checkOutDate"
                  min={today.toISOString().split("T")[0]}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("checkOutDate")}
                />
                {errors.checkOutDate && (
                  <p className="text-red-500 text-xs italic">
                    {errors.checkOutDate.message}
                  </p>
                )}
              </div>
              {/* Name and email */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    type="text"
                    id="fullName"
                    placeholder="Full name"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs italic">
                      {errors.fullName?.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs italic">
                      Email is required
                    </p>
                  )}
                </div>
              </div>
              {/* Phone number and house no */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-4 flex flex-col">
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="phone-input"
                  >
                    Phone number
                  </label>
                  <div className="">
                    <div className="flex items-center w-full">
                      <div
                        id="dropdown-phone-button"
                        data-dropdown-toggle="dropdown-phone"
                        className="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                      >
                        <svg
                          fill="none"
                          aria-hidden="true"
                          className="h-4 w-4 me-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          id="india"
                        >
                          <path
                            fill="#f0f0f0"
                            d="M0 85.337h512v341.326H0z"
                          ></path>
                          <path
                            fill="#ff9811"
                            d="M0 85.337h512v113.775H0z"
                          ></path>
                          <path
                            fill="#6da544"
                            d="M0 312.888h512v113.775H0z"
                          ></path>
                          <circle
                            cx="256"
                            cy="256"
                            r="43.896"
                            fill="#0052b4"
                          ></circle>
                          <circle
                            cx="256"
                            cy="256"
                            r="27.434"
                            fill="#f0f0f0"
                          ></circle>
                          <path
                            fill="#0052b4"
                            d="m256 222.146 8.464 19.195 20.855-2.268L272.927 256l12.392 16.927-20.855-2.268L256 289.854l-8.464-19.195-20.855 2.268L239.073 256l-12.392-16.927 20.855 2.268z"
                          ></path>
                        </svg>
                        +91{" "}
                      </div>
                      <input
                        type="text"
                        id="phone-input"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        {...register("phone")}
                        placeholder="123-456-7890"
                      />
                    </div>
                    {errors.address && (
                      <p className="text-red-500 text-xs italic">
                        {errors.phone?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="house"
                  >
                    H. No
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="house"
                    type="text"
                    placeholder="Ex. 123"
                    {...register("house")}
                  />
                  {errors.house && (
                    <p className="text-red-500 text-xs italic">
                      {errors.house?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Address and zip code */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="address"
                  >
                    Full Address
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="address"
                    type="text"
                    placeholder="Full address"
                    {...register("address")}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs italic">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="zipcode"
                  >
                    Zip Code
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="zipcode"
                    type="text"
                    placeholder="Zip code"
                    {...register("zip")}
                  />
                  {errors.zip && (
                    <p className="text-red-500 text-xs italic">
                      {errors.zip.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
              >
                Pay now
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelPage;
