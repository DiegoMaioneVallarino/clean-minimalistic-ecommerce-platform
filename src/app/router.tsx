import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import Home from "../pages/Home";
import Men from "../pages/Men";
import Women from "../pages/Women";
import Sales from "../pages/Sales";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Catalog from "../pages/Catalog";
import ProductDetail from "../pages/ProductDetail";

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
        path: "catalog",
        element: <Catalog />,
      },
      {
        path: "men",
        element: <Men />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
        },
      {
        path: "women",
        element: <Women />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;