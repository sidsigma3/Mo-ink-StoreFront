import React from 'react';
import { FaScissors } from "react-icons/fa6";

const FeaturedBox = ({ productName, number, color, imageUrl }) => {
  const categoryImages = {
    "Cotton": "/images/Yarn3.jpg",
    "Excel": "/images/Yarn2.jpg",
    "Micro Modal": "/images/Yarn5.jpg",
    "Bamboo": "/images/Yarn4.jpg",
    "Lenzing Micro Modal": "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Yarn1.png?updatedAt=1754928796191",
    "Viscose": "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Yarn7.jpg?updatedAt=1749718954502",
    "Tencel": "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Yarn6.jpg?updatedAt=1749718954437",
    "Ecovero": "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Yarn8.png?updatedAt=1754927536082",
    "Birla Micro Modal": "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Yarnss.png?updatedAt=1754933798745",
    "Livaeco": "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Yarns.png?updatedAt=1754933780605",
    "Flax Varieties": "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Yarn7%20%20.png?updatedAt=1754927543913",
    "Excel-Linen": "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Yarn22.png?updatedAt=1756185220923",
  };

  const imageSrc = imageUrl || categoryImages[productName] || '';

  const mobileView = (
    <div className="relative w-full h-32 rounded-xl overflow-hidden shadow-sm">
      {/* Background image container */}
      <div
        className="absolute inset-0 bg-gray-100"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-10" />
      
      {/* Product name label - positioned at top left */}
      <div className="absolute top-0 left-0 z-10">
        <span className="inline-block bg-purple-800 text-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-br-lg">
          {productName}
        </span>
      </div>
    </div>
  );

  return (
    <div className="snap-start shrink-0">
      {/* Mobile View */}
      <div className="block sm:hidden w-[130px]">
        {mobileView}
      </div>

      {/* Desktop View */}
      <a
        href="#"
        className="hidden sm:flex relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition flex-col items-center"
        style={{ width: '18rem', padding: '1rem' }}
      >
        <div className="text-center">
          <strong className="text-lg font-semibold text-gray-900 block">
            {productName}
          </strong>
        </div>

        <div className="size-64 bg-gray-100 rounded-full flex items-center justify-start overflow-hidden mt-2 mb-2">
          <img
            src={imageSrc}
            alt={productName}
            className="object-contain h-full w-full transition-transform duration-500 ease-in-out hover:scale-110"
          />
        </div>
      </a>
    </div>
  );
};

export default FeaturedBox;