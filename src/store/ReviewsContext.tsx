
import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

import type { ProductReview } from "../types/ProductReview";

const STORAGE_KEY = "maison.reviews.v1";

type ReviewsContextType = {
    reviews: ProductReview[];
    addReview: (
        data: Omit<ProductReview, "id" | "createdAt">
    ) => void;
    deleteReview: (id: string) => void;
};

const ReviewsContext = createContext<
    ReviewsContextType | undefined
>(undefined);

function loadReviews(): ProductReview[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) return [];

        const parsed: unknown = JSON.parse(stored);

        return Array.isArray(parsed)
            ? parsed as ProductReview[]
            : [];
    } catch {
        return [];
    }
}

export function ReviewsProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [reviews, setReviews] = useState<ProductReview[]>(
        loadReviews
    );

    function persist(next: ProductReview[]) {
        setReviews(next);

        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(next)
            );
        } catch {
            // Storage unavailable: keep in-memory state.
        }
    }

    function addReview(
        data: Omit<ProductReview, "id" | "createdAt">
    ) {
        if (
            !Number.isInteger(data.rating) ||
            data.rating < 1 ||
            data.rating > 5 ||
            !data.comment.trim()
        ) {
            return;
        }

        const review: ProductReview = {
            ...data,
            comment: data.comment.trim(),
            id: crypto.randomUUID(),
            createdAt: Date.now(),
        };

        persist([review, ...reviews]);
    }

    function deleteReview(id: string) {
        persist(
            reviews.filter((review) => review.id !== id)
        );
    }

    return (
        <ReviewsContext.Provider
            value={{
                reviews,
                addReview,
                deleteReview,
            }}
        >
            {children}
        </ReviewsContext.Provider>
    );
}

export function useReviews() {
    const context = useContext(ReviewsContext);

    if (!context) {
        throw new Error(
            "useReviews must be used inside ReviewsProvider"
        );
    }

    return context;
}
