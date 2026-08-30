import { products } from "../../services/products";
import CategoryPage from "../../components/CategoryPage";

function Men() {
    return (
        <CategoryPage
            title="Men"
            category="men"
            products={products}
        />
    );
}

export default Men;