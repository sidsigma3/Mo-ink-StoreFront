import React from 'react';

export default function MainKMHero() {
  return (
  
      <div
      className="relative h-[200px] lg:h-[400px] bg-center bg-cover flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/19644395/pexels-photo-19644395.jpeg')`,
      }}
    >
      {/* Dark overlay */}
        <div class="absolute top-0 left-0 w-full h-full bg-black opacity-45 z-0"></div>
      {/* Content */}
      <div className="relative z-10 px-4 space-y-5">
        <h1 className="text-white lg:text-5xl text-3xl font-extrabold leading-tight sm:text-6xl">
          Know More <br />
           <span className="block w-full h-3 bg-purple-800 mt-4"></span> 
        </h1>
        {/* <a
          href="/login"
          className="inline-block text-base sm:text-lg font-medium rounded-full text-white py-2 px-10 bg-purple-800 border border-purple-600 hover:text-purple-600 hover:bg-transparent transition"
        >
          See Colors
        </a> */}
      </div>
    </div>
  );
}
