import type { Product } from "../types/Product";

export function getFinalPrice(
    product: Product
): number {

    const discount =
        product.discount ?? 0;

    return Math.round(
        product.price *
        (1 - discount / 100)
    );
}