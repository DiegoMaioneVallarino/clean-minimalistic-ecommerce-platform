import {
    useState,
} from "react";

import {
    products,
} from "../../services/products";

import "../../styles/admin.css";

import { NavLink } from "react-router-dom";

import {
    useProducts,
} from "../../store/ProductContext";

import AdminSummary
    from "../../components/AdminSummary";

type AdminSection =
    | "summary"
    | "products"
    | "orders"
    | "customers"
    | "messages"
    | "blog"
    | "discounts";


const mockOrders = [
    {
        id: "#1004",
        customer: "Alex Morgan",
        status: "Paid",
        total: 1299,
    },

    {
        id: "#1003",
        customer: "Sam Rivera",
        status: "Pending",
        total: 699,
    },

    {
        id: "#1002",
        customer: "Jordan Lee",
        status: "Shipped",
        total: 2198,
    },
];


function Admin() {

    const [section, setSection] =
    useState<AdminSection>(
        "summary"
    );

    return (
        <section className="admin-page">

            <aside className="admin-sidebar">

                <div>
                    <p className="admin-label">
                        Admin Mode
                    </p>

                    <h1>
                        Store
                    </h1>
                </div>


                <nav className="admin-nav">

                    <button
                        className={
                            section === "summary"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setSection("summary")
                        }
                    >
                        Summary
                    </button>


                    <button
                        className={
                            section === "products"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setSection("products")
                        }
                    >
                        Products
                    </button>


                    <button
                        className={
                            section === "orders"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setSection("orders")
                        }
                    >
                        Orders
                    </button>


                    <button
                        className={
                            section === "customers"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setSection("customers")
                        }
                    >
                        Customers
                    </button>


                    <button
                        className={
                            section === "messages"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setSection("messages")
                        }
                    >
                        Messages
                    </button>


                    <button
                        className={
                            section === "blog"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setSection("blog")
                        }
                    >
                        Blog
                    </button>


                    <button
                        className={
                            section === "discounts"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setSection("discounts")
                        }
                    >
                        Discounts
                    </button>

                </nav>

            </aside>


            <div className="admin-content">

                {section === "summary" && (
                    <AdminSummary />
                )}
                {section === "products" && (

                    <ProductsAdmin />

                )}


                {section === "orders" && (

                    <OrdersAdmin />

                )}

                {section === "customers" && (
                    <div className="admin-placeholder">
                        Customers
                    </div>
                )}


                {section === "messages" && (
                    <div className="admin-placeholder">
                        Messages
                    </div>
                )}


                {section === "blog" && (
                    <div className="admin-placeholder">
                        Blog
                    </div>
                )}


                {section === "discounts" && (
                    <div className="admin-placeholder">
                        Discounts
                    </div>
                )}

            </div>

        </section>
    );
}


function ProductsAdmin() {
        const {
            products,
            deleteProduct,
        } = useProducts();
    return (
        <>

            <header className="admin-content-header">

                <div>
                    <p>
                        Store administration
                    </p>

                    <h2>
                        Products
                    </h2>
                </div>


                <NavLink
                    to="/admin/products/new"
                    className="admin-primary-button"
                >
                    Add product
                </NavLink>

            </header>


            <section className="admin-panel">

                <div className="admin-table">

                    <div
                        className="
                            admin-product-row
                            admin-table-head
                        "
                    >
                        <span>Product</span>
                        <span>Category</span>
                        <span>Price</span>
                        <span>Sold</span>
                        <span>Actions</span>
                    </div>


                    {products.map(
                        (product) => (

                            <div
                                key={product.id}
                                className="admin-product-row"
                            >

                                <div className="admin-product">

                                    <img
                                        src={
                                            product.images.front
                                        }
                                        alt={
                                            product.name
                                        }
                                    />

                                    <span>
                                        {product.name}
                                    </span>

                                </div>


                                <span>
                                    {product.category}
                                </span>


                                <span>
                                    ${product.price}
                                </span>


                                <span>
                                    {product.soldCount ?? 0}
                                </span>


                                <div className="admin-actions">

                                  <NavLink
                                    to={`/admin/products/${product.id}/edit`}
                                >
                                    Edit
                                </NavLink>

                                    <button
                                        onClick={() =>
                                            deleteProduct(product.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        )
                    )}

                </div>

            </section>

        </>
    );
}


function OrdersAdmin() {

    return (
        <>

            <header className="admin-content-header">

                <div>
                    <p>
                        Store administration
                    </p>

                    <h2>
                        Orders
                    </h2>
                </div>

            </header>


            <section className="admin-panel">

                <div className="admin-table">

                    <div
                        className="
                            admin-order-row
                            admin-table-head
                        "
                    >
                        <span>Order</span>
                        <span>Customer</span>
                        <span>Status</span>
                        <span>Total</span>
                    </div>


                    {mockOrders.map(
                        (order) => (

                            <div
                                key={order.id}
                                className="admin-order-row"
                            >

                                <span>
                                    {order.id}
                                </span>

                                <span>
                                    {order.customer}
                                </span>

                                <span>
                                    {order.status}
                                </span>

                                <span>
                                    ${order.total}
                                </span>

                            </div>

                        )
                    )}

                </div>

            </section>

        </>
    );
}


export default Admin;