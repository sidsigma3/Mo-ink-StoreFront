import React from 'react'

const Banner = () => {
  return (
    <div className='d-flex p-5 gap-2'>
        <div className='h-full flex-1'>
                <section className="relative overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 rounded-3">
                    <div className="p-8 md:p-12 lg:px-16 lg:py-24 z-10">
                        <div className="mx-auto mt-40 max-w-xl text-left ltr:sm:text-left rtl:sm:text-right">
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

            <div className='flex-1 d-flex flex-column gap-2'>
                    <div>
                        <section className="relative overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 rounded-3">
                        <div className="p-8 md:p-12 lg:px-16 lg:py-24 z-10">
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


                    <div>

                        <section className="relative overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 rounded-3">
                        <div className="p-8 md:p-12 lg:px-16 lg:py-24 z-10">
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


    </div>
  )
}

export default Banner