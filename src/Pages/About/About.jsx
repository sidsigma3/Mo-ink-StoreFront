import React, { useState, useEffect } from 'react';
import TopNavigation from '../../Components/TopNavigation/TopNavigation';
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader';
import Navbar from '../../Components/Navbar/Navbar';
import Cta from '../../Components/CTA/Cta';
import Footer from '../../Components/Footer/Footer';
import HeroSection from '../../Components/HeroSection/HeroSection';
import BottomNav from '../../Components/BottomNav/BottomNav';
import { FiLinkedin } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  
  const breadcrumbs = [
    { label: t("about.breadcrumb.home"), link: "/home" },
    { label: t("about.breadcrumb.about"), link: "/About" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar /></div>

      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
        <HeroSection productName={t("about.pageTitle")} breadcrumbs={breadcrumbs} />
      </div>
 
    
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white border-2 border-zinc-100 rounded-5 p-6 md:p-10">

          {/* Story Sections */}
          <div className="">
              <section>
                <h3 className="text-xl md:text-2xl  font-semibold text-gray-900 mb-4">{t("about.ourStory.title")}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {t("about.ourStory.paragraph1")}
                </p>

                <p className="mb-4">
                  {t("about.ourStory.paragraph2")}
                </p>

                <p className="mb-8"> 
                  {t("about.ourStory.paragraph3")}
                </p>
              </section>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative aspect-[1/1] lg:aspect-1:1">
              <img
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Avi_CEO.png?updatedAt=1749872370942"
                alt={t("about.ceo.imageAlt")}
                className="rounded-lg object-cover w-full h-full"
              />
              <div className="absolute bottom-4 right-4 flex space-x-3">
                <a href="https://www.linkedin.com/in/avinashmohanty/" className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                  <FiLinkedin  className="w-5 h-5 text-blue-600"/>
                </a>
                <a href="#" className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                  <FaInstagram  className="w-5 h-5 text-red-600" />
                </a>
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl  font-bold text-gray-900 mb-3">{t("about.ceo.name")}</h2>
              <p className="text-lg text-purple-800 mb-6">{t("about.ceo.title")}</p>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  {t("about.ceo.quote1")}
                </p>
                <p>
                  {t("about.ceo.quote2")}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 my-8 border-y border-gray-200">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-800 mb-2">{t("about.stats.customers.number")}</div>
                  <div className="text-gray-600">{t("about.stats.customers.label")}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-800 mb-2">{t("about.stats.states.number")}</div>
                  <div className="text-gray-600">{t("about.stats.states.label")}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-800 mb-2">{t("about.stats.satisfaction.number")}</div>
                  <div className="text-gray-600">{t("about.stats.satisfaction.label")}</div>
                </div>
              </div>

              <section>
                <h3 className="text-xl md:text-2xl  font-semibold text-gray-900 mb-4">{t("about.mission.title")}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t("about.mission.description")}
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
                <li>{t("about.mission.point1")}</li>
                <li>{t("about.mission.point2")}</li>
                <li>{t("about.mission.point3")}</li>
              </ul>
              </section>

              <section>
                <h3 className="text-xl md:text-2xl  font-semibold text-gray-900 mb-4">{t("about.future.title")}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {t("about.future.description")}
                </p>
              </section>
          </div>
        </div>
      </main>

      <div className='px-6 md:px-14 py-3 mt-10'><Cta /></div>
      <div className='px-6 md:px-14 py-3'> <Footer /></div>
      <BottomNav />

    </div>
  );
};

export default About;