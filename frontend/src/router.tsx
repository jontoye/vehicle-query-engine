import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layout/main-layout";
import { Bikes } from "./pages/bikes";
import { Cars } from "./pages/cars";
import { Home } from "./pages/home";
import { Spaceships } from "./pages/spaceships";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "vehicles",
        element: <div>VEHICLES</div>,
      },
      {
        path: "cars",
        element: <Cars />,
      },
      {
        path: "bikes",
        element: <Bikes />
      },
      {
        path: "spaceships",
        element: <Spaceships />
      },
    ]
  },
]);

export default router;
