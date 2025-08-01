import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import ShopButton from '../Buttons/ShopButton';
import "./Banner.css";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Banner = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Updated main banner items with translation keys
  const mainBannerItems = [
    { 
      titleKey: "banner.main.crafting.title", 
      descKey: "banner.main.crafting.desc", 
      img: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Elegant%20Cinematic%20Webnail%20HD%20169.png?updatedAt=1753180559241" 
    },
    { 
      titleKey: "banner.main.premium.title", 
      descKey: "banner.main.premium.desc", 
      img: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Elegant%20Cinematic%20Wedding%20Thumbnail%20HD%20169.png?updatedAt=1753180559200" 
    },
    { 
      titleKey: "banner.main.softness.title", 
      descKey: "banner.main.softness.desc",
      img: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Elegant%20Cinematic%20Weail%20HD%20169.png?updatedAt=1753180558597" 
    },
    { 
      titleKey: "banner.main.vibrant.title", 
      descKey: "banner.main.vibrant.desc", 
      img: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/banner4.png?updatedAt=1751355597212" 
    },
    { 
      titleKey: "banner.main.threads.title", 
      descKey: "banner.main.threads.desc", 
      img: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/banner-1.png?updatedAt=1753180558990" 
    }
  ];

  const bannerItems = [
    { 
      titleKey: "banner.side.excellence.title", 
      descKey: "banner.side.excellence.desc", 
      img: "banner-2.png" 
    },
    { 
      titleKey: "banner.side.quality.title", 
      descKey: "banner.side.quality.desc", 
      img: "banner-3.png" 
    }
  ];

  return (
    <div className="row g-2 banner-header pb-6">
      {/* Main Banner Section with Swiper */}
      <div className="col-lg-7 col-md-12 lg:h-full" style={{ padding: "0% !important" }}>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
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
                      {t(item.titleKey)}
                    </h2>
                    <p className="text-grey-700 md:mt-4">
                      {t(item.descKey)}
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
                <h2 className="text-2xl font-bold text-black">
                  {t(item.titleKey)}
                </h2>
                <p className="mt-2 font-medium text-black">
                  {t(item.descKey)}
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
            autoplay={{ delay: 30000, disableOnInteraction: false }}
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
                      <h2 className="text-2xl w-4/5 font-bold text-black">
                        {t(item.titleKey)}
                      </h2>
                      <p className="mt-2 font-medium text-black">
                        {t(item.descKey)}
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