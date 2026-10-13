import { Link } from "react-router-dom";

import { useProducts } from "../../store/ProductContext";
import ProductCard from "../ProductCard";

import "./HomeHero.css";

const WESTERN_CATEGORY = "western";

export default function HomeHero() {
    const { products } = useProducts();

    const westernProducts = products
        .filter(
            (product) =>
                product.category.toLowerCase() ===
                WESTERN_CATEGORY
        )
        .slice(0, 4);

    return (
        <section className="home-editorial">

            {/* HERO PRINCIPAL */}

            <div className="home-editorial-hero">

                <div className="home-editorial-copy">

                    <span className="home-editorial-eyebrow">
                        MAISON / EST. 2018
                    </span>

                    <div>
                        <span className="home-editorial-edition">
                            ISSUE 001 — WESTERN REVIVAL
                        </span>

                        <h1>
                            The
                            <br />
                            Western
                            <br />
                            Edit.
                        </h1>

                        <p>
                            A curated selection of vintage
                            pieces inspired by the spirit
                            of the American West.
                        </p>

                        <Link
                            to="/catalog?category=western"
                            className="home-editorial-link"
                        >
                            EXPLORE THE COLLECTION
                            <span aria-hidden="true">↗</span>
                        </Link>
                    </div>

                    <span className="home-editorial-location">
                        GUANAJUATO 31 / ROMA NORTE / CDMX
                    </span>

                </div>

                <div className="home-editorial-main-image">
                    <img
                        src="/maison/IMG_1932.jpg"
                        alt="Vintage western collection"
                    />
                </div>

            </div>

            

            {/* PRODUCTOS WESTERN */}

            <div className="home-editorial-products">

                <div className="home-editorial-products-heading">
                    <div>
                        <span>CURATED SELECTION / 001</span>
                        <h2>Western Essentials</h2>
                    </div>

                    <Link to="/catalog?category=western">
                        VIEW ALL ↗
                    </Link>
                </div>

                {westernProducts.length > 0 ? (
                    <div className="home-editorial-products-grid">
                        {westernProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="home-editorial-empty">
                        The Western collection is coming soon.
                    </p>
                )}

            </div>

        </section>
    );
}