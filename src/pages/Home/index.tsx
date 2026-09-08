import "../../styles/admin.css";

function Admin() {
    return (
        <section className="admin-page">

            <aside className="admin-sidebar">

                <div>
                    <p className="admin-label">
                        Admin Mode
                    </p>

                    <h1>
                        Dashboard
                    </h1>
                </div>

                <nav className="admin-nav">

                    <button className="active">
                        Overview
                    </button>

                    <button>
                        Products
                    </button>

                    <button>
                        Orders
                    </button>

                    <button>
                        Users
                    </button>

                    <button>
                        Coupons
                    </button>

                    <button>
                        Settings
                    </button>

                </nav>

            </aside>


            <div className="admin-content">

                <header className="admin-content-header">

                    <div>
                        <p>
                            Store administration
                        </p>

                        <h2>
                            Overview
                        </h2>
                    </div>

                    <button className="admin-primary-button">
                        Add product
                    </button>

                </header>


                <div className="admin-stats">

                    <article className="admin-stat-card">
                        <span>
                            Products
                        </span>

                        <strong>
                            6
                        </strong>
                    </article>


                    <article className="admin-stat-card">
                        <span>
                            Orders
                        </span>

                        <strong>
                            24
                        </strong>
                    </article>


                    <article className="admin-stat-card">
                        <span>
                            Users
                        </span>

                        <strong>
                            18
                        </strong>
                    </article>


                    <article className="admin-stat-card">
                        <span>
                            Revenue
                        </span>

                        <strong>
                            $14,820
                        </strong>
                    </article>

                </div>


                <section className="admin-panel">

                    <div className="admin-panel-header">

                        <div>
                            <p>
                                Latest activity
                            </p>

                            <h3>
                                Recent orders
                            </h3>
                        </div>

                        <button>
                            View all
                        </button>

                    </div>


                    <div className="admin-table">

                        <div className="admin-table-row admin-table-head">
                            <span>Order</span>
                            <span>Customer</span>
                            <span>Status</span>
                            <span>Total</span>
                        </div>


                        <div className="admin-table-row">
                            <span>#1004</span>
                            <span>Alex Morgan</span>
                            <span>Paid</span>
                            <span>$1,299</span>
                        </div>


                        <div className="admin-table-row">
                            <span>#1003</span>
                            <span>Sam Rivera</span>
                            <span>Pending</span>
                            <span>$699</span>
                        </div>


                        <div className="admin-table-row">
                            <span>#1002</span>
                            <span>Jordan Lee</span>
                            <span>Shipped</span>
                            <span>$2,198</span>
                        </div>

                    </div>

                </section>

            </div>

        </section>
    );
}

export default Admin;