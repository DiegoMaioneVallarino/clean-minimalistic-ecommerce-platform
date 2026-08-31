export type ProductImages = {
    front: string;
    back?: string;
    model?: string;
};

export type ProductColor = {
    name: string;
    value: string;
};

export interface Product {
    id: number;
    name: string;
    price: number;

    category: string;
    subcategory?: string;

    colors?: ProductColor[];
    sizes?: string[];

    soldCount?: number;

    images: ProductImages;

    description: string;
}