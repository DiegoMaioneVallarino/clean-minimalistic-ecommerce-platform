import { products } from "../../services/products";
import ProductGrid from "../../components/ProductGrid";

function Men() {
    const menProducts = products.filter(
        (product) => product.category === "men"
    );

    return (
        <section>
            <h1>Men</h1>

            <ProductGrid products={menProducts} />
        </section>
    );
}

export default Men;