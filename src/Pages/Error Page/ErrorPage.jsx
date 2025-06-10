import React, { useState, useEffect } from 'react';
import TopNavigation from '../../Components/TopNavigation/TopNavigation';
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader';
import Navbar from '../../Components/Navbar/Navbar';
import Cta from '../../Components/CTA/Cta';
import Footer from '../../Components/Footer/Footer';
import HeroSection from '../../Components/HeroSection/HeroSection';
import BottomNav from '../../Components/BottomNav/BottomNav';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const ErrorPage = () => {
  const breadcrumbs = [
    { label: "Home", link: "/home" },
    { label: "404 Error", link: "ErrorPage" },
  ];

  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar /></div>
  
      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
        <HeroSection productName={'404 Error'} breadcrumbs={breadcrumbs} />
      </div>
  
        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-12">
          <div className=" flex flex-col items-center text-center bg-white rounded-5 p-6 md:px-20">
            {/* Image */}
            <div className="flex justify-center mb-6">
              <img
                src="/images/404Error.png"
                alt="Payment Declined"
                className="w-60 h-60 object-contain"
              />
            </div>
  
            {/* Text Content */}
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Oops! Page Not Found (404)</h1>
  
            <p className="text-gray-600 mb-6">
            The page you’re looking for doesn’t exist, moved, or might have been deleted. Don’t worry — head back to the homepage or use the menu to find what you need.
            </p>
  
            {/* Buttons */}
            <div className=" flex flex-col sm:flex-row gap-3 w-full lg:w-1/2">
            
              <button
                className="w-full px-4 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-500 transition-colors font-medium flex items-center justify-center gap-2"
                onClick={() => console.log('Retrying payment...')}
              >
                
                Go to Home Page
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </main>
      
  
      <div className='px-6 md:px-14 py-3 mt-10'><Cta /></div>
      <div className='px-6 md:px-14 py-3'> <Footer /></div>
      <BottomNav />
    </div>
  );
}

export default ErrorPage;
