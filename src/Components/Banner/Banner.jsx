import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination,Autoplay } from "swiper/modules";

const Banner = () => {
  return (
    <div className='row g-2 lg:h-screen md:h-1/2'>
        <div className='col-lg-7 col-md-12 h-full'>
                <section className="relative overflow-hidden bg-gray-50 grid grid-cols-2 rounded-3 h-100">
                    <div className="p-8 md:p-12 lg:px-16 lg:py-24 z-10">
                        <div className="mx-auto mt-10 md:mt-40 max-w-xl text-left ltr:sm:text-left rtl:sm:text-right">
                        <h2 className="text-2xl font-bold text-white md:text-3xl">
                            Crafting Perfection<br></br>
                            In Every Thread
                        </h2>

                        <p className="hidden text-yellow-400 md:mt-4 md:block">
                        Discover vibrant, versatile, and durable <br></br>
                        yarns for every project
                        </p>

                        <div className="mt-4 md:mt-8">
                            <a
                            href="#"
                            className="inline-block rounded bg-white px-12 py-3 text-sm font-medium text-purple-700 transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
                            >
                            SHOP NOW
                            </a>
                        </div>
                        </div>
                    </div>

                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/images/banner-1.png')" }}
                    ></div>
                    </section>

            </div>

            <div className='col-lg-5 col-md-12 grid lg:grid-cols-1 md:grid-cols-2 gap-2'>
                    <div className='hidden md:block'>
                        <section className="relative overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 rounded-3 h-full">
                        <div className="p-4 md:p-4 lg:px-4 lg:py-4 z-10">
                            <div className="mx-auto max-w-xl text-left ltr:sm:text-left rtl:sm:text-right">
                            <h2 className="text-2xl font-bold text-black md:text-3xl">
                               Excellence<br></br>
                                Woven In
                            </h2>

                            <p className="hidden text-black md:mt-4 md:block">
                                We craft yarns to perfection
                            </p>

                            <div className="mt-4 md:mt-8">
                                <a
                                href="#"
                                className="inline-block rounded bg-white px-12 py-3 text-sm font-medium text-purple-700 transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
                                >
                                SHOP NOW
                                </a>
                            </div>
                            </div>
                        </div>

                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('/images/banner-2.png')" }}
                        ></div>
                        </section>

                    </div>


                    <div className='hidden md:block'>

                        <section className="relative overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 rounded-3 h-full">
                        <div className="p-4 md:p-4 lg:px-4 lg:py-4 z-10">
                            <div className="mx-auto max-w-xl text-left ltr:sm:text-left rtl:sm:text-right">
                            <h2 className="text-2xl font-bold text-white md:text-3xl">
                                Where Quality<br></br>
                                Threads Begin
                            </h2>

                            <p className="hidden text-yellow-400 md:mt-4 md:block">
                                Creating world-class yarns
                            </p>

                            <div className="mt-4 md:mt-8">
                                <a
                                href="#"
                                className="inline-block rounded bg-white px-12 py-3 text-sm font-medium text-purple-700 transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
                                >
                                SHOP NOW
                                </a>
                            </div>
                            </div>
                        </div>

                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('/images/banner-3.png')" }}
                        ></div>
                        </section>
                    </div>




            </div>

            <div className="col-lg-5 col-md-12">
        {/* Carousel on Small Screens */}
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{ delay: 2000, disableOnInteraction: false }} 
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="md:hidden" // Hide the swiper on medium+ screens
        >
          {/* Slide 1 */}
          <SwiperSlide>
          <section className="relative overflow-hidden bg-gray-50 grid grid-cols-2 rounded-3 h-full">
                        <div className="p-4 md:p-4 lg:px-4 lg:py-4 z-10">
                            <div className="mx-auto max-w-xl text-left ltr:sm:text-left rtl:sm:text-right">
                            <h2 className="text-2xl font-bold text-black md:text-3xl">
                               Excellence<br></br>
                                Woven In
                            </h2>

                            <p className="hidden text-black md:mt-4 md:block">
                                We craft yarns to perfection
                            </p>

                            <div className="mt-4 md:mt-8">
                                <a
                                href="#"
                                className="inline-block rounded bg-white px-12 py-3 text-sm font-medium text-purple-700 transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
                                >
                                SHOP NOW
                                </a>
                            </div>
                            </div>
                        </div>

                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('/images/banner-2.png')" }}
                        ></div>
                        </section>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
          <section className="relative overflow-hidden bg-gray-50 grid grid-cols-2 rounded-3 h-full">
                        <div className="p-4 md:p-4 lg:px-4 lg:py-4 z-10">
                            <div className="mx-auto max-w-xl text-left ltr:sm:text-left rtl:sm:text-right">
                            <h2 className="text-2xl font-bold text-white md:text-3xl">
                                Where Quality<br></br>
                                Threads Begin
                            </h2>

                            <p className="hidden text-yellow-400 md:mt-4 md:block">
                                Creating world-class yarns
                            </p>

                            <div className="mt-4 md:mt-8">
                                <a
                                href="#"
                                className="inline-block rounded bg-white px-12 py-3 text-sm font-medium text-purple-700 transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
                                >
                                SHOP NOW
                                </a>
                            </div>
                            </div>
                        </div>

                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('/images/banner-3.png')" }}
                        ></div>
                        </section>
          </SwiperSlide>
        </Swiper>

      </div>
    </div>
  )
}

export default Banner