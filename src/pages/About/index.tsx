
import { useEffect, useState } from "react";
import "../../styles/about.css";

type MaisonPhoto = {
    src: string;
    alt: string;
    category: "People" | "Space" | "Archive";
};

const photos: MaisonPhoto[] = [
    { src: "/maison/IMG_1901.jpg", alt: "Maison Vintage editorial portrait", category: "People" },
    { src: "/maison/IMG_1904.jpg", alt: "Vintage accessories at Maison", category: "Archive" },
    { src: "/maison/IMG_1905.jpg", alt: "Maison Vintage visitor", category: "People" },
    { src: "/maison/IMG_1906.jpg", alt: "Maison community portrait", category: "People" },
    { src: "/maison/IMG_1907.jpg", alt: "Vintage sportswear inside Maison", category: "People" },
    { src: "/maison/IMG_1908.jpg", alt: "Designer vintage ties", category: "Archive" },
    { src: "/maison/IMG_1909.jpg", alt: "Clothing selection at Maison", category: "Space" },
    { src: "/maison/IMG_1910.jpg", alt: "Maison Vintage portrait", category: "People" },
    { src: "/maison/IMG_1911.jpg", alt: "Vintage designer labels", category: "Archive" },
    { src: "/maison/IMG_1912.jpg", alt: "Visitors at Maison", category: "People" },
    { src: "/maison/IMG_1913.jpg", alt: "Maison community and style", category: "People" },
    { src: "/maison/IMG_1914.jpg", alt: "Music inside Maison Vintage", category: "Space" },
    { src: "/maison/IMG_1915.jpg", alt: "Curated objects and accessories", category: "Archive" },
    { src: "/maison/IMG_1916.jpg", alt: "Vintage clothing outdoors", category: "Archive" },
    { src: "/maison/IMG_1926.jpg", alt: "Everyday moments at Maison", category: "People" },
];

const featured = {
    hero: "/maison/IMG_1909.jpg",
    portrait: "/maison/IMG_1905.jpg",
    detail: "/maison/IMG_1908.jpg",
};

