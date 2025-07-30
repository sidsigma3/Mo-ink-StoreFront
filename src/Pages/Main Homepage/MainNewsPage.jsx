import React, { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import MainHeader from "../../Components/MainHeader/MainHeader";
import MainKMHero from "../../Components/MainKMHero/MainKMHero";
import Cta from "../../Components/CTA/Cta";
import Footer from "../../Components/Footer/Footer";
import { FiMail, FiPhone, FiMapPin, FiCheck, FiGlobe, FiAward } from 'react-icons/fi';
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../Components/LanguageSwitcher/LanguageSwitcher";

const MainNewsPage = () => {
    
     useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const sliderRef = useRef(null);
const keenSliderInstance = useRef(null);
const { t } = useTranslation();

useEffect(() => {
  if (!sliderRef.current) return;

  const slider = new KeenSlider(sliderRef.current, {
    loop: true,
    renderMode: "performance",
    slides: {
      origin: "center",
      perView: 5,        
      spacing: 10,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 4, spacing: 32 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 10 }, 
      },
    },
  });

  keenSliderInstance.current = slider;

  let interval = setInterval(() => {
    slider.next();
  }, 1000);

  const pause = () => clearInterval(interval);
  const resume = () => {
    interval = setInterval(() => slider.next(), 3000);
  };

  sliderRef.current.addEventListener("mouseenter", pause);
  sliderRef.current.addEventListener("mouseleave", resume);

  return () => {
    if (slider) slider.destroy();
    pause();
    sliderRef.current?.removeEventListener("mouseenter", pause);
    sliderRef.current?.removeEventListener("mouseleave", resume);
  };
}, []);

    const navigate = useNavigate();


  return (
    <div className=" bg-white text-gray-800 overflow-hidden">
      <div className='px-6 md:px-14 py-1 md:py-3'> <MainHeader></MainHeader></div>
        <div
      className="relative h-[200px] lg:h-[400px] bg-center bg-cover flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/22039751/pexels-photo-22039751.jpeg')`,
      }}
    >
      {/* Dark overlay */}
        <div class="absolute top-0 left-0 w-full h-full bg-black opacity-45 z-0"></div>
      {/* Content */}
      <div className="relative z-10 px-4 space-y-5">
        <h1 className="text-white lg:text-5xl text-3xl font-extrabold leading-tight sm:text-6xl">
          {t("knowmore.newsHeading")} <br />
           <span className="block w-full h-3 bg-purple-800 mt-4"></span> 
        </h1>
      </div>
    </div>

      
       <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="rounded-3xl lg:w-1/2">
           <img 
              src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/OHUB%20Mention.png?updatedAt=1749891736763" 
              alt="Ohub Mention" 
              className="rounded-lg border-2 border-grey-100 w-full h-auto"
            />      
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">{t("knowmore.ohubHeading")}</h2>
            <p className="text-lg mb-6">
              {t("knowmore.ohubPara1")}
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                  <FiCheck className="text-purple-800" />
                </div>
                <p className="text-lg">{t("knowmore.ohubPoint1")}</p>
              </div>
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                  <FiCheck className="text-purple-800" />
                </div>
                <p className="text-lg">{t("knowmore.ohubPoint2")}</p>
              </div>
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                  <FiCheck className="text-purple-800" />
                </div>
                <p className="text-lg">{t("knowmore.ohubPoint3")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-4 border-y">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Left Text */}
        <div className="text-center md:text-left md:w-2/5">
          <p className="text-xl text-left font-semibold text-gray-800"> 
            {t("knowmore.recognitionText1")} <br /> {t("knowmore.recognitionText2")}
          </p>
        </div>

        {/* Logos */}
     <div className="overflow-hidden">
  <div
    ref={sliderRef}
    className="keen-slider md:w-3/5 flex items-center justify-start" 
  >
    <div className="keen-slider__slide flex justify-center items-center min-w-[180px] px-4">
      <img
        src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/utkrsh-odisha-h-logo.png?updatedAt=1749890491528"
        alt="Logo 3"
        className="h-24 w-auto object-contain"
      />
    </div>

    <div className="keen-slider__slide flex justify-center items-center min-w-[180px] px-4">
      <img
        src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/startup_odisha_official_logo.png?updatedAt=1749890491698"
        alt="Logo 2"
        className="h-24 w-auto object-contain"
      />
    </div>

    <div className="keen-slider__slide flex justify-center items-center min-w-[180px] px-4">
      <img
        src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/OSC2024.png?updatedAt=1749890493096"
        alt="Logo 1"
        className="h-20 w-auto object-contain"
      />
    </div>

    <div className="keen-slider__slide flex justify-center items-center min-w-[180px] px-4">
      <img
        src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/NITI_Aayog_logo.png?updatedAt=1749890491462"
        alt="Logo 4"
        className="h-20 w-auto object-contain"
      />
    </div>

    <div className="keen-slider__slide flex justify-center items-center min-w-[180px] px-4">
      <img
        src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Screenshot%202025-06-17%20114036.png?updatedAt=1750140701712"
        alt="Logo 5"
        className="h-20 w-auto object-contain"
      />
    </div>
  </div>
</div>


      </div>
    </section>





      {/* 4. The Problem We Solve */}
      <section className="mt-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
          <div className="lg:w-1/2">
            <img 
              src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/NewsPaper%20CutOut.png?updatedAt=1749883723941" 
              alt="Textile quality control" 
              className="rounded-lg border-2 border-grey-100 w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">
{t("knowmore.featuredHeading")}</h2>
            
            
            <div className="mb-8">
             <p className="text-lg mb-6">
            {t("knowmore.featuredPara1")}            </p>
               <p className="text-lg mb-6">
              {t("knowmore.featuredPara2")}        
            </p>
           
        </div>  
          </div>
        </div>
      </section>

    <section id="about" className="my-20 lg:my-30 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="rounded-3xl  h-[500px]  lg:w-1/2">
          <video
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="none"
            poster=""
            loading="lazy"
            className="rounded-lg border-2 w-full h-full object-cover"
          >
            <source src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Avinash%20Mohanty,%20Founder%20and%20CEO,%20and%20the%20entire%20team%20at%20Ink%20n%20Dyes%20are%20weaving%20innovation%20from%20the%20heart%20of%20Odisha,%20pioneering%20excellence%20in%20industrial-grade%20yarn%20manufacturing.Specialising%20in%20high-performance%20yarn.mp4?updatedAt=1749892736414" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">{t("knowmore.videoHeading")}</h2>
            <p className="text-lg mb-6">
              {t("knowmore.videoPara")}    
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                  <FiCheck className="text-purple-800" />
                </div>
                <p className="text-lg">{t("knowmore.videoPoint1")}</p>
              </div>
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                  <FiCheck className="text-purple-800" />
                </div>
                <p className="text-lg"> {t("knowmore.videoPoint2")}</p>
              </div>
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                  <FiCheck className="text-purple-800" />
                </div>
                <p className="text-lg">{t("knowmore.videoPoint3")}</p>
              </div>
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                  <FiCheck className="text-purple-800" />
                </div>
                <p className="text-lg">{t("knowmore.videoPoint4")}</p>
              </div>
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                  <FiCheck className="text-purple-800" />
                </div>
                <p className="text-lg">{t("knowmore.videoPoint5")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>



    {/* 7. Key Metrics / Social Proof */}
      <section className="py-6 px-6 bg-amber-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-12 text-center">{t("knowmore.impactHeading")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8  mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-800 mb-2">5K+</div>
                  <div className="text-gray-600">{t("knowmore.impactCustomers")}</div>
                </div>
                <div className="text-center"> 
                  <div className="text-4xl font-bold text-purple-800 mb-2">25+</div>
                  <div className="text-gray-600">{t("knowmore.impactStates")}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-800 mb-2">98%</div>
                  <div className="text-gray-600">{t("knowmore.impactSatisfaction")}</div>
                </div>
              </div>
        </div>
      </section>


      {/* 6. Meet the Founder */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3">
            <img 
              src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Avi_CEO.png?updatedAt=1749872370942" 
              alt="Founder" 
              className="rounded-full w-64 h-64 object-cover mx-auto border-4 border-purple-200 shadow-lg"
            />
          </div>
          <div className="lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">{t("knowmore.founderHeading")}</h2>
            <blockquote className="text-xl italic mb-6 text-gray-700">
             {t("knowmore.founderQuote")}
            </blockquote>
            <div>
              <p className="text-lg font-semibold">{t("knowmore.founderName")}</p>
              <p className="text-purple-800">{t("knowmore.founderDesignation")}</p>
            </div>
          </div>
        </div>
      </section>

  

    <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
        
    </div>
  );
};


export default MainNewsPage

