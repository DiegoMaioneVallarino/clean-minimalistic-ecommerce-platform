import type { Product } from "../types/Product";

import product0Front from "../img/items/0/front.webp";
import product0Back from "../img/items/0/back.webp";

import product1Front from "../img/items/1/front.webp";

import product2Front from "../img/items/2/front.webp";
import product2Back from "../img/items/2/back.webp";

import product3Front from "../img/items/3/front.png";
import product3Model from "../img/items/3/model.jpg";

import product4Front from "../img/items/4/front.png";
import product4Model from "../img/items/4/model.jpg";

import product5Front from "../img/items/5/front.jpg";


export const products: Product[] = [
    {
        id: 0,
        name: "Worldwide Tee",
        price: 699,
        category: "women",
       images: {
    front: product0Front,
    back: product0Back,
},
        description:
            "Graphic oversized tee with front and back print.",
    },

    {
        id: 1,
        name: "Graphic Tee",
        price: 649,
        category: "women",
        images: {
            front: product1Front,
        },
        description:
            "Relaxed graphic tee designed for everyday wear.",
    },

    {
        id: 2,
        name: "Racing Hoodie",
        price: 1299,
        category: "men",
        images: {
            front: product2Front,
            back: product2Back,
        },
        description:
            "Racing-inspired hoodie with contrast panels and graphic details.",
    },
    {
    id: 3,
    name: "Graphic Black Tee",
    price: 699,

    category: "men",
    subcategory: "tees",

    soldCount: 18,

    colors: [
        {
            name: "Black",
            value: "#000000",
        },
        {
            name: "Red",
            value: "#ff4760",
        },
    ],

    sizes: ["S", "M", "L", "XL"],

    images: {
        front: product3Front,
        model: product3Model,
    },

    description:
        "Ashda RK1987 black and red retro tshirt",
},{
    id: 4,
    name: "New Item",
    price: 799,
    category: "women",

    images: {
        front: product4Front,
        model: product4Model,
    },

    description: "New collection piece.",
},
{
    id: 5,
    name: "New Item",
    price: 899,
    category: "men",

    images: {
        front: product5Front,
    },

    description: "New collection piece.",
}
];