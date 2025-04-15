import React, { useEffect } from 'react';

export default function MainMap() {
  useEffect(() => {
    const disableContext = (e) => e.preventDefault();
    document.addEventListener('contextmenu', disableContext);
    return () => document.removeEventListener('contextmenu', disableContext);
  }, []);

  return (
    <section className="relative w-full text-center bg-white overflow-hidden">

      {/* Left Side Decorations */}
      <img src="/images/curly-arrow-decor.png" className="hidden sm:block absolute -left-0 top-[50%] opacity-60 w-[150px] rotate-90 pointer-events-none z-0" alt="decor" />
    
      {/* Right Side Decorations */}
      <img src="/images/Pin_Decor.png" className="hidden sm:block absolute right-20 top-[20%] w-30 opacity-60 rotate-12 pointer-events-none z-0" alt="decor" />
      <img src="/images/Shape decor.png" className="hidden sm:block absolute -right-0 top-[80%] opacity-60 w-[150px] rotate-90 pointer-events-none z-0" alt="decor" />

      {/* Content Wrapper with higher z-index */}
      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-purple-800 text-lg font-bold mb-3 tracking-widest uppercase">
            Pan-India Coverage
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-900">
            Seamless Nationwide Delivery
          </h2>
          <p className="mt-4 text-md text-gray-500 max-w-2xl mx-auto">
            Our robust logistics network spans the length and breadth of India, enabling smooth and timely delivery of high-quality yarn, wherever your operations are based.
          </p>
        </div>

        {/* Map Image */}
        <div className="mt-12 w-full max-w-7xl mx-auto">
          <img
            src="/images/MainMap.png"
            alt="India Connected Map"
            className="w-full h-auto object-contain pointer-events-none select-none"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
