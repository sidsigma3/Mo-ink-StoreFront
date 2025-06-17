import React from 'react';
import { FaScissors } from "react-icons/fa6";

const FeaturedBox = ({ productName, number, color, imageUrl }) => {
  const categoryImages = {
    "Cotton": "/images/Yarn3.jpg",
    "Excel": "/images/Yarn2.jpg",
    "Micro Modal": "/images/Yarn5.jpg",
    "Bamboo": "/images/Yarn4.jpg",
  };

  const imageSrc = imageUrl || categoryImages[productName] || '';

  const iconData = {
    "Cotton": {
      icon: <FaScissors className='text-blue-500'/>, 
      bg: "bg-blue-100 text-blue-500 border-2 border-blue-200",
    },
    "Excel": {
      icon: "🍃",
      bg: "bg-green-100 text-green-600 border-2 border-green-200",
    },
    "Micro Modal": {
      icon: "⭐",
      bg: "bg-amber-100 text-amber-600 border-2 border-amber-200",
    },
    "Bamboo": {
      icon: "❤️",
      bg: "bg-pink-100 text-pink-500 border-2 border-pink-200",
    },
  };

  const mobileView = (
    <div className={`flex flex-col items-center justify-center w-full h-28 rounded-xl ${iconData[productName]?.bg || 'bg-gray-100 text-gray-500'}`}>
      <div className="text-2xl mb-1">{iconData[productName]?.icon || "🧵"}</div>
      <div className="text-lg mt-2 font-medium text-center">{productName}</div>
    </div>
  );

  return (
    <div>
      <div className="block sm:hidden">
        {mobileView}
      </div>

      <a
        href="#"
        className="hidden sm:flex relative bg-white rounded-bl-2xl rounded-tr-2xl rounded-br-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition flex-col items-center"
        style={{ width: '18rem', padding: '1rem' }}
      >
        <span
          className="absolute -left-px -top-px rounded-bl-3xl rounded-tr-3xl bg-yellow-300 px-6 py-2 font-medium uppercase tracking-widest text-black text-sm md:text-md "
        >
          Premium Yarn
        </span>

        <div className="size-64 bg-gray-100 rounded-lg flex items-center justify-start overflow-hidden mb-2">
          <img
            src={imageSrc}
            alt={productName}
            className="object-contain h-full w-full"
          />
        </div>

        <div className="text-center">
          <strong className="text-lg font-semibold text-gray-900 block">
            {productName}
          </strong>

          <p className="mt-2 text-gray-700 text-sm">
            {number} SKU
          </p>

          <p className="mt-1 text-gray-700 text-sm">
            {color} Color
          </p>
        </div>
      </a>
    </div>
  );
};

export default FeaturedBox;
