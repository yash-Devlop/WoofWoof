// components/IntroVideo.jsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const IntroVideo = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 5500); // adjust time (in ms) based on GIF length

    return () => clearTimeout(timer);
  }, [onFinish]);
  return (
    <div className="fixed inset-0 z-50 sm:bg-white flex items-center justify-center">
      {/* <video
        src="/video/introVideo.mp4"
        className="w-full h-full object-contain"
        autoPlay
        muted
        playsInline
        onEnded={onFinish}
      /> */}
      {/* <button
        onClick={onFinish}
        className="absolute top-6 right-6 bg-white text-black px-4 py-2 rounded-lg"
      >
        Skip
      </button> */}

      <img
        src="/video/woofIntro.gif" // ✅ path to your gif file
        alt="Intro Animation"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default IntroVideo;
