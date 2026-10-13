
import { useState } from "react";
import { Link } from "react-router-dom";

import { products } from "../../services/products";
import ProductCard from "../ProductCard";

import "./CatalogShowcase.css";

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
    jackets: ["jacket", "coat", "bomber", "chamarra"],
    pants: ["pants", "jeans", "denim", "pantalón"],
    shirts: ["shirt", "camisa"],
    tops: ["tee", "t-shirt", "top", "playera", "hoodie"],
    dresses: ["dress", "skirt", "vestido", "falda"],
    knitwear: ["sweater", "suéter", "cardigan", "knit"],
    accessories: ["bag", "bolso", "belt", "hat", "tie"],
};

const styleKeywords: Record<string, string[]> = {
    western: ["western", "cowboy", "rodeo", "vaquero"],
    racing: ["racing", "nascar", "motorsport"],
    groovy: ["groovy", "psychedelic", "70s", "disco"],
    y2k: ["y2k", "2000s", "2000", "mcbling"],
    grunge: ["grunge", "punk", "alternative"],
    sportswear: ["sportswear", "sport", "track", "athletic"],
    biker: ["biker", "motorcycle", "leather"],
    preppy: ["preppy", "ivy", "collegiate"],
};

function matchesKeywords(
    text: string,
    keywords: string[]
) {
    return keywords.some((keyword) =>
        text.includes(keyword)
    );
}

function CatalogShowcase() {

    const [selectedType, setSelectedType] =
        useState("all");

    const [selectedStyle, setSelectedStyle] =
        useState("all");

    const availableProducts = products.filter(
        (product) => product.stock > 0
    );

    const filteredProducts = availableProducts.filter(
        (product) => {

            const text = `
                ${product.name}
                ${product.subcategory ?? ""}
                ${product.description}
            `.toLowerCase();

            if (selectedType !== "all") {
                const keywords =
                    clothingKeywords[selectedType] ?? [];

                if (!matchesKeywords(text, keywords)) {
                    return false;
                }
            }

            if (selectedStyle !== "all") {
                const keywords =
                    styleKeywords[selectedStyle] ?? [];

                if (!matchesKeywords(text, keywords)) {
                    return false;
                }
            }

            return true;
        }
    );

    const previewProducts = filteredProducts.slice(0, 4);

    const params = new URLSearchParams();

    if (selectedType !== "all") {
        params.set("type", selectedType);
    }

    if (selectedStyle !== "all") {
        params.set("style", selectedStyle);
    }

    const queryString = params.toString();

    const catalogUrl = queryString
        ? `/catalog?${queryString}`
        : "/catalog";

    return (
        <section className="catalog-showcase">

            <div className="catalog-showcase-image">

                <img
                src="/maison/IMG_1931.png"
                alt="Maison Vintage editorial collection"
                loading="lazy"
            />

                <div className="catalog-showcase-image-overlay">
                    <span>MAISON VINTAGE / THE ARCHIVE</span>
                    <h2>Discover the Collection</h2>
                </div>

            </div>

            <div className="catalog-showcase-content">

                <div className="catalog-showcase-heading">
                    <div>
                        <span className="catalog-showcase-eyebrow">
                            EXPLORE THE ARCHIVE
                        </span>

                        <h2>Find Your Piece</h2>

                        <p>
                            Curated vintage. One of a kind.
                        </p>
                    </div>
                </div>

                <div className="catalog-showcase-filters">

                    <label>
                        <span>SHOP BY CLOTHING</span>

                        <select
                            value={selectedType}
                            onChange={(event) =>
                                setSelectedType(event.target.value)
                            }
                        >
                            {clothingCategories.map((category) => (
                                <option
                                    key={category.value}
                                    value={category.value}
                                >
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        <span>SHOP BY STYLE</span>

                        <select
                            value={selectedStyle}
                            onChange={(event) =>
                                setSelectedStyle(event.target.value)
                            }
                        >
                            {styleCategories.map((style) => (
                                <option
                                    key={style.value}
                                    value={style.value}
                                >
                                    {style.label}
                                </option>
                            ))}
                        </select>
                    </label>

                </div>

                <div className="catalog-showcase-result-count">
                    {filteredProducts.length} AVAILABLE PIECES
                </div>

                {previewProducts.length > 0 ? (
                    <div className="catalog-showcase-grid">

                        {previewProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                hoverMode="zoom"
                            />
                        ))}

                    </div>
                ) : (
                    <div className="catalog-showcase-empty">
                        <p>
                            No pieces in this selection yet.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setSelectedType("all");
                                setSelectedStyle("all");
                            }}
                        >
                            CLEAR FILTERS
                        </button>
                    </div>
                )}

                <Link
                    to={catalogUrl}
                    className="catalog-showcase-link"
                >
                    EXPLORE SELECTION
                    <span aria-hidden="true">↗</span>
                </Link>

            </div>

        </section>
    );
}

export default CatalogShowcase;
