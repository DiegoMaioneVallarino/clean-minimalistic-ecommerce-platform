
import {
    useEffect,
    useRef,
    useState,
} from "react";

import { useParams } from "react-router-dom";

import { useProducts } from "../../store/ProductContext";
import { useCart } from "../../store/CartContext";
import { flyToCart } from "../../utils/flyToCart";
import { getFinalPrice } from "../../utils/getFinalPrice";

import "../../styles/product-detail.css";

function ProductDetail() {
    const { id } = useParams();

    const { products } = useProducts();
    const { addToCart } = useCart();

    const product = products.find(
        (item) => item.id === Number(id)
    );

    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] =
        useState<string | null>(null);

    const [activeImage, setActiveImage] =
        useState<number | null>(null);

    const productImageRef = useRef<HTMLImageElement>(null);

    const productImages = product
        ? [
            product.images.model,
            product.images.front,
            product.images.back,
        ].filter(
            (image): image is string => Boolean(image)
        )
        : [];

    useEffect(() => {
        if (activeImage === null) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActiveImage(null);
            }

            if (event.key === "ArrowRight") {
                setActiveImage((current) =>
                    current === null
                        ? null
                        : (current + 1) % productImages.length
                );
            }

            if (event.key === "ArrowLeft") {
                setActiveImage((current) =>
                    current === null
                        ? null
                        : (
                            current - 1 + productImages.length
                        ) % productImages.length
                );
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
            document.body.style.overflow = previousOverflow;
        };
    }, [activeImage, productImages.length]);

    if (!product) {
        return (
            <section className="product-not-found">
                <h1>Product not found</h1>
            </section>
        );
    }

    const isOutOfStock = product.stock <= 0;
    const isOnSale = (product.discount ?? 0) > 0;
    const finalPrice = getFinalPrice(product);

    const requiresSize =
        Boolean(product.sizes && product.sizes.length > 0);

    const canAddToCart =
        !isOutOfStock &&
        (!requiresSize || selectedSize !== null);

    function handleAddToCart() {

    if (!product || !canAddToCart) {
        return;
    }

    addToCart(product, {
    color: product.colors?.[selectedColor]?.name,
    size: selectedSize ?? undefined,
});

    if (productImageRef.current) {
        flyToCart(productImageRef.current);
    }

}

    function changeImage(direction: number) {
        setActiveImage((current) => {
            if (current === null) return null;

            return (
                current + direction + productImages.length
            ) % productImages.length;
        });
    }

    return (
        <>
            <section className="product-detail">
                <div className="product-gallery">
                    {productImages.map((image, index) => (
                        <button
                            className="product-gallery-item"
                            key={`${image}-${index}`}
                            type="button"
                            onClick={() => setActiveImage(index)}
                            aria-label={`Enlarge image ${index + 1}`}
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

                            <span className="gallery-zoom-label">
                                View image +
                            </span>
                        </button>
                    ))}
                </div>

                <div className="product-info">
                    <div className="product-breadcrumb">
                        <span>{product.category}</span>

                        {product.subcategory && (
                            <>
                                <span className="breadcrumb-separator">
                                    /
                                </span>
                                <span>{product.subcategory}</span>
                            </>
                        )}
                    </div>

                    <h1>{product.name}</h1>

                    <div className="product-price-row">
                        <div className="product-price">
                            {isOnSale ? (
                                <>
                                    <span className="product-original-price">
                                        ${product.price}
                                    </span>

                                    <span className="product-discounted-price">
                                        ${finalPrice}
                                    </span>
                                </>
                            ) : (
                                <span>${product.price}</span>
                            )}

                            <span className="product-currency">
                                MXN
                            </span>
                        </div>

                        {isOnSale && (
                            <span className="product-discount-percent">
                                -{product.discount}%
                            </span>
                        )}
                    </div>

                    <div className="product-stock-line">
                        {isOutOfStock ? (
                            <span className="product-stock-status">
                                Out of stock
                            </span>
                        ) : product.stock === 1 ? (
                            <span className="product-low-stock">
                                Only 1 left
                            </span>
                        ) : product.stock <= 3 ? (
                            <span className="product-low-stock">
                                Only {product.stock} left
                            </span>
                        ) : (
                            <span className="product-available">
                                Available
                            </span>
                        )}
                    </div>

                    {product.description && (
                        <p className="product-description">
                            {product.description}
                        </p>
                    )}

                    {product.colors && product.colors.length > 0 && (
                        <div className="product-option-group">
                            <div className="product-option-heading">
                                <span>Color</span>
                                <strong>
                                    {product.colors[selectedColor]?.name}
                                </strong>
                            </div>

                            <div className="product-colors">
                                {product.colors.map((color, index) => (
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
                                        aria-label={`Select ${color.name}`}
                                        aria-pressed={selectedColor === index}
                                    >
                                        <span
                                            style={{
                                                background: color.value,
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {product.sizes && product.sizes.length > 0 && (
                        <div className="product-option-group">
                            <div className="product-option-heading">
                                <span>Size</span>
                                <strong>
                                    {selectedSize ?? "Select a size"}
                                </strong>
                            </div>

                            <div className="product-sizes">
                                {product.sizes.map((size) => (
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
                                        aria-pressed={selectedSize === size}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        type="button"
                        className="add-to-cart-button"
                        onClick={handleAddToCart}
                        disabled={!canAddToCart}
                    >
                        {isOutOfStock
                            ? "Out of stock"
                            : requiresSize && !selectedSize
                                ? "Select a size"
                                : "Add to cart"}
                    </button>

                    <p className="product-purchase-note">
                        Curated pieces. Limited availability.
                    </p>
                </div>
            </section>

            {activeImage !== null && (
                <div
                    className="product-lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Product image gallery"
                    onClick={() => setActiveImage(null)}
                >
                    <div className="lightbox-topbar">
                        <span>
                            {activeImage + 1} / {productImages.length}
                        </span>

                        <button
                            type="button"
                            className="lightbox-close"
                            onClick={() => setActiveImage(null)}
                            aria-label="Close gallery"
                        >
                            ×
                        </button>
                    </div>

                    {productImages.length > 1 && (
                        <button
                            type="button"
                            className="lightbox-arrow previous"
                            onClick={(event) => {
                                event.stopPropagation();
                                changeImage(-1);
                            }}
                            aria-label="Previous image"
                        >
                            ‹
                        </button>
                    )}

                    <img
                        className="lightbox-image"
                        src={productImages[activeImage]}
                        alt={`${product.name} enlarged`}
                        onClick={(event) => event.stopPropagation()}
                    />

                    {productImages.length > 1 && (
                        <button
                            type="button"
                            className="lightbox-arrow next"
                            onClick={(event) => {
                                event.stopPropagation();
                                changeImage(1);
                            }}
                            aria-label="Next image"
                        >
                            ›
                        </button>
                    )}
                </div>
            )}
        </>
    );
}

export default ProductDetail;
