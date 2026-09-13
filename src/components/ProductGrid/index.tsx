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
            {products.map(
    (
        product,
        index
    ) => (

        <div
            key={product.id}

            className="
                product-grid-item
                motion-slide-up
            "

            style={{
                animationDelay:
                    `${index * 45}ms`
            }}
        >

            <ProductCard
                product={
                    product
                }
            />

        </div>

    )
)}
        </div>
    );
}

export default ProductGrid;