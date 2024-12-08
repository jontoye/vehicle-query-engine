import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layout/main-layout";
import { Bikes } from "./pages/bikes";
import { Cars } from "./pages/cars";
import { Home } from "./pages/home";
import { Spaceships } from "./pages/spaceships";
import { ViewAll } from "./pages/view-all";

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
        element: <ViewAll />
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
