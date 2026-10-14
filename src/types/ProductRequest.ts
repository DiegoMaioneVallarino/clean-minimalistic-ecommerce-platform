
export type ProductRequestStatus =
    | "pending"
    | "searching"
    | "found"
    | "unavailable"
    | "closed";

export type ProductRequest = {
    id: string;
    customerEmail: string;
    customerName: string;
    title: string;
    description: string;
    size: string;
    budget: number | null;
    images: string[];
    status: ProductRequestStatus;
    adminResponse: string;
    suggestedProductUrl: string;
    createdAt: number;
    updatedAt: number;
};

export type NewProductRequest = Pick<
    ProductRequest,
    "title" | "description" | "size" | "budget" | "images"
>;
