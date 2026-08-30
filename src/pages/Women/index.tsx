import { products } from "../../services/products";
import ProductGrid from "../../components/ProductGrid";

function Women() {
    const womenProducts = products.filter(
        (product) => product.category === "women"
    );

    return (
        <section>
            <h1>Women</h1>

            <ProductGrid products={womenProducts} />
        </section>
    );
}

export default Women;