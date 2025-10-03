"use client"
import React, { useState } from 'react';

const Card = ({ title, backContent, frontColor, backColor }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Determine text color based on background brightness
  const getTextColor = (bgColor) => {
    // If it's a dark color (red shades), use white text
    if (bgColor.includes('#ff0047') || bgColor.includes('#B22222') || bgColor.includes('red')) {
      return 'text-white';
    }
    // For light colors (beige), use dark text
    return 'text-gray-800';
  };

  const frontTextColor = getTextColor(frontColor);
  const backTextColor = getTextColor(backColor);

  return (
    <div
      className="w-full h-80 perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? 'rotate-x-180' : ''
        }`}
      >
        {/* Front Side */}
        <div
          className={`absolute w-full h-full ${frontColor} rounded-3xl flex items-center justify-center p-8 backface-hidden shadow-lg`}
        >
          <h2 className={`text-3xl font-serif text-center ${frontTextColor}`}>
            {title}
          </h2>
        </div>

        {/* Back Side */}
        <div
          className={`absolute w-full h-full ${backColor} rounded-3xl flex items-center justify-center p-8 backface-hidden shadow-lg`}
          style={{ transform: 'rotateX(180deg)' }}
        >
          <p className={`text-lg font-serif text-center ${backTextColor} leading-relaxed`}>
            {backContent}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function CardsPage() {
  const cards = [
    {
      title: 'Focus on the Poor',
      backContent: 'BIRRD provides free medical treatment and facilities to those in need, ensuring access to crucial healthcare regardless of their socio-economic background.',
      frontColor: 'bg-[#F5DEB3]',
      backColor: 'bg-[#ff0047]'
    },
    {
      title: 'Orthopaedic Specialization',
      backContent: 'They offer specialized care for a wide range of musculoskeletal conditions, helping individuals regain mobility and improve their quality of life.',
      frontColor: 'bg-[#ff0047]',
      backColor: 'bg-[#F5DEB3]'
    },
    {
      title: 'Comprehensive Rehabilitation Services',
      backContent: 'Beyond surgery, BIRRD supports patients through their Artificial Limb Fitting Centre and Physiotherapy Department, offering crucial rehabilitation services.',
      frontColor: 'bg-[#F5DEB3]',
      backColor: 'bg-[#ff0047]'
    },
    {
      title: 'State-of-the-Art Facilities',
      backContent: 'Equipped with modern medical equipment, including five operation theaters, BIRRD ensures patients receive high-quality care.',
      frontColor: 'bg-[#ff0047]',
      backColor: 'bg-[#F5DEB3]'
    },
    {
      title: 'Educational Institution',
      backContent: 'BIRRD is recognized by the National Board of Examination and offers DNB courses, contributing to the education of future medical professionals.',
      frontColor: 'bg-[#F5DEB3]',
      backColor: 'bg-[#ff0047]'
    },
    {
      title: 'Community Involvement',
      backContent: 'As a non-profit organization funded by the Tirumala Tirupati Devasthanam and public donations, BIRRD embodies a strong commitment to community well-being.',
      frontColor: 'bg-[#ff0047]',
      backColor: 'bg-[#F5DEB3]'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif text-center mb-16 text-gray-800">
          Our Core Values
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              backContent={card.backContent}
              frontColor={card.frontColor}
              backColor={card.backColor}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        .rotate-x-180 {
          transform: rotateX(180deg);
        }
      `}</style>
    </div>
  );
}