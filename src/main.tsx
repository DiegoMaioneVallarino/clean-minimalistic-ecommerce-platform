
import "./styles/motion.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./app/router";

import { CartProvider } from "./store/CartContext";
import { AuthProvider } from "./store/AuthContext";
import { ProductProvider } from "./store/ProductContext";
import { ShoppingHistoryProvider } from "./store/ShoppingHistoryContext";

createRoot(
    document.getElementById("root")!
).render(
    <StrictMode>
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    <ShoppingHistoryProvider>
                        <RouterProvider router={router} />
                    </ShoppingHistoryProvider>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
    </StrictMode>
);
