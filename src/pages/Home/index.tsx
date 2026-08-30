import Hero from "../../components/Hero";
import FeaturedProducts from "../../components/FeaturedProducts";
import PromoBanner from "../../components/PromoBanner";
import NewArrivals from "../../components/NewArrivals";

import "../../styles/home.css";

function Home() {
    return (
        <>
            <Hero />
            <FeaturedProducts />
            <PromoBanner />
            <NewArrivals />
        </>
    );
}

export default Home;