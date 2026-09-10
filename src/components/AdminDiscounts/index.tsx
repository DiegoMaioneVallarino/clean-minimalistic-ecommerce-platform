import {
    useMemo,
    useState
} from "react";

import "../../styles/admin-discounts.css";


type Discount = {
    id: number;
    name: string;
    code: string;
    percentage: number;
    active: boolean;
    expiresAt: string;
};


const initialDiscounts: Discount[] = [
    {
        id: 1,
        name: "Summer Sale",
        code: "SUMMER20",
        percentage: 20,
        active: true,
        expiresAt: "2026-09-30",
    },

    {
        id: 2,
        name: "New Customer",
        code: "WELCOME10",
        percentage: 10,
        active: true,
        expiresAt: "2026-12-31",
    },

    {
        id: 3,
        name: "Archive Sale",
        code: "ARCHIVE30",
        percentage: 30,
        active: false,
        expiresAt: "2026-08-31",
    },
];


function AdminDiscounts() {

    const [
        discounts,
        setDiscounts
    ] = useState<Discount[]>(
        initialDiscounts
    );


    const [
        name,
        setName
    ] = useState("");


    const [
        code,
        setCode
    ] = useState("");


    const [
        percentage,
        setPercentage
    ] = useState("");


    const [
        expiresAt,
        setExpiresAt
    ] = useState("");


    const activeCount =
        useMemo(
            () =>
                discounts.filter(
                    (discount) =>
                        discount.active
                ).length,
            [discounts]
        );


    function createDiscount(
        event:
            React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();


        const parsedPercentage =
            Number(percentage);


        if (
            !name.trim() ||
            !code.trim() ||
            !expiresAt ||
            parsedPercentage <= 0
        ) {
            return;
        }


        const newDiscount: Discount = {
            id:
                Date.now(),

            name:
                name.trim(),

            code:
                code
                    .trim()
                    .toUpperCase(),

            percentage:
                parsedPercentage,

            active:
                true,

            expiresAt,
        };


        setDiscounts(
            (currentDiscounts) => [
                newDiscount,
                ...currentDiscounts,
            ]
        );


        setName("");
        setCode("");
        setPercentage("");
        setExpiresAt("");
    }


    function toggleDiscount(
        discountId: number
    ) {

        setDiscounts(
            (currentDiscounts) =>
                currentDiscounts.map(
                    (discount) =>
                        discount.id ===
                        discountId
                            ? {
                                ...discount,
                                active:
                                    !discount.active
                            }
                            : discount
                )
        );

    }


    function deleteDiscount(
        discountId: number
    ) {

        setDiscounts(
            (currentDiscounts) =>
                currentDiscounts.filter(
                    (discount) =>
                        discount.id !==
                        discountId
                )
        );

    }


    return (
        <section className="admin-discounts">

            <div className="admin-discounts-header">

                <div>

                    <p>
                        Promotions
                    </p>

                    <h1>
                        Discounts
                    </h1>

                </div>


                <div className="admin-discount-stats">

                    <span>
                        Active
                    </span>

                    <strong>
                        {activeCount}
                    </strong>

                </div>

            </div>


            <form
                className="admin-discount-create"

                onSubmit={
                    createDiscount
                }
            >

                <input
                    type="text"
                    placeholder="Discount name"

                    value={name}

                    onChange={(event) =>
                        setName(
                            event.target.value
                        )
                    }
                />


                <input
                    type="text"
                    placeholder="Code"

                    value={code}

                    onChange={(event) =>
                        setCode(
                            event.target.value
                        )
                    }
                />


                <input
                    type="number"
                    min="1"
                    max="100"
                    placeholder="%"

                    value={percentage}

                    onChange={(event) =>
                        setPercentage(
                            event.target.value
                        )
                    }
                />


                <input
                    type="date"

                    value={expiresAt}

                    onChange={(event) =>
                        setExpiresAt(
                            event.target.value
                        )
                    }
                />


                <button
                    type="submit"
                >
                    Create
                </button>

            </form>


            <div className="admin-discount-list">

                {discounts.map(
                    (discount) => (

                        <article
                            key={discount.id}
                            className={`
                                admin-discount-card
                                ${
                                    discount.active
                                        ? ""
                                        : "inactive"
                                }
                            `}
                        >

                            <div>

                                <span className="discount-label">
                                    {
                                        discount.active
                                            ? "Active"
                                            : "Inactive"
                                    }
                                </span>


                                <h2>
                                    {
                                        discount.name
                                    }
                                </h2>


                                <p>
                                    {
                                        discount.code
                                    }
                                </p>

                            </div>


                            <strong className="discount-percentage">
                                {
                                    discount.percentage
                                }
                                %
                            </strong>


                            <div className="discount-expiration">

                                <span>
                                    Expires
                                </span>

                                <strong>
                                    {
                                        discount.expiresAt
                                    }
                                </strong>

                            </div>


                            <div className="discount-actions">

                                <button
                                    type="button"

                                    onClick={() =>
                                        toggleDiscount(
                                            discount.id
                                        )
                                    }
                                >
                                    {
                                        discount.active
                                            ? "Disable"
                                            : "Enable"
                                    }
                                </button>


                                <button
                                    type="button"
                                    className="delete"

                                    onClick={() =>
                                        deleteDiscount(
                                            discount.id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </article>

                    )
                )}

            </div>

        </section>
    );
}


export default AdminDiscounts;