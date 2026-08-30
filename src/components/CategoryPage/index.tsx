import type { Product } from "../../types/Product";
import ProductGrid from "../ProductGrid";

type CategoryPageProps = {
    title: string;
    category: string;
    products: Product[];
};

function CategoryPage({
    title,
    category,
    products,
}: CategoryPageProps) {

    const filteredProducts = products.filter(
        (product) => product.category === category
    );

    return (
        <section className="category-page">
            <div className="category-header">
                <p>Collection</p>
                <h1>{title}</h1>
            </div>

<ProductGrid
    products={filteredProducts}
    columns={3}
/>        </section>
    );
}

export default CategoryPage;