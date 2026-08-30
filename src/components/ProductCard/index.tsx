import type { Product } from "../../types/Product";

type ProductCardProps = {
    product: Product;
};

function ProductCard({ product }: ProductCardProps) {
    return (
        <article>
            <img
                src={product.image}
                alt={product.name}
            />

            <h2>{product.name}</h2>

            <p>${product.price}</p>

            <button>
                Add to cart
            </button>
        </article>
    );
}

export default ProductCard;