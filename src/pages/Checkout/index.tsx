import { useEffect, useState } from "react";
import { useAuth } from "../../store/AuthContext";
import { useAddresses } from "../../store/AddressContext";
import AddressBook from "../../components/AddressBook";

import { useCart } from "../../store/CartContext";
import "../../styles/checkout.css";
import { getFinalPrice } from "../../utils/getFinalPrice";
import CartWishlist from "../../components/CartWishlist";

const checkoutCoupons: Record<string, number> = {
    WELCOME10: 10,
    SUMMER20: 20,
    LOYALTY20: 20,
};


function Checkout() {

    const {
        items
    } = useCart();


    const [
        couponCode,
        setCouponCode
    ] = useState("");


    const [
        appliedDiscount,
        setAppliedDiscount
    ] = useState(0);


    const [
        couponMessage,
        setCouponMessage
    ] = useState("");

const { user } = useAuth();

const { addresses, defaultAddress } = useAddresses();

const [selectedAddressId, setSelectedAddressId] =
    useState<string | null>(null);

useEffect(() => {
    if (!user) {
        setSelectedAddressId(null);
        return;
    }

    setSelectedAddressId((current) =>
        current && addresses.some((address) => address.id === current)
            ? current
            : defaultAddress?.id ?? null
    );
}, [user?.email, addresses, defaultAddress?.id]);

const selectedAddress =
    addresses.find((address) => address.id === selectedAddressId)
    ?? defaultAddress;
    const subtotal = items.reduce(
        (sum, item) =>
            sum +
            getFinalPrice(
                item.product
            ) *
            item.quantity,
        0
    );


    const couponDiscount =
        Math.round(
            subtotal *
            (
                appliedDiscount /
                100
            )
        );


    const total =
        subtotal -
        couponDiscount;


    function applyCoupon() {

        const normalizedCode =
            couponCode
                .trim()
                .toUpperCase();


        if (!normalizedCode) {

            setCouponMessage(
                "Enter a coupon code."
            );

            return;
        }


        const discount =
            checkoutCoupons[
                normalizedCode
            ];


        if (!discount) {

            setAppliedDiscount(0);

            setCouponMessage(
                "Invalid coupon."
            );

            return;
        }


        setAppliedDiscount(
            discount
        );


        setCouponMessage(
            `${discount}% discount applied.`
        );

    }


    return (
    <>
        <section className="checkout-page motion-slide-up">

            <div className="checkout-form">

                <h1>
                    Checkout
                </h1>


                <div className="checkout-section">

                    <h2>
                        Contact
                    </h2>


                    <input
                        type="email"

                        placeholder="Email"
                    />

                </div>


                <div className="checkout-section">
    <h2>Shipping</h2>

    {user ? (
        <>
            <AddressBook
                selectedId={selectedAddress?.id ?? null}
                onSelect={setSelectedAddressId}
            />

            {selectedAddress && (
                <div className="checkout-selected-address">
                    <strong>Delivering to:</strong>

                    <p>
                        {selectedAddress.recipient}
                        {" — "}
                        {selectedAddress.street}
                        {" "}
                        {selectedAddress.exteriorNumber},
                        {" "}
                        {selectedAddress.city},
                        {" "}
                        {selectedAddress.state}
                        {" "}
                        {selectedAddress.postalCode}
                    </p>
                </div>
            )}
        </>
    ) : (
        <>
            <p>
                Sign in to use your saved addresses,
                or enter your shipping information below.
            </p>

            <input type="text" placeholder="Full name" />
            <input type="text" placeholder="Address" />

            <div className="checkout-row">
                <input type="text" placeholder="City" />
                <input type="text" placeholder="Postal code" />
            </div>
        </>
    )}
</div>


                <div className="checkout-section">

                    <h2>
                        Payment
                    </h2>


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


                <button
                    className="place-order-button motion-button"
                >
                    Place order
                </button>

            </div>


            <aside className="checkout-summary">

                <h2>
                    Order Summary
                </h2>


                {items.map(
                    (item) => (

                       <div
    key={item.key}
    className="checkout-item"
>

                            <img
                                src={
                                    item.product
                                        .images
                                        .front
                                }

                                alt={
                                    item.product
                                        .name
                                }
                            />


                            <div>

                                <p>
                                    {
                                        item.product
                                            .name
                                    }
                                </p>
                            {(item.color || item.size) && (
                                <p className="checkout-item-variant">
                                    {[
                                        item.color,
                                        item.size,
                                    ].filter(Boolean).join(" / ")}
                                </p>
                            )}
                                <span>
                                    Quantity:
                                    {" "}
                                    {
                                        item.quantity
                                    }
                                </span>

                            </div>


                            <div className="checkout-item-price">

                                {
                                    (
                                        item.product
                                            .discount ??
                                        0
                                    ) > 0 && (

                                        <span className="checkout-original-price">

                                            $

                                            {
                                                item.product
                                                    .price *
                                                item.quantity
                                            }

                                        </span>

                                    )
                                }


                                <strong>

                                    $

                                    {
                                        getFinalPrice(
                                            item.product
                                        ) *
                                        item.quantity
                                    }

                                </strong>

                            </div>

                        </div>

                    )
                )}


                <div className="checkout-coupon">

                    <span>
                        Coupon
                    </span>


                    <div className="checkout-coupon-row">

                        <input
                            type="text"

                            placeholder="Enter coupon code"

                            value={
                                couponCode
                            }

                            onChange={
                                (event) =>
                                    setCouponCode(
                                        event
                                            .target
                                            .value
                                    )
                            }
                        />


                        <button
                            type="button"

                            onClick={
                                applyCoupon
                            }
                        >
                            Apply
                        </button>

                    </div>


                    {
                        couponMessage && (

                            <p>
                                {
                                    couponMessage
                                }
                            </p>

                        )
                    }

                </div>


                <div className="checkout-summary-row">

                    <span>
                        Subtotal
                    </span>

                    <strong>
                        $
                        {
                            subtotal
                                .toLocaleString()
                        }
                    </strong>

                </div>


                {
                    appliedDiscount >
                    0 && (

                        <div className="checkout-summary-row checkout-summary-discount">

                            <span>
                                Coupon discount
                                {" "}
                                (
                                {
                                    appliedDiscount
                                }
                                %)
                            </span>

                            <strong>
                                -$
                                {
                                    couponDiscount
                                        .toLocaleString()
                                }
                            </strong>

                        </div>

                    )
                }


                <div className="checkout-total">

                    <span>
                        Total
                    </span>

                    <strong>
                        $
                        {
                            total
                                .toLocaleString()
                        }
                    </strong>

                </div>

            </aside>

        </section>

        <div className="checkout-wishlist-section">
            <CartWishlist />
        </div>
    </>
    );
}


export default Checkout;