
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../store/AuthContext";
import { useProducts } from "../../store/ProductContext";
import { useReviews } from "../../store/ReviewsContext";

import "./AdminReviews.css";

export default function AdminReviews() {
    const { user } = useAuth();
    const { products } = useProducts();
    const { reviews, deleteReview } = useReviews();

    const [search, setSearch] = useState("");
    const [ratingFilter, setRatingFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    const productNames = useMemo(
        () => new Map(
            products.map((product) => [
                product.id,
                product.name,
            ])
        ),
        [products]
    );

    const averageRating = reviews.length
        ? reviews.reduce(
            (sum, review) => sum + review.rating,
            0
        ) / reviews.length
        : 0;

    const fiveStarCount = reviews.filter(
        (review) => review.rating === 5
    ).length;

    const filteredReviews = useMemo(() => {
        const query = search.trim().toLowerCase();

        const result = reviews.filter((review) => {
            const productName =
                productNames.get(review.productId) ??
                `Product #${review.productId}`;

            const matchesSearch = [
                productName,
                review.authorName,
                review.comment,
                review.userId,
            ].some((value) =>
                value.toLowerCase().includes(query)
            );

            const matchesRating =
                ratingFilter === "all" ||
                review.rating === Number(ratingFilter);

            return matchesSearch && matchesRating;
        });

        return result.sort((a, b) =>
            sortBy === "oldest"
                ? a.createdAt - b.createdAt
                : b.createdAt - a.createdAt
        );
    }, [
        reviews,
        productNames,
        search,
        ratingFilter,
        sortBy,
    ]);

    if (user?.role !== "admin") {
        return (
            <div className="admin-reviews-denied">
                Access denied.
            </div>
        );
    }

    function handleDelete(id: string) {
        const confirmed = window.confirm(
            "Permanently delete this review?"
        );

        if (confirmed) {
            deleteReview(id);
        }
    }

    return (
        <section className="admin-reviews">
            <header className="admin-reviews-header">
                <div>
                    <span>STORE MODERATION</span>
                    <h2>Review Management</h2>
                    <p>
                        Monitor customer feedback across
                        all products.
                    </p>
                </div>
            </header>

            <div className="admin-reviews-stats">
                <div>
                    <span>Total Reviews</span>
                    <strong>{reviews.length}</strong>
                </div>

                <div>
                    <span>Average Rating</span>
                    <strong>
                        {reviews.length
                            ? averageRating.toFixed(1)
                            : "—"}
                        <small> ★</small>
                    </strong>
                </div>

                <div>
                    <span>5-Star Reviews</span>
                    <strong>{fiveStarCount}</strong>
                </div>
            </div>

            <div className="admin-reviews-toolbar">
                <input
                    type="search"
                    placeholder="Search product, customer or comment..."
                    aria-label="Search reviews"
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />

                <select
                    aria-label="Filter by rating"
                    value={ratingFilter}
                    onChange={(event) =>
                        setRatingFilter(event.target.value)
                    }
                >
                    <option value="all">All Ratings</option>
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <option key={rating} value={rating}>
                            {rating} Stars
                        </option>
                    ))}
                </select>

                <select
                    aria-label="Sort reviews"
                    value={sortBy}
                    onChange={(event) =>
                        setSortBy(event.target.value)
                    }
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>

            <div className="admin-reviews-table-wrap">
                <table className="admin-reviews-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Customer</th>
                            <th>Rating</th>
                            <th>Review</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredReviews.map((review) => {
                            const product = products.find(
                                (item) =>
                                    item.id === review.productId
                            );

                            return (
                                <tr key={review.id}>
                                    <td>
                                        {product ? (
                                            <Link
                                                to={`/product/${product.id}`}
                                            >
                                                {product.name}
                                            </Link>
                                        ) : (
                                            <span>
                                                Deleted product
                                                #{review.productId}
                                            </span>
                                        )}
                                    </td>

                                    <td>
                                        <strong>
                                            {review.authorName}
                                        </strong>
                                        <small>
                                            {review.userId}
                                        </small>
                                    </td>

                                    <td>
                                        <span className="admin-review-stars">
                                            {Array.from(
                                                { length: 5 },
                                                (_, index) =>
                                                    index < review.rating
                                                        ? "★"
                                                        : "☆"
                                            ).join("")}
                                        </span>
                                    </td>

                                    <td>
                                        <p className="admin-review-text">
                                            {review.comment}
                                        </p>
                                    </td>

                                    <td>
                                        {new Date(
                                            review.createdAt
                                        ).toLocaleDateString("en-US")}
                                    </td>

                                    <td>
                                        <button
                                            type="button"
                                            className="admin-review-delete"
                                            onClick={() =>
                                                handleDelete(review.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {filteredReviews.length === 0 && (
                    <div className="admin-reviews-empty">
                        No reviews found.
                    </div>
                )}
            </div>
        </section>
    );
}
