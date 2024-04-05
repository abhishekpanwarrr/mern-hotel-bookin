import React, { useEffect, useState } from "react";
import { FaPerson } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdPhoneAndroid } from "react-icons/md";
import { FaLocationCrosshairs } from "react-icons/fa6";
import Cookies from "js-cookie";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Profile = ({ open, setOpen }: Props) => {
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    (async () => {
      console.log("🚀 ~ Profile ~ open:", open)
      const user = Cookies.get("hotelUser");
      if (user) {
        setUser(JSON.parse(user));
      }
    })();
  }, [open]);
  return (
    <div
      className={`${
        !open && "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 bg-[rgba(0,0,0,0.2)] flex justify-center items-center`}
    >
      <div className="relative p-4 min-w-xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Profile
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="static-modal"
              onClick={() => setOpen(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <div className="my-4 space-y-3 min-w-[500px]">
              <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                <FaPerson className="text-xl text-red-500" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  {user?.fullName ?? "Guest"}
                </span>
                <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                  User
                </span>
              </div>

              <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                <MdEmail className="text-xl text-yellow-500" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  {user?.email ?? "No email"}
                </span>
              </div>

              <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                <MdPhoneAndroid className="text-xl text-green-500" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  +91- 8199988872
                </span>
              </div>

              <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                <FaLocationCrosshairs className="text-xl text-blue-500" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  {user?.address ?? "No location found"}
                </span>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                <svg
                  className="w-3 h-3 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Want to change personal details?
              </div>
            </div>
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
