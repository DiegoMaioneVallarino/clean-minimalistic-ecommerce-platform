import { NavLink } from "react-router-dom";
import "../../../styles/footer.css";

function Footer() {
    return (
        <footer className="main-footer">
            <div className="footer-content">

                <div className="footer-brand">
                    <NavLink to="/" className="footer-logo">
                        MINIMAL
                    </NavLink>

                    <p>
                        Essential pieces.
                        <br />
                        Designed for everyday life.
                    </p>
                </div>

                <div className="footer-column">
                    <h3>Shop</h3>

                    <NavLink to="/men">Men</NavLink>
                    <NavLink to="/women">Women</NavLink>
                    <NavLink to="/sales">Sales</NavLink>
                    <NavLink to="/catalog">Catalog</NavLink>
                </div>

                <div className="footer-column">
                    <h3>Help</h3>

                    <a href="#">Contact</a>
                    <a href="#">Shipping</a>
                    <a href="#">Returns</a>
                </div>

                <div className="footer-column">
                    <h3>Follow</h3>

                    <a href="#">Instagram</a>
                    <a href="#">Pinterest</a>
                </div>

            </div>

            <div className="footer-bottom">
                <span>© 2026 Minimal</span>

                <div className="footer-legal">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;