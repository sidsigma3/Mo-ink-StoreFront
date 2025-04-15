import React from 'react';
import { Image } from 'react-bootstrap';


const MainFeatures = () => {
  return (
    <section>
      <div
        className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4"
        id="about-section"
      >
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-purple-800 text-lg font-bold mb-3 tracking-widest uppercase">
            Features
          </p>
          <h2 className="text-3xl lg:text-5xl font-semibold text-black max-w-3xl mx-auto">
          What Sets Us Yarns Apart 
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-5 mt-32">

          {/* Card 1 */}
          <div className="p-8 relative rounded-3xl border-1 border-grey-50 bg-gradient-to-b from-white/5 to-purple-100">
          <div className="rounded-full border-2 border-purple-800 bg-gray-50 p-4 w-[100px] h-[100px] flex items-center justify-center absolute -top-14 left-1/2 transform -translate-x-1/2 shadow-lg">
               <Image src="/images/industry.png" alt="feature-icon" width={80} height={80} />
          </div>
            <h3 className="text-2xl text-black font-semibold text-center mt-10">
              Industrial-Grade Quality
            </h3>
            <p className="text-md font-normal text-black/60 text-center mt-2 mb-2">
              Designed for durability, strength, and performance in large-scale textile production.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 relative rounded-3xl border-1 border-grey-50 bg-gradient-to-b from-white/5 to-purple-100">
          <div className="rounded-full border-2 border-purple-800 bg-gray-50 p-4 w-[100px] h-[100px] flex items-center justify-center absolute -top-14 left-1/2 transform -translate-x-1/2 shadow-lg">
               <Image src="/images/sustainable-agriculture (1).png" alt="feature-icon" width={100} height={100} />
          </div>
            <h3 className="text-2xl text-black font-semibold text-center mt-10">
              Eco-Friendly Materials
            </h3>
            <p className="text-md font-normal text-black/60 text-center mt-2 mb-2">
              Sourced responsibly to reduce environmental impact and ensure sustainability.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 relative rounded-3xl border-1 border-grey-50 bg-gradient-to-b from-white/5 to-purple-100">
          <div className="rounded-full border-2 border-purple-800 bg-gray-50 p-4 w-[100px] h-[100px] flex items-center justify-center absolute -top-14 left-1/2 transform -translate-x-1/2 shadow-lg">
               <Image src="/images/social.png" alt="feature-icon" width={100} height={100} />
          </div>
            <h3 className="text-2xl text-black font-semibold text-center mt-10">
              Customization Options
            </h3>
            <p className="text-md font-normal text-black/60 text-center mt-2 mb-2">
              Tailor yarns to specific textures, colors, and patterns to suit your needs.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-8 relative rounded-3xl border-1 border-grey-50 bg-gradient-to-b from-white/5 to-purple-100">
          <div className="rounded-full border-2 border-purple-800 bg-gray-50 p-4 w-[100px] h-[100px] flex items-center justify-center absolute -top-14 left-1/2 transform -translate-x-1/2 shadow-lg">
               <Image src="/images/delivery.png" alt="feature-icon" width={100} height={100} />
          </div>
            <h3 className="text-2xl text-black font-semibold text-center mt-10">
              Fast Global Delivery
            </h3>
            <p className="text-md font-normal text-black/60 text-center mt-2 mb-2">
              Reliable worldwide shipping ensures timely delivery for all orders.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
    }

export default MainFeatures;
