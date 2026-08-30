import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import type { Product } from "../types/Product";

type CartItem = {
    product: Product;
    quantity: number;
};

type CartContextType = {
    items: CartItem[];

    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(
    undefined
);

type CartProviderProps = {
    children: ReactNode;
};

export function CartProvider({
    children,
}: CartProviderProps) {

    const [items, setItems] = useState<CartItem[]>([]);

    function addToCart(product: Product) {

        setItems((currentItems) => {

            const existingItem = currentItems.find(
                (item) => item.product.id === product.id
            );

            if (existingItem) {

                return currentItems.map((item) =>
                    item.product.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    product,
                    quantity: 1,
                },
            ];
        });
    }

    function removeFromCart(productId: number) {

        setItems((currentItems) =>
            currentItems.filter(
                (item) => item.product.id !== productId
            )
        );
    }

    function increaseQuantity(productId: number) {

        setItems((currentItems) =>
            currentItems.map((item) =>
                item.product.id === productId
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    }

    function decreaseQuantity(productId: number) {

        setItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.product.id === productId
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {

    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
}