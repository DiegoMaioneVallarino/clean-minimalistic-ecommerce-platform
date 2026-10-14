
import { Link } from "react-router-dom";
import "./ProductRequestBanner.css";

export default function ProductRequestBanner() {
    return (
        <section className="product-request-banner">
            <div className="product-request-banner-icon">
                <span>⌕</span>
            </div>

            <div className="product-request-banner-content">
                <span className="product-request-banner-label">
                    MAISON PERSONAL SOURCING
                </span>

                <h2>Can't find what you're looking for?</h2>

                <p>
                    Looking for a specific vintage piece?
                    Upload reference photos, describe what
                    you want, and let us help you find
                    something similar.
                </p>
            </div>

            <Link
                to="/requests"
                className="product-request-banner-button"
            >
                FIND IT FOR ME
                <span aria-hidden="true">↗</span>
            </Link>
        </section>
    );
}
