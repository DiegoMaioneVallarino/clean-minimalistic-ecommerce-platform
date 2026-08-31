import type { Product } from "../../types/Product";
import ProductCard from "../ProductCard";

import "../../styles/product-grid.css";

type ProductGridProps = {
    products: Product[];
    columns?: 3 | 4 | 6;

    hoverMode?: "alternate" | "zoom";
};

function ProductGrid({
    products,
    columns = 4,
    hoverMode = "alternate",
}: ProductGridProps) {

    return (
        <div
            className={`product-grid columns-${columns}`}
        >
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    hoverMode={hoverMode}
                />
            ))}
        </div>
    );
}

export default ProductGrid;