import React, { useState } from 'react';
import TopNavigation from '../../Components/TopNavigation/TopNavigation';
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader';
import Navbar from '../../Components/Navbar/Navbar';
import Cta from '../../Components/CTA/Cta';
import Footer from '../../Components/Footer/Footer';
import HeroSection from '../../Components/HeroSection/HeroSection';
import BottomNav from '../../Components/BottomNav/BottomNav';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  
  const navigate = useNavigate()
  
  const breadcrumbs = [
    { label: "Home", link: "/home" },
    { label: "Checkout", link: "/CheckoutPage" },
    { label: "Payment Success", link: "PaymentSuccess" },
  ];

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar /></div>
  
      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
        <HeroSection productName={'Payment Success'} breadcrumbs={breadcrumbs} />
      </div>
  
        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-12">
          <div className=" flex flex-col items-center text-center bg-white rounded-5 p-6 md:px-20">
            {/* Image */}
            <div className="flex justify-center mb-6">
              <img
                src="/images/Payment-Success.png"
                alt="Payment Declined"
                className="w-48 h-48 object-contain"
              />
            </div>
  
            {/* Text Content */}
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Thank You! Payment Successful</h1>
  
            <p className="text-gray-600 mb-6">
            We’ve received your payment and we’re excited to get things rolling.
            You’ll receive a confirmation email shortly with all the details. If anything seems off or if you need help, just reach out we’re happy to assist.
            </p>
  
            {/* Buttons */}
            <div className=" flex flex-col sm:flex-row gap-3 w-full lg:w-1/2">
              <button
                className="w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Explore More
              </button>
  
              <button
                className="w-full px-4 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-500 transition-colors font-medium flex items-center justify-center gap-2"
                onClick={() => navigate('/orders')}
              >
                <ShoppingBag size={20} />
                Go To Orders
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

export default PaymentSuccess;
