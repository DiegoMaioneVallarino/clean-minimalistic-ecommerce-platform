import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/men"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Men
        </NavLink>

        <NavLink
          to="/women"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Women
        </NavLink>

        <NavLink
          to="/sales"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Sales
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Cart
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Login
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;