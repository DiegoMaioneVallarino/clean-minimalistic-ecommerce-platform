
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../store/AuthContext";
import { useReviews } from "../../store/ReviewsContext";

import "./ProductReviews.css";

type Props = {
    productId: number;
};

function ProductReviews({ productId }: Props) {
    const { user } = useAuth();
    const { reviews, addReview, deleteReview } = useReviews();

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    const productReviews = reviews
        .filter((review) => review.productId === productId)
        .sort((a, b) => b.createdAt - a.createdAt);

    const average = productReviews.length
        ? productReviews.reduce(
            (sum, review) => sum + review.rating,
            0
        ) / productReviews.length
        : 0;

    function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!user) {
            setError("Please sign in to write a review.");
            return;
        }

        const cleanComment = comment.trim();

        if (cleanComment.length < 10) {
            setError("Write at least 10 characters.");
            return;
        }

        if (cleanComment.length > 2000) {
            setError("Maximum 2000 characters.");
            return;
        }

        addReview({
            productId,
            userId: user.email,
            authorName: user.name,
            rating,
            comment: cleanComment,
        });

        setComment("");
        setRating(5);
        setError("");
    }

    return (
        <section className="product-reviews">
            <header className="product-reviews-header">
                <div>
                    <span className="reviews-eyebrow">
                        COMMUNITY FEEDBACK
                    </span>
                    <h2>Customer Reviews</h2>
                </div>

                <span className="reviews-count">
                    {productReviews.length} reviews
                </span>
            </header>

            <div className="reviews-overview">
                <strong>
                    {productReviews.length
                        ? average.toFixed(1)
                        : "—"}
                </strong>

                <div>
                    <div className="reviews-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}>
                                {star <= Math.round(average)
                                    ? "★"
                                    : "☆"}
                            </span>
                        ))}
                    </div>

                    <p>
                        {productReviews.length
                            ? `Based on ${productReviews.length} reviews`
                            : "No ratings yet"}
                    </p>
                </div>
            </div>

            <div className="reviews-layout">
                <div className="reviews-list">
                    {productReviews.length === 0 ? (
                        <div className="reviews-empty">
                            <h3>No reviews yet</h3>
                            <p>
                                Be the first to share your
                                thoughts about this piece.
                            </p>
                        </div>
                    ) : (
                        productReviews.map((review) => (
                            <article
                                className="review-card"
                                key={review.id}
                            >
                                <div className="review-card-top">
                                    <strong>
                                        {review.authorName}
                                    </strong>

                                    <time
                                        dateTime={new Date(
                                            review.createdAt
                                        ).toISOString()}
                                    >
                                        {new Date(
                                            review.createdAt
                                        ).toLocaleDateString(
                                            "en-US",
                                            {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            }
                                        )}
                                    </time>
                                </div>

                                <div
                                    className="reviews-stars"
                                    aria-label={`${review.rating} out of 5 stars`}
                                >
                                    {[1, 2, 3, 4, 5].map(
                                        (star) => (
                                            <span key={star}>
                                                {star <= review.rating
                                                    ? "★"
                                                    : "☆"}
                                            </span>
                                        )
                                    )}
                                </div>

                                <p className="review-comment">
                                    {review.comment}
                                </p>

                                {user?.email === review.userId && (
                                    <button
                                        type="button"
                                        className="review-delete"
                                        onClick={() => {
                                            if (
                                                window.confirm(
                                                    "Delete this review?"
                                                )
                                            ) {
                                                deleteReview(review.id);
                                            }
                                        }}
                                    >
                                        Delete review
                                    </button>
                                )}
                            </article>
                        ))
                    )}
                </div>

                <div className="reviews-form-panel">
                    <h3>Write a Review</h3>

                    {!user ? (
                        <div className="reviews-login-message">
                            <p>
                                Sign in to share your experience
                                with this product.
                            </p>

                            <Link to="/login">
                                SIGN IN TO REVIEW
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <p className="reviews-form-user">
                                Reviewing as {user.name}
                            </p>

                            <label>Your rating</label>

                            <div
                                className="reviews-rating-input"
                                role="group"
                                aria-label="Select rating"
                            >
                                {[1, 2, 3, 4, 5].map(
                                    (star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className={
                                                star <= rating
                                                    ? "selected"
                                                    : ""
                                            }
                                            onClick={() =>
                                                setRating(star)
                                            }
                                            aria-label={`${star} stars`}
                                            aria-pressed={rating === star}
                                        >
                                            {star <= rating
                                                ? "★"
                                                : "☆"}
                                        </button>
                                    )
                                )}
                            </div>

                            <label htmlFor="review-comment">
                                Your review
                            </label>

                            <textarea
                                id="review-comment"
                                value={comment}
                                onChange={(event) =>
                                    setComment(
                                        event.target.value
                                    )
                                }
                                placeholder="Tell us what you think about this piece..."
                                rows={5}
                                maxLength={2000}
                                required
                            />

                            <span className="review-character-count">
                                {comment.length} / 2000
                            </span>

                            {error && (
                                <p
                                    className="review-form-error"
                                    role="alert"
                                >
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="review-submit"
                                disabled={comment.trim().length < 10}
                            >
                                POST REVIEW
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ProductReviews;
