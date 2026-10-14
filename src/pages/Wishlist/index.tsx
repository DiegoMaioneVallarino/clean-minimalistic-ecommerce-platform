import { Link } from "react-router-dom";

import { useProducts } from "../../store/ProductContext";
import { useShoppingHistory } from "../../store/ShoppingHistoryContext";

import SavedProductCard from "../../components/SavedProductCard";
import type { Product } from "../../types/Product";
import "./Wishlist.css";

function Wishlist() {
    const { products } = useProducts();

    const { wishlistIds } = useShoppingHistory();

    const savedProducts = wishlistIds
    .map((id) => products.find((product) => product.id === id))
    .filter(
        (product): product is Product =>
            product !== undefined && product.stock > 0
    );

    return (
        <main className="wishlist-page">
            <header className="wishlist-page-header">
                <p>YOUR PERSONAL COLLECTION</p>

                <h1>My Wishlist</h1>

                <span>
                    {savedProducts.length} saved pieces
                </span>
            </header>

            {savedProducts.length === 0 ? (
                <div className="wishlist-empty">
                    <h2>No saved pieces yet.</h2>

                    <p>
                        Discover something you love and
                        save it for later.
                    </p>

                    <Link to="/catalog">
                        EXPLORE COLLECTION
                    </Link>
                </div>
            ) : (
                <div className="wishlist-grid">
                    {savedProducts.map((product) => (
                        <SavedProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}

export default Wishlist;