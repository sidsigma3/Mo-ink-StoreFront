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


  // const mobileView = (
  //   <div className={`flex flex-col items-center justify-center w-full h-28 rounded-xl ${iconData[productName]?.bg || 'bg-gray-100 text-gray-500'}`}>
  //     <div className="text-2xl mb-1">{iconData[productName]?.icon || "🧵"}</div>
  //     <div className="text-lg mt-2 font-medium text-center">{productName}</div>
  //   </div>
  // );

const mobileView = (
<div>
  <div
    className={`flex flex-col items-center border-2 border-white bg-[#DCDDD7]  justify-center w-full h-28 rounded-xl bg-no-repeat relative overflow-hidden text-white`}
    style={{
      backgroundImage: `url(${imageSrc})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
    }}
  >
    {/* Gradient overlays */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#DCDDD7] via-transparent to-transparent rounded-xl z-0" />
    <div className="absolute inset-0 bg-gradient-to-l from-[#DCDDD7] via-transparent to-transparent rounded-xl z-0" />

    {/* Product name at top-left corner */}
    <div className="absolute top-0 left-0 z-10">
    <span className="absolute -left-px -top-px rounded-br-3xl  bg-purple-800 px-3 py-1 text-sm font-medium uppercase whitespace-nowrap tracking-widest text-white z-20">
            {productName}
          </span>
      <span className="text-dark font-semibold text-sm">{productName}</span>
    </div>


  </div>
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
