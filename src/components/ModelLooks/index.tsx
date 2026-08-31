import { Link } from "react-router-dom";

import { products } from "../../services/products";
import "../../styles/model-looks.css";

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

                {modelProducts.map((product) => (
                    <Link
    key={product.id}
    to={`/product/${product.id}`}
    className="model-look-card"
>
    <div className="model-look-images">

        <img
            src={product.images.model}
            alt={`${product.name} model`}
            className="model-look-image model-look-model"
        />

        <img
            src={product.images.front}
            alt={product.name}
            className="model-look-image model-look-front"
        />

    </div>

    <div className="model-look-info">
        <h3>
            {product.name}
        </h3>

        <p>
            ${product.price}
        </p>
    </div>

</Link>
                ))}

            </div>

        </section>
    );
}

export default ModelLooks;