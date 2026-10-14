
import { useState, type FormEvent } from "react";

import { useProductRequests } from "../../store/ProductRequestsContext";

import type {
    ProductRequest,
    ProductRequestStatus,
} from "../../types/ProductRequest";

import "./AdminProductRequests.css";

const statuses: ProductRequestStatus[] = [
    "pending",
    "searching",
    "found",
    "unavailable",
    "closed",
];

export default function AdminProductRequests() {
    const { requests, updateRequest } = useProductRequests();

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [status, setStatus] =
        useState<ProductRequestStatus>("pending");
    const [response, setResponse] = useState("");
    const [productUrl, setProductUrl] = useState("");

    const sortedRequests = [...requests].sort(
        (a, b) => b.createdAt - a.createdAt
    );

    function selectRequest(request: ProductRequest) {
        setSelectedId(request.id);
        setStatus(request.status);
        setResponse(request.adminResponse);
        setProductUrl(request.suggestedProductUrl);
    }

    function save(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!selectedId) return;

        const url = productUrl.trim();

        if (url && !/^https?:\/\//i.test(url)) {
            return;
        }

        updateRequest(selectedId, {
            status,
            adminResponse: response.trim(),
            suggestedProductUrl: url,
        });

        setSelectedId(null);
    }

    return (
        <section className="admin-product-requests">
            <header>
                <span>PERSONAL SOURCING</span>
                <h2>Product Requests</h2>
                <p>
                    Review customer requests and find similar pieces.
                </p>
            </header>

            <div className="admin-request-stats">
                <div>
                    <span>Total Requests</span>
                    <strong>{requests.length}</strong>
                </div>
                <div>
                    <span>Pending</span>
                    <strong>
                        {requests.filter(
                            (request) => request.status === "pending"
                        ).length}
                    </strong>
                </div>
                <div>
                    <span>Searching</span>
                    <strong>
                        {requests.filter(
                            (request) => request.status === "searching"
                        ).length}
                    </strong>
                </div>
            </div>

            {sortedRequests.length === 0 && (
                <p>No product requests yet.</p>
            )}

            <div className="admin-request-list">
                {sortedRequests.map((request) => (
                    <article key={request.id}>
                        <div className="admin-request-heading">
                            <div>
                                <strong>{request.title}</strong>
                                <p>
                                    {request.customerName}
                                    {" · "}
                                    {request.customerEmail}
                                </p>
                            </div>
                            <span>{request.status}</span>
                        </div>

                        <p className="admin-request-description">
                            {request.description}
                        </p>

                        <div className="admin-request-meta">
                            <span>
                                Size: {request.size || "Not specified"}
                            </span>
                            <span>
                                Budget: {request.budget === null
                                    ? "Not specified"
                                    : `$${request.budget} MXN`}
                            </span>
                        </div>

                        <div className="admin-request-images">
                            {request.images.map((src, index) => (
                                <a
                                    key={index}
                                    href={src}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={src}
                                        alt={`Reference ${index + 1}`}
                                    />
                                </a>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="admin-request-manage"
                            onClick={() => selectRequest(request)}
                        >
                            MANAGE REQUEST
                        </button>

                        {selectedId === request.id && (
                            <form
                                className="admin-request-editor"
                                onSubmit={save}
                            >
                                <label>
                                    Status
                                    <select
                                        value={status}
                                        onChange={(event) => {
    const newStatus = event.currentTarget.value as ProductRequestStatus;
    setStatus(newStatus);
}}
                                    >
                                        {statuses.map((value) => (
                                            <option key={value} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label>
                                    Response to customer
                                    <textarea
                                        rows={4}
                                        value={response}
                                        onChange={(event) =>
                                            setResponse(event.target.value)
                                        }
                                        placeholder="We found a similar jacket..."
                                    />
                                </label>

                                <label>
                                    Suggested product URL
                                    <input
                                        type="url"
                                        value={productUrl}
                                        onChange={(event) =>
                                            setProductUrl(event.target.value)
                                        }
                                        placeholder="https://..."
                                    />
                                </label>

                                <div className="admin-request-actions">
                                    <button type="submit">
                                        SAVE RESPONSE
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedId(null)}
                                    >
                                        CANCEL
                                    </button>
                                </div>
                            </form>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}
