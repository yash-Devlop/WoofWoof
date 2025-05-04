"use client";
import Image from "next/image";
import React, { useState } from "react";

const VideoSec = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="w-full relative">
      <div className="bg-white rounded-3xl m-4 md:m-12 py-6">
        <div className=" px-4 md:px-24 xl:px-40">
          <div
            // data-aos="zoom-out"
            className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden"
          >
            {!isPlaying ? (
              <div className="relative w-full h-[300px] md:h-[500px] bg-black/20">
                {/* Blurred Thumbnail */}
                <Image
                  src="/images/team1.png"
                  alt="Video Thumbnail"
                  fill
                  className="object-cover blur-sm brightness-75"
                />

                {/* Play Button */}
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="bg-[#F82A5C] rounded-full p-4 hover:scale-105 cursor-pointer transition-transform">
                    <svg
                      width="30"
                      height="31"
                      viewBox="0 0 80 81"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="40" cy="40.8157" r="40" fill="#F82A5C" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M54.3681 37.9232C54.8643 38.2162 55.2763 38.6374 55.5628 39.1445C55.8492 39.6516 56 40.2268 56 40.8123C56 41.3977 55.8492 41.9729 55.5628 42.48C55.2763 42.9871 54.8643 43.4083 54.3681 43.7013L32.8988 56.364C32.4032 56.6598 31.8395 56.8157 31.2655 56.8157C30.6915 56.8157 30.1278 56.6598 29.6321 56.364C29.1337 56.0737 28.7198 55.653 28.433 55.1454C28.1462 54.6377 27.9968 54.0612 28.0001 53.475V28.15C28.0005 27.5646 28.1517 26.9896 28.4385 26.4828C28.7252 25.9759 29.1375 25.5551 29.6338 25.2625C30.1302 24.9698 30.6932 24.8158 31.2663 24.8157C31.8393 24.8156 32.4024 24.9695 32.8988 25.262L54.3681 37.9232Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            ) : (
              // Embed Video
              <video
                controls
                autoPlay
                className="w-full h-[300px] md:h-[500px] object-cover"
              >
                <source src="/assets/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSec;
