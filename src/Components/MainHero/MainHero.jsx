import React from 'react';

const MainHero = () => {
  return (
    <section id="home-section" className="relative w-full overflow-hidden">

      {/* Mobile View */}
  
      <div className="block sm:hidden relative w-full h-[87vh] overflow-hidden rounded-3xl">
        {/* Optimized LCP image */}
        <img
          src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/MainHero_Mobile_Banner.png?updatedAt=1749534746101"
          alt="Mobile Hero"
          className="absolute inset-0 w-full h-full bg-[radial-gradient(circle,_rgba(0,0,0,0.5)_0%,_rgba(0,0,0,0)_80%)] object-cover"
          loading="eager"
          fetchpriority="high"
        />
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,245,234,0.9)_0%,_rgba(0,0,0,0)_80%)] pointer-events-none select-none"></div>

            {/* <div className="absolute inset-0 bg-gradient-to-t from-[#ffeb9b] via-transparent to-transparent rounded-xl z-0" /> */}

        {/* Overlay content */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-4">

          <div className="max-w-3xl text-left">
            <h1 className="text-3xl font-bold text-black mb-6 text-center leading-snug">
              Yarn is What We Do. <br />And We Do It Best.
            </h1>
            <p className="text-gray-800 text-base mb-8 text-center">
              We spin strength, reliability, and performance into every strand.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="/login"
                className="text-base font-medium rounded-full text-white py-2 px-10 bg-purple-800 border border-purple-600 hover:text-purple-600 hover:bg-transparent transition"
              >
                Explore Yarns
              </a>
            </div>
          </div>
        </div>
      </div>


      {/* Desktop View */}
      <div
        className="hidden sm:block w-full h-[85vh] bg-cover bg-[position:center] bg-no-repeat rounded-3xl z-0"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/MainHero_Banner.png?updatedAt=1745685185559')",
        }}
      >
        <div className="w-full h-full flex items-center px-12">
          <div className="max-w-3xl">
            <h1 className="text-center text-5xl lg:text-6xl font-bold text-black mb-6">
              Yarn is What We Do. <br />And We Do It Best.
            </h1>
            <p className="text-center text-gray-800 text-lg mb-8">
              We spin strength, reliability, and performance into every strand. <br />
              Made for manufacturers.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="/login"
                className="text-base text-center font-medium rounded-full text-white py-2 px-10 bg-purple-800 border border-purple-600 hover:text-purple-600 hover:bg-transparent transition"
              >
                Explore Yarns
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default MainHero;
