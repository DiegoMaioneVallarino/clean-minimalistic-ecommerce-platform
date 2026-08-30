import { Link } from "react-router-dom";
import type { Product } from "../../types/Product";
import "../../styles/product-card.css";

type ProductCardProps = {
    product: Product;
};

function ProductCard({ product }: ProductCardProps) {
    return (
        <article className="product-card">

            <Link to={`/product/${product.id}`}>

                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-card-image"
                />

                <div className="product-card-info">
                    <h2>{product.name}</h2>
                    <p>${product.price}</p>
                </div>

            </Link>

        </article>
    );
}

export default ProductCard;