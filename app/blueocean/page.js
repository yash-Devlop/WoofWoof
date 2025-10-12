import React from "react";
import BlueOceanHeroSection from "../components/blueocean/BlueOceanHeroSection";
import AboutOurBlueOcean from "../components/blueocean/AboutOurBlueOcean";
import BlueOceanLocation from "../components/blueocean/BlueOceanLocation";
import Footer from "../components/Home/Footer";

const Page = () => {
    return (
        <div>
            <BlueOceanHeroSection />
            <AboutOurBlueOcean />
            <BlueOceanLocation />
            <h2 className="text-center text-4xl">Our Vision</h2>
            <p className="text-center text-lg md:text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto my-8 px-4">
                To become a trusted global trading house that nurtures innovative brands, delivering products that touch lives, celebrate culture, and build lasting bonds with customers across the world.
            </p>
            <br />
            <br />
            <h2 className="text-center text-4xl">Our Purpose</h2>
            <p className="text-center text-lg md:text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto my-8 px-4">
                At Blue Ocean, our purpose goes beyond trading. We aim to:
                <br />
                <br />
                Empower brands that make a difference in people’s lives.
                <br />
                <br />
                Create value for customers through quality and trust.
                <br />
                <br />
                Bridge tradition with modern lifestyles through diverse offerings.
                <br />
                <br />
                Grow sustainably while positively impacting communities and industries we serve
            </p>
            <Footer />

        </div>
    );
};

export default Page;