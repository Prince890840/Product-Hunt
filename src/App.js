// react-router-dom
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// pages
import RootLayout from "./pages/RootLayout";
import TrendingTopics from "./pages/TrendingTopics";
import ProductSectionLayout from "./pages/ProductSectionLayout";
import ErrorController from "./pages/ErrorController";
import FilterProduct from "./pages/FilterProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorController />,
    children: [
      {
        index: true,
        element: <TrendingTopics />,
      },
      {
        path: "",
        element: <ProductSectionLayout />,
      },
      {
        path: "/time-travel/:year/:month/:date",
        element: <FilterProduct />,
      },
      {
        path: "/time-travel/:year/:month",
        element: <FilterProduct />,
      },
      {
        path: "/time-travel/:year",
        element: <FilterProduct />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
