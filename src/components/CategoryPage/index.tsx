
import { Link } from "react-router-dom";

import type { Product } from "../../types/Product";
import ProductGrid from "../ProductGrid";

import "./CategoryPage.css";

type CategoryPageProps = {
    title: string;
    category: string;
    products: Product[];
};

type EditorialConfig = {
    heroImage: string;
    heroTitle: string;
    heroSubtitle: string;

    firstCollection: {
        title: string;
        subtitle: string;
        image: string;
        style: string;
    };

    secondCollection: {
        title: string;
        subtitle: string;
        image: string;
        style: string;
    };

    bannerImage: string;
    bannerTitle: string;
    bannerSubtitle: string;
};

const editorialConfigs: Record<string, EditorialConfig> = {
    men: {
        heroImage: "/maison/IMG_1914.jpg",
        heroTitle: "The Men's Archive",
        heroSubtitle:
            "Timeless silhouettes. Vintage attitude.",

        firstCollection: {
            title: "Western & Leather",
            subtitle: "The spirit of the west.",
            image: "/maison/IMG_1916.jpg",
            style: "western",
        },

        secondCollection: {
            title: "Racing & Streetwear",
            subtitle: "Speed, culture and nostalgia.",
            image: "/maison/IMG_1926.jpg",
            style: "racing",
        },

        bannerImage: "/maison/IMG_1930.jpg",
        bannerTitle: "The Vintage Uniform",
        bannerSubtitle:
            "Everyday pieces. Extraordinary stories.",
    },

    women: {
        heroImage: "/maison/IMG_1901.jpg",
        heroTitle: "The Women's Archive",
        heroSubtitle:
            "Rare finds. Effortless expression.",

        firstCollection: {
            title: "Y2K Revival",
            subtitle: "The turn of the millennium.",
            image: "/maison/IMG_1936.jpg",
            style: "y2k",
        },

        secondCollection: {
            title: "70s Groovy",
            subtitle: "Retro shapes and bold expression.",
            image: "/maison/IMG_1906.jpg",
            style: "groovy",
        },

        bannerImage: "/maison/IMG_1925.jpg",
        bannerTitle: "Objects of Desire",
        bannerSubtitle:
            "An archive of pieces worth keeping.",
    },
};

function getProductText(product: Product): string {
    return `
        ${product.name}
        ${product.subcategory ?? ""}
        ${product.description}
    `.toLowerCase();
}

function matchesClothingType(
    product: Product,
    type: "jackets" | "tops"
): boolean {
    const text = getProductText(product);

    const keywords =
        type === "jackets"
            ? [
                "jacket",
                "coat",
                "bomber",
                "chamarra",
                "blazer",
            ]
            : [
                "tee",
                "t-shirt",
                "shirt",
                "camisa",
                "top",
                "hoodie",
                "playera",
            ];

    return keywords.some((keyword) =>
        text.includes(keyword)
    );
}

type ProductRowProps = {
    eyebrow: string;
    title: string;
    subtitle?: string;
    products: Product[];
    href: string;
    limit?: number;
};

function ProductRow({
    eyebrow,
    title,
    subtitle,
    products,
    href,
    limit = 4,
}: ProductRowProps) {

    const visibleProducts = products.slice(0, limit);

    if (visibleProducts.length === 0) {
        return null;
    }

    return (
        <section className="collection-product-section">

            <div className="collection-section-heading">

                <div>
                    <span className="collection-eyebrow">
                        {eyebrow}
                    </span>

                    <h2>{title}</h2>

                    {subtitle && <p>{subtitle}</p>}
                </div>

                <Link
                    to={href}
                    className="collection-view-all"
                >
                    VIEW ALL
                    <span aria-hidden="true">↗</span>
                </Link>

            </div>

            <ProductGrid
                products={visibleProducts}
                columns={limit === 6 ? 6 : 4}
                hoverMode="zoom"
            />

        </section>
    );
}

