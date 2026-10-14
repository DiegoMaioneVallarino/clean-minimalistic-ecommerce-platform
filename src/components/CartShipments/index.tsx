
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../store/AuthContext";
import { useOrders } from "../../store/OrdersContext";

import type { StoreOrder } from "../../types/Order";

import "./CartShipments.css";

const statusLabels: Record<StoreOrder["status"], string> = {
    pending: "Order placed",
    preparing: "Preparing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
};

export default function CartShipments() {
    const { user } = useAuth();
    const {
        myOrders,
        newGuideCount,
        markGuideSeen,
    } = useOrders();

    const [showHistory, setShowHistory] = useState(false);

    if (!user) return null;

    const activeOrders = myOrders.filter(
        (order) =>
            order.status === "pending" ||
            order.status === "preparing" ||
            order.status === "shipped"
    );

    const completedOrders = myOrders.filter(
        (order) =>
            order.status === "delivered" ||
            order.status === "cancelled"
    );

    const visibleOrders = showHistory
        ? [...activeOrders, ...completedOrders]
        : activeOrders;

    return (
        <section className="cart-shipments">
            <header className="cart-shipments-header">
                <div>
                    <span className="cart-shipments-eyebrow">
                        YOUR PURCHASES
                    </span>

                    <h2>
                        On the Way
                        {newGuideCount > 0 && (
                            <span className="cart-shipments-count">
                                {newGuideCount} NEW
                            </span>
                        )}
                    </h2>

                    <p>
                        Follow your orders from preparation
                        to delivery.
                    </p>
                </div>
            </header>

            {newGuideCount > 0 && (
                <div
                    className="cart-shipment-alert"
                    role="status"
                >
                    <strong>Shipping update available!</strong>
                    <p>
                        {newGuideCount} order(s) have new
                        tracking information.
                    </p>
                </div>
            )}

            {visibleOrders.length === 0 ? (
                <div className="cart-shipments-empty">
                    <p>No orders currently on the way.</p>
                    <Link to="/catalog">
                        EXPLORE COLLECTION
                    </Link>
                </div>
            ) : (
                <div className="cart-shipments-list">
                    {visibleOrders.map((order) => {
                        const guideIsNew =
                            order.guide !== null &&
                            order.guideSeenAt === null;

                        return (
                            <article
                                className="cart-shipment-card"
                                key={order.id}
                            >
                                <div className="cart-shipment-top">
                                    <div>
                                        <strong>
                                            Order #{order.id.slice(0, 8)}
                                        </strong>
                                        <span>
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <span className="cart-shipment-status">
                                        {statusLabels[order.status]}
                                    </span>
                                </div>

                                <div className="cart-shipment-products">
                                    {order.items.map((item, index) => (
                                        <div
                                            key={`${item.productId}-${index}`}
                                            className="cart-shipment-product"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                            />

                                            <div>
                                                <strong>{item.name}</strong>
                                                <span>
                                                    Qty {item.quantity}
                                                    {item.size &&
                                                        ` · ${item.size}`}
                                                    {item.color &&
                                                        ` · ${item.color}`}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {order.guide ? (
                                    <div className="cart-shipment-guide">
                                        <div className="cart-guide-heading">
                                            <strong>Shipping Guide</strong>

                                            {guideIsNew && (
                                                <span>NEW</span>
                                            )}
                                        </div>

                                        <p>
                                            {order.guide.carrier}
                                            {" · "}
                                            {order.guide.trackingNumber}
                                        </p>

                                        <div className="cart-guide-actions">
                                            {order.guide.trackingUrl && (
                                                <a
                                                    href={
                                                        order.guide.trackingUrl
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() =>
                                                        markGuideSeen(order.id)
                                                    }
                                                >
                                                    TRACK PACKAGE ↗
                                                </a>
                                            )}

                                            {order.guide.labelUrl && (
                                                <a
                                                    href={
                                                        order.guide.labelUrl
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() =>
                                                        markGuideSeen(order.id)
                                                    }
                                                >
                                                    VIEW GUIDE ↗
                                                </a>
                                            )}

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    navigator.clipboard
                                                        .writeText(
                                                            order.guide!
                                                                .trackingNumber
                                                        )
                                                        .catch(() => {});
                                                    markGuideSeen(order.id);
                                                }}
                                            >
                                                COPY TRACKING
                                            </button>

                                            {guideIsNew && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        markGuideSeen(order.id)
                                                    }
                                                >
                                                    MARK AS READ
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="cart-shipment-waiting">
                                        Your shipping guide is not
                                        available yet. It will appear
                                        here once generated.
                                    </div>
                                )}
                            </article>
                        );
                    })}
                </div>
            )}

            {completedOrders.length > 0 && (
                <button
                    type="button"
                    className="cart-shipments-history"
                    onClick={() =>
                        setShowHistory((current) => !current)
                    }
                >
                    {showHistory
                        ? "HIDE ORDER HISTORY"
                        : `VIEW PAST ORDERS (${completedOrders.length})`}
                </button>
            )}
        </section>
    );
}
