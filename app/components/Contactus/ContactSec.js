import React from "react";
import ContactForm from "./ContactForm";
import Aos from "aos";

const ContactSec = () => {
  return (
    <div data-aos="zoom-in-up" className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
        <div className=" px-4 md:px-20 xl:px-40">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 justify-center ">
            <ContactForm />
            <section className=" mx-auto">
              <h2 className=" text-3xl lg:text-5xl font-semibold mb-2">
                Feel free to contact us
              </h2>
              <p className="text-gray-600 font-medium mb-8">
                Have a question or need help? Reach out to our team—we’re here
                for you and your furry friends!
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <span>
                    <svg
                      width="35"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="40" rx="20" fill="#F91F54" />
                      <path
                        d="M29 18C29 25 20 31 20 31C20 31 11 25 11 18C11 15.6131 11.9482 13.3239 13.636 11.636C15.3239 9.94821 17.6131 9 20 9C22.3869 9 24.6761 9.94821 26.364 11.636C28.0518 13.3239 29 15.6131 29 18Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20 21C21.6569 21 23 19.6569 23 18C23 16.3431 21.6569 15 20 15C18.3431 15 17 16.3431 17 18C17 19.6569 18.3431 21 20 21Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="font-semibold text-lg">
                    Faridabad, Haryana (India)
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <span>
                    <svg
                      width="35"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="40" rx="20" fill="#F91F54" />
                      <path
                        d="M11.6641 12H27.6641C28.7641 12 29.6641 12.9 29.6641 14V26C29.6641 27.1 28.7641 28 27.6641 28H11.6641C10.5641 28 9.66406 27.1 9.66406 26V14C9.66406 12.9 10.5641 12 11.6641 12Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M29.6641 14L19.6641 21L9.66406 14"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="font-semibold text-lg">
                    info@wedmypet.com
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <span>
                    <svg
                      width="35"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="40" rx="20" fill="#F91F54" />
                      <path
                        d="M30.0014 24.92V27.92C30.0025 28.1985 29.9455 28.4741 29.8339 28.7293C29.7223 28.9845 29.5587 29.2136 29.3535 29.4018C29.1483 29.5901 28.906 29.7335 28.6421 29.8227C28.3783 29.9119 28.0988 29.945 27.8214 29.92C24.7442 29.5856 21.7884 28.5341 19.1914 26.85C16.7752 25.3146 14.7267 23.2661 13.1914 20.85C11.5014 18.2412 10.4496 15.271 10.1214 12.18C10.0964 11.9034 10.1293 11.6247 10.2179 11.3616C10.3065 11.0985 10.449 10.8567 10.6362 10.6516C10.8234 10.4465 11.0512 10.2827 11.3052 10.1705C11.5592 10.0583 11.8337 10.0002 12.1114 9.99997H15.1114C15.5967 9.9952 16.0672 10.1671 16.4352 10.4835C16.8031 10.8 17.0435 11.2394 17.1114 11.72C17.238 12.68 17.4728 13.6227 17.8114 14.53C17.9459 14.8879 17.9751 15.2769 17.8953 15.6509C17.8155 16.0248 17.6303 16.3681 17.3614 16.64L16.0914 17.91C17.515 20.4135 19.5879 22.4864 22.0914 23.91L23.3614 22.64C23.6333 22.3711 23.9766 22.1858 24.3505 22.1061C24.7245 22.0263 25.1135 22.0554 25.4714 22.19C26.3787 22.5285 27.3213 22.7634 28.2814 22.89C28.7672 22.9585 29.2108 23.2032 29.5279 23.5775C29.8451 23.9518 30.0136 24.4296 30.0014 24.92Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="font-semibold text-lg">+91- 9999887030</span>
                </div>

                <div className="flex items-center space-x-4">
                  <span>
                    <svg
                      width="35"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="40" rx="20" fill="#F91F54" />
                      <path
                        d="M19.9987 31.6666C26.442 31.6666 31.6654 26.4432 31.6654 19.9999C31.6654 13.5566 26.442 8.33325 19.9987 8.33325C13.5554 8.33325 8.33203 13.5566 8.33203 19.9999C8.33203 26.4432 13.5554 31.6666 19.9987 31.6666Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20 13V20L24.6667 22.3333"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="font-semibold text-lg">
                    Mon – Fri: 10AM – 10PM
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSec;