function CategoryPage({
    title,
    category,
    products,
}: CategoryPageProps) {

    const config =
        editorialConfigs[category] ??
        editorialConfigs.men;

    const availableProducts = products.filter(
        (product) =>
            product.category === category &&
            product.stock > 0
    );

    // Temporalmente consideramos que los últimos
    // elementos del arreglo son los más recientes.
    const newestProducts = [...availableProducts].reverse();

    const jacketProducts = availableProducts.filter(
        (product) => matchesClothingType(product, "jackets")
    );

    const topProducts = availableProducts.filter(
        (product) => matchesClothingType(product, "tops")
    );

    const genderQuery = new URLSearchParams({
        gender: category,
    }).toString();

    function catalogLink(
        params: Record<string, string> = {}
    ): string {
        const query = new URLSearchParams({
            gender: category,
            ...params,
        });

        return `/catalog?${query.toString()}`;
    }

    return (
        <main className="category-editorial-page">

            {/* MAIN HERO */}

            <section className="collection-main-hero">

                <img
                    src={config.heroImage}
                    alt={`${title} vintage collection`}
                />

                <div className="collection-main-hero-overlay">

                    <span>MAISON VINTAGE / EST. 2018</span>

                    <h1>{config.heroTitle}</h1>

                    <p>{config.heroSubtitle}</p>

                    <Link to={`/catalog?${genderQuery}`}>
                        DISCOVER THE COLLECTION
                        <span aria-hidden="true">↗</span>
                    </Link>

                </div>

            </section>

            {/* NEW ARRIVALS */}

            <ProductRow
                eyebrow="CURATED SELECTION / 001"
                title="Just Arrived"
                subtitle={`Latest additions to the ${title.toLowerCase()} archive.`}
                products={newestProducts}
                href={catalogLink({ sort: "newest" })}
                limit={6}
            />

            {/* TWO EDITORIAL COLLECTIONS */}

            <section className="collection-editorial-section">

                <div className="collection-section-heading">
                    <div>
                        <span className="collection-eyebrow">
                            THE MAISON EDIT / 002
                        </span>

                        <h2>Explore the Archive</h2>

                        <p>
                            Different eras. Different attitudes.
                        </p>
                    </div>
                </div>

                <div className="collection-editorial-grid">

                    {[
                        config.firstCollection,
                        config.secondCollection,
                    ].map((collection) => (

                        <Link
                            key={collection.style}
                            to={catalogLink({
                                style: collection.style,
                            })}
                            className="collection-editorial-card"
                        >

                            <div className="collection-editorial-image">

                                <img
                                    src={collection.image}
                                    alt={collection.title}
                                    loading="lazy"
                                />

                            </div>

                            <div className="collection-editorial-card-footer">

                                <div>
                                    <h3>{collection.title}</h3>
                                    <p>{collection.subtitle}</p>
                                </div>

                                <span aria-hidden="true">↗</span>

                            </div>

                        </Link>

                    ))}

                </div>

            </section>

            {/* JACKETS */}

            <ProductRow
                eyebrow="THE ARCHIVE / 003"
                title="Jackets & Outerwear"
                subtitle="Layers with character."
                products={jacketProducts}
                href={catalogLink({ type: "jackets" })}
            />

            {/* SECOND HORIZONTAL HERO */}

            <section className="collection-wide-hero">

                <img
                    src={config.bannerImage}
                    alt={config.bannerTitle}
                    loading="lazy"
                />

                <div className="collection-wide-hero-overlay">

                    <span>AN EXPLORATION OF VINTAGE</span>

                    <h2>{config.bannerTitle}</h2>

                    <p>{config.bannerSubtitle}</p>

                    <Link to={catalogLink()}>
                        EXPLORE THE ARCHIVE ↗
                    </Link>

                </div>

            </section>

            {/* TOPS */}

            <ProductRow
                eyebrow="THE ARCHIVE / 004"
                title="Tops & Tees"
                subtitle="Everyday vintage essentials."
                products={topProducts}
                href={catalogLink({ type: "tops" })}
            />

        </main>
    );
}

export default CategoryPage;
