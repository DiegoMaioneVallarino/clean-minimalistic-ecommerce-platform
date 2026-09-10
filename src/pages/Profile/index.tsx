import {
    Navigate,
    NavLink
} from "react-router-dom";

import {
    useAuth
} from "../../store/AuthContext";

import "../../styles/profile.css";


function Profile() {

    const {
        user
    } = useAuth();


    if (!user) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    return (
        <section className="profile-page">

            <header className="profile-header">

                <p>
                    Account
                </p>

                <h1>
                    My Profile
                </h1>

            </header>


            <div className="profile-layout">


                <section className="profile-card">

                    <div className="profile-avatar-wrapper">

                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="profile-avatar"
                        />

                    </div>


                    <div className="profile-main-info">

                        <h2>
                            {user.name}
                        </h2>

                        <p>
                            {user.email}
                        </p>


                        <span className="profile-role">
                            {user.role}
                        </span>

                    </div>


                    <div className="profile-balance">

                        <span>
                            Balance
                        </span>

                        <strong>
                            ${user.balance}
                        </strong>

                    </div>

                </section>

<section className="profile-products">

    <div className="profile-products-header">

        <div>

            <span className="profile-section-label">
                Collection
            </span>

            <h2>
                Your Products
            </h2>

        </div>

    </div>


    <div className="profile-products-row">

        {[
            {
                id: 0,
                name: "Worldwide Tee",
                price: 699,
                image: "/src/img/items/0/front.webp",
            },

            {
                id: 2,
                name: "Racing Hoodie",
                price: 1299,
                image: "/src/img/items/2/front.webp",
            },

            {
                id: 3,
                name: "Graphic Black Tee",
                price: 699,
                image: "/src/img/items/3/front.png",
            },
        ].map(
            (product) => (

                <NavLink
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="profile-product-card"
                >

                    <div className="profile-product-image-wrapper">

                        <img
                            src={product.image}
                            alt={product.name}
                            className="profile-product-image"
                        />

                    </div>


                    <div className="profile-product-info">

                        <strong>
                            {product.name}
                        </strong>

                        <span>
                            ${product.price}
                        </span>

                    </div>

                </NavLink>

            )
        )}

    </div>

</section>
                <section className="profile-sections">


                    <NavLink
                        to="/orders"
                        className="profile-section-card"
                    >

                        <div>

                            <span className="profile-section-label">
                                Purchases
                            </span>

                            <h3>
                                My Orders
                            </h3>

                            <p>
                                View your order history
                                and delivery status.
                            </p>

                        </div>


                        <span className="profile-arrow">
                            →
                        </span>

                    </NavLink>


                    <NavLink
                        to="/orders"
                        className="profile-section-card"
                    >

                        <div>

                            <span className="profile-section-label">
                                Delivery
                            </span>

                            <h3>
                                Address
                            </h3>

                            <p>
                                Review and edit your
                                delivery address.
                            </p>

                        </div>


                        <span className="profile-arrow">
                            →
                        </span>

                    </NavLink>


                    <NavLink
                        to="/settings"
                        className="profile-section-card"
                    >

                        <div>

                            <span className="profile-section-label">
                                Account
                            </span>

                            <h3>
                                Settings
                            </h3>

                            <p>
                                Edit your profile and
                                notification preferences.
                            </p>

                        </div>


                        <span className="profile-arrow">
                            →
                        </span>

                    </NavLink>


                    {user.role === "admin" && (

                        <NavLink
                            to="/admin"
                            className="profile-section-card"
                        >

                            <div>

                                <span
                                    className="
                                        profile-section-label
                                    "
                                >
                                    Administration
                                </span>

                                <h3>
                                    Admin Mode
                                </h3>

                                <p>
                                    Manage products,
                                    orders and store data.
                                </p>

                            </div>


                            <span className="profile-arrow">
                                →
                            </span>

                        </NavLink>

                    )}

                </section>

            </div>

        </section>
    );
}


export default Profile;