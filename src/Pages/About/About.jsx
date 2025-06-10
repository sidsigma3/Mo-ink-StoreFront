import React, { useState, useEffect } from 'react';
import TopNavigation from '../../Components/TopNavigation/TopNavigation';
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader';
import Navbar from '../../Components/Navbar/Navbar';
import Cta from '../../Components/CTA/Cta';
import Footer from '../../Components/Footer/Footer';
import HeroSection from '../../Components/HeroSection/HeroSection';
import BottomNav from '../../Components/BottomNav/BottomNav';
import { FiLinkedin } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";


const About = () => {
  const breadcrumbs = [
    { label: "Home", link: "/home" },
    { label: "About", link: "/About" },
  ];

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar /></div>

      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
        <HeroSection productName={'About'} breadcrumbs={breadcrumbs} />
      </div>
 
    
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white border-2 border-zinc-100 rounded-5 p-6 md:p-10">

          {/* Story Sections */}
          <div className="">
              <section>
                <h3 className="text-xl md:text-2xl  font-semibold text-gray-900 mb-4">Our Story</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                Ink n Dyes is a tech-enabled platform that facilitates raw material procurement for SMEs in the weaving and handloom sectors. It integrates technology to SME's buying behaviour to make available better products, at better prices, in better timelines with a comprehensive online and offline support. </p>

                <p className="mb-4">
                We have developed an all-in-one solution for weavers that addresses key challenges such as sourcing quality yarns, ensuring consistent dyeing, and minimizing holding costs. Our platform offers a wide variety of yarns sourced directly from spinners at pre-approved rates, along with top-tier mechanised dyeing to eliminate inconsistencies. </p>

                <p className="mb-8"> 
                 Additionally, we provide no minimum order quantity (MOQ) and a buy-back platform, simplifying the process for weavers and offering specialized support for marketing their products. </p>
              </section>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative aspect-[1/1] lg:aspect-1:1">
              <img
                src="/images/avi.jpeg"
                alt="Avinash Mohanty - CEO"
                className="rounded-lg object-cotain w-full h-full"
              />
              <div className="absolute bottom-4 right-4 flex space-x-3">
                <a href="https://www.linkedin.com/in/avinashmohanty/" className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                  <FiLinkedin  className="w-5 h-5 text-blue-600"/>
                </a>
                <a href="#" className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                  <FaInstagram  className="w-5 h-5 text-red-600" />
                </a>
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl  font-bold text-gray-900 mb-3">Avinash Mohanty</h2>
              <p className="text-lg text-purple-800 mb-6">Founder & CEO</p>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  "I founded this company with a vision to supply the finest quality yarns to industries worldwide. Our journey began as a small-scale operation, and today, we proudly serve manufacturers and businesses across multiple countries."
                </p>
                <p>
                "What drives us is not just the yarns we produce but the trust we build with every client. Every decision we make is centered around delivering excellence, consistency, and value to our customers."
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 my-8 border-y border-gray-200">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-800 mb-2">100K+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-800 mb-2">25+</div>
                  <div className="text-gray-600">States We Cover</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-800 mb-2">98%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
              </div>

              <section>
                <h3 className="text-xl md:text-2xl  font-semibold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                Our mission is to provide premium-quality yarns that meet the evolving needs of the textile industry while ensuring ethical and sustainable business practices. We believe in:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
                <li>Delivering high-performance yarns for various industrial applications.</li>
                <li>Upholding fair trade and eco-friendly production methods.</li>
                <li>Strengthening our partnerships with businesses for long-term growth.</li>
              </ul>
              </section>

              <section>
                <h3 className="text-xl md:text-2xl  font-semibold text-gray-900 mb-4">Looking Forward</h3>
                <p className="text-gray-600 leading-relaxed">
                The future of textile manufacturing is dynamic, and we are committed to innovation. From adopting the latest technology to expanding our production capabilities, we continuously strive to enhance the efficiency, quality, and sustainability of our yarns. Our goal is to remain at the forefront of the industry while maintaining the trust and satisfaction of our valued customers.
                </p>
              </section>
          </div>
        </div>
      </main>

      <div className='px-6 md:px-14 py-3 mt-10'><Cta /></div>
      <div className='px-6 md:px-14 py-3'> <Footer /></div>
      <BottomNav />

    </div>
  );
};

export default About;