function About() {
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
    const [filter, setFilter] = useState<"All" | MaisonPhoto["category"]>("All");

    const visiblePhotos = photos.filter(
        (photo) => filter === "All" || photo.category === filter
    );

    useEffect(() => {
        if (selectedPhoto === null) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setSelectedPhoto(null);
            }

            if (event.key === "ArrowRight") {
                setSelectedPhoto((current) =>
                    current === null ? null : (current + 1) % visiblePhotos.length
                );
            }

            if (event.key === "ArrowLeft") {
                setSelectedPhoto((current) =>
                    current === null
                        ? null
                        : (current - 1 + visiblePhotos.length) % visiblePhotos.length
                );
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedPhoto, visiblePhotos.length]);

    return (
        <main className="maison-about">
            <section className="maison-hero">
                <div className="maison-hero-image">
                    <img src={featured.hero} alt="Inside Maison Vintage" />
                    <span className="maison-image-index">MAISON / 001</span>
                </div>

                <div className="maison-hero-content">
                    <div className="maison-eyebrow">
                        <span>MAISON VINTAGE MX</span>
                        <span>EST. 2018 — CDMX</span>
                    </div>

                    <h1>
                        GOOD TASTE.
                        <br />
                        <em>RARE FINDS.</em>
                        <br />
                        NO
                        <br />
                        COMPROMISES.
                    </h1>

                    <div className="maison-hero-bottom">
                        <p>
                            An independent vintage house built on years of sourcing,
                            a discerning eye, and the art of putting things together.
                        </p>
                        <a href="#maison-story">DISCOVER OUR APPROACH ↓</a>
                    </div>
                </div>
            </section>

            <section className="maison-story" id="maison-story">
                <div className="maison-section-label">
                    <span>01 / OUR STORY</span>
                    <span>SINCE 2018</span>
                </div>

                <div className="maison-story-layout">
                    <div className="maison-story-copy">
                        <span className="maison-overline">ESTABLISHED 2018</span>
                        <h2>
                            OVER SEVEN YEARS.
                            <br />
                            <em>ONE DISTINCT EYE.</em>
                        </h2>
                        <p>
                            Since 2018, Maison Vintage has been dedicated to finding
                            exceptional pieces and bringing them into a contemporary wardrobe.
                        </p>
                        <p>
                            Over seven years in vintage have shaped our understanding
                            of quality, proportion, design, and the details that make
                            a piece worth owning.
                        </p>
                        <p>
                            Based in Mexico City's Roma Norte, we've built our identity
                            around independent taste, specialized sourcing, and a
                            constantly evolving selection. Experience teaches you
                            where to look. Taste tells you what to keep.
                        </p>
                    </div>

                    <figure className="maison-story-figure">
                        <img
                            src={featured.portrait}
                            alt="Style and community at Maison Vintage"
                            loading="lazy"
                        />
                        <figcaption>
                            <span>THE MAISON ARCHIVE</span>
                            <span>FIG. 01</span>
                        </figcaption>
                    </figure>
                </div>
            </section>

            <section className="maison-statement">
                <span>MAISON PHILOSOPHY / 002</span>
                <p>
                    WE DON'T FOLLOW TRENDS.
                    <br />
                    <em>WE RECOGNIZE WHAT LASTS.</em>
                </p>
            </section>

            <section className="maison-sourcing" id="maison-sourcing">
                <div className="maison-section-label">
                    <span>02 / THE CURATION</span>
                    <span>SOURCING · SELECTION · PERSPECTIVE</span>
                </div>
                <div className="maison-sourcing-layout">
                    <div>
                        <span className="maison-overline">ACCESS IS ONLY THE BEGINNING</span>
                        <h2>THE ART OF<br /><em>THE FIND.</em></h2>
                    </div>
                    <div className="maison-sourcing-copy">
                        <p>Great vintage doesn't happen by accident.</p>
                        <p>Through years of experience and relationships with specialized distributors and independent suppliers, we've developed access to distinctive pieces across different eras, styles, and design movements.</p>
                        <p>Every piece is considered for its quality, silhouette, character, and potential to become part of something greater.</p>
                        <p><strong>We believe the difference is not just in what you find, but in what you choose.</strong></p>
                    </div>
                </div>
            </section>

            <section className="maison-archive" id="maison-archive">
                <div className="maison-section-label">
                    <span>03 / THE ARCHIVE</span>
                    <span>PEOPLE · OBJECTS · MOMENTS</span>
                </div>

                <div className="maison-archive-heading">
                    <div>
                        <span className="maison-overline">AN ONGOING COLLECTION</span>
                        <h2>
                            THE MAISON
                            <br />
                            <em>ARCHIVE.</em>
                        </h2>
                    </div>
                    <p>
                        A visual diary of the people, pieces, and
                        moments that shape our point of view.
                    </p>
                </div>

                <div className="maison-filters" aria-label="Filter archive">
                    {(["All", "People", "Space", "Archive"] as const).map((option) => (
                        <button
                            type="button"
                            key={option}
                            className={filter === option ? "is-active" : ""}
                            onClick={() => {
                                setFilter(option);
                                setSelectedPhoto(null);
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                <div className="maison-photo-grid">
                    {visiblePhotos.map((photo, index) => (
                        <button
                            type="button"
                            className="maison-photo"
                            key={photo.src}
                            onClick={() => setSelectedPhoto(index)}
                            aria-label={`Open photograph: ${photo.alt}`}
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                loading="lazy"
                            />
                            <span className="maison-photo-caption">
                                <span>{photo.category.toUpperCase()}</span>
                                <span>{String(index + 1).padStart(2, "0")}</span>
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            <section className="maison-detail">
                <div className="maison-detail-image">
                    <img
                        src={featured.detail}
                        alt="Vintage designer pieces at Maison"
                        loading="lazy"
                    />
                </div>
                <div className="maison-detail-copy">
                    <span className="maison-overline">04 / THE SELECTION · STYLING</span>
                    <h2>
                        THE RIGHT PIECES.
                        <br />
                        <em>THE RIGHT COMBINATION.</em>
                    </h2>
                    <p>
                        A great outfit is more than a collection of great clothes.
                        It's about proportion, balancing textures, and connecting
                        references across eras. From vintage sportswear to designer
                        garments, we select pieces with the potential to create
                        distinctive looks. Good clothes are found. Great style is composed.
                    </p>
                    <a href="/catalog">EXPLORE THE COLLECTION ↗</a>
                </div>
            </section>

            <section className="maison-visit">
                <div className="maison-section-label">
                    <span>05 / VISIT US</span>
                    <span>ROMA NORTE, MEXICO CITY</span>
                </div>

                <div className="maison-visit-layout">
                    <div>
                        <span className="maison-overline">ROMA NORTE · MEXICO CITY</span>
                        <h2>
                            COME SEE
                            <br />
                            <em>WHAT WE FOUND.</em>
                        </h2>
                    </div>

                    <div className="maison-address">
                        <span>THE STORE</span>
                        <address>
                            Guanajuato 31
                            <br />
                            Roma Norte
                            <br />
                            Mexico City
                        </address>

                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Guanajuato+31+Roma+Norte+Ciudad+de+Mexico"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GET DIRECTIONS ↗
                        </a>

                        <a
                            href="https://www.instagram.com/maisonvintagemx/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            INSTAGRAM ↗ @MAISONVINTAGEMX
                        </a>
                    </div>
                </div>
            </section>

            <footer className="maison-footer">
                <span>MAISON VINTAGE MX</span>
                <span>INDEPENDENTLY CURATED SINCE 2018</span>
                <span>CDMX, MEXICO</span>
            </footer>

            {selectedPhoto !== null && visiblePhotos[selectedPhoto] && (
                <div
                    className="maison-lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Maison photo viewer"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <button
                        type="button"
                        className="maison-lightbox-close"
                        aria-label="Close image"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        ×
                    </button>

                    <button
                        type="button"
                        className="maison-lightbox-prev"
                        aria-label="Previous image"
                        onClick={(event) => {
                            event.stopPropagation();
                            setSelectedPhoto(
                                (selectedPhoto - 1 + visiblePhotos.length) %
                                    visiblePhotos.length
                            );
                        }}
                    >
                        ←
                    </button>

                    <img
                        src={visiblePhotos[selectedPhoto].src}
                        alt={visiblePhotos[selectedPhoto].alt}
                        onClick={(event) => event.stopPropagation()}
                    />

                    <button
                        type="button"
                        className="maison-lightbox-next"
                        aria-label="Next image"
                        onClick={(event) => {
                            event.stopPropagation();
                            setSelectedPhoto(
                                (selectedPhoto + 1) % visiblePhotos.length
                            );
                        }}
                    >
                        →
                    </button>

                    <span className="maison-lightbox-counter">
                        {String(selectedPhoto + 1).padStart(2, "0")} /{" "}
                        {String(visiblePhotos.length).padStart(2, "0")}
                    </span>
                </div>
            )}
        </main>
    );
}

export default About;
