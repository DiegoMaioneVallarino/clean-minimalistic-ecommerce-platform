
import { Link } from "react-router-dom";

import "./PromoBanner.css";

function PromoBanner() {
    return (
        <section className="promo-banner">
            <Link
                to="/sales"
                className="promo-banner-link"
                aria-label="Explore seasonal sale"
            >
                <div className="promo-banner-content">
                    <span className="promo-banner-eyebrow">
                        SEASONAL SELECTION
                    </span>

                    <h2>Up to 40% off</h2>

                    <span className="promo-banner-cta">
                        EXPLORE SALE
                        <span aria-hidden="true">↗</span>
                    </span>
                </div>

                <div
                    className="promo-banner-image"
                    aria-hidden="true"
                />
            </Link>
        </section>
    );
}

export default PromoBanner;
