import React from 'react';

const MainHero = () => {
  return (
    <section id="home-section" className="relative w-full h-1/2 lg:h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 rounded-3xl mt-10 max-h-screen"
        style={{ backgroundImage: "url('/images/MainHero_Banner.png')" }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-28 lg:py-24 h-full flex items-center justify-center">
        <div className="text-center max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-6">
          Yarn is What We Do. <br />And We Do It Best. 
          </h1>
          <p className="text-gray-50 text-base sm:text-lg mb-8">
          We spin strength, reliability, and performance into every strand. Made for manufacturers. Delivered in bulk.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/login"
              className="text-base sm:text-lg font-medium rounded-full text-white py-2 px-10 bg-purple-800 border border-purple-600 hover:text-purple-600 hover:bg-transparent transition"
            >
              Explore Yarn Types
            </a>
            {/* <a
              href="#about-section"
              className="text-base sm:text-lg font-medium rounded-full text-purple-600 border border-purple-800 py-3 px-6 hover:bg-purple-600 hover:text-white transition"
            >
              Explore now
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainHero;
