const User = () => {
  return (
    <div className="flex justify-between gap-3 pt-5 mb-5">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-normal text-gray-900 truncate">
            Welcome back
          </p>
          <p className="text-base text-gray-500 truncate dark:text-gray-400">
            Abhishek Panwar
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-5 text-base font-semibold text-gray-900 dark:text-white">
          <p className="text-base text-gray-500 truncate dark:text-gray-400 bg-gray-200 px-4 py-2 rounded-full">
            Rewari,Haryana
          </p>
          <p className="text-base text-gray-500 truncate dark:text-gray-400 bg-gray-200 px-4 py-2 rounded-full">
            March 17-march 20, 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default User;
