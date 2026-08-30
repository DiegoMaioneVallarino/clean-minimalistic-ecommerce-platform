import { products } from "../../services/products";
import ProductCard from "../../components/ProductCard";

function Catalog() {
    return (
        <section>
            <h1>Catalog</h1>

            <div>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
}

export default Catalog;