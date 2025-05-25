import Aos from "aos";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className=" md:p-10 p-4">
      <div className=" relative bg-[#292929] rounded-3xl text-white">
        <Image
          src="/images/vectorPaws.png"
          alt="footer"
          width={600}
          height={600}
          className=" absolute w-full h-full object-contain rounded-3xl"
        />
        <div
          data-aos="zoom-in-up"
          data-aos-duration="1500"
          className="w-full relative py-4 md:py-12"
        >
          <div className=" px-4 md:px-16 xl:px-40 space-y-10">
            <div className=" grid grid-cols-1 lg:grid-cols-[25%_75%] lg:gap-10 gap-6 justify-center items-center">
              <div className=" flex flex-col justify-center items-center lg:max-w-[200px] space-y-5">
                <div className=" flex justify-center items-center gap-2">
                  <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={40}
                    height={40}
                  />
                  <span className=" font-bold text-xl">Wed My Pet</span>
                </div>
                <div>
                  Connecting Pets and People: Your Happy Tails Start Here!
                </div>
                <div className=" flex gap-3">
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.9921 12.0004C23.9921 18.0612 19.5008 23.0717 13.6663 23.8848C13.1208 23.9605 12.5626 24 11.996 24C11.3421 24 10.6999 23.9479 10.0745 23.847C4.36266 22.9271 0 17.9729 0 12.0004C0 5.37294 5.37136 0 11.9969 0C18.6224 0 23.9938 5.37294 23.9938 12.0004H23.9921Z"
                        fill="black"
                      />
                      <path
                        d="M13.6661 9.63613V12.2503H16.899L16.387 15.7717H13.6661V23.8849C13.1205 23.9606 12.5624 24.0001 11.9958 24.0001C11.3418 24.0001 10.6996 23.948 10.0742 23.8471V15.7717H7.09265V12.2503H10.0742V9.05175C10.0742 7.06737 11.6823 5.45801 13.6669 5.45801V5.45969C13.6728 5.45969 13.6778 5.45801 13.6837 5.45801H16.8998V8.50352H14.7983C14.1738 8.50352 13.6669 9.01055 13.6669 9.63529L13.6661 9.63613Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div>
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
                  <div>
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.9788 12.0004C24.9788 18.0612 20.4875 23.0717 14.653 23.8848C14.1074 23.9605 13.5493 24 12.9827 24C12.3288 24 11.6866 23.9479 11.0612 23.847C5.34935 22.9271 0.986694 17.9729 0.986694 12.0004C0.986694 5.37294 6.35806 0 12.9836 0C19.6091 0 24.9805 5.37294 24.9805 12.0004H24.9788Z"
                        fill="black"
                      />
                      <path
                        d="M5.85133 5.29297L11.3841 12.6923L5.81686 18.7085H7.07019L11.9448 13.4415L15.8829 18.7085H20.1472L14.3034 10.8929L19.4857 5.29297H18.2324L13.7436 10.1438L10.1165 5.29297H5.85216H5.85133ZM7.6939 6.21621H9.65247L18.303 17.7853H16.3444L7.6939 6.21621Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div>
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
                  <div className=" px-4 md:px-10 lg:space-y-2">
                    <div className=" font-semibold">Company</div>
                    <div>About Us</div>
                    <div>Blog</div>
                    <div>Gift Card</div>
                    <div>Career</div>
                  </div>
                  <div className=" px-4 md:px-10 lg:space-y-2">
                    <div className=" font-semibold">Useful Links</div>
                    <div>New Product</div>
                    <div>Best Seller</div>
                    <div>Discount</div>
                    <div>F.A.Q</div>
                  </div>
                  <div className=" px-4 md:px-10 lg:space-y-2">
                    <div className=" font-semibold">Customer Services</div>
                    <div>Contact Us</div>
                    <div>Shipping</div>
                    <div>Returns</div>
                    <div>Order Tracking</div>
                  </div>
                  <div className="px-4 md:px-10 lg:space-y-2">
                    <div className=" font-semibold">Store</div>
                    <div>Faridabad, Haryana (India)</div>
                    <div>+91- 9999887030</div>
                    <div>info@wedmypet.com</div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-between flex-col md:flex-row items-center mt-10">
              <div> © Copyright Wed My Pet 2025.</div>
              <Image
                src="/images/payment.png"
                alt="payment"
                width={200}
                height={10}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
