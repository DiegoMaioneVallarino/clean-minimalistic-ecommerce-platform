
import "./styles/motion.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./app/router";

import { CartProvider } from "./store/CartContext";
import { AuthProvider } from "./store/AuthContext";
import { ProductProvider } from "./store/ProductContext";
import { ShoppingHistoryProvider } from "./store/ShoppingHistoryContext";
import { ReviewsProvider } from "./store/ReviewsContext";
import { AddressProvider } from "./store/AddressContext";
import { OrdersProvider } from "./store/OrdersContext";
import { ProductRequestsProvider } from "./store/ProductRequestsContext";
createRoot(
    document.getElementById("root")!
).render(
    <StrictMode>
        <AuthProvider> <AddressProvider>
            <ProductProvider>
                <CartProvider>
                    <ShoppingHistoryProvider>
                      <ReviewsProvider>
                            <OrdersProvider>
    <ProductRequestsProvider>
        <RouterProvider router={router} />
    </ProductRequestsProvider>
</OrdersProvider>
                        </ReviewsProvider>  
                    </ShoppingHistoryProvider>
                </CartProvider>
            </ProductProvider>
             </AddressProvider>
        </AuthProvider>
    </StrictMode>
);
