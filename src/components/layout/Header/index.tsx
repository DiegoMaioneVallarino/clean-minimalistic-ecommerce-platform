
import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    NavLink,
    useLocation,
    useNavigate,
} from "react-router-dom";

import { useCart } from "../../../store/CartContext";
import { useAuth } from "../../../store/AuthContext";

import "../../../styles/header.css";

function MenuIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M3 7H21M3 12H21M3 17H21"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle
                cx="10.8"
                cy="10.8"
                r="6.8"
                stroke="currentColor"
                strokeWidth="1.6"
            />
            <path
                d="M16 16L21 21"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

function BagIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M4 8H20L19 21H5L4 8Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <path
                d="M9 9V6A3 3 0 0 1 15 6V9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

const navigation = [
    { label: "Home", path: "/" },
    { label: "Men", path: "/men" },
    { label: "Women", path: "/women" },
    { label: "Sales", path: "/sales" },
    { label: "Nosotros", path: "/about" },
];

const clothingCategories = [
    { label: "All Clothing", path: "/catalog" },
    { label: "Jackets & Coats", path: "/catalog?type=jackets" },
    { label: "Pants & Denim", path: "/catalog?type=pants" },
    { label: "Shirts", path: "/catalog?type=shirts" },
    { label: "T-Shirts & Tops", path: "/catalog?type=tops" },
    { label: "Dresses & Skirts", path: "/catalog?type=dresses" },
    { label: "Knitwear", path: "/catalog?type=knitwear" },
    { label: "Accessories", path: "/catalog?type=accessories" },
];

const styleCategories = [
    { label: "Western Revival", path: "/catalog?style=western" },
    { label: "Racing Archives", path: "/catalog?style=racing" },
    { label: "Seventies Fever", path: "/catalog?style=groovy" },
    { label: "Y2K Archives", path: "/catalog?style=y2k" },
    { label: "Grunge & Alternative", path: "/catalog?style=grunge" },
    { label: "Retro Sportswear", path: "/catalog?style=sportswear" },
    { label: "Biker & Leather", path: "/catalog?style=biker" },
    { label: "Preppy Vintage", path: "/catalog?style=preppy" },
];

