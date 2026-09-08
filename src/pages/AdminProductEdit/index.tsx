import {
    useState,
} from "react";


import {
    Navigate,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    useProducts,
} from "../../store/ProductContext";

import "../../styles/admin-product-edit.css";


function AdminProductEdit() {

    const { id } = useParams();


    const {products, updateProduct} =
     useProducts();


    const product = products.find(
        (product) =>
            product.id === Number(id)
    );


    const [name, setName] =
        useState(
            product?.name ?? ""
        );

    const [price, setPrice] =
        useState(
            product?.price.toString() ?? ""
        );

    const [category, setCategory] =
        useState(
            product?.category ?? ""
        );

    const [subcategory, setSubcategory] =
        useState(
            product?.subcategory ?? ""
        );

    const [description, setDescription] =
        useState(
            product?.description ?? ""
        );

        const [discount, setDiscount] =
    useState(
        product?.discount?.toString() ?? "0"
    );

    const [stock, setStock] =
    useState(
        product?.stock.toString() ?? "0"
    );
    


    const navigate = useNavigate();
    
    if (!product) {
        return (
            <Navigate
                to="/admin"
                replace
            />
        );
    }


  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
) => {

    event.preventDefault();


   const updatedProduct = {
    ...product,

    name,

    price:
        Number(price),

    discount:
        Number(discount),

    stock:
        Number(stock),

    category,
    subcategory,
    description,
};


    updateProduct(
        updatedProduct
    );


    navigate("/admin");
};


    return (
        <section className="admin-product-edit">

            <header className="admin-edit-header">

                <div>
                    <p>
                        Admin / Products
                    </p>

                    <h1>
                        Edit product
                    </h1>
                </div>

            </header>


            <div className="admin-edit-layout">

                <div className="admin-edit-preview">

                    <img
                        src={product.images.front}
                        alt={product.name}
                    />

                    <p>
                        Product #{product.id}
                    </p>

                </div>


                <form
                    className="admin-edit-form"
                    onSubmit={handleSubmit}
                >

                    <label>
                        Product name

                        <input
                            type="text"
                            value={name}

                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                        />
                    </label>
                        <label>
                            Stock

                            <input
                                type="number"
                                min="0"

                                value={stock}

                                onChange={(event) =>
                                    setStock(
                                        event.target.value
                                    )
                                }
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
                        />
                    </label>

                    <label>
                        Discount %

                        <input
                            type="number"
                            min="0"
                            max="100"

                            value={discount}

                            onChange={(event) =>
                                setDiscount(
                                    event.target.value
                                )
                            }
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
                                type="text"
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
                            Save changes
                        </button>

                    </div>

                </form>

            </div>

        </section>
    );
}


export default AdminProductEdit;