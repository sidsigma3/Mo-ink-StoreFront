import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import TopNavigation from '../../Components/TopNavigation/TopNavigation';
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader';
import Navbar from '../../Components/Navbar/Navbar';
import Cta from '../../Components/CTA/Cta';
import Footer from '../../Components/Footer/Footer';
import HeroSection from '../../Components/HeroSection/HeroSection';
import BottomNav from '../../Components/BottomNav/BottomNav';
import { ShieldQuestion } from 'lucide-react';

const FAQs = () => {
  const { t } = useTranslation();

  const breadcrumbs = [
    { label: t("faqs.breadcrumb.home"), link: "/home" },
    { label: t("faqs.breadcrumb.faqs"), link: "/FAQs" },
  ];

  const faqData = [
    {
      question: t("faqs.question1"),
      answer: t("faqs.answer1"),
    },
    {
      question: t("faqs.question2"),
      answer: t("faqs.answer2"),
    },
    {
      question: t("faqs.question3"),
      answer: t("faqs.answer3"),
    },
    {
      question: t("faqs.question4"),
      answer: t("faqs.answer4"),
    },
    {
      question: t("faqs.question5"),
      answer: t("faqs.answer5"),
    },
    {
      question: t("faqs.question6"),
      answer: t("faqs.answer6"),
    },
    {
      question: t("faqs.question7"),
      answer: t("faqs.answer7"),
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
        <HeroSection productName={t("faqs.pageTitle")} breadcrumbs={breadcrumbs} />
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("faqs.mainTitle")}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("faqs.introduction")}
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
            <p className="text-sm text-gray-500">{t("faqs.lastUpdated")}</p>
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