function Header() {
    const { items } = useCart();
    const { user, logout } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const [search, setSearch] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const headerRef = useRef<HTMLElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const cartCount = items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    useEffect(() => {
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
        setSearchOpen(false);
    }, [location.pathname, location.search]);

    useEffect(() => {
        if (searchOpen) {
            searchInputRef.current?.focus();
        }
    }, [searchOpen]);

    useEffect(() => {
        function handlePointerDown(event: PointerEvent) {
            const target = event.target;

            if (
                target instanceof Node &&
                !headerRef.current?.contains(target)
            ) {
                setMobileMenuOpen(false);
                setUserMenuOpen(false);
                setSearchOpen(false);
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setMobileMenuOpen(false);
                setUserMenuOpen(false);
                setSearchOpen(false);
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener(
                "pointerdown",
                handlePointerDown
            );
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, []);

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const query = search.trim();

        if (!query) return;

        navigate(`/catalog?q=${encodeURIComponent(query)}`);
        setSearchOpen(false);
        setMobileMenuOpen(false);
    }

    function handleLogout() {
        logout();
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
    }

    return (
        <header className="main-header" ref={headerRef}>
            <div className="header-main-row">

                <div className="header-leading">
                    <button
                        type="button"
                        className="header-icon-button mobile-menu-button"
                        onClick={() => {
                            setMobileMenuOpen((current) => !current);
                            setSearchOpen(false);
                            setUserMenuOpen(false);
                        }}
                        aria-label={
                            mobileMenuOpen
                                ? "Close navigation"
                                : "Open navigation"
                        }
                        aria-expanded={mobileMenuOpen}
                        aria-controls="header-mobile-nav"
                    >
                        <MenuIcon />
                    </button>

                    <NavLink
    to="/"
    className="logo-link"
    aria-label="Go to homepage"
>
    <img
        src="/logo.png"
        alt="MINIMAL"
        className="header-logo"
    />
</NavLink>
                </div>

               <nav className="main-nav" aria-label="Main navigation">

    {navigation.slice(0, 3).map((link) => (
        <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) =>
                isActive ? "nav-active" : ""
            }
        >
            {link.label}
        </NavLink>
    ))}

    <details
        className="catalog-menu"
        key={`${location.pathname}${location.search}`}
    >
        <summary
            className={
                location.pathname === "/catalog"
                    ? "catalog-trigger nav-active"
                    : "catalog-trigger"
            }
        >
            Catalog
            <span className="catalog-chevron">⌄</span>
        </summary>

        <div className="catalog-mega-menu">

            <div className="catalog-mega-column">
                <h3>SHOP BY CLOTHING</h3>

                {clothingCategories.map((category) => (
                    <NavLink
                        key={category.path}
                        to={category.path}
                    >
                        {category.label}
                    </NavLink>
                ))}
            </div>

            <div className="catalog-mega-column">
                <h3>SHOP BY STYLE</h3>

                {styleCategories.map((category) => (
                    <NavLink
                        key={category.path}
                        to={category.path}
                    >
                        {category.label}
                    </NavLink>
                ))}
            </div>

            <div className="catalog-mega-footer">
                <span>CURATED VINTAGE / EST. 2018</span>
                <NavLink to="/catalog">
                    EXPLORE ALL PIECES ↗
                </NavLink>
            </div>

        </div>
    </details>

    {navigation.slice(3).map((link) => (
        <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
                isActive ? "nav-active" : ""
            }
        >
            {link.label}
        </NavLink>
    ))}

</nav>

                <div className="header-actions">
                    <button
                        type="button"
                        className="header-icon-button"
                        onClick={() => {
                            setSearchOpen((current) => !current);
                            setMobileMenuOpen(false);
                            setUserMenuOpen(false);
                        }}
                        aria-label="Search products"
                        aria-expanded={searchOpen}
                        aria-controls="header-search-panel"
                    >
                        <SearchIcon />
                    </button>

                    <NavLink
                        to="/cart"
                        className="header-icon-button cart-link"
                        id="cart-link"
                        aria-label={`Cart, ${cartCount} items`}
                    >
                        <BagIcon />

                        {cartCount > 0 && (
                            <span className="cart-count">
                                {cartCount > 99 ? "99+" : cartCount}
                            </span>
                        )}
                    </NavLink>

                    {user ? (
                        <div className="user-menu-wrapper">
                            <button
                                type="button"
                                className="avatar-button"
                                onClick={() => {
                                    setUserMenuOpen((current) => !current);
                                    setMobileMenuOpen(false);
                                    setSearchOpen(false);
                                }}
                                aria-label="Account menu"
                                aria-expanded={userMenuOpen}
                                aria-controls="header-user-dropdown"
                            >
                                <img
                                    className="user-avatar"
                                    src={user.avatar}
                                    alt={user.name}
                                />
                            </button>

                            {userMenuOpen && (
                                <div
                                    className="user-dropdown"
                                    id="header-user-dropdown"
                                >
                                    <div className="user-dropdown-header">
                                        <strong>{user.name}</strong>
                                        <span>{user.email}</span>
                                        <small>
                                            ${user.balance.toLocaleString()} MXN
                                        </small>
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

                                    <NavLink to="/contact">
                                        Contact
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
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <NavLink
                            to="/login"
                            className="header-login-link"
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            </div>

            {searchOpen && (
                <form
                    className="header-search-panel"
                    id="header-search-panel"
                    onSubmit={handleSearch}
                    role="search"
                >
                    <SearchIcon />

                    <input
                        ref={searchInputRef}
                        type="search"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search products..."
                        aria-label="Search products"
                    />

                    <button type="submit">
                        Search
                    </button>
                </form>
            )}

            {mobileMenuOpen && (
                <nav
                    className="header-mobile-nav"
                    id="header-mobile-nav"
                    aria-label="Mobile navigation"
                >
                   {navigation.map((link) => (
    <NavLink
        key={link.path}
        to={link.path}
        end={link.path === "/"}
    >
        {link.label}
    </NavLink>
))}

<details className="mobile-catalog-group">
    <summary>Shop by Clothing</summary>

    {clothingCategories.map((category) => (
        <NavLink
            key={category.path}
            to={category.path}
        >
            {category.label}
        </NavLink>
    ))}
</details>

<details className="mobile-catalog-group">
    <summary>Shop by Style</summary>

    {styleCategories.map((category) => (
        <NavLink
            key={category.path}
            to={category.path}
        >
            {category.label}
        </NavLink>
    ))}
</details>

                    <div className="mobile-nav-divider" />

                    {user ? (
                        <>
                            <NavLink to="/profile">My Profile</NavLink>
                            <NavLink to="/orders">My Orders</NavLink>
                            <NavLink to="/coupons">My Coupons</NavLink>
                            <NavLink to="/settings">Settings</NavLink>
                            <NavLink to="/contact">Contact</NavLink>
                        </>
                    ) : (
                        <NavLink to="/login">Login</NavLink>
                    )}
                </nav>
            )}

            
        </header>
    );
}

export default Header;
