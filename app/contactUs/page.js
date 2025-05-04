import React from "react";
import ContactHero from "../components/Contactus/ContactHero";
import Offers from "../components/Home/Offers";
import Footer from "../components/Home/Footer";
import ContactForm from "../components/Contactus/ContactForm";
import ContactSec from "../components/Contactus/ContactSec";
import ContactMap from "../components/Contactus/ContactMap";

const page = () => {
  return (
    <div className=" bg-[#EEEEEE]">
      <Offers />
      <ContactHero />
      <ContactSec />
      <ContactMap />
      <Footer />
    </div>
  );
};

export default page;
