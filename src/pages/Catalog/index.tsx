import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { products } from "../../services/products";
import ProductCard from "../../components/ProductCard";
import ProductRequestBanner from "../../components/ProductRequestBanner";
import "../../styles/catalog.css";

type PriceOrder =
    | "default"
    | "low-high"
    | "high-low";

const clothingCategories = [
    { label: "All Clothing", value: "all" },
    { label: "Jackets & Coats", value: "jackets" },
    { label: "Pants & Denim", value: "pants" },
    { label: "Shirts", value: "shirts" },
    { label: "T-Shirts & Tops", value: "tops" },
    { label: "Dresses & Skirts", value: "dresses" },
    { label: "Knitwear", value: "knitwear" },
    { label: "Accessories", value: "accessories" },
];

const styleCategories = [
    { label: "All Styles", value: "all" },
    { label: "Western", value: "western" },
    { label: "Racing", value: "racing" },
    { label: "70s Groovy", value: "groovy" },
    { label: "Y2K", value: "y2k" },
    { label: "Grunge", value: "grunge" },
    { label: "Sportswear", value: "sportswear" },
    { label: "Biker", value: "biker" },
    { label: "Preppy", value: "preppy" },
];

const clothingKeywords: Record<string, string[]> = {
    jackets: [
        "jacket", "coat", "chamarra", "chaqueta",
        "bomber", "blazer", "windbreaker"
    ],
    pants: [
        "pants", "jeans", "denim", "trousers",
        "pantalón", "pantalones", "cargo", "flare"
    ],
    shirts: [
        "shirt", "camisa", "button-up"
    ],
    tops: [
        "t-shirt", "tee", "top", "playera",
        "polo", "tank"
    ],
    dresses: [
        "dress", "skirt", "vestido", "falda"
    ],
    knitwear: [
        "sweater", "cardigan", "knit",
        "suéter", "tejido"
    ],
    accessories: [
        "belt", "tie", "bag", "hat", "scarf",
        "cinturón", "corbata", "bolsa",
        "sombrero", "lentes"
    ],
};

const styleKeywords: Record<string, string[]> = {
    western: [
        "western", "cowboy", "cowgirl",
        "rodeo", "vaquero", "vaquera"
    ],
    racing: [
        "racing", "nascar", "motorsport",
        "formula 1", "motocross"
    ],
    groovy: [
        "groovy", "psychedelic", "70s",
        "seventies", "disco", "psicodélico"
    ],
    y2k: [
        "y2k", "2000s", "mcbling"
    ],
    grunge: [
        "grunge", "alternative", "punk"
    ],
    sportswear: [
        "sportswear", "track", "sport",
        "varsity", "athletic"
    ],
    biker: [
        "biker", "motorcycle", "moto",
        "leather"
    ],
    preppy: [
        "preppy", "ivy", "collegiate"
    ],
};

function matchesKeywords(
    text: string,
    keywords: string[]
): boolean {
    return keywords.some((keyword) =>
        text.includes(keyword)
    );
}

