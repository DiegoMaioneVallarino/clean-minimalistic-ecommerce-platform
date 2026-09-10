import {
    useMemo,
    useState
} from "react";

import "../../styles/orders.css";


type OrderItem = {
    name: string;
    quantity: number;
    price: number;
};


type Order = {
    id: string;
    date: string;
    status:
        | "Paid"
        | "Pending"
        | "Shipped"
        | "Delivered";

    total: number;

    items: OrderItem[];
};


type Address = {
    name: string;
    street: string;
    neighborhood: string;
    city: string;
    postalCode: string;
    country: string;
};


const mockOrders: Order[] = [
    {
        id: "#1004",
        date: "2026-09-08",
        status: "Delivered",
        total: 1299,

        items: [
            {
                name: "Racing Hoodie",
                quantity: 1,
                price: 1299,
            },
        ],
    },

    {
        id: "#1003",
        date: "2026-08-29",
        status: "Shipped",
        total: 1118,

        items: [
            {
                name: "Worldwide Tee",
                quantity: 2,
                price: 559,
            },
        ],
    },

    {
        id: "#1002",
        date: "2026-08-18",
        status: "Paid",
        total: 699,

        items: [
            {
                name: "Graphic Black Tee",
                quantity: 1,
                price: 699,
            },
        ],
    },
];


