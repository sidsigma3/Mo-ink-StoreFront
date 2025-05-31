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
           sm:bg-center bg-[position:right_40%_center] bg-no-repeat bg-cover
        "
        style={{
           
          backgroundImage:
            "url(https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/MainHero_Banner.png?updatedAt=1745685185559)", height: "87vh",
        }}
      >
        {/* Content Layered Inside */}
        <div className="absolute inset-0 z-10 container mx-auto px-4 py-10 lg:py-24 flex items-start md:items-center justify-center md:justify-start">
        <div className="max-w-3xl  ">
        {/* Mobile version: */}
        <div className="block sm:hidden">
          <h1 className="text-center text-3xl font-bold text-black mb-6">
            Yarn is What We Do. <br />And We Do It Best.
          </h1>
          <p className="text-center text-gray-800 text-base mb-8">
            We spin strength, reliability, and performance into every strand. <br />
            Made for manufacturers.
          </p>

          <div className="flex flex-col sm:flex-row  items-center justify-center md:justify-start gap-4">
              <a
                href="/login"
                className="text-base sm:text-lg font-medium rounded-full text-white py-2 px-10
                          bg-purple-800 border border-purple-600
                          hover:text-purple-600 hover:bg-transparent transition"
              >
                Explore Yarns
              </a>
            </div>
        </div>

            {/* Desktop version: */}
            <div className="hidden sm:block">
              <h1 className="text-start text-5xl lg:text-7xl font-bold text-black mb-6">
                Yarn is What We Do. <br />And We Do It Best.
              </h1>
              <p className="text-center text-gray-800 text-lg mb-8">
                We spin strength, reliability, and performance into every strand. <br />
                Made for manufacturers.
              </p>

              <div className="flex flex-col sm:flex-row  items-center justify-center md:justify-center gap-4">
                  <a
                    href="/login"
                    className="text-base sm:text-lg font-medium rounded-full text-white py-2 px-10
                              bg-purple-800 border border-purple-600
                              hover:text-purple-600 hover:bg-transparent transition"
                  >
                    Explore Yarns
                  </a>
                </div>
            </div>


        {/* <div className="flex flex-col sm:flex-row  items-center justify-center md:justify-start gap-4">
          <a
            href="/login"
            className="text-base sm:text-lg font-medium rounded-full text-white py-2 px-10
                      bg-purple-800 border border-purple-600
                      hover:text-purple-600 hover:bg-transparent transition"
          >
            Explore Yarns
          </a>
        </div> */}
      </div>



        </div>
      </div>
    </section>
  );
};

export default MainHero;
