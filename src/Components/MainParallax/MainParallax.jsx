import React from 'react';

export default function MainParallax() {
  return (
    <div
      className="relative h-[500px] bg-fixed bg-center bg-cover flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `url('/images/ParallaxPic.jpg')`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75 z-0" />

      {/* Content */}
      <div className="relative z-10 px-4 space-y-5">
        <h1 className="text-white text-5xl font-extrabold leading-tight sm:text-6xl">
          NEED CUSTOM <br /> COLORS?
        </h1>
        <p className="text-white text-md max-w-2xl mx-auto">
        we offer custom color dyeing services tailored to your exact specifications. Whether you need to match a brand palette or recreate a unique tone, our color experts ensure accuracy, consistency, and quality in every batch.
        </p>
        <a
          href="/login"
          className="inline-block text-base sm:text-lg font-medium rounded-full text-white py-2 px-10 bg-purple-800 border border-purple-600 hover:text-purple-600 hover:bg-transparent transition"
        >
          See Colors
        </a>
      </div>
    </div>
  );
}
