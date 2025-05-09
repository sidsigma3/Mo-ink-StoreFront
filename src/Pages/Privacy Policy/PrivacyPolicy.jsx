import React, { useState } from 'react';
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import HeroSection from '../../Components/HeroSection/HeroSection'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { MdOutlineShield } from "react-icons/md";



const PrivacyPolicy = () => {

  
    const breadcrumbs = [
      { label: "Home", link: "/home" },
      { label: "Privacy Policy", link: "/privacyPolicy" },
    ];
    
  
    return (
      <div>

        <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>

        <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
            <HeroSection productName={"Privacy Policy"} breadcrumbs={breadcrumbs}></HeroSection>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policies</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At Ink n Dyes, we value your trust and are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, share, and safeguard your personal information when you use our platform.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-6">
  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h3>
    <p className="text-gray-600">
      When you use the Ink n Dyes platform (Website/App), we may collect the following types of information:
    </p>
    <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-2">
      <li><strong>Personal Information:</strong> Name, email address, mobile number, shipping address, billing details, GSTIN, business type, etc.</li>
      <li><strong>Transactional Information:</strong> Payment methods, order history, refunds, and transaction status.</li>
      <li><strong>Technical Information:</strong> IP address, browser type, device ID, and cookies.</li>
      <li><strong>Behavioral Information:</strong> Product preferences, browsing activity, and feedback.</li>
    </ul>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h3>
    <ul className="list-disc pl-6 text-gray-600 space-y-2">
      <li>Process and fulfill orders efficiently</li>
      <li>Provide real-time order tracking and shipping updates</li>
      <li>Offer personalized product recommendations</li>
      <li>Improve platform experience and performance</li>
      <li>Send relevant notifications, promotional content, and service updates</li>
      <li>Assist in marketing, research, and analytics to better serve you</li>
      <li>Comply with legal, regulatory, and contractual obligations</li>
    </ul>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">3. How We Share Your Information</h3>
    <p className="text-gray-600">
      We do not sell or rent your personal information to third parties. However, we may share it with:
    </p>
    <ul className="list-disc pl-6 text-gray-600 space-y-2">
      <li>Logistics partners for delivery and returns</li>
      <li>Payment gateways for secure transactions</li>
      <li>Customer support partners to provide assistance</li>
      <li>Marketing and analytics partners to improve service quality</li>
      <li>Government or legal authorities when required by law</li>
    </ul>
    <p className="text-gray-600 mt-2">
      All third-party partners are obligated to handle your data securely and only for authorized purposes.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Cookies and Tracking</h3>
    <p className="text-gray-600">
      We use cookies and similar technologies to:
    </p>
    <ul className="list-disc pl-6 text-gray-600 space-y-2">
      <li>Enable essential platform features</li>
      <li>Remember your preferences and login details</li>
      <li>Understand user behavior and improve site performance</li>
      <li>Offer personalized product suggestions and advertisements</li>
    </ul>
    <p className="text-gray-600 mt-2">
      You can modify cookie preferences through your browser settings.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Data Security</h3>
    <p className="text-gray-600">
      We implement industry-standard security protocols, including:
    </p>
    <ul className="list-disc pl-6 text-gray-600 space-y-2">
      <li>SSL encryption for data transmission</li>
      <li>Secure payment gateways</li>
      <li>Restricted access to personal data</li>
      <li>Regular audits and vulnerability testing</li>
    </ul>
    <p className="text-gray-600 mt-2">
      Your information is stored in secure servers, and access is granted only on a need-to-know basis.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Your Rights & Choices</h3>
    <p className="text-gray-600">
      You have the right to:
    </p>
    <ul className="list-disc pl-6 text-gray-600 space-y-2">
      <li>Access and review your personal information</li>
      <li>Update or correct inaccurate data</li>
      <li>Request deletion of your data (where applicable)</li>
      <li>Opt out of promotional communication at any time</li>
      <li>Withdraw consent to data processing (subject to terms)</li>
    </ul>
    <p className="text-gray-600 mt-2">
      You can manage these by visiting the “Account Settings” section or contacting our support.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">7. Retention of Information</h3>
    <ul className="list-disc pl-6 text-gray-600 space-y-2">
      <li>Fulfill the purpose it was collected for</li>
      <li>Comply with applicable laws and taxation/audit requirements</li>
      <li>Resolve disputes and enforce agreements</li>
    </ul>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">8. Changes to this Policy</h3>
    <p className="text-gray-600">
      Ink n Dyes may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. We encourage users to review it periodically.
    </p>
  </section>
</div>


          {/* Last Updated */}
          <div className="mt-12 pt-8 border-t border-gray-100">
          <div>
      <p
        className="text-sm text-gray-500 text-center cursor-pointer "
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
  
  export default PrivacyPolicy