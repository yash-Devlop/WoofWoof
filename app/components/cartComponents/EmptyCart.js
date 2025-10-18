import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const EmptyCart = () => {
  const router = useRouter();

  return (
    <div className="relative bg-white flex justify-center items-center min-h-[60vh] m-4 rounded-3xl md:mx-12">
      <div className="relative z-10 container p-8 md:px-12 rounded-3xl text-center">
        {/* Empty Cart Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-16 h-16 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Start shopping to find amazing products!
        </p>

        {/* CTA Button */}
        <button
          onClick={() => router.push('/shop')}
          className="bg-[#F91F54] gap-4 flex justify-center items-center px-6 py-3 mx-auto group scale-95 hover:scale-100 transition-all duration-300 text-white font-medium text-sm lg:text-lg rounded-full uppercase cursor-pointer"
        >
          Start Shopping
          <span>
            <Image
              src="/images/logo2.png"
              width={33}
              height={33}
              alt="logo"
              className="transition-all duration-300"
            />
          </span>
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;