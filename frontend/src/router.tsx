import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layout/main-layout";
import { BikeDetails } from "./pages/bike-details";
import { Bikes } from "./pages/bikes";
import { CarDetails } from "./pages/car-details";
import { Cars } from "./pages/cars";
import { Home } from "./pages/home";
import { SpaceshipDetails } from "./pages/spaceship-details";
import { Spaceships } from "./pages/spaceships";
import { ViewAll } from "./pages/view-all";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "vehicles",
        element: <ViewAll />,
      },
      {
        path: "cars",
        element: <Cars />,
      },
      {
        path: 'cars/:car_id',
        element: <CarDetails />
      },
      {
        path: "bikes",
        element: <Bikes />,
      },
      {
        path: 'bikes/:bike_id',
        element: <BikeDetails />
      },
      {
        path: "spaceships",
        element: <Spaceships />,
      },
      {
        path: 'spaceships/:spaceship_id',
        element: <SpaceshipDetails />
      },
    ],
  },
]);

export default router;
