import React from 'react';

export default function TextileSplitSection() {
  return (
    <section className="bg-[#FFFBED] py-20 px-6 md:px-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left: Text Top on sm/md, Image Top on lg+ */}
        <div className="flex flex-col lg:flex-col-reverse items-center text-left">
          <div className="mb-6 lg:mb-0">
            <p className="text-purple-800 text-lg font-bold lg:mt-3 mb-3 tracking-widest uppercase">
              Yarn In Cone
            </p>
            <h2 className="text-3xl lg:text-5xl font-semibold text-black mb-3 leading-tight">
              Engineered for Efficiency
            </h2>
            <p className="text-gray-600 text-base">
              Perfectly suited for factory floors, yarn cones deliver consistent tension and feed smoothly through machines. From automated weaving to high-volume knitting, cones help streamline operations and reduce material loss.
            </p>
          </div>
          <img
            src="/images/Yarn_Cone.png"
            alt="Comfort Sleep"
            className="w-full rounded-2xl"
          />
        </div>

        {/* Right: Text Top on all screens, Image Bottom on all screens */}
        <div className="flex flex-col text-left">
          <div className="mb-6">
            <p className="text-purple-800 text-lg font-bold mb-3 tracking-widest uppercase">
              Yarn In Hank
            </p>
            <h2 className="text-3xl lg:text-5xl font-semibold text-black mb-3 leading-tight">
              Crafted for Flexibility
            </h2>
            <p className="text-gray-600 text-base">
              Yarn hanks offer excellent dye absorption and handling flexibility, making them a top choice for traditional weavers and custom dyeing units. Their loose coil form is perfect for manual processing, handloom weaving, and artisan-level textile work.
            </p>
          </div>
          <img
            src="/images/Yarn_Hank.png"
            alt="Textile Basket"
            className="w-full rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
