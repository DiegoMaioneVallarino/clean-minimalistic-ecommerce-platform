import {
    useState,
    type FormEvent
} from "react";

import {
    Navigate
} from "react-router-dom";

import {
    useAuth
} from "../../store/AuthContext";

import "../../styles/my-coupons.css";


type Purchase = {
    id: number;
    name: string;
    date: string;
    total: number;
};


type Coupon = {
    id: number;
    code: string;
    discount: number;
    description: string;
};


const recentPurchases: Purchase[] = [
    {
        id: 1008,
        name: "Graphic Black Tee",
        date: "2026-09-11",
        total: 524,
    },
    {
        id: 1007,
        name: "Worldwide Tee",
        date: "2026-09-08",
        total: 559,
    },
    {
        id: 1006,
        name: "Racing Hoodie",
        date: "2026-09-02",
        total: 1299,
    },
    {
        id: 1005,
        name: "New Item",
        date: "2026-08-27",
        total: 799,
    },
    {
        id: 1004,
        name: "Graphic Tee",
        date: "2026-08-18",
        total: 649,
    },
];


const saleCategories = [
    {
        name: "Tees",
        discount: 20,
    },
    {
        name: "Hoodies",
        discount: 15,
    },
    {
        name: "Women",
        discount: 10,
    },
];


const availableCoupons: Record<
    string,
    Omit<Coupon, "id">
> = {

    WELCOME10: {
        code: "WELCOME10",
        discount: 10,
        description:
            "10% off your next purchase",
    },

    SUMMER20: {
        code: "SUMMER20",
        discount: 20,
        description:
            "20% seasonal discount",
    },

};


