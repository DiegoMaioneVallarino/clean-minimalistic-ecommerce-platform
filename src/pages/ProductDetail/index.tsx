import { useParams } from "react-router-dom";
import { products } from "../../services/products";
import "../../styles/product-detail.css";
import { useCart } from "../../store/CartContext";

function ProductDetail() {

    const { id } = useParams();

    const product = products.find(
        (product) => product.id === Number(id)
    );

    const { addToCart } = useCart();

    if (!product) {
        return (
            <section>
                <h1>Product not found</h1>
            </section>
        );
    }

    return (
        <section className="product-detail">

            <div className="product-gallery">

                {product.images.map((image, index) => (
                    <img
                        key={image}
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                    />
                ))}

            </div>

            <div className="product-info">

                <p className="product-category">
                    {product.category}
                </p>

                <h1>
                    {product.name}
                </h1>

                <p className="product-price">
                    ${product.price}
                </p>

                <p className="product-description">
                    {product.description}
                </p>

                <button
               onClick={() => addToCart(product)}
>
    Add to cart
</button>

            </div>

        </section>
    );
}

export default ProductDetail;