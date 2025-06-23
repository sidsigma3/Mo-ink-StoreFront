import React, { useState, useEffect } from 'react';
import TopNavigation from '../../Components/TopNavigation/TopNavigation';
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader';
import Navbar from '../../Components/Navbar/Navbar';
import Cta from '../../Components/CTA/Cta';
import Footer from '../../Components/Footer/Footer';
import HeroSection from '../../Components/HeroSection/HeroSection';
import BottomNav from '../../Components/BottomNav/BottomNav';
import { ShieldQuestion } from 'lucide-react';

const FAQs = () => {
  const breadcrumbs = [
    { label: "Home", link: "/home" },
    { label: "FAQs", link: "/FAQs" },
  ];

  const faqData = [
    {
      question: "What types of yarn do you manufacture?",
      answer:
        "We specialize in high-quality cotton, silk, nylon, polyester, and blended yarns etc, available in various counts and specifications to meet industrial and commercial needs.",
    },
    {
      question: "Do you offer custom yarn specifications?",
      answer:
        "Yes, we provide customized yarn solutions tailored to your specific requirements. Please contact us for details on minimum order quantities and customization options.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept bank transfers, corporate checks, and online payments through secure gateways. All orders must be fully paid before production or dispatch.",
    },
    {
        question: "How long does it take to process and deliver an order?",
        answer:
          "Processing times depend on the order size and customization requirements. Standard bulk orders take 7-14 business days for production, with additional shipping time depending on your location.",
      },
    {
        question: "Can I modify or cancel my order after placing it?",
        answer:
          "Since we manufacture yarns based on bulk orders, modifications or cancellations are only possible within 24 hours of order placement. After this period, the order goes into production and cannot be changed.",
    },
    {
        question: "What is your return policy?",
        answer:
          "Due to the nature of our business, we do not accept returns once an order has been processed and delivered. However, if you receive a defective or incorrect item, please notify us within 48 hours of delivery for resolution.",
      },
    {
        question: "Can I get a refund if I am not satisfied with my order?",
        answer:
          "Refunds are only applicable in cases of incorrect or defective products. Since we manufacture on order, refunds for change of mind or dissatisfaction with specifications are not permitted.",
    },  
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar /></div>

      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
        <HeroSection productName={'FAQs'} breadcrumbs={breadcrumbs} />
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white border-2 border-zinc-100 rounded-5 p-6 md:p-10">

          {/* Hero Section */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-neutral-100 p-4 rounded-full">
              <ShieldQuestion size={45} color='#6B21A8' />
            </div>
          </div>

          {/* Introduction */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to Ink n Dyes, your trusted partner in high-quality yarn manufacturing. Below, you’ll find answers to some common questions about our products, ordering process, shipping, and policies.
            </p>
          </div>

          {/* FAQs Section */}
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="flex items-center justify-between w-full text-left px-4 py-3 font-bold text-grey-950 hover:bg-gray-100"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 justify-end transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-4 py-3 border-t border-gray-200 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Last Updated */}
          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">Last updated: March 2025</p>
          </div>
        </div>
      </main>

      <div className='px-6 md:px-14 py-3 mt-10'><Cta /></div>
      <div className='px-6 md:px-14 py-3'> <Footer /></div>
      <BottomNav />
    </div>
  );
};

export default FAQs;
