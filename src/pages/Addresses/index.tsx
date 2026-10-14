
import { Navigate, NavLink } from "react-router-dom";

import { useAuth } from "../../store/AuthContext";
import AddressBook from "../../components/AddressBook";

import "./Addresses.css";

function Addresses() {
    const { user } = useAuth();

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return (
        <main className="addresses-page">

            <header className="addresses-page-header">

                <NavLink
                    to="/profile"
                    className="addresses-back"
                >
                    ← BACK TO PROFILE
                </NavLink>

                <span className="addresses-eyebrow">
                    ACCOUNT / DELIVERY
                </span>

                <h1>My Addresses</h1>

                <p>
                    Save and manage your shipping
                    addresses for a faster checkout.
                </p>

            </header>

            <AddressBook />

        </main>
    );
}

export default Addresses;
