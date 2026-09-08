import { useState } from "react";

import { products } from "../../services/products";
import ProductCard from "../../components/ProductCard";

import "../../styles/catalog.css";

import {
    useSearchParams,
} from "react-router-dom";

type CatalogCategory =
    | "all"
    | "men"
    | "women";

type PriceOrder =
    | "default"
    | "low-high"
    | "high-low";

function Catalog() {

    const [selectedCategory, setSelectedCategory] =
        useState<CatalogCategory>("all");

    const [priceOrder, setPriceOrder] =
        useState<PriceOrder>("default");

    const [showSold, setShowSold] =
        useState(false);

    const [searchParams] =
    useSearchParams();

    const query =
    searchParams
        .get("q")
        ?.trim()
        .toLowerCase() ?? "";

  let visibleProducts = [...products];


if (showSold) {

    visibleProducts =
        visibleProducts.filter(
            (product) =>
                (product.soldCount ?? 0) > 0
        );

} else if (
    selectedCategory !== "all"
) {

    visibleProducts =
        visibleProducts.filter(
            (product) =>
                product.category ===
                selectedCategory
        );
}


if (query) {

    visibleProducts =
        visibleProducts.filter(
            (product) => {

                const searchableText = `
                    ${product.name}
                    ${product.category}
                    ${product.subcategory ?? ""}
                    ${product.description}
                `.toLowerCase();

                return searchableText.includes(
                    query
                );
            }
        );
}


    if (priceOrder === "low-high") {

        visibleProducts = [
            ...visibleProducts
        ].sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (priceOrder === "high-low") {

        visibleProducts = [
            ...visibleProducts
        ].sort(
            (a, b) =>
                b.price - a.price
        );

    }


    function selectCategory(
        category: CatalogCategory
    ) {
        setSelectedCategory(category);

        setShowSold(false);
    }


    return (
        <section className="catalog">

            <aside className="catalog-sidebar">

                <div>

                    <p className="catalog-sidebar-title">
                        Categories
                    </p>


                    <nav className="catalog-categories">

                        <button
                            className={
                                !showSold &&
                                selectedCategory === "all"
                                    ? "active"
                                    : ""
                            }

                            onClick={() =>
                                selectCategory("all")
                            }
                        >
                            All
                        </button>


                        <button
                            className={
                                !showSold &&
                                selectedCategory === "men"
                                    ? "active"
                                    : ""
                            }

                            onClick={() =>
                                selectCategory("men")
                            }
                        >
                            Men
                        </button>


                        <button
                            className={
                                !showSold &&
                                selectedCategory === "women"
                                    ? "active"
                                    : ""
                            }

                            onClick={() =>
                                selectCategory("women")
                            }
                        >
                            Women
                        </button>

                    </nav>

                </div>


                <button
                    className={
                        showSold
                            ? "sold-products-button active"
                            : "sold-products-button"
                    }

                    onClick={() =>
                        setShowSold(true)
                    }
                >
                    Sold items
                </button>

            </aside>


            <div className="catalog-content">

                <div className="catalog-header">

                    <div>
                        <h1>
                            {showSold
                                ? "Sold items"
                                : "Catalog"}
                        </h1>

                        <p>
                            {visibleProducts.length} items
                        </p>
                    </div>


                    <div className="catalog-sort">

                        <label htmlFor="price-order">
                            Sort by
                        </label>

                        <select
    id="price-order"
    value={priceOrder}
    onChange={(event) => {
        setPriceOrder(event.target.value as PriceOrder);
    }}
>
    <option value="default">
        Default
    </option>

    <option value="low-high">
        Price: low to high
    </option>

    <option value="high-low">
        Price: high to low
    </option>
</select>

                    </div>

                </div>


                <div className="catalog-grid">

                    {visibleProducts.map(
                        (product) => (

                            <ProductCard
                                key={product.id}
                                product={product}
                                hoverMode="zoom"
                            />

                        )
                    )}

                </div>

            </div>

        </section>
    );
}

export default Catalog;