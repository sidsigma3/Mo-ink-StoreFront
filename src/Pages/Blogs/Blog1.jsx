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

const Blog1 = () => {
  const { t } = useTranslation();
  
  const breadcrumbs = [
    { label: t("blog1.breadcrumb.home"), link: "/home" },
    { label: t("blog1.breadcrumb.blogs"), link: "/Blogs" },
    { label: t("blog1.breadcrumb.journey"), link: "/Blog1" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar /></div>

      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
        <HeroSection productName={t("blog1.heroTitle")} breadcrumbs={breadcrumbs} />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12">
        <div className="bg-white rounded-5 p-6 md:p-10">

      {/* Article Header */}
          <div className="mb-8">
          
          <h1 className="text-xl font-semibold md:text-2xl text-gray-900 mb-6">
            {t("blog1.title")}
          </h1>

          {/* Featured Image */}
        <div className="mb-12">
          <img
            src="https://images.pexels.com/photos/4219611/pexels-photo-4219611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt={t("blog1.featuredImageAlt")}
            className="w-full h-[500px] object-cover rounded-2xl"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className=" text-gray-600 mb-8 leading-relaxed">
            {t("blog1.introduction")}
          </p>

          <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
            {t("blog1.section1.title")}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("blog1.section1.content")}
          </p>

          <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/4219653/pexels-photo-4219653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt={t("blog1.image1Alt")}
              className="rounded-xl"
            />
            <img
              src="https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt={t("blog1.image2Alt")}
              className="rounded-xl"
            />
          </div>

          <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
            {t("blog1.section2.title")}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("blog1.section2.content")}
          </p>

          <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
            {t("blog1.section3.title")}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("blog1.section3.content")}
          </p>

          <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
            {t("blog1.section4.title")}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("blog1.section4.content")}
          </p>
          <ul className="list-disc list-inside space-y-4 text-gray-600 mb-8">
            <li>{t("blog1.section4.point1")}</li>
            <li>{t("blog1.section4.point2")}</li>
            <li>{t("blog1.section4.point3")}</li>
          </ul>

          <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
            {t("blog1.section5.title")}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("blog1.section5.content")}
          </p>

          <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">
            {t("blog1.section6.title")}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("blog1.section6.content")}
          </p>
        </div>
         </div>
        </div>
      </main>

<div className=''>
         <h3 className='text-2xl text-center md:text-left md:2xl font-medium py-4'>{t("blog1.recentArticles")}</h3>

        <div className="flex justify-center px-3">
          <div className="max-w-8xl w-full overflow-x-auto scrollbar-hide">
            <ul className="flex space-x-4 sflex lg:justify-center overflow-x-auto pb-4">
              <li className="snap-start shrink-0 w-80">
                <BlogBox1 />
              </li>
              <li className="snap-start shrink-0 w-80">
                <BlogBox2 />
              </li>
            
              <li className="snap-start shrink-0 w-80">
                <BlogBox3 />
              </li>
              <li className="snap-start shrink-0 w-80">
                <BlogBox4 />
              </li>
              
              </ul>
          </div>
        </div>

    </div>
    

      <div className='px-6 md:px-14 py-3 mt-10'><Cta /></div>
      <div className='px-6 md:px-14 py-3'> <Footer /></div>
      <BottomNav />
    </div>
  );
};

export default Blog1;