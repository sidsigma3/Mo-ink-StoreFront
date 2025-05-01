import React, { useState } from 'react';
import TopNavigation from '../../Components/TopNavigation/TopNavigation';
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader';
import Navbar from '../../Components/Navbar/Navbar';
import Cta from '../../Components/CTA/Cta';
import Footer from '../../Components/Footer/Footer';
import HeroSection from '../../Components/HeroSection/HeroSection';
import BottomNav from '../../Components/BottomNav/BottomNav';
import BlogBox from '../../Components/BlogList/BlogBox1';

const Blogs = () => {
  const breadcrumbs = [
    { label: "Home", link: "/home" },
    { label: "Blogs", link: "/blogs" },
  ];

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar /></div>

      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
        <HeroSection productName={'Blogs'} breadcrumbs={breadcrumbs} />
      </div>

      {/* Main Content */}
      
      <div className="flex justify-center px-4 pt-8">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3 max-w-7xl">

                <li><BlogBox /></li>
                <li><BlogBox /></li>
                <li><BlogBox /></li>
                <li><BlogBox /></li>
            </ul>
      </div>


      <div className='px-6 md:px-14 py-3 mt-10'><Cta /></div>
      <div className='px-6 md:px-14 py-3'> <Footer /></div>
      <BottomNav />
    </div>
  );
};

export default Blogs;
