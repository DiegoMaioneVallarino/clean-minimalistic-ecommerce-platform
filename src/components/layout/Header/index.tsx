import { NavLink } from "react-router-dom";

import { useCart } from "../../../store/CartContext";
import { useAuth } from "../../../store/AuthContext";
import {
    useState,
} from "react";
import {
    useNavigate,
} from "react-router-dom";


import "../../../styles/header.css";

function Header() {

    const { items } = useCart();

    const {
        user,
        logout,
    } = useAuth();

    const [userMenuOpen, setUserMenuOpen] =
    useState(false);

    const cartCount = items.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    const [search, setSearch] =
    useState("");

    const navigate =
    useNavigate();

    return (
        <header className="main-header">

            <div className="logo-area">
                <NavLink
                    to="/"
                    className="logo-link"
                >
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

            <form
    className="header-search"
    onSubmit={(event) => {
        event.preventDefault();

        const query =
            search.trim();

        if (!query) {
            return;
        }

        navigate(
            `/catalog?q=${encodeURIComponent(query)}`
        );
    }}
>
    <input
        type="text"

        value={search}

        onChange={(event) =>
            setSearch(
                event.target.value
            )
        }

        placeholder="Search products"
    />
</form>

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


    {user && (
        <NavLink
            to="/orders"
            className="orders-link"
        >
            My Orders
        </NavLink>
    )}


    {user ? (

        <div className="user-area">

            <div className="user-balance">
                ${user.balance.toLocaleString()} MXN
            </div>


            <div className="user-menu-wrapper">

                <button
                    type="button"
                    className="avatar-button"

                    onClick={() =>
                        setUserMenuOpen(
                            (current) => !current
                        )
                    }
                >
                    <img
                        className="user-avatar"
                        src={user.avatar}
                        alt={user.name}
                    />
                </button>


                {userMenuOpen && (

                    <div className="user-dropdown">

                        <div className="user-dropdown-header">

                            <strong>
                                {user.name}
                            </strong>

                            <span>
                                {user.email}
                            </span>

                        </div>


                        <NavLink to="/profile">
                            My Profile
                        </NavLink>

                        <NavLink to="/orders">
                            My Orders
                        </NavLink>

                        <NavLink to="/coupons">
                            My Coupons
                        </NavLink>

                        <NavLink to="/settings">
                            Settings
                        </NavLink>


                        {user.role === "admin" && (

                            <NavLink
                                to="/admin"
                                className="admin-menu-link"
                            >
                                Admin Mode
                            </NavLink>

                        )}


                        <button
                            type="button"
                            className="user-dropdown-logout"
                            onClick={logout}
                        >
                            Logout
                        </button>

                    </div>

                )}

            </div>

        </div>

    ) : (

        <NavLink to="/login">
            Login
        </NavLink>

    )}

</div>

        </header>
    );
}

export default Header;