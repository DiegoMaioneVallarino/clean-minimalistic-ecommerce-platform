import { Link } from "react-router-dom";

import type { Product } from "../../types/Product";
import { getFinalPrice } from "../../utils/getFinalPrice";

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

    const isOnSale =
        (product.discount ?? 0) > 0;

    const finalPrice =
        getFinalPrice(product);

    const isOutOfStock =
    product.stock <= 0;


    return (
        <article
    className={`
        product-card
        ${hasAlternateImage ? "has-alternate" : ""}
        ${hoverMode === "zoom" ? "zoom-hover" : ""}
        ${isOutOfStock ? "out-of-stock" : ""}
    `}
>

            <Link to={`/product/${product.id}`}>

                <div className="product-card-images">

                    {isOnSale && (
                        <div className="discount-ribbon">
                            Discount
                        </div>
                    )}

                       {isOutOfStock && (
        <div className="out-of-stock-label">
            Out of stock
        </div>
    )}

                    <img
                        src={product.images.front}
                        alt={product.name}
                        className="
                            product-card-image
                            product-card-front
                        "
                    />

                    {hasAlternateImage && (
                        <img
                            src={hoverImage}
                            alt={`${product.name} alternate view`}
                            className="
                                product-card-image
                                product-card-hover
                            "
                        />
                    )}

                </div>


                <div className="product-card-info">

                    <h2>
                        {product.name}
                    </h2>


                    <div className="product-card-price">

                        {isOnSale ? (
                            <>
                                <span className="original-price">
                                    ${product.price}
                                </span>

                                <span className="discounted-price">
                                    ${finalPrice}
                                </span>
                            </>
                        ) : (
                            <span>
                                ${product.price}
                            </span>
                        )}

                    </div>

                </div>

            </Link>

        </article>
    );
}


export default ProductCard;