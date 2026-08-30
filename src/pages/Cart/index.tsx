import { useCart } from "../../store/CartContext";
import "../../styles/cart.css";

function Cart() {

    const {
        items,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();

    const total = items.reduce(
        (sum, item) =>
            sum + item.product.price * item.quantity,
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

            <div className="cart-layout">

                <div className="cart-items">

                    {items.map((item) => (

                        <article
                            key={item.product.id}
                            className="cart-item"
                        >

                            <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                            />

                            <div className="cart-item-info">

                                <h2>
                                    {item.product.name}
                                </h2>

                                <p>
                                    ${item.product.price}
                                </p>

                                <div className="cart-quantity">

                                    <button
                                        onClick={() =>
                                            decreaseQuantity(
                                                item.product.id
                                            )
                                        }
                                    >
                                        −
                                    </button>

                                    <span>
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            increaseQuantity(
                                                item.product.id
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                                <button
                                    className="remove-button"
                                    onClick={() =>
                                        removeFromCart(
                                            item.product.id
                                        )
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
                            ${total}
                        </strong>
                    </div>

                    <button>
                        Checkout
                    </button>

                </aside>

            </div>

        </section>
    );
}

export default Cart;