
import Hero from "../../components/Hero";
import HomeHero from "../../components/HomeHero";

import ModelLooks from "../../components/ModelLooks";
import FeaturedProducts from "../../components/FeaturedProducts";
import PromoBanner from "../../components/PromoBanner";
import NewArrivals from "../../components/NewArrivals";

import CatalogShowcase from "../../components/CatalogShowcase";

import "../../styles/home.css";

function Home() {
    return (
        <>
            <NewArrivals />

            <HomeHero />

            <CatalogShowcase />

            <ModelLooks />

            <FeaturedProducts />

            <PromoBanner />

            <Hero />
        </>
    );
}

export default Home;
