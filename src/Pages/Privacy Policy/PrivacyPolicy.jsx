import React, { useState, useEffect } from 'react';
import TopNavigation from '../../Components/TopNavigation/TopNavigation';
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader';
import Navbar from '../../Components/Navbar/Navbar';
import Cta from '../../Components/CTA/Cta';
import Footer from '../../Components/Footer/Footer';
import HeroSection from '../../Components/HeroSection/HeroSection';
import BottomNav from '../../Components/BottomNav/BottomNav';
import { MdOutlineShield } from "react-icons/md";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  
  const breadcrumbs = [
    { label: t("privacyPolicy.breadcrumb.home"), link: "/home" },
    { label: t("privacyPolicy.breadcrumb.privacyPolicy"), link: "/privacyPolicy" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'><NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'><Navbar /></div>

      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
        <HeroSection productName={t("privacyPolicy.heroTitle")} breadcrumbs={breadcrumbs} />
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white border-2 border-zinc-100 rounded-5 p-6 sm:p-6 md:p-8 lg:p-10 xl:p-10">
          {/* Hero Section */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-neutral-100 p-4 rounded-full">
              <MdOutlineShield size={45} color='#6B21A8'/>
            </div>
          </div>

          {/* Introduction */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("privacyPolicy.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("privacyPolicy.introduction")}
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("privacyPolicy.section1.title")}
              </h3>
              <p className="text-gray-600">
                {t("privacyPolicy.section1.content")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-2">
                <li>
                  <strong>{t("privacyPolicy.section1.point1.label")}</strong> {t("privacyPolicy.section1.point1.description")}
                </li>
                <li>
                  <strong>{t("privacyPolicy.section1.point2.label")}</strong> {t("privacyPolicy.section1.point2.description")}
                </li>
                <li>
                  <strong>{t("privacyPolicy.section1.point3.label")}</strong> {t("privacyPolicy.section1.point3.description")}
                </li>
                <li>
                  <strong>{t("privacyPolicy.section1.point4.label")}</strong> {t("privacyPolicy.section1.point4.description")}
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("privacyPolicy.section2.title")}
              </h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t("privacyPolicy.section2.point1")}</li>
                <li>{t("privacyPolicy.section2.point2")}</li>
                <li>{t("privacyPolicy.section2.point3")}</li>
                <li>{t("privacyPolicy.section2.point4")}</li>
                <li>{t("privacyPolicy.section2.point5")}</li>
                <li>{t("privacyPolicy.section2.point6")}</li>
                <li>{t("privacyPolicy.section2.point7")}</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("privacyPolicy.section3.title")}
              </h3>
              <p className="text-gray-600">
                {t("privacyPolicy.section3.content")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t("privacyPolicy.section3.point1")}</li>
                <li>{t("privacyPolicy.section3.point2")}</li>
                <li>{t("privacyPolicy.section3.point3")}</li>
                <li>{t("privacyPolicy.section3.point4")}</li>
                <li>{t("privacyPolicy.section3.point5")}</li>
              </ul>
              <p className="text-gray-600 mt-2">
                {t("privacyPolicy.section3.conclusion")}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("privacyPolicy.section4.title")}
              </h3>
              <p className="text-gray-600">
                {t("privacyPolicy.section4.content")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t("privacyPolicy.section4.point1")}</li>
                <li>{t("privacyPolicy.section4.point2")}</li>
                <li>{t("privacyPolicy.section4.point3")}</li>
                <li>{t("privacyPolicy.section4.point4")}</li>
              </ul>
              <p className="text-gray-600 mt-2">
                {t("privacyPolicy.section4.conclusion")}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("privacyPolicy.section5.title")}
              </h3>
              <p className="text-gray-600">
                {t("privacyPolicy.section5.content")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t("privacyPolicy.section5.point1")}</li>
                <li>{t("privacyPolicy.section5.point2")}</li>
                <li>{t("privacyPolicy.section5.point3")}</li>
                <li>{t("privacyPolicy.section5.point4")}</li>
              </ul>
              <p className="text-gray-600 mt-2">
                {t("privacyPolicy.section5.conclusion")}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("privacyPolicy.section6.title")}
              </h3>
              <p className="text-gray-600">
                {t("privacyPolicy.section6.content")}
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t("privacyPolicy.section6.point1")}</li>
                <li>{t("privacyPolicy.section6.point2")}</li>
                <li>{t("privacyPolicy.section6.point3")}</li>
                <li>{t("privacyPolicy.section6.point4")}</li>
                <li>{t("privacyPolicy.section6.point5")}</li>
              </ul>
              <p className="text-gray-600 mt-2">
                {t("privacyPolicy.section6.conclusion")}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("privacyPolicy.section7.title")}
              </h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>{t("privacyPolicy.section7.point1")}</li>
                <li>{t("privacyPolicy.section7.point2")}</li>
                <li>{t("privacyPolicy.section7.point3")}</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("privacyPolicy.section8.title")}
              </h3>
              <p className="text-gray-600">
                {t("privacyPolicy.section8.content")}
              </p>
            </section>
          </div>

          {/* Last Updated */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-500 text-center cursor-pointer">
                {t("privacyPolicy.lastUpdated")}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <div className='px-6 md:px-14 py-3 mt-10'><Cta /></div>
      <div className='px-6 md:px-14 py-3'><Footer /></div>
      <BottomNav />
    </div>
  );
}

export default PrivacyPolicy;