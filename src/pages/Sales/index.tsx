import { useProducts } from "../../store/ProductContext";
import ProductGrid from "../../components/ProductGrid";

function Sales() {

    const {
        products,
    } = useProducts();

    const saleProducts =
        products.filter(
            (product) =>
                (product.discount ?? 0) > 0
        );

    return (
        <section className="category-page">

            <div className="category-header">
                <p>Selected discounts</p>

                <h1>Sales</h1>
            </div>

            <ProductGrid
                products={saleProducts}
                columns={4}
                hoverMode="alternate"
            />

        </section>
    );
}

export default Sales;