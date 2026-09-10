import {
    useMemo,
    useState
} from "react";

import "../../styles/admin-customers.css";


type CustomerStatus =
    | "Active"
    | "Inactive";


type Customer = {
    id: number;
    name: string;
    email: string;
    orders: number;
    totalSpent: number;
    joinedAt: string;
    status: CustomerStatus;
};


const mockCustomers: Customer[] = [
    {
        id: 1,
        name: "Alice Morgan",
        email: "alice@example.com",
        orders: 8,
        totalSpent: 6840,
        joinedAt: "2026-07-12",
        status: "Active",
    },

    {
        id: 2,
        name: "John Carter",
        email: "john@example.com",
        orders: 3,
        totalSpent: 2197,
        joinedAt: "2026-08-02",
        status: "Active",
    },

    {
        id: 3,
        name: "Maria Lopez",
        email: "maria@example.com",
        orders: 12,
        totalSpent: 11420,
        joinedAt: "2026-05-18",
        status: "Active",
    },

    {
        id: 4,
        name: "Daniel Brooks",
        email: "daniel@example.com",
        orders: 1,
        totalSpent: 699,
        joinedAt: "2026-04-05",
        status: "Inactive",
    },

    {
        id: 5,
        name: "Sofia Ramirez",
        email: "sofia@example.com",
        orders: 5,
        totalSpent: 4395,
        joinedAt: "2026-08-21",
        status: "Active",
    },
];


function AdminCustomers() {

    const [search, setSearch] =
        useState("");


    const filteredCustomers =
        useMemo(() => {

            const query =
                search
                    .trim()
                    .toLowerCase();


            if (!query) {
                return mockCustomers;
            }


            return mockCustomers.filter(
                (customer) => {

                    const searchable = `
                        ${customer.name}
                        ${customer.email}
                        ${customer.status}
                    `
                        .toLowerCase();


                    return searchable.includes(
                        query
                    );

                }
            );

        }, [search]);


    return (
        <section className="admin-customers">

            <div className="admin-customers-header">

                <div>

                    <p>
                        Store users
                    </p>

                    <h1>
                        Customers
                    </h1>

                </div>


                <div className="admin-customers-search">

                    <input
                        type="text"
                        placeholder="Search customers"

                        value={search}

                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                    />

                </div>

            </div>


            <div className="admin-customer-metrics">

                <article>

                    <span>
                        Customers
                    </span>

                    <strong>
                        {mockCustomers.length}
                    </strong>

                </article>


                <article>

                    <span>
                        Active
                    </span>

                    <strong>
                        {
                            mockCustomers.filter(
                                (customer) =>
                                    customer.status ===
                                    "Active"
                            ).length
                        }
                    </strong>

                </article>


                <article>

                    <span>
                        Total orders
                    </span>

                    <strong>
                        {
                            mockCustomers.reduce(
                                (
                                    total,
                                    customer
                                ) =>
                                    total +
                                    customer.orders,
                                0
                            )
                        }
                    </strong>

                </article>

            </div>


            <div className="admin-customers-table">

                <div className="admin-customers-table-header">

                    <span>
                        Customer
                    </span>

                    <span>
                        Orders
                    </span>

                    <span>
                        Spent
                    </span>

                    <span>
                        Joined
                    </span>

                    <span>
                        Status
                    </span>

                </div>


                {filteredCustomers.map(
                    (customer) => (

                        <article
                            key={customer.id}
                            className="admin-customer-row"
                        >

                            <div className="admin-customer-identity">

                                <div className="admin-customer-avatar">

                                    {
                                        customer.name
                                            .charAt(0)
                                            .toUpperCase()
                                    }

                                </div>


                                <div>

                                    <strong>
                                        {
                                            customer.name
                                        }
                                    </strong>

                                    <span>
                                        {
                                            customer.email
                                        }
                                    </span>

                                </div>

                            </div>


                            <span>
                                {
                                    customer.orders
                                }
                            </span>


                            <span>
                                $
                                {
                                    customer.totalSpent
                                        .toLocaleString()
                                }
                            </span>


                            <span>
                                {
                                    customer.joinedAt
                                }
                            </span>


                            <span
                                className={`
                                    admin-customer-status
                                    ${
                                        customer.status ===
                                        "Active"
                                            ? "active"
                                            : "inactive"
                                    }
                                `}
                            >
                                {
                                    customer.status
                                }
                            </span>

                        </article>

                    )
                )}

            </div>

        </section>
    );
}


export default AdminCustomers;