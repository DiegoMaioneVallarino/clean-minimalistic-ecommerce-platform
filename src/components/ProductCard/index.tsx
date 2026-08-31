import { Link } from "react-router-dom";
import type { Product } from "../../types/Product";
import "../../styles/product-card.css";

type ProductCardProps = {
    product: Product;
    hoverMode?: "alternate" | "zoom";
};

function ProductCard({
    product,
    hoverMode = "alternate",
}: ProductCardProps) {

    const hoverImage =
        product.images.model ??
        product.images.back;

    const hasAlternateImage =
        hoverMode === "alternate" &&
        hoverImage !== undefined;

    return (
        <article
            className={`
                product-card
                ${hasAlternateImage ? "has-alternate" : ""}
                ${hoverMode === "zoom" ? "zoom-hover" : ""}
            `}
        >
            <Link to={`/product/${product.id}`}>

                <div className="product-card-images">

                    <img
                        src={product.images.front}
                        alt={product.name}
                        className="product-card-image product-card-front"
                    />

                    {hasAlternateImage && (
                        <img
                            src={hoverImage}
                            alt={`${product.name} alternate view`}
                            className="product-card-image product-card-hover"
                        />
                    )}

                </div>

                <div className="product-card-info">
                    <h2>{product.name}</h2>
                    <p>${product.price}</p>
                </div>

            </Link>
        </article>
    );
}

export default ProductCard;