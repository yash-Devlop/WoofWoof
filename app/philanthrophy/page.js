import React from "react";
import PhilanthrophyHeroSection from "../components/Philanthrophy/PhilanthrophyHeroSection"
import AboutOurPhilanthrophy from "../components/Philanthrophy/AboutOurPhilanthrophy"
import WhyWoofWoofPhilanthrophy from "../components/Philanthrophy/WhyWoofWoofPhilanthrophy"
import Footer from "../components/Home/Footer";
import PhilanthrophyCards from '../components/Philanthrophy/PhilanthrophyCards'

const Page = () => {
    return (
        <div>
            <PhilanthrophyHeroSection />
            <AboutOurPhilanthrophy />
            <WhyWoofWoofPhilanthrophy />
            <PhilanthrophyCards />
            <h3 className="text-center text-lg md:text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto my-8 px-4">
                Through our regular donations, Woof Woof  aims to support BIRRD’s noble mission and help them continue their invaluable work in providing hope and healing to those who need it most.
                <br />
                <br />
                We believe in the power of collective action and are honored to partner with
                an organization like BIRRD that is making
                a tangible difference in the lives of so many animals.
            </h3>
            <Footer />
        </div>
    );
};

export default Page;

