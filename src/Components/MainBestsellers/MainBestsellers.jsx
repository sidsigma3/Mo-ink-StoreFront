import React from 'react';
import { Image } from 'react-bootstrap';

const MainBestsellers = () => {
  const products = [
    { title: "Bamboo Yarn", price: "₹142.00/kg", img: "/images/Yarn1.jpg", count: "2/80", type: "Cone/Hank" },
    { title: "Modal Yarn", price: "₹256.00/kg", img: "/images/Yarn2.jpg", count: "2/100", type: "Cone/Hank" },
    { title: "Cotton Yarn", price: "₹327.00/kg", img: "/images/Yarn3.jpg", count: "1/40", type: "Cone/Hank" },
    { title: "Excel Yarn", price: "₹169.00/kg", img: "/images/Yarn4.jpg", count: "2/60", type: "Cone/Hank" },
    { title: "Viscose Yarn", price: "₹142.00/kg", img: "/images/Yarn5.jpg", count: "2/90", type: "Cone/Hank" },
    { title: "Spandex Yarn", price: "₹256.00/kg", img: "/images/Yarn6.jpg", count: "1/60", type: "Cone/Hank" },
    { title: "Linen Yarn", price: "₹327.00/kg", img: "/images/Yarn7.jpg", count: "1/92", type: "Cone/Hank" },
    { title: "Silk Yarn", price: "₹169.00/kg", img: "/images/Yarn8.jpg", count: "2/80", type: "Cone/Hank" },
  ];

  return (
    <section id="products" className="relative px-4 bg-white py-20 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-14 relative z-10">
        <p className="text-purple-800 text-lg font-bold mb-3 tracking-widest uppercase">
          Yarn Store
        </p>
        <h2 className="text-3xl lg:text-5xl font-semibold text-black">
        High-Quality Yarns
        </h2>
      </div>

      {/* Product Grid */}
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-center gap-6 sm:gap-10 relative z-10">
        {products.map((item, index) => (
          <div
            key={index}
            className="w-full sm:w-[280px] flex flex-col items-center p-4 rounded-2xl border border-gray-100 shadow-lg bg-white"
          >
            <div className="w-full h-[240px] rounded-2xl overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                width={400}
                height={240}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mt-4">{item.title}</h3>

            {/* Counter + Type Row */}
            <div className="flex items-center justify-center gap-2 mt-2">
              {/* <span className="text-sm text-gray-500">{item.count}</span> */}
              <span className="text-sm font-medium rounded-full bg-[#FFEE9A] text-purple-800 px-3 py-1">
                {item.type}
              </span>
            </div>
            <a
              href="/login"
              className="text-purple-800 text-lg font-bold mt-3 hover:underline"
            >
              View
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainBestsellers;
