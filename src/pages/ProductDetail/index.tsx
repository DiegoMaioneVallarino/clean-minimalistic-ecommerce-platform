import {
    useRef,
    useState,
} from "react";

import { useParams } from "react-router-dom";

import { products } from "../../services/products";
import { useCart } from "../../store/CartContext";
import { flyToCart } from "../../utils/flyToCart";

import "../../styles/product-detail.css";

function ProductDetail() {

    const { id } = useParams();

    const product = products.find(
        (product) =>
            product.id === Number(id)
    );

    const [selectedColor, setSelectedColor] =
        useState(0);

    const [selectedSize, setSelectedSize] =
        useState<string | null>(null);

    const productImageRef =
        useRef<HTMLImageElement>(null);

    const { addToCart } =
        useCart();

    if (!product) {
        return (
            <section>
                <h1>Product not found</h1>
            </section>
        );
    }

    const productImages = [
        product.images.model,
        product.images.front,
        product.images.back,
    ].filter(
        (image): image is string =>
            Boolean(image)
    );

    const handleAddToCart = () => {

        addToCart(product);

        if (productImageRef.current) {
            flyToCart(
                productImageRef.current
            );
        }
    };

    return (
        <section className="product-detail">

            <div className="product-gallery">

                {productImages.map(
                    (image, index) => (

                        <div
                            className="product-gallery-item"
                            key={image}
                        >
                            <img
                                ref={
                                    index === 0
                                        ? productImageRef
                                        : null
                                }
                                src={image}
                                alt={`${product.name} ${index + 1}`}
                            />
                        </div>

                    )
                )}

            </div>


            <div className="product-info">

                <div className="product-breadcrumb">

                    <span>
                        {product.category}
                    </span>

                    {product.subcategory && (
                        <span>
                            {product.subcategory}
                        </span>
                    )}

                </div>


                <h1>
                    {product.name}
                </h1>


                <div className="product-price-row">

                    <div className="product-price">
                        ${product.price}

                        <span>
                            MXN
                        </span>
                    </div>


                    {product.colors &&
                        product.colors.length > 0 && (

                        <div className="product-colors">

                            {product.colors.map(
                                (color, index) => (

                                    <button
                                        key={color.name}
                                        type="button"

                                        className={
                                            selectedColor === index
                                                ? "color-option selected"
                                                : "color-option"
                                        }

                                        onClick={() =>
                                            setSelectedColor(index)
                                        }

                                        aria-label={
                                            `Select ${color.name}`
                                        }
                                    >
                                        <span
                                            style={{
                                                background:
                                                    color.value,
                                            }}
                                        />
                                    </button>

                                )
                            )}

                        </div>

                    )}

                </div>


                <p className="product-description">
                    {product.description}
                </p>


                <button
                    className="add-to-cart-button"
                    onClick={handleAddToCart}
                >
                    Add to cart
                </button>


                {product.sizes &&
                    product.sizes.length > 0 && (

                    <div className="product-sizes">

                        {product.sizes.map(
                            (size) => (

                                <button
                                    key={size}
                                    type="button"

                                    className={
                                        selectedSize === size
                                            ? "size-option selected"
                                            : "size-option"
                                    }

                                    onClick={() =>
                                        setSelectedSize(size)
                                    }
                                >
                                    {size}
                                </button>

                            )
                        )}

                    </div>

                )}

            </div>

        </section>
    );
}

export default ProductDetail;