import React from 'react';

export default function MainMarketing() {
  return (
    <section className="w-full bg-[#FFFBED] flex flex-col items-center justify-center overflow-hidden">
      {/* Map Image */}
      <div className="my-12 w-full max-w-7xl mx-full">
        <img
          src="/images/MainMarketing.png"
          alt="India Connected Map"
          className="w-full h-auto object-contain pointer-events-none select-none"
          draggable={false}
        />
      </div>
    </section>
  );
}
