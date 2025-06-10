import React from 'react';

export default function MainKMHero() {
  return (
    <div
      className="relative h-[400px] bg-fixed bg-center bg-cover flex items-center justify-center text-center overflow-hidden">
        {/* ✅ Background Video */}
  <video
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/11965401_3840_2160_24fps%20(1).mp4?updatedAt=1749552024329" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
      {/* Dark overlay */}
        <div class="absolute top-0 left-0 w-full h-full bg-black opacity-45 z-0"></div>
      {/* Content */}
      <div className="relative z-10 px-4 space-y-5">
        <h1 className="text-white text-5xl font-extrabold leading-tight sm:text-6xl">
          Know More <br />
           <span className="block w-full h-3 bg-violet-800 mt-4"></span> 
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
