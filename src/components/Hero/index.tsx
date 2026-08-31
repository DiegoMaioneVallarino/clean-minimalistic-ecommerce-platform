import "../../styles/hero.css";

import heroImage from "../../img/heros/home_bg.png";

function Hero() {
    return (
        <section
            className="hero"
            style={{
                backgroundImage: `url(${heroImage})`,
            }}
        >
            <div className="hero-content">
                <p>New Collection</p>

                <h1>
                    Clean essentials
                    <br />
                    for everyday wear
                </h1>

                <button>
                    Shop now
                </button>
            </div>
        </section>
    );
}

export default Hero;