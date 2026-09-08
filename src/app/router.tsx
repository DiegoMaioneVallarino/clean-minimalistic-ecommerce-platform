import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import RequireAdmin from "../components/RequireAdmin";

import Home from "../pages/Home";
import Men from "../pages/Men";
import Women from "../pages/Women";
import Sales from "../pages/Sales";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Checkout from "../pages/Checkout";
import ProductDetail from "../pages/ProductDetail";
import Admin from "../pages/Admin";
import AdminProductEdit from "../pages/AdminProductEdit";
import AdminProductCreate from "../pages/AdminProductCreate";
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
                path: "men",
                element: <Men />,
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
                path: "catalog",
                element: <Catalog />,
            },

            {
                path: "cart",
                element: <Cart />,
            },

            {
                path: "login",
                element: <Login />,
            },

            {
                path: "register",
                element: <Register />,
            },

            {
                path: "checkout",
                element: <Checkout />,
            },

            {
                path: "product/:id",
                element: <ProductDetail />,
            },

            {
                path: "admin",
                element: (
                    <RequireAdmin>
                        <Admin />
                    </RequireAdmin>
                ),
            },
            {
                path: "admin/products/:id/edit",

                element: (
                    <RequireAdmin>
                        <AdminProductEdit />
                    </RequireAdmin>
                ),
            },
            {
                path: "admin/products/new",

                element: (
                    <RequireAdmin>
                        <AdminProductCreate />
                    </RequireAdmin>
                ),
            },
        ],
    },
]);

export default router;