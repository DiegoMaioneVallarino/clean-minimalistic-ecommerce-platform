import Hero from "../../components/Hero";
import FeaturedProducts from "../../components/FeaturedProducts";
import PromoBanner from "../../components/PromoBanner";
import "../../styles/home.css";

function Home() {
    return (
        <>
            <Hero />
            <FeaturedProducts />
            <PromoBanner />

            <section className="new-arrivals">
                New Arrivals
            </section>
        </>
    );
}

export default Home;