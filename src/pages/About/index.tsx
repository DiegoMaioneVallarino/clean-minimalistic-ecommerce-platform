
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
                        THE ART OF
                        <br />
                        <em>FINDING</em>
                        <br />
                        SOMETHING
                        <br />
                        DIFFERENT.
                    </h1>

                    <div className="maison-hero-bottom">
                        <p>
                            A curated vintage destination in the heart of
                            Mexico City. Clothing, culture, and stories
                            worth keeping.
                        </p>
                        <a href="#maison-story">DISCOVER OUR STORY ↓</a>
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
                        <span className="maison-overline">NOT JUST CLOTHING.</span>
                        <h2>
                            OLD PIECES.
                            <br />
                            <em>NEW STORIES.</em>
                        </h2>
                        <p>
                            Desde 2018, Maison Vintage ha sido un espacio
                            dedicado a descubrir prendas con carácter,
                            piezas únicas y nuevas formas de expresión.
                        </p>
                        <p>
                            En el corazón de la Roma Norte, reunimos
                            moda vintage, referencias de distintas épocas
                            y una comunidad que entiende el estilo como
                            algo personal.
                        </p>
                        <p>
                            Porque una prenda puede tener historia,
                            pero quien la lleva escribe el siguiente capítulo.
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
                    STYLE IS NOT ABOUT
                    <br />
                    FOLLOWING TIME.
                    <br />
                    <em>IT'S ABOUT MAKING IT YOURS.</em>
                </p>
            </section>

            <section className="maison-archive" id="maison-archive">
                <div className="maison-section-label">
                    <span>02 / THE ARCHIVE</span>
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
                        moments that make Maison what it is.
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
                    <span className="maison-overline">03 / THE SELECTION</span>
                    <h2>
                        ONE OF
                        <br />
                        <em>A KIND.</em>
                    </h2>
                    <p>
                        From vintage sportswear to designer pieces,
                        every discovery brings a different reference,
                        texture, or era into the present.
                    </p>
                    <a href="/catalog">EXPLORE THE COLLECTION ↗</a>
                </div>
            </section>

            <section className="maison-visit">
                <div className="maison-section-label">
                    <span>04 / VISIT US</span>
                    <span>ROMA NORTE, MEXICO CITY</span>
                </div>

                <div className="maison-visit-layout">
                    <div>
                        <span className="maison-overline">FIND US IN THE CITY</span>
                        <h2>
                            COME
                            <br />
                            <em>THROUGH.</em>
                        </h2>
                    </div>

                    <div className="maison-address">
                        <span>THE STORE</span>
                        <address>
                            Guanajuato 31
                            <br />
                            Roma Norte
                            <br />
                            Ciudad de México
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
                <span>ESTABLISHED 2018</span>
                <span>CDMX, MÉXICO</span>
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
