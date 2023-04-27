// react-router-dom
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// pages
import RootLayout from "./pages/RootLayout";
import TrendingTopics from "./pages/TrendingTopics";
import ProductSectionLayout from "./pages/ProductSectionLayout";
import ErrorController from "./pages/ErrorController";
import FilterProduct from "./pages/FilterProduct";
import Products from "./pages/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorController />,
    children: [
      {
        path: "/",
        element: <TrendingTopics />,
        children: [
          {
            path: "/:order",
            element: <Products />,
          },
        ],
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
