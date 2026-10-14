
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import { useAuth } from "./AuthContext";
import type {
    StoreOrder,
    OrderStatus,
    OrderItem,
    ShippingGuide,
} from "../types/Order";

const STORAGE_KEY = "maison.orders.v1";

type NewOrder = {
    items: OrderItem[];
    total: number;
    shippingAddressId: string | null;
};

type OrdersContextValue = {
    orders: StoreOrder[];
    myOrders: StoreOrder[];
    newGuideCount: number;
    createOrder: (data: NewOrder) => string | null;
    updateStatus: (id: string, status: OrderStatus) => void;
    assignGuide: (
        id: string,
        guide: Omit<ShippingGuide, "createdAt">
    ) => void;
    markGuideSeen: (id: string) => void;
};

const OrdersContext =
    createContext<OrdersContextValue | null>(null);

function loadOrders(): StoreOrder[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];

        const parsed: unknown = JSON.parse(raw);

        return Array.isArray(parsed)
            ? parsed as StoreOrder[]
            : [];
    } catch {
        return [];
    }
}

export function OrdersProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { user } = useAuth();

    const [orders, setOrders] = useState<StoreOrder[]>(
        loadOrders
    );

    useEffect(() => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(orders)
            );
        } catch {
            // Storage may be unavailable or full.
        }
    }, [orders]);

    const myOrders = useMemo(() => {
        if (!user) return [];

        return orders
            .filter(
                (order) =>
                    order.userId === user.email.toLowerCase()
            )
            .sort((a, b) => b.createdAt - a.createdAt);
    }, [orders, user?.email]);

    const newGuideCount = myOrders.filter(
        (order) =>
            order.guide !== null &&
            order.guideSeenAt === null
    ).length;

    function createOrder(data: NewOrder): string | null {
        if (!user || data.items.length === 0) return null;

        const id = crypto.randomUUID();

        const order: StoreOrder = {
            id,
            userId: user.email.toLowerCase(),
            createdAt: Date.now(),
            status: "pending",
            items: data.items,
            total: data.total,
            shippingAddressId: data.shippingAddressId,
            guide: null,
            guideSeenAt: null,
        };

        setOrders((current) => [order, ...current]);

        return id;
    }

    function updateStatus(
        id: string,
        status: OrderStatus
    ) {
        if (user?.role !== "admin") return;

        setOrders((current) =>
            current.map((order) =>
                order.id === id
                    ? { ...order, status }
                    : order
            )
        );
    }

    function assignGuide(
        id: string,
        guide: Omit<ShippingGuide, "createdAt">
    ) {
        if (user?.role !== "admin") return;

        if (
            !guide.carrier.trim() ||
            !guide.trackingNumber.trim()
        ) {
            return;
        }

        const trackingUrl = guide.trackingUrl.trim();
        const labelUrl = guide.labelUrl?.trim();

        if (
            (trackingUrl && !/^https:\/\//i.test(trackingUrl)) ||
            (labelUrl && !/^https:\/\//i.test(labelUrl))
        ) {
            return;
        }

        setOrders((current) =>
            current.map((order) =>
                order.id === id
                    ? {
                        ...order,
                        status: "shipped",
                        guide: {
                            ...guide,
                            trackingUrl,
                            labelUrl,
                            createdAt: Date.now(),
                        },
                        guideSeenAt: null,
                    }
                    : order
            )
        );
    }

    function markGuideSeen(id: string) {
        if (!user) return;

        setOrders((current) =>
            current.map((order) =>
                order.id === id &&
                order.userId === user.email.toLowerCase() &&
                order.guide !== null
                    ? {
                        ...order,
                        guideSeenAt: Date.now(),
                    }
                    : order
            )
        );
    }

    return (
        <OrdersContext.Provider
            value={{
                orders,
                myOrders,
                newGuideCount,
                createOrder,
                updateStatus,
                assignGuide,
                markGuideSeen,
            }}
        >
            {children}
        </OrdersContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrdersContext);

    if (!context) {
        throw new Error(
            "useOrders must be used inside OrdersProvider"
        );
    }

    return context;
}
