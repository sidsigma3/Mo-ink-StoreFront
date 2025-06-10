import React, { useState, useEffect } from 'react';
import TopNavigation from '../../Components/TopNavigation/TopNavigation';
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader';
import Navbar from '../../Components/Navbar/Navbar';
import Cta from '../../Components/CTA/Cta';
import Footer from '../../Components/Footer/Footer';
import HeroSection from '../../Components/HeroSection/HeroSection';
import BottomNav from '../../Components/BottomNav/BottomNav';
import BlogBox1 from '../../Components/BlogList/BlogBox1';
import BlogBox2 from '../../Components/BlogList/BloxBox2';
import BlogBox3 from '../../Components/BlogList/BloxBox3';
import BlogBox4 from '../../Components/BlogList/BloxBox4';


const Blog1 = () => {
  const breadcrumbs = [
    { label: "Home", link: "/home" },
    { label: "Blogs", link: "/Blogs" },
    { label: "The Journey...", link: "/Blog1" },
  ];

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);


  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar /></div>

      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
        <HeroSection productName={'The Journey of Yarn:'} breadcrumbs={breadcrumbs} />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12">
        <div className="bg-white rounded-5 p-6 md:p-10">

      {/* Article Header */}
          <div className="mb-8">
          
          <h1 className="text-xl font-semibold md:text-2xl text-gray-900 mb-6">
          The Journey of Yarn: From Raw Fiber to High-Quality Thread</h1>
          {/* <span className="inline-block px-4 py-1 rounded-full bg-purple-700 text-white text-sm font-medium mb-4">
            Yarn Manufaturing
          </span> */}

          {/* Featured Image */}
        <div className="mb-12">
          <img
            src="https://images.pexels.com/photos/4219611/pexels-photo-4219611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Sustainable Fashion"
            className="w-full h-[500px] object-cover rounded-2xl"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Yarn plays a crucial role in the textile industry, serving as the foundation for countless fabrics and garments. But have you ever wondered how raw fiber transforms into the premium-quality yarn used in large-scale textile production? At Ink N Dyes, we take pride in our meticulous process that ensures durability, consistency, and excellence in every strand.
          </p>

          <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
          1. Sourcing the Finest Raw Materials
          </h2>
          <p className="text-gray-600 mb-6">
          The journey of yarn begins with selecting high-quality raw fibers. We procure premium cotton, silk, nylon, polyester, and blended fibers from trusted suppliers. Each fiber type undergoes rigorous testing to ensure strength, softness, and uniformity. Our commitment to sourcing the best materials lays the foundation for superior yarn production.
          </p>

          <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/4219653/pexels-photo-4219653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="High-quality raw fibers"
              className="rounded-xl"
            />
            <img
              src="https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Eco-friendly Yarn"
              className="rounded-xl"
            />
          </div>


          <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
          2. Cleaning and Processing          </h2>
          <p className="text-gray-600 mb-6">
          Once the raw fibers are sourced, they go through an intensive cleaning process to remove impurities, dirt, and natural oils. This ensures that the final product maintains a smooth and even texture. Our advanced fiber processing techniques allow us to maintain the integrity of the fibers while preparing them for the spinning stage.
          </p>

          <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
          3. Spinning: Crafting the Perfect Yarn</h2>
          <p className="text-gray-600 mb-6">
          Spinning is where raw fibers are transformed into yarn. We employ state-of-the-art spinning technologies, including ring spinning, open-end spinning, and air-jet spinning, to produce yarns of various counts and textures. This stage determines the strength, twist, and fineness of the yarn, tailored to meet the demands of different textile applications.
          </p>

          <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
          4. Quality Control: Ensuring Perfection
          </h2>
          <p className="text-gray-600 mb-6">
          Quality is at the heart of our manufacturing process. Every batch of yarn undergoes multiple quality control tests, including:
          </p>
          <ul className="list-disc list-inside space-y-4 text-gray-600 mb-8">
            <li>Tensile strength testing to measure durability.</li>
            <li>Evenness testing to detect inconsistencies.</li>
            <li>Color fastness checks for dyed yarns.</li>
          </ul>

          <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
          5. Customization and Bulk Orders          </h2>
          <p className="text-gray-600 mb-6">
          we understand that every business has unique requirements. That’s why we offer customized yarn solutions, including specialized blends, custom dyeing, and varying thickness options. Whether you need yarn for weaving, knitting, or industrial applications, we cater to bulk orders with precision and reliability.
          </p>

          <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
          6. Packaging and Delivery         </h2>
          <p className="text-gray-600 mb-6">
          Once our yarn passes all quality tests, it is carefully packaged to prevent contamination and damage during transit. We ship our products to clients worldwide, ensuring timely delivery and seamless logistics support.
          </p>
        </div>
         </div>
        </div>
      </main>

<div className=''>
         <h3 className='text-2xl text-center md:text-left md:2xl font-medium py-4'>Recent Articles</h3>

        <div className="flex justify-center px-3">
          <div className="max-w-8xl w-full overflow-x-auto scrollbar-hide">
            <ul className="flex space-x-4 sflex lg:justify-center overflow-x-auto pb-4">
              <li className="snap-start shrink-0 w-80">
                <BlogBox1 />
              </li>
              <li className="snap-start shrink-0 w-80">
                <BlogBox2 />
              </li>
            
              <li className="snap-start shrink-0 w-80">
                <BlogBox3 />
              </li>
              <li className="snap-start shrink-0 w-80">
                <BlogBox4 />
              </li>
              
              </ul>
          </div>
        </div>

    </div>
    

      <div className='px-6 md:px-14 py-3 mt-10'><Cta /></div>
      <div className='px-6 md:px-14 py-3'> <Footer /></div>
      <BottomNav />
    </div>
  );
};

export default Blog1;
