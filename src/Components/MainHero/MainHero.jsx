import React from 'react';

const MainHero = () => {
  return (
    <section id="home-section" className="relative w-full overflow-hidden">
      {/* Responsive Background Container with Aspect Ratio */}
      <div
        className="
          relative
          w-full
          h-[50vh]           
          sm:h-[60vh]         
          md:h-[70vh]        
          lg:h-[80vh]        
          xl:h-[100vh]        
          bg-cover 
          bg-center 
          rounded-3xl 
          overflow-hidden 
          z-0
        "
        style={{
          backgroundImage:
            "url(https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/MainHero_Banner.png?updatedAt=1745685185559)", height: "80vh",
        }}
      >
        {/* Content Layered Inside */}
        <div className="absolute inset-0 z-10 container mx-auto px-4 py-20 lg:py-24 flex items-center justify-start">
          <div className="text-left max-w-3xl">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-black mb-6">
              Yarn is What We Do. <br />And We Do It Best.
            </h1>
            <p className="text-gray-500 text-base sm:text-lg mb-8">
              We spin strength, reliability, and performance into every strand. <br />
              Made for manufacturers. Delivered in bulk.
            </p>

            <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
              <a
                href="/login"
                className="text-base sm:text-lg font-medium rounded-full text-white py-2 px-10 bg-purple-800 border border-purple-600 hover:text-purple-600 hover:bg-transparent transition"
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
