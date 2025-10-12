import Image from "next/image";
import React from "react";

const OurCompaniesSec = () => {
  // Dummy coordinates for Faridabad location
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.4895421!2d77.3549342!3d28.3873227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdda36bdf15af%3A0x6533d319787c348d!2sAirtel%20Store%20-%20Sec%2079%20Faridabad!5e0!3m2!1sen!2sin!4v1234567890"
  return (
    <div data-aos="zoom-in" className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-6 md:py-8">
        <div className="px-4 md:px-16 xl:px-32">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#ff0047] mb-1">
              Blue Ocean
            </h2>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black">
              Our Companies
            </h3>
          </div>

          {/* Content Grid */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-5 lg:space-y-6 flex flex-col justify-start">
              {/* Company 1 - Bangle Boutique */}
              <div className="space-y-2">
                <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                  Bangle Boutique
                </h4>
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                  A premium brand dedicated to traditional and contemporary bangles. 
                  From festive wear to everyday elegance, Bangle Boutique celebrates 
                  the timeless art of bangles with a modern touch.
                </p>
              </div>

              {/* Company 2 - Woof Woof */}
              <div className="space-y-2">
                <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                  Woof Woof
                </h4>
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                  A fun and reliable pet toy brand committed to bringing joy to 
                  furry companions. Woof Woof combines durability with playfulness 
                  to ensure pets stay happy, active, and loved.
                </p>
              </div>
            </div>

            {/* Right Side - Map */}
            <div className="w-full h-[280px] md:h-[320px] lg:h-[350px] rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200">
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Blue Ocean Location Map"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCompaniesSec;



