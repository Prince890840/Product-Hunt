// react-router-dom
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// pages
import RootLayout from "./pages/RootLayout/RootLayout";

import TrendingTopics from "./pages/TrendingTopics/TrendingTopics";

import ProductSectionLayout from "./pages/ProductSection/ProductSectionLayout";

import ErrorController from "./pages/ErrorHandler/ErrorController";

import Products from "./pages/HeroSectionProduct/Products";

import FilterProduct from "./pages/HeaderSearchFilterSection/FilterProduct";

import Collection from "./pages/Community/Collections/Collection";

import CollectionItem from "./pages/Community/Collections/CollectionItem";

import Profile from "./pages/UserProfile/Profile";

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
      {
        path: "/collections",
        element: <Collection />,
      },
      {
        path: "/collections/:collectionId",
        element: <CollectionItem />,
      },
      {
        path: "/user",
        element: <Profile />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
