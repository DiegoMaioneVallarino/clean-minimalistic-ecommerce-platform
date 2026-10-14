
export type OrderStatus =
    | "pending"
    | "preparing"
    | "shipped"
    | "delivered"
    | "cancelled";

export type OrderItem = {
    productId: number;
    name: string;
    image: string;
    quantity: number;
    price: number;
    size?: string;
    color?: string;
};

export type ShippingGuide = {
    carrier: string;
    trackingNumber: string;
    trackingUrl: string;
    labelUrl?: string;
    createdAt: number;
};

export type StoreOrder = {
    id: string;
    userId: string;
    createdAt: number;
    status: OrderStatus;
    items: OrderItem[];
    total: number;
    shippingAddressId: string | null;
    guide: ShippingGuide | null;
    guideSeenAt: number | null;
};
