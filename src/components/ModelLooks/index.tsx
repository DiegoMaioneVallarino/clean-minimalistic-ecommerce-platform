import { Link } from "react-router-dom";

import { products } from "../../services/products";
import "../../styles/model-looks.css";

import { getFinalPrice } from "../../utils/getFinalPrice";

function ModelLooks() {

    const modelProducts = products
        .filter(
            (product) =>
                product.images.model !== undefined
        )
        .slice(0, 3);

    return (
        <section className="model-looks">

            <div className="section-header">
                <p>On body</p>
                <h2>Styled Looks</h2>
            </div>

            <div className="model-looks-grid">

                {modelProducts.map((product) => {

    const isOnSale =
        (product.discount ?? 0) > 0;

    const finalPrice =
        getFinalPrice(product);

    const isOutOfStock =
        product.stock <= 0;

    return (
        <Link
            key={product.id}
            to={`/product/${product.id}`}
            className={
                isOutOfStock
                    ? "model-look-card out-of-stock"
                    : "model-look-card"
            }
        >

            <div className="model-look-images">

                {isOnSale && (
                    <div className="discount-ribbon">
                        Discount
                    </div>
                )}

                {isOutOfStock && (
                    <div className="out-of-stock-label">
                        Out of stock
                    </div>
                )}

                <img
                    src={product.images.model}
                    alt={`${product.name} model`}
                    className="
                        model-look-image
                        model-look-model
                    "
                />

                <img
                    src={product.images.front}
                    alt={product.name}
                    className="
                        model-look-image
                        model-look-front
                    "
                />

            </div>


            <div className="model-look-info">

                <h3>
                    {product.name}
                </h3>

                {isOnSale ? (

                    <div className="model-look-price">

                        <span className="original-price">
                            ${product.price}
                        </span>

                        <span className="discounted-price">
                            ${finalPrice}
                        </span>

                    </div>

                ) : (

                    <p>
                        ${product.price}
                    </p>

                )}

            </div>

        </Link>
    );
})}

            </div>

        </section>
    );
}

export default ModelLooks;