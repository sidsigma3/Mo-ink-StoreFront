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

const Blog4 = () => {
  const { t } = useTranslation();
  
  const breadcrumbs = [
    { label: t("blog4.breadcrumb.home"), link: "/home" },
    { label: t("blog4.breadcrumb.blogs"), link: "/Blogs" },
    { label: t("blog4.breadcrumb.coneVsHank"), link: "/Blog4" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'><NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'><Navbar /></div>

      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
        <HeroSection productName={t("blog4.heroTitle")} breadcrumbs={breadcrumbs} />
      </div>

      <main className="max-w-7xl mx-auto py-12">
        <div className="bg-white rounded-5 p-6 md:p-10">
          <div className="mb-8">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
              {t("blog4.title")}
            </h1>

            <div className="mb-12">
              <img
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/WhatsApp%20Image%202025-05-01%20at%205.15.45%20PM.jpeg?updatedAt=1746100149336"
                alt={t("blog4.featuredImageAlt")}
                className="w-full h-[500px] object-cover rounded-2xl"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8 leading-relaxed">
                {t("blog4.introduction")}
              </p>

              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mt-12 mb-6">
                {t("blog4.section1.title")}
              </h2>
              <p className="text-gray-600 mb-6">
                {t("blog4.section1.content")}
              </p>
              <ul className="list-disc list-inside space-y-4 text-gray-600 mb-8">
                <li>{t("blog4.section1.point1")}</li>
                <li>{t("blog4.section1.point2")}</li>
                <li>{t("blog4.section1.point3")}</li>
              </ul>
              <p className="text-gray-600 mb-6">
                {t("blog4.section1.conclusion")}
              </p>

              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mt-12 mb-6">
                {t("blog4.section2.title")}
              </h2>
              <p className="text-gray-600 mb-6">
                {t("blog4.section2.content")}
              </p>
              <ul className="list-disc list-inside space-y-4 text-gray-600 mb-8">
                <li>{t("blog4.section2.point1")}</li>
                <li>{t("blog4.section2.point2")}</li>
                <li>{t("blog4.section2.point3")}</li>
              </ul>
              <p className="text-gray-600 mb-6">
                {t("blog4.section2.conclusion")}
              </p>

              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mt-12 mb-6">
                {t("blog4.section3.title")}
              </h2>
              <p className="text-gray-600 mb-4">
                <strong>{t("blog4.section3.coneTitle")}</strong>
              </p>
              <ul className="list-disc list-inside space-y-4 text-gray-600 mb-6">
                <li>{t("blog4.section3.conePoint1")}</li>
                <li>{t("blog4.section3.conePoint2")}</li>
                <li>{t("blog4.section3.conePoint3")}</li>
              </ul>

              <p className="text-gray-600 mb-4">
                <strong>{t("blog4.section3.hankTitle")}</strong>
              </p>
              <ul className="list-disc list-inside space-y-4 text-gray-600 mb-8">
                <li>{t("blog4.section3.hankPoint1")}</li>
                <li>{t("blog4.section3.hankPoint2")}</li>
                <li>{t("blog4.section3.hankPoint3")}</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mt-12 mb-6">
                {t("blog4.section4.title")}
              </h2>
              <p className="text-gray-600 mb-6">
                {t("blog4.section4.content")}
              </p>

              <p className="text-xl font-medium text-gray-800 mt-10">
                {t("blog4.tagline")}
              </p>
              <p className="text-gray-600 mt-4">
                {t("blog4.callToAction")}
              </p>
            </div>
          </div>
        </div>
      </main>

      <div>
        <h3 className='text-2xl text-center md:text-left md:2xl font-medium py-4'>
          {t("blog4.recentArticles")}
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

export default Blog4;