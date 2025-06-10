import React, { useState, useEffect } from 'react';
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import HeroSection from '../../Components/HeroSection/HeroSection'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { MdOutlineShield } from "react-icons/md";


const ShippingPolicy = () => {

  
    const breadcrumbs = [
      { label: "Home", link: "/home" },
      { label: "Shipping Policy", link: "/shippingPolicy" },
    ];


    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  
    return (
      <div>

        <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>

        <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
            <HeroSection productName={"Shipping Policy"} breadcrumbs={breadcrumbs}></HeroSection>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shipping Policies</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We stand behind our products and your satisfaction is our top priority. If you're not happy with your purchase, we're here to help.                         </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-6">
  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">1. How can I track my order on Ink n Dyes?</h3>
    <p className="text-gray-600">
      You can track your orders anytime by logging into your Ink n Dyes account and visiting the "My Orders" section. A live tracking link will be available once your order is shipped.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">2. What is Ink n Dyes’ Platform Fee?</h3>
    <p className="text-gray-600">
      Ink n Dyes may charge a minimal platform fee to support secure transactions, quality checks, and digital content infrastructure. This is clearly mentioned at checkout.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Is the Platform Fee refundable?</h3>
    <p className="text-gray-600">
      Yes, if your order is canceled before shipping or returned as per policy, the platform fee will also be refunded.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">4. What is Ink n Dyes’ Shipping Fee?</h3>
    <p className="text-gray-600">
      We offer free shipping on select products and promotional events. For others, a standard shipping fee may apply, depending on the order value, weight, and destination.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Will I get a refund on the shipping fee if I return the product?</h3>
    <p className="text-gray-600">
      Yes, in case of returns due to quality issues or incorrect product delivery, the shipping fee will also be refunded.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">6. What is Ink n Dyes' Fair Usage Policy?</h3>
    <p className="text-gray-600">
      To prevent misuse of promotional offers and services, we reserve the right to limit orders from accounts showing irregular purchasing or return behavior. This ensures fairness for all users.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">7. I’m a frequent buyer. Why am I being charged shipping?</h3>
    <p className="text-gray-600">
      Shipping charges are based on order value and product type. Special discounts or shipping waivers are applicable during events or for verified trade partners and influencers.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">8. How do I check the delivery status of my order?</h3>
    <p className="text-gray-600">
      Once your order is shipped, you will receive a live tracking link via email or SMS. You can also find the tracking info in your My Orders section.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">9. How can I check if Ink n Dyes delivers to my area?</h3>
    <p className="text-gray-600">
      You can check serviceability by entering your PIN code on the product page before adding to cart. If your location is not currently covered, you’ll be notified there.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">10. How are orders delivered?</h3>
    <p className="text-gray-600">
      We partner with trusted logistics providers to ensure timely and safe delivery. Products are carefully packed and shipped from verified suppliers and warehouses.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">11. Does Ink n Dyes deliver products outside India?</h3>
    <p className="text-gray-600">
      At the moment, we only deliver within India. However, we are actively working on expanding our global delivery network.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">12. Can I get faster delivery?</h3>
    <p className="text-gray-600">
      Express delivery options are available on selected products for an additional fee. You can select this during checkout if eligible.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">13. I received a partial order or damaged/empty packet. What should I do?</h3>
    <p className="text-gray-600">
      Please raise a ticket within 48 hours of receiving your order via our Help & Support section. Include images of the package and we’ll resolve the issue at the earliest.
    </p>
  </section>
</div>

          {/* Last Updated */}
          <div className="mt-12 pt-8 border-t border-gray-100">
          <div>
      <p
        className="text-sm text-gray-500 text-center cursor-pointer"
      >
        Last updated: April 2025
      </p>
    </div>
          </div>
        </div>
      </main>
      
        <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
        <BottomNav></BottomNav>
    </div>
  );
}
  
  export default ShippingPolicy