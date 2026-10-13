
import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import type { Product } from "../types/Product";

export type CartVariant = {
    color?: string;
    size?: string;
};

export type CartItem = {
    key: string;
    product: Product;
    quantity: number;
    color?: string;
    size?: string;
};

type CartContextType = {
    items: CartItem[];

    addToCart: (
        product: Product,
        variant?: CartVariant
    ) => void;

    removeFromCart: (key: string) => void;
    increaseQuantity: (key: string) => void;
    decreaseQuantity: (key: string) => void;
};

const CartContext = createContext<
    CartContextType | undefined
>(undefined);

type CartProviderProps = {
    children: ReactNode;
};

export function createCartItemKey(
    productId: number,
    variant: CartVariant = {}
): string {
    return JSON.stringify([
        productId,
        variant.color ?? null,
        variant.size ?? null,
    ]);
}

export function CartProvider({
    children,
}: CartProviderProps) {

    const [items, setItems] = useState<CartItem[]>([]);

    function addToCart(
        product: Product,
        variant: CartVariant = {}
    ) {
        const key = createCartItemKey(
            product.id,
            variant
        );

        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.key === key
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.key === key
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
                    key,
                    product,
                    quantity: 1,
                    color: variant.color,
                    size: variant.size,
                },
            ];
        });
    }

    function removeFromCart(key: string) {
        setItems((currentItems) =>
            currentItems.filter(
                (item) => item.key !== key
            )
        );
    }

    function increaseQuantity(key: string) {
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.key === key
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    }

    function decreaseQuantity(key: string) {
        setItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.key === key
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
