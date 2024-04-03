import { Suspense, lazy } from "react";
import "react-datepicker/dist/react-datepicker.css";
const RecentAddedHotels = lazy(
  () => import("@/components/RecentAddedHotels/RecentAddedHotels")
);
const RecommendedHotels = lazy(() => import("@/components/RecommendHotels"));
const TopCarousel = lazy(() => import("@/components/TopCarousel"));
const RecentSearched = lazy(
  () => import("@/components/RecentSearched/RecentSearched")
);
const NewHotels = lazy(() => import("@/components/NewHotels/NewHotels"));
const HomePageHero = lazy(
  () => import("@/components/HomePageHero/HomePageHero")
);
const User = lazy(() => import("@/components/User"));

const LoadingFallback = () => <div>Loading...</div>;

const HomePage = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <TopCarousel />
      <div className="flex flex-1 md:flex-row flex-col justify-between gap-10 bg-slate-100 rounded-2xl shadow-sm py-2">
        <div className="w-full lg:w-1/2">
          <User />
          <HomePageHero />
          <RecommendedHotels />
        </div>
        <RecentAddedHotels />
      </div>
      <RecentSearched />
      <NewHotels />
    </Suspense>
  );
};

export default HomePage;
