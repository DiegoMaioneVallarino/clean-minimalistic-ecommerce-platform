import type { Product } from "../../types/Product";
import ProductCard from "../ProductCard";
import "../../styles/product-grid.css";

type ProductGridProps = {
    products: Product[];
    columns?: 3 | 4 | 6;
};

function ProductGrid({
    products,
    columns = 4,
}: ProductGridProps) {

    return (
        <div className={`product-grid columns-${columns}`}>
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