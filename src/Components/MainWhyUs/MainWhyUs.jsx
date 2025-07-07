import React from 'react';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



const MainWhyUs = () => {
  const navigate = useNavigate(); 
    return (
      <section id="why-us" className="bg-[#21133a] text-white py-28 bg-cover bg-center relative"
      style={{
    backgroundImage: `url('/images/Pattern.png')`,
  }}
      >
        <div className="container mx-auto lg:max-w-screen-xl px-8 md:px-14 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Image */}
            <div className="w-full flex justify-center ">
              <div className="max-w-auto w-full">
                <Image
                  src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/col-bgimage-1.png?updatedAt=1751860378548"
                  alt="Image"
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain  rounded-3xl border-4 border-grey-50"
                />
              </div>
            </div>
  
            {/* Right Column - Text */}
            <div>
              <p className="text-[#FFEE9A] tracking-widest uppercase font-bold mb-2">Why us</p>
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

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left mb-10">
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-[#FFEE9A]">₹ 10 Cr+</p>
                  <p className="text-white mt-1">Yarn Sold</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-[#FFEE9A]">₹ 1L+</p>
                  <p className="text-white mt-1">Average Order</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-bold text-[#FFEE9A]">1.5L+ Kg</p>
                  <p className="text-white mt-1">Yarn Sourced</p>
                </div>
              </div>

              <button className="bg-[#FFEE9A] text-purple-800 font-medium py-3 px-12 rounded-full border hover:bg-transparent transition-all"
              onClick={() => navigate('/KnowMore')}
              >
                Know More
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default MainWhyUs;