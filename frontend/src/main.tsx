import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import NotFound from "./components/NotFound.tsx";
import LinkedPage from "./pages/LikedPage.tsx";
import Orders from "./pages/Orders.tsx";
import HotelPage from "./pages/HotelPage.tsx";
import AllHotels from "./pages/AllHotels.tsx";
import SearchResultPage from "./pages/SearchResultPage.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import { Contact } from "./pages/Contact.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<HomePage />} />
      <Route path="hotel/:id" element={<HotelPage />} />
      <Route path="hotels" element={<AllHotels />} />
      <Route path="orders" element={<Orders />} />
      <Route path="liked" element={<LinkedPage />} />
      <Route path="search" element={<SearchResultPage />} />
      <Route path="privacy" element={<Privacy />} />
      <Route path="terms" element={<Terms />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </React.StrictMode>
);
