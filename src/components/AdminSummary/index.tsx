import "../../styles/admin-summary.css";

import product0Front
    from "../../img/items/0/front.webp";

import product2Front
    from "../../img/items/2/front.webp";

import product3Front
    from "../../img/items/3/front.png";


type DayPurchaseData = {
    day: string;
    purchases: number;
};


type TodaySale = {
    id: number;
    name: string;
    image: string;
    quantity: number;
    total: number;
};


type AdminMessage = {
    id: number;
    customer: string;
    message: string;
    time: string;
};


type AdminNotification = {
    id: number;
    title: string;
    description: string;
    time: string;
};


function AdminSummary() {

    /*
        TEMPORALMENTE MOCK.

        Después estas variables vendrán
        de Orders / Customers.
    */

    const todayRevenue = 8430;

    const weekRevenue = 42100;

    const monthRevenue = 186200;

    const newCustomers = 24;


    const todaySalesCount = 8;

    const weekSalesCount = 31;

    const monthSalesCount = 118;


    const purchasesLast7Days:
        DayPurchaseData[] = [

            {
                day: "Thu",
                purchases: 3,
            },

            {
                day: "Fri",
                purchases: 7,
            },

            {
                day: "Sat",
                purchases: 5,
            },

            {
                day: "Sun",
                purchases: 9,
            },

            {
                day: "Mon",
                purchases: 4,
            },

            {
                day: "Tue",
                purchases: 11,
            },

            {
                day: "Wed",
                purchases: 8,
            },

        ];


    const todaySales:
        TodaySale[] = [

            {
                id: 0,

                name:
                    "Worldwide Tee",

                image:
                    product0Front,

                quantity: 2,

                total: 1118,
            },

            {
                id: 2,

                name:
                    "Racing Hoodie",

                image:
                    product2Front,

                quantity: 1,

                total: 1299,
            },

            {
                id: 3,

                name:
                    "Graphic Black Tee",

                image:
                    product3Front,

                quantity: 3,

                total: 1572,
            },

        ];


    const messages:
        AdminMessage[] = [

            {
                id: 1,

                customer:
                    "Alice Morgan",

                message:
                    "Where is my order?",

                time:
                    "12 min",
            },

            {
                id: 2,

                customer:
                    "John Carter",

                message:
                    "Can I change the size?",

                time:
                    "31 min",
            },

            {
                id: 3,

                customer:
                    "Maria Lopez",

                message:
                    "I need help with a return.",

                time:
                    "1 h",
            },

        ];


    const notifications:
        AdminNotification[] = [

            {
                id: 1,

                title:
                    "New order",

                description:
                    "Order #1008 was created.",

                time:
                    "5 min",
            },

            {
                id: 2,

                title:
                    "Low stock",

                description:
                    "Racing Hoodie has 2 units left.",

                time:
                    "18 min",
            },

            {
                id: 3,

                title:
                    "New customer",

                description:
                    "A new customer registered.",

                time:
                    "42 min",
            },

            {
                id: 4,

                title:
                    "Order delivered",

                description:
                    "Order #1004 was delivered.",

                time:
                    "2 h",
            },

        ];


    const maxPurchases =
        Math.max(
            ...purchasesLast7Days.map(
                (day) =>
                    day.purchases
            )
        );


    return (
        <section className="admin-summary">

            <div className="admin-summary-heading">

                <div>

                    <p>
                        Store overview
                    </p>

                    <h1>
                        Summary
                    </h1>

                </div>

            </div>


            {/* MONEY + CUSTOMERS */}

            <div className="summary-metrics">

                <article className="summary-metric">

                    <span>
                        Revenue today
                    </span>

                    <strong>
                        $
                        {
                            todayRevenue
                                .toLocaleString()
                        }
                    </strong>

                </article>


                <article className="summary-metric">

                    <span>
                        Revenue this week
                    </span>

                    <strong>
                        $
                        {
                            weekRevenue
                                .toLocaleString()
                        }
                    </strong>

                </article>


                <article className="summary-metric">

                    <span>
                        Revenue this month
                    </span>

                    <strong>
                        $
                        {
                            monthRevenue
                                .toLocaleString()
                        }
                    </strong>

                </article>


                <article className="summary-metric">

                    <span>
                        New customers
                    </span>

                    <strong>
                        {newCustomers}
                    </strong>

                </article>

            </div>


            {/* GRAPH */}

            <section className="summary-panel">

                <div className="summary-panel-header">

                    <div>

                        <span>
                            Purchases
                        </span>

                        <h2>
                            Last 7 days
                        </h2>

                    </div>

                </div>


                <div className="summary-chart">

                    {purchasesLast7Days.map(
                        (day) => {

                            const height =
                                (
                                    day.purchases /
                                    maxPurchases
                                ) * 100;


                            return (

                                <div
                                    key={day.day}
                                    className="
                                        summary-chart-column
                                    "
                                >

                                    <div
                                        className="
                                            summary-chart-value
                                        "
                                    >
                                        {
                                            day.purchases
                                        }
                                    </div>


                                    <div
                                        className="
                                            summary-chart-track
                                        "
                                    >

                                        <div
                                            className="
                                                summary-chart-bar
                                            "
                                            style={{
                                                height:
                                                    `${height}%`
                                            }}
                                        />

                                    </div>


                                    <span>
                                        {day.day}
                                    </span>

                                </div>

                            );

                        }
                    )}

                </div>

            </section>


            {/* MIDDLE */}

            <div className="summary-main-grid">


                <div className="summary-left-column">


                    {/* SALES COUNTERS */}

                    <section className="summary-panel">

                        <div className="summary-panel-header">

                            <div>

                                <span>
                                    Activity
                                </span>

                                <h2>
                                    Sales
                                </h2>

                            </div>

                        </div>


                        <div className="summary-sales-counts">

                            <div>

                                <span>
                                    Today
                                </span>

                                <strong>
                                    {
                                        todaySalesCount
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Week
                                </span>

                                <strong>
                                    {
                                        weekSalesCount
                                    }
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Month
                                </span>

                                <strong>
                                    {
                                        monthSalesCount
                                    }
                                </strong>

                            </div>

                        </div>

                    </section>


                    {/* TODAY SOLD PRODUCTS */}

                    <section className="summary-panel">

                        <div className="summary-panel-header">

                            <div>

                                <span>
                                    Products
                                </span>

                                <h2>
                                    Sold today
                                </h2>

                            </div>

                        </div>


                        <div className="summary-sold-products">

                            {todaySales.map(
                                (sale) => (

                                    <article
                                        key={sale.id}
                                        className="
                                            summary-sold-item
                                        "
                                    >

                                        <div
                                            className="
                                                summary-sold-image
                                            "
                                        >

                                            <img
                                                src={
                                                    sale.image
                                                }
                                                alt={
                                                    sale.name
                                                }
                                            />

                                        </div>


                                        <div
                                            className="
                                                summary-sold-info
                                            "
                                        >

                                            <strong>
                                                {
                                                    sale.name
                                                }
                                            </strong>

                                            <span>
                                                Qty {
                                                    sale.quantity
                                                }
                                            </span>

                                        </div>


                                        <strong
                                            className="
                                                summary-sold-total
                                            "
                                        >
                                            $
                                            {
                                                sale.total
                                                    .toLocaleString()
                                            }
                                        </strong>

                                    </article>

                                )
                            )}

                        </div>

                    </section>


                    {/* MESSAGES */}

                    <section className="summary-panel">

                        <div className="summary-panel-header">

                            <div>

                                <span>
                                    Inbox
                                </span>

                                <h2>
                                    New messages
                                </h2>

                            </div>


                            <strong>
                                {messages.length}
                            </strong>

                        </div>


                        <div className="summary-messages">

                            {messages.map(
                                (message) => (

                                    <article
                                        key={message.id}
                                        className="
                                            summary-message
                                        "
                                    >

                                        <div>

                                            <strong>
                                                {
                                                    message.customer
                                                }
                                            </strong>

                                            <p>
                                                {
                                                    message.message
                                                }
                                            </p>

                                        </div>


                                        <span>
                                            {
                                                message.time
                                            }
                                        </span>

                                    </article>

                                )
                            )}

                        </div>

                    </section>

                </div>


                {/* NOTIFICATIONS */}

                <aside className="summary-notifications">

                    <div className="summary-panel-header">

                        <div>

                            <span>
                                Store
                            </span>

                            <h2>
                                Notifications
                            </h2>

                        </div>

                    </div>


                    <div className="notification-list">

                        {notifications.map(
                            (
                                notification
                            ) => (

                                <article
                                    key={
                                        notification.id
                                    }
                                    className="
                                        notification-item
                                    "
                                >

                                    <div
                                        className="
                                            notification-dot
                                        "
                                    />


                                    <div>

                                        <strong>
                                            {
                                                notification.title
                                            }
                                        </strong>

                                        <p>
                                            {
                                                notification
                                                    .description
                                            }
                                        </p>

                                        <span>
                                            {
                                                notification.time
                                            }
                                        </span>

                                    </div>

                                </article>

                            )
                        )}

                    </div>

                </aside>

            </div>

        </section>
    );
}


export default AdminSummary;