"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/testimonial");
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      const data = await response.json();
      setTestimonials(data.testimonials || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError(err.message);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const total = testimonials.length;

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
          <div className="px-4 md:px-24 xl:px-40">
            <div className="animate-pulse space-y-4">
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
              <div className="h-12 w-72 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <div className="w-full">
        <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
          <div className="px-4 md:px-24 xl:px-40">
            <p className="text-gray-500">
              {error || "No testimonials available"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
        <div className="px-4 md:px-24 xl:px-40">
          <div>
            <h4 className="text-xl font-semibold text-[#F31C51]">
              Testimonials
            </h4>
            <h2 className="text-5xl font-semibold">
              What people say about us
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] lg:gap-2">
            <div className="flex flex-col justify-between mt-6">
              <div>
                <div className="flex gap-3 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span className="" key={i}>
                      {i < testimonials[current].stars ? (
                        <span className="text-[#ff0047] text-3xl">
                          <svg
                            width="20"
                            height="19"
                            viewBox="0 0 20 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.04894 1.33501C9.3483 0.4137 10.6517 0.413699 10.9511 1.33501L12.4697 6.00877C12.6035 6.42079 12.9875 6.69975 13.4207 6.69975H18.335C19.3037 6.69975 19.7065 7.93937 18.9228 8.50877L14.947 11.3973C14.5966 11.652 14.4499 12.1033 14.5838 12.5153L16.1024 17.1891C16.4017 18.1104 15.3472 18.8765 14.5635 18.3071L10.5878 15.4186C10.2373 15.164 9.7627 15.164 9.41221 15.4186L5.43648 18.3071C4.65276 18.8765 3.59828 18.1104 3.89763 17.1891L5.41623 12.5154C5.55011 12.1033 5.40345 11.652 5.05296 11.3973L1.07722 8.50877C0.293507 7.93937 0.696283 6.69975 1.66501 6.69975H6.57929C7.01252 6.69975 7.39647 6.42079 7.53035 6.00877L9.04894 1.33501Z"
                              fill="#F82A5C"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="text-gray-300 text-3xl">
                          <svg
                            width="20"
                            height="19"
                            viewBox="0 0 20 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.04894 1.33501C9.3483 0.4137 10.6517 0.413699 10.9511 1.33501L12.4697 6.00877C12.6035 6.42079 12.9875 6.69975 13.4207 6.69975H18.335C19.3037 6.69975 19.7065 7.93937 18.9228 8.50877L14.947 11.3973C14.5966 11.652 14.4499 12.1033 14.5838 12.5153L16.1024 17.1891C16.4017 18.1104 15.3472 18.8765 14.5635 18.3071L10.5878 15.4186C10.2373 15.164 9.7627 15.164 9.41221 15.4186L5.43648 18.3071C4.65276 18.8765 3.59828 18.1104 3.89763 17.1891L5.41623 12.5154C5.55011 12.1033 5.40345 11.652 5.05296 11.3973L1.07722 8.50877C0.293507 7.93937 0.696283 6.69975 1.66501 6.69975H6.57929C7.01252 6.69975 7.39647 6.42079 7.53035 6.00877L9.04894 1.33501Z"
                              fill="#e5dedc"
                            />
                          </svg>
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <div>
                  <h4 className="text-gray-700 text-lg font-medium italic">
                    {testimonials[current].message}
                  </h4>
                </div>
              </div>
              <div className="flex justify-between items-center lg:mb-16">
                <div>
                  <h2 className="text-2xl font-semibold tracking-wider">
                    {testimonials[current].name}
                  </h2>
                  <h4 className="text-lg text-gray-700 font-medium">
                    {testimonials[current].role}
                  </h4>
                </div>
                <div className="flex gap-6">
                  <div className="cursor-pointer" onClick={handlePrev}>
                    <svg
                      width="35"
                      height="35"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="40"
                        height="40"
                        rx="20"
                        transform="matrix(-1 0 0 1 40 0)"
                        fill="black"
                      />
                      <path
                        d="M23 26L17 20L23 14"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="cursor-pointer" onClick={handleNext}>
                    <svg
                      width="35"
                      height="35"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="40" height="40" rx="20" fill="black" />
                      <path
                        d="M17 26L23 20L17 14"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full h-[200px] md:h-[400px] flex justify-center items-center overflow-hidden">
              <Image
                src="/images/testimonialBg.png"
                alt="testimonialBG"
                width={300}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute w-[150px] h-[150px] md:w-[220px] md:h-[220px] xl:w-[280px] xl:h-[280px]">
                <Image
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  width={280}
                  height={280}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;