import { NavLink } from "react-router-dom";
import { useCart } from "../../../store/CartContext";
import "../../../styles/header.css";

function Header() {
    const { items } = useCart();

    const cartCount = items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <header className="main-header">
            <div className="logo-area">
                <NavLink to="/" className="logo-link">
                    MINIMAL
                </NavLink>
            </div>

            <nav className="main-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/men">Men</NavLink>
                <NavLink to="/women">Women</NavLink>
                <NavLink to="/sales">Sales</NavLink>
                <NavLink to="/catalog">Catalog</NavLink>
            </nav>

            <div className="header-actions">
                <NavLink
                    to="/cart"
                    className="cart-link"
                    id="cart-link"
                >
                    Cart

                    {cartCount > 0 && (
                        <span className="cart-count">
                            {cartCount}
                        </span>
                    )}
                </NavLink>

                <NavLink to="/login">
                    Login
                </NavLink>
            </div>
        </header>
    );
}

export default Header;