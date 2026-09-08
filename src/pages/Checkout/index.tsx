import { useCart } from "../../store/CartContext";
import "../../styles/checkout.css";
import { getFinalPrice } from "../../utils/getFinalPrice";


function Checkout() {
    const { items } = useCart();

    const total = items.reduce(
        (sum, item) =>
            sum + item.product.price * item.quantity,
        0
    );

    return (
        <section className="checkout-page">
            <div className="checkout-form">
                <h1>Checkout</h1>

                <div className="checkout-section">
                    <h2>Contact</h2>

                    <input
                        type="email"
                        placeholder="Email"
                    />
                </div>

                <div className="checkout-section">
                    <h2>Shipping</h2>

                    <input
                        type="text"
                        placeholder="Full name"
                    />

                    <input
                        type="text"
                        placeholder="Address"
                    />

                    <div className="checkout-row">
                        <input
                            type="text"
                            placeholder="City"
                        />

                        <input
                            type="text"
                            placeholder="Postal code"
                        />
                    </div>
                </div>

                <div className="checkout-section">
                    <h2>Payment</h2>

                    <input
                        type="text"
                        placeholder="Card number"
                    />

                    <div className="checkout-row">
                        <input
                            type="text"
                            placeholder="MM / YY"
                        />

                        <input
                            type="text"
                            placeholder="CVV"
                        />
                    </div>
                </div>

                <button className="place-order-button">
                    Place order
                </button>
            </div>

            <aside className="checkout-summary">
                <h2>Order Summary</h2>

                {items.map((item) => (
                    <div
                        key={item.product.id}
                        className="checkout-item"
                    >
                        <img
                             src={item.product.images.front}
                            alt={item.product.name}
                        />

                        <div>
                            <p>{item.product.name}</p>
                            <span>
                                Quantity: {item.quantity}
                            </span>
                        </div>

                        <div className="checkout-item-price">

                        {(item.product.discount ?? 0) > 0 && (
                            <span className="checkout-original-price">
                                $
                                {item.product.price *
                                    item.quantity}
                            </span>
                        )}

                        <strong>
                            $
                            {getFinalPrice(item.product) *
                                item.quantity}
                        </strong>

                    </div>
                    </div>
                ))}

                <div className="checkout-total">
                    <span>Total</span>
                    <strong>${total}</strong>
                </div>
            </aside>
        </section>
    );
}

export default Checkout;