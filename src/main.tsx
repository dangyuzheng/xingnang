import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./app/globals.css";

import HomePage from "./app/page";
import CityDetailPage from "./app/city/[id]/page";
import FavoritesPage from "./app/favorites/page";
import NearbyPage from "./app/nearby/page";
import NichePage from "./app/niche/page";
import HolidayPage from "./app/holiday/page";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/city/:id",
      element: <CityDetailPage />,
    },
    {
      path: "/favorites",
      element: <FavoritesPage />,
    },
    {
      path: "/nearby",
      element: <NearbyPage />,
    },
    {
      path: "/niche",
      element: <NichePage />,
    },
    {
      path: "/holiday",
      element: <HolidayPage />,
    },
  ],
  {
    basename: "/xingnang/",
  },
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
