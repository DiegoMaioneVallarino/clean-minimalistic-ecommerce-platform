import { products } from "../../services/products";
import ProductGrid from "../ProductGrid";

function FeaturedProducts() {

    const featuredProducts = products.slice(0, 4);

    return (
        <section className="featured-products">

            <div className="section-header">
                <p>Selected pieces</p>
                <h2>Featured Products</h2>
            </div>

            <ProductGrid
    products={featuredProducts}
    columns={4}
    hoverMode="alternate"
/>

        </section>
    );
}

export default FeaturedProducts;