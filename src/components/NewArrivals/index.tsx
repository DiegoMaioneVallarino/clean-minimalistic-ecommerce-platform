import { products } from "../../services/products";
import ProductGrid from "../ProductGrid";

function NewArrivals() {

    const newArrivals = [...products].reverse();

    return (
        <section className="new-arrivals">

            <div className="section-header">
                <p>Just added</p>
                <h2>New Arrivals</h2>
            </div>

            <ProductGrid
    products={newArrivals}
    columns={6}
    hoverMode="zoom"
/>

        </section>
    );
}

export default NewArrivals;