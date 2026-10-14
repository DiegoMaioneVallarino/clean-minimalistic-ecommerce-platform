
import { Link, useNavigate } from "react-router-dom";

import type { Product } from "../../types/Product";
import { useCart } from "../../store/CartContext";
import { useShoppingHistory } from "../../store/ShoppingHistoryContext";
import { getFinalPrice } from "../../utils/getFinalPrice";

import "./SavedProductCard.css";

type Props = {
    product: Product;
    showWishlist?: boolean;
};

function SavedProductCard({
    product,
    showWishlist = true,
}: Props) {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const {
        isWishlisted,
        toggleWishlist,
    } = useShoppingHistory();

    const saved = isWishlisted(product.id);
    const finalPrice = getFinalPrice(product);

    const requiresSize = Boolean(product.sizes?.length);

    function handleAddToCart() {
        if (product.stock <= 0) return;

        if (requiresSize) {
            navigate(`/product/${product.id}`);
            return;
        }

        addToCart(product, {
            color: product.colors?.[0]?.name,
        });
    }

    return (
        <article className="saved-product-card">
            <div className="saved-product-image">
                <Link to={`/product/${product.id}`}>
                    <img
                        src={product.images.front}
                        alt={product.name}
                        loading="lazy"
                    />
                </Link>

                {showWishlist && (
                    <button
                        type="button"
                        className={
                            saved
                                ? "saved-product-heart active"
                                : "saved-product-heart"
                        }
                        onClick={() => toggleWishlist(product.id)}
                        aria-label={
                            saved
                                ? `Remove ${product.name} from wishlist`
                                : `Save ${product.name} to wishlist`
                        }
                        aria-pressed={saved}
                    >
                        {saved ? "♥" : "♡"}
                    </button>
                )}
            </div>

            <Link
                to={`/product/${product.id}`}
                className="saved-product-name"
            >
                {product.name}
            </Link>

            <div className="saved-product-prices">
                {(product.discount ?? 0) > 0 && (
                    <span className="saved-original-price">
                        ${product.price.toLocaleString("es-MX")}
                    </span>
                )}

                <strong>
                    ${finalPrice.toLocaleString("es-MX")}
                </strong>
            </div>

            <button
                type="button"
                className="saved-product-add"
                onClick={handleAddToCart}
            >
                {requiresSize ? "SELECT SIZE ↗" : "ADD TO BAG +"}
            </button>
        </article>
    );
}

export default SavedProductCard;
