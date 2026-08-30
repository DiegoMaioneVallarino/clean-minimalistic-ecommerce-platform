import type { Product } from "../../types/Product";
import ProductCard from "../ProductCard";

type ProductGridProps = {
    products: Product[];
};

function ProductGrid({ products }: ProductGridProps) {
    return (
        <div>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
}

export default ProductGrid;