function Orders() {

    const [search, setSearch] =
        useState("");


    const [helpOpen, setHelpOpen] =
        useState(false);


    const [editingAddress, setEditingAddress] =
        useState(false);


    const [address, setAddress] =
        useState<Address>({
            name: "Test User",
            street: "Av. Reforma 123",
            neighborhood: "Cuauhtémoc",
            city: "Ciudad de México",
            postalCode: "06600",
            country: "Mexico",
        });


    const [addressDraft, setAddressDraft] =
        useState<Address>(address);


    const filteredOrders =
        useMemo(() => {

            const query =
                search
                    .trim()
                    .toLowerCase();


            if (!query) {
                return mockOrders;
            }


            return mockOrders.filter(
                (order) => {

                    const searchableText = `
                        ${order.id}
                        ${order.date}
                        ${order.status}
                        ${order.total}
                        ${order.items
                            .map(
                                (item) =>
                                    item.name
                            )
                            .join(" ")
                        }
                    `
                        .toLowerCase();


                    return searchableText.includes(
                        query
                    );

                }
            );

        }, [search]);


    function startEditingAddress() {

        setAddressDraft(address);

        setEditingAddress(true);

    }


    function cancelEditingAddress() {

        setAddressDraft(address);

        setEditingAddress(false);

    }


    function saveAddress() {

        setAddress(addressDraft);

        setEditingAddress(false);

    }


    return (
        <section className="orders-page">


            <div className="orders-topbar">

                <div className="orders-title">

                    <p>
                        Account
                    </p>

                    <h1>
                        My Orders
                    </h1>

                </div>


                <div className="orders-search">

                    <input
                        type="text"

                        placeholder="
                            Search order or product
                        "

                        value={search}

                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                    />

                </div>

            </div>


            <div className="orders-layout">


                <div className="orders-main">


                    <div className="orders-section-header">

                        <span>
                            Orders
                        </span>


                        <div className="orders-help">

                            <button
                                type="button"

                                className="
                                    orders-help-button
                                "

                                onClick={() =>
                                    setHelpOpen(
                                        (current) =>
                                            !current
                                    )
                                }
                            >
                                Help
                            </button>


                            {helpOpen && (

                                <div className="help-menu">

                                    <button
                                        type="button"
                                    >
                                        Order problem
                                    </button>

                                    <button
                                        type="button"
                                    >
                                        Return item
                                    </button>

                                    <button
                                        type="button"
                                    >
                                        Shipping issue
                                    </button>

                                    <button
                                        type="button"
                                    >
                                        Contact support
                                    </button>

                                </div>

                            )}

                        </div>

                    </div>


                    {filteredOrders.length === 0 ? (

                        <div className="orders-empty">

                            <p>
                                No orders found.
                            </p>

                        </div>

                    ) : (

                        <div className="orders-list">

                            {filteredOrders.map(
                                (order) => (

                                    <article
                                        key={order.id}

                                        className="
                                            order-card
                                        "
                                    >

                                        <div
                                            className="
                                                order-card-header
                                            "
                                        >

                                            <div>

                                                <span
                                                    className="
                                                        order-label
                                                    "
                                                >
                                                    Order
                                                </span>

                                                <strong>
                                                    {order.id}
                                                </strong>

                                            </div>


                                            <div>

                                                <span
                                                    className="
                                                        order-label
                                                    "
                                                >
                                                    Date
                                                </span>

                                                <strong>
                                                    {order.date}
                                                </strong>

                                            </div>


                                            <div>

                                                <span
                                                    className="
                                                        order-label
                                                    "
                                                >
                                                    Status
                                                </span>

                                                <strong>
                                                    {order.status}
                                                </strong>

                                            </div>


                                            <div>

                                                <span
                                                    className="
                                                        order-label
                                                    "
                                                >
                                                    Total
                                                </span>

                                                <strong>
                                                    ${order.total}
                                                </strong>

                                            </div>

                                        </div>


                                        <div className="order-items">

                                            {order.items.map(
                                                (
                                                    item,
                                                    index
                                                ) => (

                                                    <div
                                                        key={
                                                            `${order.id}-${index}`
                                                        }

                                                        className="
                                                            order-item
                                                        "
                                                    >

                                                        <span>
                                                            {
                                                                item.name
                                                            }
                                                        </span>

                                                        <span>
                                                            Qty {
                                                                item.quantity
                                                            }
                                                        </span>

                                                        <span>
                                                            ${
                                                                item.price
                                                            }
                                                        </span>

                                                    </div>

                                                )
                                            )}

                                        </div>

                                    </article>

                                )
                            )}

                        </div>

                    )}

                </div>


                <aside className="orders-sidebar">


                    <section className="address-card">

                        <div className="address-card-header">

                            <p>
                                Delivery
                            </p>

                            <h2>
                                Address
                            </h2>

                        </div>


                        {editingAddress ? (

                            <div className="address-form">

                                <label>
                                    Name

                                    <input
                                        type="text"

                                        value={
                                            addressDraft.name
                                        }

                                        onChange={(event) =>
                                            setAddressDraft({
                                                ...addressDraft,

                                                name:
                                                    event
                                                        .target
                                                        .value,
                                            })
                                        }
                                    />
                                </label>


                                <label>
                                    Street

                                    <input
                                        type="text"

                                        value={
                                            addressDraft.street
                                        }

                                        onChange={(event) =>
                                            setAddressDraft({
                                                ...addressDraft,

                                                street:
                                                    event
                                                        .target
                                                        .value,
                                            })
                                        }
                                    />
                                </label>


                                <label>
                                    Neighborhood

                                    <input
                                        type="text"

                                        value={
                                            addressDraft
                                                .neighborhood
                                        }

                                        onChange={(event) =>
                                            setAddressDraft({
                                                ...addressDraft,

                                                neighborhood:
                                                    event
                                                        .target
                                                        .value,
                                            })
                                        }
                                    />
                                </label>


                                <label>
                                    City

                                    <input
                                        type="text"

                                        value={
                                            addressDraft.city
                                        }

                                        onChange={(event) =>
                                            setAddressDraft({
                                                ...addressDraft,

                                                city:
                                                    event
                                                        .target
                                                        .value,
                                            })
                                        }
                                    />
                                </label>


                                <label>
                                    Postal code

                                    <input
                                        type="text"

                                        value={
                                            addressDraft
                                                .postalCode
                                        }

                                        onChange={(event) =>
                                            setAddressDraft({
                                                ...addressDraft,

                                                postalCode:
                                                    event
                                                        .target
                                                        .value,
                                            })
                                        }
                                    />
                                </label>


                                <label>
                                    Country

                                    <input
                                        type="text"

                                        value={
                                            addressDraft.country
                                        }

                                        onChange={(event) =>
                                            setAddressDraft({
                                                ...addressDraft,

                                                country:
                                                    event
                                                        .target
                                                        .value,
                                            })
                                        }
                                    />
                                </label>


                                <div className="address-actions">

                                    <button
                                        type="button"

                                        className="
                                            address-cancel-button
                                        "

                                        onClick={
                                            cancelEditingAddress
                                        }
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        type="button"

                                        className="
                                            address-save-button
                                        "

                                        onClick={
                                            saveAddress
                                        }
                                    >
                                        Save address
                                    </button>

                                </div>

                            </div>

                        ) : (

                            <>

                                <div className="address-data">

                                    <strong>
                                        {address.name}
                                    </strong>

                                    <p>
                                        {address.street}
                                    </p>

                                    <p>
                                        {
                                            address
                                                .neighborhood
                                        }
                                    </p>

                                    <p>
                                        {address.city}
                                    </p>

                                    <p>
                                        {
                                            address
                                                .postalCode
                                        }
                                    </p>

                                    <p>
                                        {address.country}
                                    </p>

                                </div>


                                <button
                                    type="button"

                                    className="
                                        edit-address-button
                                    "

                                    onClick={
                                        startEditingAddress
                                    }
                                >
                                    Edit address
                                </button>

                            </>

                        )}

                    </section>

                </aside>

            </div>

        </section>
    );
}


export default Orders;