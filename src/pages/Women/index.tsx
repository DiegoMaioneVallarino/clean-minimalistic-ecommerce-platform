import { products } from "../../services/products";
import CategoryPage from "../../components/CategoryPage";

function Women() {
    return (
        <CategoryPage
            title="Women"
            category="women"
            products={products}
        />
    );
}

export default Women;