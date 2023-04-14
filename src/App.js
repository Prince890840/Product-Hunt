import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import TrendingTopics from "./pages/TrendingTopics";
import ProductSectionLayout from "./pages/ProductSectionLayout";
import ErrorController from "./pages/ErrorController";

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
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
