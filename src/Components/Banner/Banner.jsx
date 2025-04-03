import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import ShopButton from '../Buttons/ShopButton';
import "./Banner.css";
import { useNavigate } from 'react-router-dom';

const Banner = () => {

  const navigate =  useNavigate()

  const bannerItems = [
    { title: "Excellence Woven In", desc: "We craft yarns to perfection", img: "banner-2.png" },
    { title: "Where Quality Threads Begin", desc: "Creating world-class yarns", img: "banner-3.png" }
  ];

  return (
    <div className="row g-2 banner-header">
      <div className="col-lg-7 col-md-12 lg:h-full" style={{ padding: "0% !important" }}>
        <section className="relative overflow-hidden h-full bg-gray-50 grid grid-cols-1 rounded-3">
          <div className="p-8 md:px-12 lg:px-16 lg:py-24 z-10 sm:px-2">
            <div className="mt-10 md:mt-24">
              <h2 className="text-2xl font-bold text-white md:2xl">
                Crafting Perfection<br /> In Every Thread
              </h2>
              <p className="text-yellow-400 md:mt-4">
                Discover vibrant, versatile, and durable<br /> yarns for every project
              </p>
              <div className="mt-4 md:mt-8 md:w-full">
                <ShopButton click={()=>navigate("/category")}/>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-cover bg-center object-cover" style={{ backgroundImage: "url('/images/banner-1.png')" }}></div>
        </section>
      </div>
      <div className="col-lg-5 col-md-12 md:flex md:flex-col lg:justify-between">
        <div className="hidden md:hidden lg:flex lg:h-full flex-col gap-2">
          {bannerItems.map((item, index) => (
            <div key={index} className="relative bg-gray-50 rounded-3 flex-1">
              <div className="absolute inset-0 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url('/images/${item.img}')` }}></div>
              <div className="relative z-10 p-4 text-black rounded-3">
                <h2 className={item.title[0]==='W' ? "text-2xl font-bold text-white" :"text-2xl font-bold"}>{item.title}</h2>
                <p className={item.desc[0]==='C' ? "mt-2 font-semibold text-white" :"mt-2 font-semibold"}>{item.desc}</p>
                <div className="mt-4">
                  <ShopButton click={()=>navigate("/category")}/>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="block md:block lg:hidden">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
          >
            {bannerItems.map((item, index) => (
              <SwiperSlide key={index}>
              <div className="relative bg-gray-50 rounded-3 min-h-[300px] sm:min-h-[300px] md:min-h-[200px] lg:min-h-[500px] flex flex-col justify-between">
                <div className="absolute inset-0 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url('/images/${item.img}')` }}></div>
                <div className="relative z-10 p-4 text-black rounded-3 flex flex-col justify-between h-full">
                  <div>
                    <h2 className={item.title[0]==='W' ? "text-2xl font-bold text-white" :"text-2xl font-bold"}>{item.title}</h2>
                    <p className={item.desc[0]==='C' ? "mt-2 font-semibold text-white" :"mt-2 font-semibold"}>{item.desc}</p>
                  </div>
                  <div className="mt-4">
                    <ShopButton click={()=>navigate("/category")}/>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            
            ))}
          </Swiper>
        </div>

      </div>

    </div>
  );
};

export default Banner;
