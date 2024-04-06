import Cookies from "js-cookie";

const User = () => {
  const hotelUser: string | undefined = Cookies.get("hotelUser");
  let parsedUser: Record<string, any>;

  if (hotelUser !== undefined) {
    parsedUser = JSON.parse(hotelUser);
  } else {
    parsedUser = {};
  }
  const currentDate = new Date();

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  return (
    <div className="flex justify-between gap-3 pt-5 mb-5">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-normal text-gray-900 truncate">
            Welcome back
          </p>
          <p className="text-base text-gray-500 truncate dark:text-gray-400">
            {parsedUser?.fullName ?? "Guest"}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-5 text-base font-semibold text-gray-900 dark:text-white">
          {parsedUser?.address && (
            <p className="text-base text-gray-500 truncate dark:text-gray-400 bg-gray-200 px-4 py-2 rounded-full">
              {parsedUser?.address ?? null}
            </p>
          )}
          <p className="text-base text-gray-500 truncate dark:text-gray-400 bg-gray-200 px-4 py-2 rounded-full">
            {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default User;
