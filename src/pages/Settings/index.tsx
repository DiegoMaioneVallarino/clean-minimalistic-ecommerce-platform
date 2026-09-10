import {
    useState
} from "react";

import {
    Navigate
} from "react-router-dom";

import {
    useAuth
} from "../../store/AuthContext";

import "../../styles/settings.css";


function Settings() {

    const {
        user,
        updateProfile,
        updateSettings
    } = useAuth();


    const [saved, setSaved] =
        useState(false);


    const [name, setName] =
        useState(
            user?.name ?? ""
        );


    const [email, setEmail] =
        useState(
            user?.email ?? ""
        );


    const [
        orderUpdates,
        setOrderUpdates
    ] = useState(
        user?.settings.orderUpdates ??
        true
    );


    const [
        promotions,
        setPromotions
    ] = useState(
        user?.settings.promotions ??
        false
    );


    if (!user) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    function handleSubmit(
        event:
            React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();


        updateProfile({
            name:
                name.trim(),

            email:
                email.trim(),
        });


        updateSettings({
            orderUpdates,
            promotions,
        });


        setSaved(true);


        window.setTimeout(
            () => {
                setSaved(false);
            },
            2000
        );
    }


    return (
        <section className="settings-page">

            <header className="settings-header">

                <p>
                    Account
                </p>

                <h1>
                    Settings
                </h1>

            </header>


            <form
                className="settings-form"

                onSubmit={
                    handleSubmit
                }
            >

                <section className="settings-section">

                    <div
                        className="
                            settings-section-title
                        "
                    >

                        <h2>
                            Profile
                        </h2>

                        <p>
                            Manage your personal
                            information.
                        </p>

                    </div>


                    <div
                        className="
                            settings-fields
                        "
                    >

                        <label>

                            Name

                            <input
                                type="text"

                                value={name}

                                onChange={
                                    (event) =>
                                        setName(
                                            event
                                                .target
                                                .value
                                        )
                                }

                                required
                            />

                        </label>


                        <label>

                            Email

                            <input
                                type="email"

                                value={email}

                                onChange={
                                    (event) =>
                                        setEmail(
                                            event
                                                .target
                                                .value
                                        )
                                }

                                required
                            />

                        </label>

                    </div>

                </section>


                <section className="settings-section">

                    <div
                        className="
                            settings-section-title
                        "
                    >

                        <h2>
                            Notifications
                        </h2>

                        <p>
                            Choose what you want
                            to receive.
                        </p>

                    </div>


                    <div
                        className="
                            settings-options
                        "
                    >

                        <label
                            className="
                                settings-option
                            "
                        >

                            <div>

                                <strong>
                                    Order updates
                                </strong>

                                <span>
                                    Shipping,
                                    delivery and
                                    order status.
                                </span>

                            </div>


                            <input
                                type="checkbox"

                                checked={
                                    orderUpdates
                                }

                                onChange={
                                    (event) =>
                                        setOrderUpdates(
                                            event
                                                .target
                                                .checked
                                        )
                                }
                            />

                        </label>


                        <label
                            className="
                                settings-option
                            "
                        >

                            <div>

                                <strong>
                                    Promotions
                                </strong>

                                <span>
                                    Sales, offers
                                    and new
                                    collections.
                                </span>

                            </div>


                            <input
                                type="checkbox"

                                checked={
                                    promotions
                                }

                                onChange={
                                    (event) =>
                                        setPromotions(
                                            event
                                                .target
                                                .checked
                                        )
                                }
                            />

                        </label>

                    </div>

                </section>


                <div className="settings-actions">

                    {saved && (

                        <span
                            className="
                                settings-saved
                            "
                        >
                            Changes saved
                        </span>

                    )}


                    <button
                        type="submit"
                    >
                        Save changes
                    </button>

                </div>

            </form>

        </section>
    );
}


export default Settings;