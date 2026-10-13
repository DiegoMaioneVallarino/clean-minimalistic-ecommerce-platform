
import { Link } from "react-router-dom";

import { products } from "../../services/products";
import ProductGrid from "../ProductGrid";

function NewArrivals() {

    const newArrivals = [...products]
        .filter((product) => product.stock > 0)
        .reverse()
        .slice(0, 6);

    return (
        <section className="new-arrivals">

            <div className="section-header">
                <p>Just added</p>
                <h2>New Arrivals</h2>
            </div>

            <ProductGrid
                products={newArrivals}
                columns={6}
                hoverMode="zoom"
            />

            <div className="new-arrivals-footer">
                <Link
                    to="/catalog?sort=newest"
                    className="new-arrivals-link"
                >
                    VIEW ALL NEW ARRIVALS
                    <span aria-hidden="true">↗</span>
                </Link>
            </div>

        </section>
    );
}

export default NewArrivals;
