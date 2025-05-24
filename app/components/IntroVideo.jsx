// components/IntroVideo.jsx
"use client";
import React, { useEffect, useState } from "react";

const IntroVideo = ({ onFinish }) => {
  return (
    <div className="fixed inset-0 z-50 sm:bg-white flex items-center justify-center">
      <video
        src="/video/introVideo.mp4"
        className="w-full h-full object-contain"
        autoPlay
        muted
        playsInline
        onEnded={onFinish}
      />
      {/* <button
        onClick={onFinish}
        className="absolute top-6 right-6 bg-white text-black px-4 py-2 rounded-lg"
      >
        Skip
      </button> */}
    </div>
  );
};

export default IntroVideo;
