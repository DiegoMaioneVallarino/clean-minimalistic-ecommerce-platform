export type ShippingAddress = {
    id: string;
    label: string;
    recipient: string;
    phone: string;
    street: string;
    exteriorNumber: string;
    interiorNumber: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    references: string;
    isDefault: boolean;
};

export type ShippingAddressInput = Omit<
    ShippingAddress,
    "id" | "isDefault"
>;