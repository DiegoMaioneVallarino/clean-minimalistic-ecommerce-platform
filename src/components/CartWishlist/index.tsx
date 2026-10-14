
import { useRef } from "react";

import { useProducts } from "../../store/ProductContext";
import { useShoppingHistory } from "../../store/ShoppingHistoryContext";

import SavedProductCard from "../SavedProductCard";
import type { Product } from "../../types/Product";
import "./CartWishlist.css";

function CartWishlist() {
    const sliderRef = useRef<HTMLDivElement>(null);

    const { products } = useProducts();
    const { wishlistIds } = useShoppingHistory();

    const wishlistProducts = wishlistIds
    .map((id) => products.find((product) => product.id === id))
    .filter(
        (product): product is Product =>
            product !== undefined && product.stock > 0
    );

    function move(direction: number) {
        const slider = sliderRef.current;
        if (!slider) return;

        slider.scrollBy({
            left: direction * slider.clientWidth,
            behavior: "smooth",
        });
    }

    return (
        <section className="cart-wishlist">
            <div className="cart-wishlist-header">
                <div>
                    <span className="cart-wishlist-eyebrow">
                        YOUR PERSONAL EDIT
                    </span>
                    <h2>Your Wishlist</h2>
                </div>

                {wishlistProducts.length > 0 && (
                    <div className="cart-wishlist-controls">
                        <button
                            type="button"
                            onClick={() => move(-1)}
                            aria-label="Previous wishlist products"
                        >
                            ←
                        </button>

                        <button
                            type="button"
                            onClick={() => move(1)}
                            aria-label="Next wishlist products"
                        >
                            →
                        </button>
                    </div>
                )}
            </div>

            {wishlistProducts.length === 0 ? (
                <p className="cart-wishlist-empty">
                    No saved pieces yet. Explore the collection
                    and tap the heart to save your favorites.
                </p>
            ) : (
                <div
                    ref={sliderRef}
                    className="cart-wishlist-slider"
                >
                    {wishlistProducts.map((product) => (
                        <div
                            key={product.id}
                            className="cart-wishlist-slide"
                        >
                            <SavedProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default CartWishlist;
