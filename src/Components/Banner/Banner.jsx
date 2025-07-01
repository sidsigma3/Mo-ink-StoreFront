import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import ShopButton from '../Buttons/ShopButton';
import "./Banner.css";
import { useNavigate } from 'react-router-dom';

const Banner = () => {

  const navigate = useNavigate()

  // Updated main banner items with the new image
const mainBannerItems = [
   { 
      title: "Crafting Perfection In Every Thread", 
      desc: "Discover vibrant, versatile, and durable yarns for every project", 
      img: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/5.png?updatedAt=1751358588344" 
    },
    { 
      title: "Premium Quality Yarns", 
      desc: "Experience excellence in every fiber we create", 
      img: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/4.png?updatedAt=1751358589735" 
    },
    { 
      title: "Softness Meets Durability", 
      desc: "Knit comfort and resilience into every handmade creation",
      img: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/3.png?updatedAt=1751358589775" 
    },
    { 
      title: "Vibrant Shades. Lasting Texture.", 
      desc: "Unleash your creativity with richly dyed, long-lasting threads", 
      img: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/6.png?updatedAt=1751358589601" 
    },
    { 
      title: "Threads That Inspire Passion", 
      desc: "Feel the difference with yarns spun for perfection and beauty", 
      img: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/banner-1.png?updatedAt=1751358589704" 
    }
];


  const bannerItems = [
    { title: "Excellence Woven In", desc: "We craft yarns to perfection", img: "banner-2.png" },
    { title: "Where Quality Threads Begin", desc: "Creating world-class yarns", img: "banner-3.png" }
  ];

  return (
    <div className="row g-2 banner-header pb-6">
      {/* Main Banner Section with Swiper */}
      <div className="col-lg-7 col-md-12 lg:h-full" style={{ padding: "0% !important" }}>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="h-full rounded-3"
        >
          {mainBannerItems.map((item, index) => (
            <SwiperSlide key={index} className="h-full">
              <section className="relative overflow-hidden h-full bg-gray-50 grid grid-cols-1 rounded-3">
                <div className="p-8 md:px-12 lg:px-16 lg:py-24 z-10 sm:px-2 flex flex-col justify-center h-full">
                  <div className="text-left">
                    <h2 className="text-2xl font-bold text-black md:text-3xl">
                      {item.title.includes('In Every Thread') ? (
                        <>Crafting Perfection In Every Thread</>
                      ) : (
                        item.title
                      )}
                    </h2>
                    <p className="text-grey-700 md:mt-4">
                      {item.desc.includes('yarns for every project') ? (
                        <>Discover vibrant, versatile, and durable yarns for every project</>
                      ) : (
                        item.desc
                      )}
                    </p>
                    <div className="mt-4 md:mt-8 md:w-full">
                      <ShopButton click={() => navigate("/category")} />
                    </div>
                  </div>
                </div>
                <div
                  className="absolute inset-0 bg-cover bg-center object-cover"
                  style={{ backgroundImage: `url('${item.img}')` }}
                ></div>
              </section>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Side Banner Section */}
      <div className="col-lg-5 col-md-12 md:flex md:flex-col lg:justify-between">
        <div className="hidden md:hidden lg:flex lg:h-full flex-col gap-2">
          {bannerItems.map((item, index) => (
            <div key={index} className="relative bg-gray-50 rounded-3 justify-center flex-1">
              <div
                className="absolute inset-0 bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url('/images/${item.img}')` }}
              ></div>
              <div className="relative z-10 p-4 text-black rounded-3 flex flex-col justify-center h-full">
                <h2 className={item.title[0] === 'W' ? "text-2xl font-bold text-black" : "text-2xl font-bold"}>
                  {item.title}
                </h2>
                <p className={item.desc[0] === 'C' ? "mt-2 font-medium text-black" : "mt-2 font-medium"}>
                  {item.desc}
                </p>
                <div className="mt-4">
                  <ShopButton click={() => navigate("/category")} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Swiper for side banners */}
        <div className="block md:block lg:hidden h-full">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="h-full " 
          >
            {bannerItems.map((item, index) => (
              <SwiperSlide key={index} className="h-full">
                <div className="relative bg-gray-50 rounded-3 min-h-[300px] sm:max-h-[300px] md:min-h-[200px] lg:min-h-[500px] flex flex-col justify-center h-full">
                  <div
                    className="absolute inset-0 bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: `url('/images/${item.img}')` }}
                  ></div>
                  <div className="relative z-10 p-4 text-black rounded-3 flex flex-col justify-center h-full text-left">
                    <div>
                      <h2 className={item.title[0] === 'W' ? "text-2xl w-4/5 font-bold text-black " : "text-2xl font-bold"}>
                        {item.title}
                      </h2>
                      <p className={item.desc[0] === 'C' ? "mt-2 font-medium text-black" : "mt-2 font-medium"}>
                        {item.desc}
                      </p>
                    </div>
                    <div className="mt-4">
                      <ShopButton click={() => navigate("/category")} />
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