import { IoBedOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ChangeEvent, useState } from "react";
import { hotels } from "@/data/data";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";

import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required("Full name is required"),
    address: yup.string().required("Address is required"),
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
    cardName: yup.string().required("Card Holder Name is required"),
    cardNumber: yup
      .number()
      .test(
        "len",
        "Card Number must be exactly 16 digits",
        // @ts-ignore
        (val) => val && val.toString().length === 16
      )
      .required("Card Number is required"),
    cvv: yup
      .number()
      .test(
        "len",
        "CVV Number must be exactly 3 digits",
        // @ts-ignore
        (val) => val && val.toString().length === 3
      )
      .required("CVV is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const ProductPage = () => {
  const hotel = hotels[0];
  const [showCVV, setShowCVV] = useState(false);
  var currentDate = new Date();

  // Set the day to 1 to get the first day of the month
  currentDate.setDate(1);

  // Get the Unix timestamp
  var timestamp = currentDate.getTime();
  const [expiryDate, setExpiryDate] = useState(timestamp);
  console.log("🚀 ~ ProductPage ~ expiryDate:", expiryDate);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => console.log(data);

  const [cardNumber, setCardNumber] = useState("");

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    let formattedNumber = e.target.value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1-");
    // Remove the last dash if it exists
    if (formattedNumber.endsWith("-")) {
      formattedNumber = formattedNumber.slice(0, -1);
    }
    formattedNumber = formattedNumber.slice(0, 19);
    setCardNumber(formattedNumber);
  };

  const handleExpiryChange = (date: any) => {
    console.log("Datea", date);
    const selectedDate = new Date(date);
    const formattedDate = `${selectedDate.getMonth() + 1}/${selectedDate
      .getFullYear()
      .toString()
      .slice(2)}`;
    setExpiryDate(formattedDate);

    console.log("formattedDate", formattedDate);
  };

  return (
    <div className="w-full">
      <nav
        className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="#"
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
            </a>
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
              <a
                href="#"
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                Product
              </a>
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
                Details
              </span>
            </div>
          </li>
        </ol>
      </nav>
      {/* Room details */}
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
          <div className="flex justify-between gap-1 items-center my-4">
            <div className="px-1">
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
            <div>
              <p className="font-semibold text-base ">
                ₹ {hotel.roomType[0]?.deluxe}{" "}
                <span className="text-sm font-normal">/night</span>
              </p>
            </div>
          </div>
          {/* Hotel Description */}
          <div className="mb-2">
            <p className="text-sm text-gray-500 font-extralight pl-2">
              {hotel.description}
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
          <h3 className=" font-semibold text-gray-700 mb-3">
            Check out details
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="name"
                  placeholder="Full name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">
                    Full name is required
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

            {/* Payment fields */}
            <h3 className="my-4 text-gray-500 font-semibold">
              Payment Details
            </h3>

            <div className="max-w-3xl mx-auto">
              {/* <label htmlFor="card-number-input" className="sr-only">
                Card number:
              </label> */}
              <div className="grid grid-cols-2 gap-4 my-4 w-full">
                <div className="relative basis-1/2">
                  <input
                    type="text"
                    id="card-number-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="4242 4242 4242 4242"
                    pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                  <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                    <svg
                      fill="none"
                      className="h-6 text-[#1434CB] dark:text-white"
                      viewBox="0 0 36 21"
                    >
                      <path
                        fill="currentColor"
                        d="M23.315 4.773c-2.542 0-4.813 1.3-4.813 3.705 0 2.756 4.028 2.947 4.028 4.332 0 .583-.676 1.105-1.832 1.105-1.64 0-2.866-.73-2.866-.73l-.524 2.426s1.412.616 3.286.616c2.78 0 4.966-1.365 4.966-3.81 0-2.913-4.045-3.097-4.045-4.383 0-.457.555-.957 1.708-.957 1.3 0 2.36.53 2.36.53l.514-2.343s-1.154-.491-2.782-.491zM.062 4.95L0 5.303s1.07.193 2.032.579c1.24.442 1.329.7 1.537 1.499l2.276 8.664h3.05l4.7-11.095h-3.043l-3.02 7.543L6.3 6.1c-.113-.732-.686-1.15-1.386-1.15H.062zm14.757 0l-2.387 11.095h2.902l2.38-11.096h-2.895zm16.187 0c-.7 0-1.07.37-1.342 1.016L25.41 16.045h3.044l.589-1.68h3.708l.358 1.68h2.685L33.453 4.95h-2.447zm.396 2.997l.902 4.164h-2.417l1.515-4.164z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    className="basis-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name on card"
                    {...register("cardName")}
                  />
                  <p className="text-red-500 text-xs italic">
                    {errors.cardName?.message}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 my-4">
                <div className="relative max-w-sm col-span-1">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <label htmlFor="card-expiration-input" className="sr-only">
                    Card expiration date:
                  </label>
                  <DatePicker
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    // selected={expiryDate}
                    // onChange={(date: any) => handleExpiryChange(date)}
                    // placeholderText="Expiry date"

                    selected={expiryDate}
                    onChange={(date: any) => setExpiryDate(date)}
                    dateFormat="MM/yy"
                    excludeDates={[
                      1661990400000, 1664582400000, 1667260800000,
                      1672531200000,
                    ]}
                    showMonthYearPicker
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="cvv-input" className="sr-only">
                    Card CVV code:
                  </label>
                  <input
                    type="number"
                    id="cvv-input"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="CVV"
                    {...register("cvv")}
                  />
                  <p className="text-red-500 text-xs italic">
                    {errors.cvv?.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Card name and expiry */}
            {/* <div className="grid md:grid-cols-2 md:gap-6">
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="cardName"
                >
                  Name on card
                </label>
                <input
                  className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
                  id="cardName"
                  type="text"
                  placeholder="John Doe"
                  {...register("cardName")}
                />
                {errors.cardName && (
                  <p className="text-red-500 text-xs italic">
                    {errors.cardName.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="expiry"
                >
                  Expiry date
                </label>
                <input
                  className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
                  id="expiry"
                  type="text"
                  placeholder="Expiry"
                  value={expiry}
                  onChange={handleExpiryChange}
                />
              </div>
            </div> */}
            {/* Card no and cvv */}
            {/* <div className="grid md:grid-cols-2 md:gap-6">
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="cardNumber"
                >
                  Card Number
                </label>
                <input
                  className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
                  id="cardNumber"
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="cvv"
                >
                  CVV
                </label>
                <input
                  className="relative appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
                  id="cvv"
                  type={showCVV ? "text" : "password"}
                  placeholder="CVV"
                  {...register("cvv")}
                />
                <button
                  className="absolute inset-y-0 right-0 top-0"
                  onClick={() => setShowCVV(!showCVV)}
                >
                  {showCVV ? "Hide" : "Show"}
                </button>
                {errors.cvv && (
                  <p className="text-red-500 text-xs italic">
                    {errors.cvv?.message}
                  </p>
                )}
              </div>
            </div> */}

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Pay now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
