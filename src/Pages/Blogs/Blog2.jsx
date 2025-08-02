import React, { useState, useEffect } from 'react';
import TopNavigation from '../../Components/TopNavigation/TopNavigation';
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader';
import Navbar from '../../Components/Navbar/Navbar';
import Cta from '../../Components/CTA/Cta';
import Footer from '../../Components/Footer/Footer';
import HeroSection from '../../Components/HeroSection/HeroSection';
import BottomNav from '../../Components/BottomNav/BottomNav';
import BlogBox1 from '../../Components/BlogList/BlogBox1';
import BlogBox2 from '../../Components/BlogList/BloxBox2';
import BlogBox3 from '../../Components/BlogList/BloxBox3';
import BlogBox4 from '../../Components/BlogList/BloxBox4';
import { useTranslation } from "react-i18next";

const Blog2 = () => {
  const { t } = useTranslation();
  
  const breadcrumbs = [
    { label: t("blog2.breadcrumb.home"), link: "/home" },
    { label: t("blog2.breadcrumb.blogs"), link: "/Blogs" },
    { label: t("blog2.breadcrumb.behindThread"), link: "/Blog2" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'><NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'><Navbar /></div>

      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
        <HeroSection productName={t("blog2.heroTitle")} breadcrumbs={breadcrumbs} />
      </div>

      <main className="max-w-7xl mx-auto py-12">
        <div className="bg-white rounded-5 p-6 md:p-10">

          <div className="mb-8">
            <h1 className="text-xl font-semibold md:text-2xl text-gray-900 mb-6">
              {t("blog2.title")}
            </h1>

            <div className="mb-12">
              <img
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/WhatsApp%20Image%202025-05-01%20at%205.15.45%20PM%20(1).jpeg?updatedAt=1746100085378"
                alt={t("blog2.featuredImageAlt")}
                className="w-full h-[500px] object-cover rounded-2xl"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8 leading-relaxed">
                {t("blog2.introduction")}
              </p>

              <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
                {t("blog2.step1.title")}
              </h2>
              <p className="text-gray-600 mb-6">
                {t("blog2.step1.content")}
              </p>

              <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
                {t("blog2.step2.title")}
              </h2>
              <p className="text-gray-600 mb-6">
                {t("blog2.step2.content")}
              </p>

              <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
                {t("blog2.step3.title")}
              </h2>
              <p className="text-gray-600 mb-6">
                {t("blog2.step3.content")}
              </p>

              <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
                {t("blog2.step4.title")}
              </h2>
              <p className="text-gray-600 mb-6">
                {t("blog2.step4.content")}
              </p>

              <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
                {t("blog2.step5.title")}
              </h2>
              <p className="text-gray-600 mb-6">
                {t("blog2.step5.content")}
              </p>
              <ul className="list-disc list-inside space-y-4 text-gray-600 mb-8">
                <li>{t("blog2.step5.point1")}</li>
                <li>{t("blog2.step5.point2")}</li>
                <li>{t("blog2.step5.point3")}</li>
                <li>{t("blog2.step5.point4")}</li>
              </ul>

              <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
                {t("blog2.conclusion.title")}
              </h2>
              <p className="text-gray-600 mb-6">
                {t("blog2.conclusion.content")}
              </p>
            </div>
          </div>
        </div>
      </main>

      <div>
        <h3 className='text-2xl text-center md:text-left md:2xl font-medium py-4'>
          {t("blog2.recentArticles")}
        </h3>
        <div className="flex justify-center px-3">
          <div className="max-w-8xl w-full overflow-x-auto scrollbar-hide">
            <ul className="flex space-x-4 sflex lg:justify-center overflow-x-auto pb-4">
              <li className="snap-start shrink-0 w-80"><BlogBox1 /></li>
              <li className="snap-start shrink-0 w-80"><BlogBox2 /></li>
              <li className="snap-start shrink-0 w-80"><BlogBox3 /></li>
              <li className="snap-start shrink-0 w-80"><BlogBox4 /></li>
            </ul>
          </div>
        </div>
      </div>

      <div className='px-6 md:px-14 py-3 mt-10'><Cta /></div>
      <div className='px-6 md:px-14 py-3'><Footer /></div>
      <BottomNav />
    </div>
  );
};

export default Blog2;