function MyCoupons() {

    const {
        user
    } = useAuth();


    const [
        couponCode,
        setCouponCode
    ] = useState("");


    const [
        coupons,
        setCoupons
    ] = useState<Coupon[]>([]);


    const [
        message,
        setMessage
    ] = useState("");


    const [
        helpOpen,
        setHelpOpen
    ] = useState(false);


    if (!user) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    const currentUser =
        user;


    const loyaltyProgress =
        Math.min(
            recentPurchases.length,
            5
        );


    const loyaltyUnlocked =
        loyaltyProgress >= 5;


    const hasLoyaltyCoupon =
        coupons.some(
            (coupon) =>
                coupon.code ===
                "LOYALTY20"
        );


    function addCoupon(
        event:
            FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();


        const normalizedCode =
            couponCode
                .trim()
                .toUpperCase();


        if (!normalizedCode) {
            return;
        }


        const coupon =
            availableCoupons[
                normalizedCode
            ];


        if (!coupon) {

            setMessage(
                "Coupon not found."
            );

            return;

        }


        const alreadyAdded =
            coupons.some(
                (currentCoupon) =>
                    currentCoupon.code ===
                    normalizedCode
            );


        if (alreadyAdded) {

            setMessage(
                "You already added this coupon."
            );

            return;

        }


        setCoupons(
            (currentCoupons) => [
                ...currentCoupons,

                {
                    ...coupon,

                    id:
                        Date.now(),
                },
            ]
        );


        setCouponCode("");


        setMessage(
            "Coupon added."
        );

    }


    function claimLoyaltyCoupon() {

        if (
            !loyaltyUnlocked ||
            hasLoyaltyCoupon
        ) {
            return;
        }


        setCoupons(
            (currentCoupons) => [
                ...currentCoupons,

                {
                    id:
                        Date.now(),

                    code:
                        "LOYALTY20",

                    discount:
                        20,

                    description:
                        "20% off your next purchase",
                },
            ]
        );

    }


    return (
        <section className="my-coupons-page motion-slide-up">


            <header className="coupons-header">

                <div>

                    <span className="coupons-eyebrow">
                        Rewards
                    </span>

                    <h1>
                        My Coupons
                    </h1>

                </div>


                <div className="coupons-header-actions">

                    <div className="coupons-balance">

                        <span>
                            Balance
                        </span>

                        <strong>
                            $
                            {
                                currentUser
                                    .balance
                                    .toLocaleString()
                            }
                        </strong>

                    </div>


                    <button
                        type="button"

                        className="coupons-help-button"

                        onClick={() =>
                            setHelpOpen(
                                (current) =>
                                    !current
                            )
                        }
                    >
                        ?
                    </button>

                </div>

            </header>


            {
                helpOpen && (

                    <div className="coupons-help motion-fade-in">

                        <strong>
                            How rewards work
                        </strong>

                        <p>
                            Add promotional codes
                            to your account or earn
                            rewards by completing
                            purchases.
                        </p>

                        <p>
                            Every 5 purchases unlock
                            a 20% coupon for your next
                            order.
                        </p>

                    </div>

                )
            }


            <section className="sale-categories">

                <span>
                    Categories on sale
                </span>


                <div className="sale-category-list">

                    {
                        saleCategories.map(
                            (category) => (

                                <div
                                    key={
                                        category.name
                                    }

                                    className="sale-category"
                                >

                                    <strong>
                                        {
                                            category.name
                                        }
                                    </strong>

                                    <span>
                                        -
                                        {
                                            category.discount
                                        }
                                        %
                                    </span>

                                </div>

                            )
                        )
                    }

                </div>

            </section>


            <div className="coupons-layout">


                <aside className="coupon-sidebar">


                    <div className="coupon-add-panel">

                        <span>
                            Add coupon
                        </span>

                        <h2>
                            Have a code?
                        </h2>


                        <form
                            onSubmit={
                                addCoupon
                            }
                        >

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
                                type="submit"

                                className="motion-button"
                            >
                                Add
                            </button>

                        </form>


                        {
                            message && (

                                <p className="coupon-message">
                                    {message}
                                </p>

                            )
                        }

                    </div>


                    <div className="owned-coupons">

                        <span className="owned-coupons-title">
                            Your coupons
                        </span>


                        {
                            coupons.length ===
                            0 && (

                                <p className="no-coupons">
                                    No coupons added yet.
                                </p>

                            )
                        }


                        {
                            coupons.map(
                                (coupon) => (

                                    <article
                                        key={
                                            coupon.id
                                        }

                                        className="owned-coupon motion-scale-in"
                                    >

                                        <div>

                                            <span>
                                                {
                                                    coupon.code
                                                }
                                            </span>

                                            <strong>
                                                -
                                                {
                                                    coupon.discount
                                                }
                                                %
                                            </strong>

                                        </div>


                                        <p>
                                            {
                                                coupon.description
                                            }
                                        </p>

                                    </article>

                                )
                            )
                        }

                    </div>

                </aside>


                <main className="coupon-main">


                    <section className="loyalty-section">


                        <div className="loyalty-heading">

                            <div>

                                <span>
                                    Loyalty reward
                                </span>

                                <h2>
                                    Your last 5 purchases
                                </h2>

                            </div>


                            <strong className="loyalty-count">
                                {
                                    loyaltyProgress
                                }
                                /5
                            </strong>

                        </div>


                        <div className="loyalty-progress">

                            {
                                Array.from(
                                    {
                                        length: 5
                                    }
                                ).map(
                                    (
                                        _,
                                        index
                                    ) => (

                                        <div
                                            key={
                                                index
                                            }

                                            className={`
                                                loyalty-step

                                                ${
                                                    index <
                                                    loyaltyProgress

                                                        ? "complete"

                                                        : ""
                                                }
                                            `}
                                        />

                                    )
                                )
                            }

                        </div>


                        <div className="purchase-list">

                            {
                                recentPurchases
                                    .slice(0, 5)
                                    .map(
                                        (
                                            purchase,
                                            index
                                        ) => (

                                            <article
                                                key={
                                                    purchase.id
                                                }

                                                className="purchase-row"

                                                style={{
                                                    animationDelay:
                                                        `${
                                                            index *
                                                            50
                                                        }ms`
                                                }}
                                            >

                                                <div className="purchase-index">
                                                    {
                                                        index +
                                                        1
                                                    }
                                                </div>


                                                <div className="purchase-info">

                                                    <strong>
                                                        {
                                                            purchase.name
                                                        }
                                                    </strong>

                                                    <span>
                                                        Order #
                                                        {
                                                            purchase.id
                                                        }
                                                    </span>

                                                </div>


                                                <span className="purchase-date">
                                                    {
                                                        purchase.date
                                                    }
                                                </span>


                                                <strong className="purchase-total">
                                                    $
                                                    {
                                                        purchase.total
                                                            .toLocaleString()
                                                    }
                                                </strong>

                                            </article>

                                        )
                                    )
                            }

                        </div>


                        <div
                            className={`
                                loyalty-reward

                                ${
                                    loyaltyUnlocked
                                        ? "unlocked"
                                        : ""
                                }
                            `}
                        >

                            <div>

                                <span>
                                    Reward
                                </span>

                                <strong>
                                    20% OFF
                                </strong>

                                <p>
                                    Complete 5 purchases
                                    and receive 20% off
                                    your next order.
                                </p>

                            </div>


                            <button
                                type="button"

                                disabled={
                                    !loyaltyUnlocked ||
                                    hasLoyaltyCoupon
                                }

                                onClick={
                                    claimLoyaltyCoupon
                                }
                            >
                                {
                                    hasLoyaltyCoupon
                                        ? "Claimed"
                                        : loyaltyUnlocked
                                            ? "Claim coupon"
                                            : `${
                                                5 -
                                                loyaltyProgress
                                            } purchases left`
                                }
                            </button>

                        </div>

                    </section>

                </main>

            </div>

        </section>
    );
}


export default MyCoupons;