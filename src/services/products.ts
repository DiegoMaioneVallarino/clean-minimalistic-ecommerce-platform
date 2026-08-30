import type { Product } from "../types/Product";

import product0Front from "../img/items/0/front.webp";
import product0Back from "../img/items/0/back.webp";

import product1Front from "../img/items/1/front.webp";

import product2Front from "../img/items/2/front.webp";
import product2Back from "../img/items/2/back.webp";

export const products: Product[] = [
    {
        id: 0,
        name: "Worldwide Tee",
        price: 699,
        category: "women",
        images: [
            product0Front,
            product0Back,
        ],
        description:
            "Graphic oversized tee with front and back print.",
    },

    {
        id: 1,
        name: "Graphic Tee",
        price: 649,
        category: "women",
        images: [
            product1Front,
        ],
        description:
            "Relaxed graphic tee designed for everyday wear.",
    },

    {
        id: 2,
        name: "Racing Hoodie",
        price: 1299,
        category: "men",
        images: [
            product2Front,
            product2Back,
        ],
        description:
            "Racing-inspired hoodie with contrast panels and graphic details.",
    },
];