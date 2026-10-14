
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../store/AuthContext";
import { useProductRequests } from "../../store/ProductRequestsContext";

import "./ProductRequests.css";

const MAX_IMAGES = 3;
const MAX_FILE_BYTES = 5 * 1024 * 1024;

const statusLabels = {
    pending: "Pending",
    searching: "Searching",
    found: "Found",
    unavailable: "Unavailable",
    closed: "Closed",
};

function compressImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        const objectUrl = URL.createObjectURL(file);

        image.onload = () => {
            const scale = Math.min(
                1,
                1000 / Math.max(image.width, image.height)
            );

            const canvas = document.createElement("canvas");
            canvas.width = Math.round(image.width * scale);
            canvas.height = Math.round(image.height * scale);

            const context = canvas.getContext("2d");

            if (!context) {
                URL.revokeObjectURL(objectUrl);
                reject(new Error("Canvas unavailable"));
                return;
            }

            context.drawImage(
                image,
                0,
                0,
                canvas.width,
                canvas.height
            );

            URL.revokeObjectURL(objectUrl);

            resolve(canvas.toDataURL("image/jpeg", 0.65));
        };

        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Invalid image"));
        };

        image.src = objectUrl;
    });
}

export default function ProductRequests() {
    const { user } = useAuth();
    const { myRequests, submitRequest } = useProductRequests();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [size, setSize] = useState("");
    const [budget, setBudget] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState("");

    async function handleImages(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const files = Array.from(event.target.files ?? []);
        event.target.value = "";

        if (files.length + images.length > MAX_IMAGES) {
            setMessage("You can upload up to 3 images.");
            return;
        }

        if (
            files.some(
                (file) =>
                    !file.type.startsWith("image/") ||
                    file.size > MAX_FILE_BYTES
            )
        ) {
            setMessage("Use images smaller than 5 MB each.");
            return;
        }

        setBusy(true);

        try {
            const compressed = await Promise.all(
                files.map(compressImage)
            );

            setImages((current) => [
                ...current,
                ...compressed,
            ]);
            setMessage("");
        } catch {
            setMessage("Could not process one of the images.");
        } finally {
            setBusy(false);
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const parsedBudget = budget.trim()
            ? Number(budget)
            : null;

        if (
            parsedBudget !== null &&
            (!Number.isFinite(parsedBudget) || parsedBudget < 0)
        ) {
            setMessage("Enter a valid budget.");
            return;
        }

        const success = submitRequest({
            title,
            description,
            size,
            budget: parsedBudget,
            images,
        });

        if (!success) {
            setMessage("Could not submit your request.");
            return;
        }

        setTitle("");
        setDescription("");
        setSize("");
        setBudget("");
        setImages([]);
        setMessage("Your request has been submitted!");
    }

    return (
        <main className="product-requests-page">
            <header className="product-requests-header">
                <span>MAISON PERSONAL SOURCING</span>
                <h1>Find It For Me</h1>
                <p>
                    Looking for a specific vintage piece?
                    Tell us what you have in mind.
                </p>
            </header>

            {!user ? (
                <div className="product-requests-login">
                    <p>Sign in to submit a product request.</p>
                    <Link to="/login">SIGN IN</Link>
                </div>
            ) : (
                <>
                    <form
                        className="product-request-form"
                        onSubmit={handleSubmit}
                    >
                        <label>
                            Product name
                            <input
                                value={title}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                                placeholder="Vintage Nike jacket"
                                maxLength={100}
                                required
                            />
                        </label>

                        <label>
                            Describe what you're looking for
                            <textarea
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                                placeholder="Color, brand, era, fit, details..."
                                rows={5}
                                maxLength={2000}
                                required
                            />
                        </label>

                        <div className="product-request-fields">
                            <label>
                                Preferred size
                                <input
                                    value={size}
                                    onChange={(event) =>
                                        setSize(event.target.value)
                                    }
                                    placeholder="M / L / XL"
                                />
                            </label>

                            <label>
                                Maximum budget (MXN)
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={budget}
                                    onChange={(event) =>
                                        setBudget(event.target.value)
                                    }
                                    placeholder="1500"
                                />
                            </label>
                        </div>

                        <div className="product-request-upload">
                            <strong>Reference photos</strong>
                            <p>Up to 3 images, 5 MB each.</p>

                            <label className="product-request-upload-button">
                                + ADD PHOTOS
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    disabled={busy || images.length >= MAX_IMAGES}
                                    onChange={handleImages}
                                />
                            </label>

                            <div className="product-request-previews">
                                {images.map((src, index) => (
                                    <div key={index}>
                                        <img
                                            src={src}
                                            alt={`Reference ${index + 1}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setImages((current) =>
                                                    current.filter(
                                                        (_, i) => i !== index
                                                    )
                                                )
                                            }
                                        >
                                            REMOVE
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            className="product-request-submit"
                            type="submit"
                            disabled={busy}
                        >
                            {busy
                                ? "PROCESSING IMAGES..."
                                : "SUBMIT REQUEST"}
                        </button>

                        {message && (
                            <p role="status">{message}</p>
                        )}
                    </form>

                    <section className="product-requests-history">
                        <h2>My Requests</h2>

                        {myRequests.length === 0 && (
                            <p>No requests submitted yet.</p>
                        )}

                        {myRequests.map((request) => (
                            <article key={request.id}>
                                <div className="product-request-history-top">
                                    <strong>{request.title}</strong>
                                    <span>
                                        {statusLabels[request.status]}
                                    </span>
                                </div>

                                <p>{request.description}</p>

                                <div className="product-request-previews">
                                    {request.images.map((src, index) => (
                                        <img
                                            key={index}
                                            src={src}
                                            alt={`Reference ${index + 1}`}
                                        />
                                    ))}
                                </div>

                                {request.adminResponse && (
                                    <div className="product-request-response">
                                        <strong>Maison Response</strong>
                                        <p>{request.adminResponse}</p>

                                        {request.suggestedProductUrl && (
                                            <a
                                                href={request.suggestedProductUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                VIEW SUGGESTED PRODUCT ↗
                                            </a>
                                        )}
                                    </div>
                                )}
                            </article>
                        ))}
                    </section>
                </>
            )}
        </main>
    );
}
