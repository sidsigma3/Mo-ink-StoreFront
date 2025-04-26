import React from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import HeroSection from '../../Components/HeroSection/HeroSection'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { MdOutlineShield } from "react-icons/md";


const ReturnInfo = () => {

  
    const breadcrumbs = [
      { label: "Home", link: "/home" },
      { label: "Returns & Replacements", link: "/ReturnInfo" },
    ];
  
    return (
      <div>

        <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>

        <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
            <HeroSection productName={"Returns & Replacements"} breadcrumbs={breadcrumbs}></HeroSection>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Returns & Replacements</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Ink n Dyes, we strive to deliver the best quality yarns and dyeing services. However, if something doesn’t meet your expectations, we’re here to make it right.                         </p>
          </div>

          {/* Return & Refunds Section */}
<div className="space-y-6">
  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-6">Return Eligibility</h3> 
    <p className="text-gray-600 mb-6">You may request a return or replacement if:</p>
    <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
      <li>You received a damaged or defective product</li>
      <li>The product does not match your order (wrong type, size, or color)</li>
      <li>There are inconsistencies in dyeing (verified through our quality assurance process)</li>
    </ul>

    <h4 className="text-xl font-semibold text-gray-800 mb-2">Return Conditions:</h4>
    <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
      <li>Returns must be requested within 7 days of delivery</li>
      <li>Products must be unused, in their original packaging</li>
      <li>Custom-dyed or specially processed items may not be eligible unless defective</li>
    </ul>

    <h4 className="text-xl font-semibold text-gray-800 mb-2">How to Request a Return:</h4>
    <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-6">
      <li>Log in to your Ink n Dyes account</li>
      <li>Go to "My Orders" and select the relevant order</li>
      <li>Click "Request Return/Replacement" and provide details with supporting photos</li>
      <li>Our team will review your request and arrange for pickup if approved</li>
    </ol>

    <h4 className="text-xl font-semibold text-gray-800 mb-2">Refunds & Replacements:</h4>
    <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
      <li>Approved returns will be processed within 5–7 business days</li>
      <li>Refunds are issued to the original payment method or as store credit</li>
      <li>Replacements are shipped free of cost after inspection and approval</li>
    </ul>

    <h4 className="text-xl font-semibold text-gray-800 mb-2">Non-Returnable Items:</h4>
    <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
      <li>Yarn already used or cut</li>
      <li>Custom-dyed batches unless quality issues are found</li>
      <li>Items returned without prior approval</li>
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
  
  export default ReturnInfo