import {
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import {
    useProducts,
} from "../../store/ProductContext";

import "../../styles/admin-product-edit.css";


const placeholderImage =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(`
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="600"
            height="800"
        >
            <rect
                width="100%"
                height="100%"
                fill="#f1f1f1"
            />

            <text
                x="50%"
                y="50%"
                text-anchor="middle"
                dominant-baseline="middle"
                font-family="Arial"
                font-size="30"
                fill="#999"
            >
                PRODUCT
            </text>
        </svg>
    `);


function AdminProductCreate() {

    const [name, setName] =
        useState("");

    const [price, setPrice] =
        useState("");

    const [category, setCategory] =
        useState("men");

    const [subcategory, setSubcategory] =
        useState("tees");

    const [description, setDescription] =
        useState("");

        const [stock, setStock] =
    useState("0");


    const {
        addProduct,
    } = useProducts();


    const navigate =
        useNavigate();


    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();


        addProduct({
            name,

            price:
                Number(price),
                
            stock: Number(stock),
            category,

            subcategory,

            description,

            images: {
                front:
                    placeholderImage,
            },

            sizes: [
                "S",
                "M",
                "L",
                "XL",
            ],

            colors: [],

            soldCount: 0,
        });


        navigate("/admin");
    }


    return (
        <section className="admin-product-edit">

            <header className="admin-edit-header">

                <p>
                    Admin / Products
                </p>

                <h1>
                    Add product
                </h1>

            </header>


            <div className="admin-edit-layout">

                <div className="admin-edit-preview">

                    <img
                        src={placeholderImage}
                        alt="Product placeholder"
                    />

                </div>


                <form
                    className="admin-edit-form"
                    onSubmit={handleSubmit}
                >

                    <label>
                        Product name

                        <input
                            value={name}

                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }

                            required
                        />
                    </label>


                    <label>
                        Price

                        <input
                            type="number"

                            value={price}

                            onChange={(event) =>
                                setPrice(
                                    event.target.value
                                )
                            }

                            required
                        />
                    </label>


                    <div className="admin-edit-row">

                        <label>
                            Category

                            <select
                                value={category}

                                onChange={(event) =>
                                    setCategory(
                                        event.target.value
                                    )
                                }
                            >
                                <option value="men">
                                    Men
                                </option>

                                <option value="women">
                                    Women
                                </option>
                            </select>
                        </label>


                        <label>
                            Subcategory

                            <input
                                value={subcategory}

                                onChange={(event) =>
                                    setSubcategory(
                                        event.target.value
                                    )
                                }
                            />
                        </label>

                    </div>


                    <label>
                        Description

                        <textarea
                            value={description}

                            onChange={(event) =>
                                setDescription(
                                    event.target.value
                                )
                            }
                        />
                    </label>


                    <div className="admin-edit-actions">

                        <button
                            type="submit"
                            className="admin-save-button"
                        >
                            Create product
                        </button>

                    </div>

                </form>

            </div>

        </section>
    );
}


export default AdminProductCreate;