import React from 'react';


const FeaturedBox = ({ productName, number, color, imageUrl }) => {

  const categoryImages = {
    "Cotton": "/images/Yarn3.jpg",
    // "Silk": "/images/Yarn7.jpg",
    // "Combed Compact Cotton": "/images/Yarn1.jpg",
    "Excel": "/images/Yarn2.jpg",
    "Micro Modal": "/images/Yarn5.jpg",
    "Bamboo": "/images/Yarn4.jpg",
  
  };

  const imageSrc = imageUrl || categoryImages[productName] || '';

  return (
    <a
      href="#"
      className="relative bg-white rounded-bl-2xl rounded-tr-2xl rounded-br-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col items-center"
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
  );
};

export default FeaturedBox;
