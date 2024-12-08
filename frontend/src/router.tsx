import { createBrowserRouter } from "react-router";
import { Home } from "./pages/home";
import { MainLayout } from "./layout/main-layout";
import { Cars } from "./pages/cars";

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
        element: <div>BIKES</div>,
      },
      {
        path: "spaceships",
        element: <div>SPACESHIPS</div>,
      },
    ]
  },
]);

export default router;
