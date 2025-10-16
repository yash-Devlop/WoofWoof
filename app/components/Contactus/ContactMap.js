// import Image from "next/image";
// import React from "react";

// const ContactMap = () => {
//   return (
//     <div className="w-full relative">
//       <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
//         <div className=" px-4 md:px-20 xl:px-40">
//           <div className=" overflow-hidden rounded-3xl">
//             <Image
//               src="/images/MapPin.png"
//               alt="map"
//               width={600}
//               height={400}
//               className=" w-full cursor-pointer hover:scale-105 transition-all duration-500"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactMap;



import React from "react";

const ContactMap = () => {

  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.4895421!2d77.3549342!3d28.3873227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdda36bdf15af%3A0x6533d319787c348d!2sAirtel%20Store%20-%20Sec%2079%20Faridabad!5e0!3m2!1sen!2sin!4v1234567890`;

  return (
    <div className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
        <div className="px-4 md:px-20 xl:px-40">
          <div className="overflow-hidden rounded-3xl">
            <iframe
              title="Google Map"
              src={mapSrc}
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] rounded-3xl cursor-pointer hover:scale-105 transition-all duration-500"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;

