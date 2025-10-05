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
  const latitude = 27.7076499;
  const longitude = 85.3176790;

  const mapSrc = `https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`;

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