function Catalog() {
    const [searchParams, setSearchParams] =
        useSearchParams();

    const [priceOrder, setPriceOrder] =
        useState<PriceOrder>("default");

    const [showSold, setShowSold] =
        useState(false);

    const selectedType =
        searchParams.get("type") ?? "all";

    const selectedStyle =
        searchParams.get("style") ??
        searchParams.get("category") ??
        "all";

    const selectedGender =
        searchParams.get("gender") ?? "all";

    const query =
        searchParams.get("q")
            ?.trim()
            .toLowerCase() ?? "";

    function updateFilter(
        key: string,
        value: string
    ) {
        const next = new URLSearchParams(searchParams);

        if (value === "all") {
            next.delete(key);
        } else {
            next.set(key, value);
        }

        if (key === "style") {
            next.delete("category");
        }

        setSearchParams(next);
        setShowSold(false);
    }

    let visibleProducts = [...products];

    if (showSold) {
        visibleProducts = visibleProducts.filter(
            (product) =>
                (product.soldCount ?? 0) > 0
        );
    } else {
        if (selectedGender !== "all") {
            visibleProducts = visibleProducts.filter(
                (product) =>
                    product.category === selectedGender
            );
        }

        if (selectedType !== "all") {
            const keywords =
                clothingKeywords[selectedType] ?? [];

            visibleProducts = visibleProducts.filter(
                (product) => {
                    const text = `
                        ${product.name}
                        ${product.subcategory ?? ""}
                    `.toLowerCase();

                    return matchesKeywords(text, keywords);
                }
            );
        }

        if (selectedStyle !== "all") {
            const keywords =
                styleKeywords[selectedStyle] ?? [];

            visibleProducts = visibleProducts.filter(
                (product) => {
                    const text = `
                        ${product.name}
                        ${product.subcategory ?? ""}
                        ${product.description}
                    `.toLowerCase();

                    return matchesKeywords(text, keywords);
                }
            );
        }
    }

    if (query) {
        visibleProducts = visibleProducts.filter(
            (product) => {
                const text = `
                    ${product.name}
                    ${product.category}
                    ${product.subcategory ?? ""}
                    ${product.description}
                `.toLowerCase();

                return text.includes(query);
            }
        );
    }

    if (priceOrder === "low-high") {
        visibleProducts.sort(
            (a, b) => a.price - b.price
        );
    }

    if (priceOrder === "high-low") {
        visibleProducts.sort(
            (a, b) => b.price - a.price
        );
    }

    return (
        <section className="catalog-page motion-slide-up">
<ProductRequestBanner />
            {/* HORIZONTAL STYLE NAVIGATION */}

            <div className="catalog-style-section">

               

                <nav
                    className="catalog-style-nav"
                    aria-label="Shop by style"
                >
                    {styleCategories.map((style) => (
                        <button
                            key={style.value}
                            type="button"
                            className={
                                selectedStyle === style.value
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                updateFilter(
                                    "style",
                                    style.value
                                )
                            }
                        >
                            {style.label}
                        </button>
                    ))}
                </nav>

            </div>

            {/* MAIN CATALOG */}

            <div className="catalog">

                <aside className="catalog-sidebar">

                    <div className="catalog-sidebar-group">

                        <p className="catalog-sidebar-title">
                            Clothing
                        </p>

                        <nav className="catalog-categories">
                            {clothingCategories.map(
                                (category) => (
                                    <button
                                        key={category.value}
                                        type="button"
                                        className={
                                            selectedType ===
                                            category.value
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            updateFilter(
                                                "type",
                                                category.value
                                            )
                                        }
                                    >
                                        {category.label}
                                    </button>
                                )
                            )}
                        </nav>

                    </div>

                    <div className="catalog-sidebar-group">

                        <p className="catalog-sidebar-title">
                            Department
                        </p>

                        <nav className="catalog-categories">

                            {[
                                { label: "All", value: "all" },
                                { label: "Men", value: "men" },
                                { label: "Women", value: "women" },
                            ].map((gender) => (
                                <button
                                    key={gender.value}
                                    type="button"
                                    className={
                                        selectedGender ===
                                        gender.value
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        updateFilter(
                                            "gender",
                                            gender.value
                                        )
                                    }
                                >
                                    {gender.label}
                                </button>
                            ))}

                        </nav>

                    </div>

                    <button
                        type="button"
                        className={
                            showSold
                                ? "sold-products-button active"
                                : "sold-products-button"
                        }
                        onClick={() => setShowSold(true)}
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
                                    : "The Archive"}
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
        const newOrder = event.currentTarget.value as PriceOrder;
        setPriceOrder(newOrder);
    }}
>
    <option value="default">Default</option>
    <option value="low-high">Price: low to high</option>
    <option value="high-low">Price: high to low</option>
</select>
                        </div>

                    </div>

                    <div className="catalog-grid">

                        {visibleProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                hoverMode="zoom"
                            />
                        ))}

                    </div>

                    {visibleProducts.length === 0 && (
                        <div className="catalog-empty">
                            <h2>No pieces found.</h2>
                            <p>
                                Try another category or style.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearchParams({});
                                    setShowSold(false);
                                }}
                            >
                                CLEAR FILTERS ↗
                            </button>
                        </div>
                    )}

                </div>

            </div>

        </section>
    );
}

export default Catalog;