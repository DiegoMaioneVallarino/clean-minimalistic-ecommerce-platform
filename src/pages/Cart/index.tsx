
import { useNavigate } from "react-router-dom";

import { useCart } from "../../store/CartContext";
import { getFinalPrice } from "../../utils/getFinalPrice";
import CartWishlist from "../../components/CartWishlist";
import RecentlyViewedDrawer from "../../components/RecentlyViewedDrawer";
import "../../styles/cart.css";

function Cart() {
    const {
        items,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();

    const navigate = useNavigate();

    const total = items.reduce(
        (sum, item) =>
            sum +
            getFinalPrice(item.product) * item.quantity,
        0
    );

    if (items.length === 0) {
        return (
            <section className="cart-page">
                <h1>Cart</h1>
                <p>Your cart is empty.</p>
            </section>
        );
    }

    
return (
    <section className="cart-page">
        <h1>Cart</h1>

        <CartWishlist />

        {items.length === 0 ? (
            <div className="cart-empty-state">
                <p>Your cart is empty.</p>

                <button
                    type="button"
                    onClick={() => navigate("/catalog")}
                >
                    EXPLORE COLLECTION
                </button>
            </div>
        ) : (
            <div className="cart-layout">
                <div className="cart-items">
                    {items.map((item) => (
                        <article
                            key={item.key}
                            className="cart-item"
                        >
                            <img
                                src={item.product.images.front}
                                alt={item.product.name}
                            />

                            <div className="cart-item-info">
                                <h2>{item.product.name}</h2>

                                {(item.color || item.size) && (
                                    <p className="cart-item-variant">
                                        {[item.color, item.size]
                                            .filter(Boolean)
                                            .join(" / ")}
                                    </p>
                                )}

                                {(item.product.discount ?? 0) > 0 ? (
                                    <div className="cart-item-price">
                                        <span className="cart-original-price">
                                            ${item.product.price}
                                        </span>
                                        <span className="cart-discounted-price">
                                            ${getFinalPrice(item.product)}
                                        </span>
                                    </div>
                                ) : (
                                    <p>${item.product.price}</p>
                                )}

                                <div className="cart-quantity">
                                    <button
                                        type="button"
                                        aria-label="Decrease quantity"
                                        onClick={() =>
                                            decreaseQuantity(item.key)
                                        }
                                    >
                                        −
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        type="button"
                                        aria-label="Increase quantity"
                                        onClick={() =>
                                            increaseQuantity(item.key)
                                        }
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    className="remove-button"
                                    onClick={() =>
                                        removeFromCart(item.key)
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                <aside className="cart-summary">
                    <h2>Summary</h2>

                    <div>
                        <span>Total</span>
                        <strong>
                            ${total.toLocaleString("es-MX")}
                        </strong>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/checkout")}
                    >
                        Checkout
                    </button>
                </aside>
            </div>
        )}

        <RecentlyViewedDrawer />
    </section>
);

}

export default Cart;
