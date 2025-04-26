import React from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import HeroSection from '../../Components/HeroSection/HeroSection'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { MdOutlineShield } from "react-icons/md";


const DeliveryInfo = () => {

  
    const breadcrumbs = [
      { label: "Home", link: "/home" },
      { label: "Delivery Information", link: "/deliveryinfo" },
    ];
  
    return (
      <div>

        <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>

        <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
            <HeroSection productName={"Delivery Information"} breadcrumbs={breadcrumbs}></HeroSection>
        </div>
         
  
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white border-2 border-zinc-100 rounded-5 p-6 sm:p-6 md:p-8 lg:p-10 xl:p-10">
          {/* Hero Section */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-neutral-100 p-4 rounded-full">
            <MdOutlineShield size={45} color='#5B21B6'/>

            </div>
          </div>

          {/* Introduction */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Delivery Information</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Ink n Dyes, we ensure that your yarn and dyed materials reach you safely, efficiently, and on time. We’ve designed our delivery process to meet the unique needs of weavers, manufacturers, and textile businesses of all sizes.                         </p>
          </div>

          {/* Delivery Coverage Section */}
<div className="space-y-6">
  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-6">Delivery Coverage</h3>
    <p className="text-gray-600 mb-6">
      We offer pan-India shipping, including to remote weaving clusters. International shipping is also available on request.
    </p>

    <h4 className="text-xl font-semibold text-gray-800 mb-2">Delivery Timelines:</h4>
    <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
      <li><span className="font-medium text-gray-900">Standard Orders:</span> Dispatched within 2–3 business days</li>
      <li><span className="font-medium text-gray-900">Custom Dyed Orders:</span> Dispatched within 5–7 business days</li>
      <li><span className="font-medium text-gray-900">Express Delivery:</span> Available in select regions (charges apply)</li>
    </ul>

    <h4 className="text-xl font-semibold text-gray-800 mb-2">Tracking Your Order:</h4>
    <p className="text-gray-600 mb-6">
      Once your order is dispatched, you will receive a tracking link via SMS and email. You can also track your order anytime from the "My Orders" section in your account.
    </p>

    <h4 className="text-xl font-semibold text-gray-800 mb-2">Shipping Partners:</h4>
    <p className="text-gray-600 mb-6">
      We work with reliable logistics providers to ensure timely and safe deliveries, with real-time tracking support.
    </p>

    <h4 className="text-xl font-semibold text-gray-800 mb-2">Delivery Charges:</h4>
    <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
      <li>Free delivery on bulk orders above [Enter amount or quantity]</li>
      <li>Standard delivery charges apply on smaller orders (visible at checkout)</li>
    </ul>

    <h4 className="text-xl font-semibold text-gray-800 mb-2">Important Notes:</h4>
    <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
      <li>Please ensure that your shipping address and contact details are accurate at the time of placing the order.</li>
      <li>In case of remote locations, delivery times may vary slightly.</li>
      <li>For urgent or scheduled deliveries, contact our support team.</li>
    </ul>

    <h4 className="text-xl font-semibold text-gray-800 mb-2">Need Help?</h4>
    <div className="space-y-2">
      <p className="text-gray-600">
        <span className="font-medium text-gray-900">Phone/WhatsApp:</span> [Your Support Number]
      </p>
      <p className="text-gray-600">
        <span className="font-medium text-gray-900">Email:</span> <a href="mailto:support@inkndyes.com" className="text-blue-600 hover:text-blue-700">support@inkndyes.com</a>
      </p>
    </div>
  </section>
</div>


          {/* Last Updated */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              Last updated: April 2025
            </p>
          </div>
        </div>
      </main>
      
        <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
        <BottomNav></BottomNav>
    </div>
  );
}
  
  export default DeliveryInfo