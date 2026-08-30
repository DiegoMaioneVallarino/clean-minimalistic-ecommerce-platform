import { NavLink } from "react-router-dom";
import "../../../styles/header.css";

function Header() {
    return (
        <header className="main-header">

            <div className="logo-area">
                <NavLink to="/">
                    MINIMAL
                </NavLink>
            </div>

            <nav className="main-nav">
                <NavLink to="/men">
                    Men
                </NavLink>

                <NavLink to="/women">
                    Women
                </NavLink>

                <NavLink to="/sales">
                    Sales
                </NavLink>

                <NavLink to="/catalog">
                    Catalog
                </NavLink>
            </nav>

            <div className="header-actions">
                <NavLink to="/cart">
                    Cart
                </NavLink>

                <NavLink to="/login">
                    Login
                </NavLink>
            </div>

        </header>
    );
}

export default Header;