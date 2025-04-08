import React from 'react';
import { Image } from 'react-bootstrap';


const MainWhyUs = () => {
    return (
      <section className="bg-[#21133a] text-white py-10">
        <div className="container mx-auto lg:max-w-screen-xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            {/* Left Column - Image */}
            <div className="w-full flex justify-center ">
              <div className="max-w-[500px] w-full">
                <Image
                  src="https://images.pexels.com/photos/6634268/pexels-photo-6634268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Chef"
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain  rounded-3xl border-4 border-grey-50"
                />
              </div>
            </div>
  
            {/* Right Column - Text */}
            <div>
              <p className="text-[#ffffff] tracking-widest uppercase mb-2">Why us</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
              Engineered Yarns for Industrial Excellence
              </h2>
              <p className="text-gray-300 mb-4">
              We manufacture high-quality yarns designed for industrial and large-scale textile production. Our range includes cotton, silk, polyester, nylon, and blended yarns, each crafted for strength, consistency, and performance. Whether you're producing garments, home textiles, or technical fabrics, our yarns are available in bulk and tailored to meet your exact specifications.
              </p>
              <p className="text-gray-400 mb-8">
              For clients with specific needs, we offer custom blended yarns — combining natural and synthetic fibers to deliver the best characteristics of both. Whether it’s cotton-polyester, silk-viscose, or another tailored blend, we manufacture to precise specifications.
              </p>

              <p className="text-gray-400 mb-8">
              Every yarn we produce is available in bulk and crafted with the reliability and care that your business deserves.
              </p>
              <button className="bg-[#FFEE9A] text-purple-800 font-medium py-3 px-8 rounded-full border hover:bg-transparent transition-all">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default MainWhyUs;