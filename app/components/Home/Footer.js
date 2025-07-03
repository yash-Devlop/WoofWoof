"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = () => {
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className=" relative md:p-6 p-4">
      <div className=" absolute z-10 bottom-0 right-0">
        <Image
          src="/images/bottomVector.png"
          alt="bottom vector"
          width={150}
          height={150}
          className=" object-contain"
        />
      </div>

      <div className=" relative bg-[#292929] rounded-3xl text-white overflow-hidden">
        <div className=" absolute z-10 top-0 left-0 rotate-180 ">
          <Image
            src="/images/bottomVector.png"
            alt="bottom vector"
            width={120}
            height={120}
            className=" object-contain "
          />
        </div>
        <motion.div
          initial={{ x: 20, y: -10, scale: 1 }}
          animate={{
            x: [0, -30, -50, -30, 0],
            y: [0, 20, 40, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className=" absolute inset-0"
        >
          <Image
            src="/images/vectorPaws.png"
            alt="footer"
            width={600}
            height={600}
            className=" w-full h-full object-contain rounded-3xl"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }} // animate once when 50% visible
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full relative py-4 md:py-12"
        >
          <div className=" px-4 md:px-16 xl:px-40 space-y-10">
            <div className=" grid grid-cols-1 lg:grid-cols-[25%_75%] lg:gap-10 gap-6 justify-center items-center">
              <div className=" flex flex-col justify-center items-center lg:max-w-[200px] space-y-5">
                <div className=" flex justify-center items-center gap-2 z-10">
                  <Image
                    src="/images/woof2.png"
                    alt="logo"
                    width={150}
                    height={40}
                  />
                  {/* <span className=" font-bold text-xl">Woof Woof</span> */}
                </div>
                <div className=" text-center">
                  Connecting Pets and People: Your Happy Tails Start Here!
                </div>
                <div className=" flex gap-3">
                  <div className=" cursor-pointer">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.0176 0H11.9629C5.35255 0 -0.00622559 5.36035 -0.00622559 11.9727V12.0273C-0.00622559 18.6397 5.35255 24 11.9629 24H12.0176C18.6279 24 23.9867 18.6397 23.9867 12.0273V11.9727C23.9867 5.36035 18.6279 0 12.0176 0Z"
                        fill="black"
                      />
                      <path
                        d="M15.7018 4.88281H8.27771C6.22667 4.88281 4.55811 6.55187 4.55811 8.60351V15.3975C4.55811 17.4491 6.22667 19.1182 8.27771 19.1182H15.7018C17.7528 19.1182 19.4214 17.4491 19.4214 15.3975V8.60351C19.4214 6.55187 17.7528 4.88281 15.7018 4.88281ZM5.87027 8.60351C5.87027 7.27583 6.95042 6.19536 8.27771 6.19536H15.7018C17.0291 6.19536 18.1092 7.27583 18.1092 8.60351V15.3975C18.1092 16.7252 17.0291 17.8056 15.7018 17.8056H8.27771C6.95042 17.8056 5.87027 16.7252 5.87027 15.3975V8.60351Z"
                        fill="white"
                      />
                      <path
                        d="M11.9897 15.4603C13.897 15.4603 15.4496 13.9082 15.4496 11.9995C15.4496 10.0908 13.8979 8.53857 11.9897 8.53857C10.0816 8.53857 8.52985 10.0908 8.52985 11.9995C8.52985 13.9082 10.0816 15.4603 11.9897 15.4603ZM11.9897 9.85196C13.1741 9.85196 14.1374 10.8156 14.1374 12.0003C14.1374 13.185 13.1741 14.1486 11.9897 14.1486C10.8053 14.1486 9.84201 13.185 9.84201 12.0003C9.84201 10.8156 10.8053 9.85196 11.9897 9.85196Z"
                        fill="white"
                      />
                      <path
                        d="M15.7699 9.09789C16.2835 9.09789 16.7021 8.67999 16.7021 8.1654C16.7021 7.65081 16.2843 7.23291 15.7699 7.23291C15.2554 7.23291 14.8376 7.65081 14.8376 8.1654C14.8376 8.67999 15.2554 9.09789 15.7699 9.09789Z"
                        fill="white"
                      />
                    </svg>
                  </div>

                  <div className=" cursor-pointer">
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.9734 12C24.9734 5.37258 19.6024 0 12.9769 0C6.35148 0 0.980469 5.37258 0.980469 12C0.980469 18.6274 6.35148 24 12.9769 24C19.6024 24 24.9734 18.6274 24.9734 12Z"
                        fill="black"
                      />
                      <path
                        d="M20.5311 9.5134C20.4367 8.60187 20.2335 7.59422 19.4858 7.06467C18.9067 6.65402 18.1455 6.63883 17.4348 6.63968C15.9326 6.63968 14.4296 6.64221 12.9274 6.64305C11.4825 6.64474 10.0377 6.64558 8.59279 6.64727C7.98921 6.64727 7.40249 6.60089 6.84191 6.86229C6.36057 7.08659 5.98376 7.51327 5.757 7.98801C5.44256 8.64825 5.37681 9.3962 5.33888 10.1264C5.26891 11.4562 5.2765 12.7894 5.35995 14.1183C5.42149 15.088 5.57744 16.1597 6.32685 16.7778C6.99112 17.3251 7.92851 17.3521 8.79004 17.3529C11.5247 17.3554 14.2602 17.358 16.9956 17.3597C17.3463 17.3605 17.7122 17.3538 18.0696 17.315C18.7726 17.2391 19.4428 17.0375 19.8946 16.5164C20.3507 15.9911 20.4679 15.26 20.537 14.5677C20.7056 12.888 20.7039 11.1923 20.5311 9.5134ZM11.346 14.3544V9.64495L15.4226 11.9992L11.346 14.3544Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <div className=" grid grid-cols-2 lg:grid-cols-4 lg:gap-10 gap-4">
                  <div className="px-4 md:px-10 lg:space-y-2">
                    <div className="font-semibold">Company</div>

                    <div
                      className="cursor-pointer hover:underline"
                      onClick={() => router.push("/aboutUs")}
                    >
                      About Us
                    </div>

                    <div className="hover:underline cursor-pointer">Blog</div>

                    <div className="hover:underline cursor-pointer">
                      Gift Card
                    </div>

                    <div
                      onClick={scrollToTop}
                      className="cursor-pointer hover:underline"
                    >
                      Back to top
                    </div>
                  </div>

                  <div className="px-4 md:px-10 lg:space-y-2">
                    <div className="font-semibold">Useful Links</div>

                    <div
                      className="cursor-pointer hover:underline"
                      onClick={() => router.push("/shop")}
                    >
                      New Product
                    </div>

                    <div className="cursor-pointer hover:underline">
                      Best Seller
                    </div>

                    <div
                      className="cursor-pointer hover:underline"
                      onClick={() => router.push("/terms-and-conditions")}
                    >
                      Terms & Conditions
                    </div>

                    <div className="cursor-pointer hover:underline">F.A.Q</div>
                  </div>

                  <div className="px-4 md:px-10 lg:space-y-2">
                    <div className="font-semibold">Customer Services</div>

                    <div
                      className="cursor-pointer hover:underline"
                      onClick={() => router.push("/contactUs")}
                    >
                      Contact Us
                    </div>

                    <div className="cursor-pointer hover:underline">
                      Shipping
                    </div>
                    <div className="cursor-pointer hover:underline">
                      Returns
                    </div>
                    <div className="cursor-pointer hover:underline">
                      Order Tracking
                    </div>
                  </div>

                  <div className="px-4 md:px-8 lg:space-y-2">
                    <div className=" font-semibold">Store</div>
                    <div>Faridabad, Haryana (India)</div>
                    <div>+91- 9999887030</div>
                    <div>Contact@woofwoof.in</div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-center md:gap-8 flex-col md:flex-row items-center mt-10">
              <div> © Copyright Woof Woof 2025.</div>
              <Image
                src="/images/payment.png"
                alt="payment"
                width={200}
                height={10}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Footer;
