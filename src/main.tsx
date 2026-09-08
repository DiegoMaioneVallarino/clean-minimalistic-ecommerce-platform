import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./app/router";

import { CartProvider } from "./store/CartContext";
import { AuthProvider } from "./store/AuthContext";

import { ProductProvider } from "./store/ProductContext";

createRoot(
    document.getElementById("root")!
).render(
    <StrictMode>

        <AuthProvider>

    <ProductProvider>

        <CartProvider>

            <RouterProvider
                router={router}
            />

        </CartProvider>

    </ProductProvider>

</AuthProvider>

    </StrictMode>
);