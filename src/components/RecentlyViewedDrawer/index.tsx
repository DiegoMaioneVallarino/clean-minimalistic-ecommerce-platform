
import { useEffect, useState } from "react";

import { useProducts } from "../../store/ProductContext";
import { useShoppingHistory } from "../../store/ShoppingHistoryContext";

import SavedProductCard from "../SavedProductCard";
import type { Product } from "../../types/Product";
import "./RecentlyViewedDrawer.css";

function RecentlyViewedDrawer() {
    const [open, setOpen] = useState(false);

    const { products } = useProducts();

    const {
        recentlyViewedIds,
        clearRecent,
    } = useShoppingHistory();

    const recentProducts = recentlyViewedIds
    .map((id) => products.find((product) => product.id === id))
    .filter(
        (product): product is Product =>
            product !== undefined && product.stock > 0
    );

    useEffect(() => {
        if (!open) return;

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") setOpen(false);
        }

        window.addEventListener("keydown", handleEscape);

        return () =>
            window.removeEventListener("keydown", handleEscape);
    }, [open]);

    return (
        <>
            <button
                type="button"
                className="recently-viewed-trigger"
                onClick={() => setOpen((current) => !current)}
                aria-expanded={open}
                aria-controls="recently-viewed-panel"
            >
                <span aria-hidden="true">◷</span>
                RECENTLY VIEWED
                <span className="recently-viewed-count">
                    {recentProducts.length}
                </span>
            </button>

            {open && (
                <>
                    <div
                        className="recently-viewed-backdrop"
                        onClick={() => setOpen(false)}
                    />

                    <aside
                        id="recently-viewed-panel"
                        className="recently-viewed-panel"
                        aria-label="Recently viewed products"
                    >
                        <div className="recently-viewed-header">
                            <div>
                                <span>YOUR HISTORY</span>
                                <h2>Recently Viewed</h2>
                            </div>

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label="Close recently viewed"
                            >
                                ×
                            </button>
                        </div>

                        {recentProducts.length > 0 && (
                            <button
                                type="button"
                                className="recently-viewed-clear"
                                onClick={clearRecent}
                            >
                                CLEAR HISTORY
                            </button>
                        )}

                        <div className="recently-viewed-list">
                            {recentProducts.length === 0 ? (
                                <p>
                                    Your recently viewed pieces
                                    will appear here.
                                </p>
                            ) : (
                                recentProducts.map((product) => (
                                    <SavedProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))
                            )}
                        </div>
                    </aside>
                </>
            )}
        </>
    );
}

export default RecentlyViewedDrawer;
