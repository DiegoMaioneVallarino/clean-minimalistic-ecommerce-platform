
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

const WISHLIST_KEY = "maison.wishlist.v1";
const RECENT_KEY = "maison.recentlyViewed.v1";
const MAX_RECENT = 20;

type ShoppingHistoryContextType = {
    wishlistIds: number[];
    recentlyViewedIds: number[];
    toggleWishlist: (id: number) => void;
    isWishlisted: (id: number) => boolean;
    recordView: (id: number) => void;
    removeRecent: (id: number) => void;
    clearRecent: () => void;
};

const ShoppingHistoryContext =
    createContext<ShoppingHistoryContextType | null>(null);

function readIds(key: string): number[] {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return [];

        const parsed: unknown = JSON.parse(raw);

        if (!Array.isArray(parsed)) return [];

        return [...new Set(
            parsed.filter(
                (value): value is number =>
                    typeof value === "number" &&
                    Number.isSafeInteger(value) &&
                    value >= 0
            )
        )];
    } catch {
        return [];
    }
}

export function ShoppingHistoryProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [wishlistIds, setWishlistIds] = useState<number[]>(
        () => readIds(WISHLIST_KEY)
    );

    const [recentlyViewedIds, setRecentlyViewedIds] =
        useState<number[]>(
            () => readIds(RECENT_KEY).slice(0, MAX_RECENT)
        );

    useEffect(() => {
        localStorage.setItem(
            WISHLIST_KEY,
            JSON.stringify(wishlistIds)
        );
    }, [wishlistIds]);

    useEffect(() => {
        localStorage.setItem(
            RECENT_KEY,
            JSON.stringify(recentlyViewedIds)
        );
    }, [recentlyViewedIds]);

    const toggleWishlist = useCallback((id: number) => {
        setWishlistIds((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    }, []);

    const isWishlisted = (id: number) =>
        wishlistIds.includes(id);

    const recordView = useCallback((id: number) => {
        setRecentlyViewedIds((current) => {
            if (current[0] === id) return current;

            return [
                id,
                ...current.filter((item) => item !== id),
            ].slice(0, MAX_RECENT);
        });
    }, []);

    const removeRecent = useCallback((id: number) => {
        setRecentlyViewedIds((current) =>
            current.filter((item) => item !== id)
        );
    }, []);

    const clearRecent = useCallback(() => {
        setRecentlyViewedIds([]);
    }, []);

    return (
        <ShoppingHistoryContext.Provider
            value={{
                wishlistIds,
                recentlyViewedIds,
                toggleWishlist,
                isWishlisted,
                recordView,
                removeRecent,
                clearRecent,
            }}
        >
            {children}
        </ShoppingHistoryContext.Provider>
    );
}

export function useShoppingHistory() {
    const context = useContext(ShoppingHistoryContext);

    if (!context) {
        throw new Error(
            "useShoppingHistory must be used inside ShoppingHistoryProvider"
        );
    }

    return context;
}
