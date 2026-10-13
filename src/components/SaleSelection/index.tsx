
import { useRef } from "react";
import { Link } from "react-router-dom";

import { products } from "../../services/products";
import ProductCard from "../ProductCard";

import "./SaleSelection.css";

function SaleSelection() {

    const sliderRef = useRef<HTMLDivElement>(null);

    const discountedProducts = products
        .filter(
            (product) =>
                product.stock > 0 &&
                typeof product.discount === "number" &&
                product.discount > 0
        )
        .sort(
            (a, b) =>
                (b.discount ?? 0) - (a.discount ?? 0)
        );

    function scrollProducts(direction: number) {
        const slider = sliderRef.current;

        if (!slider) return;

        const firstCard = slider.firstElementChild;

        if (!(firstCard instanceof HTMLElement)) return;

        const styles = window.getComputedStyle(slider);
        const gap = parseFloat(styles.columnGap) || 0;

        const distance = firstCard.getBoundingClientRect().width + gap;

        slider.scrollBy({
            left: direction * distance * 3,
            behavior: "smooth",
        });
    }

    if (discountedProducts.length === 0) {
        return null;
    }

    return (
        <section className="sale-selection">

            <div className="sale-selection-header">

                <div className="sale-selection-heading">
                    <span className="sale-selection-eyebrow">
                        THE MAISON EDIT / SPECIAL PRICES
                    </span>

                    <h2>Selected for Less</h2>

                    <p>Rare pieces. Better prices.</p>
                </div>

                <div className="sale-selection-actions">

                    <button
                        type="button"
                        className="sale-selection-arrow"
                        aria-label="Previous products"
                        onClick={() => scrollProducts(-1)}
                    >
                        ←
                    </button>

                    <button
                        type="button"
                        className="sale-selection-arrow"
                        aria-label="Next products"
                        onClick={() => scrollProducts(1)}
                    >
                        →
                    </button>

                    <Link
                        to="/sales"
                        className="sale-selection-view-all"
                    >
                        VIEW ALL SALE ↗
                    </Link>

                </div>

            </div>

            <div
                className="sale-selection-slider"
                ref={sliderRef}
                aria-label="Discounted products"
            >
                {discountedProducts.map((product) => (
                    <div
                        key={product.id}
                        className="sale-selection-slide"
                    >
                        <ProductCard
                            product={product}
                            hoverMode="zoom"
                        />
                    </div>
                ))}
            </div>

            <div className="sale-selection-footer">
                <Link to="/sales">
                    EXPLORE ALL DISCOUNTS ↗
                </Link>
            </div>

        </section>
    );
}

export default SaleSelection;
