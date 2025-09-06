import { useEffect, useRef } from "react";
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import MainHero from '../../Components/MainHero/MainHero' 
import MainFeatures from '../../Components/MainFeatures/MainFeatures'
import MainWhyUs from '../../Components/MainWhyUs/MainWhyUs'
import MainBestsellers from '../../Components/MainBestsellers/MainBestsellers'
import Cta from '../../Components/CTA/Cta'
import FeturesList from '../../Components/FeturesList/FeturesList'
import Footer from '../../Components/Footer/Footer'
import BottomNav from '../../Components/BottomNav/BottomNav'
import MainFAQ from '../../Components/MainFAQ/MainFAQ'
import MainColors from '../../Components/MainColors/MainColors'
import MainProcess from '../../Components/MainProcess/MainProcess'
import MainParallax from '../../Components/MainParallax/MainParallax'
import MainMap from '../../Components/MainMap/MainMap'
import MainCone from '../../Components/MainCone/MainCone'
import MainHeader from '../../Components/MainHeader/MainHeader'
import MainMarketing from '../../Components/MainMarketing/MainMarketing'
import Inqueries from '../../Components/Inqueries/Inqueries'
import MainNews from "../../Components/MainNews/MainNews";
import TestimonialStats from "../../Components/Testimonial/Testimonial";
import Testimonial from "../../Components/Testimonial/Testimonial";
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion";
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";
import { useTranslation } from "react-i18next";



const MainHomepage = () => {
const location = useLocation(); 
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);


const sliderRef = useRef(null); // Keep this for existing KeenSlider
const logosSliderRef = useRef(null); // New ref for logos section
const keenSliderInstance = useRef(null);
const { t } = useTranslation();


// Existing KeenSlider useEffect (unchanged)
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

// New useEffect for logos slider
useEffect(() => {
  if (!logosSliderRef.current) return;

  const logosSlider = new KeenSlider(logosSliderRef.current, {
    loop: true,
    renderMode: "performance",
    mode: "free-snap",
    slides: {
      perView: 2,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 24 }, // Changed from 2.5 to 3
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 32 }, // Changed from 4.5 to 3
      },
    },
  });

  let logosInterval = setInterval(() => {
    logosSlider.next();
  }, 2500);

  const pauseLogos = () => clearInterval(logosInterval);
  const resumeLogos = () => {
    logosInterval = setInterval(() => logosSlider.next(), 2500);
  };

  logosSliderRef.current.addEventListener("mouseenter", pauseLogos);
  logosSliderRef.current.addEventListener("mouseleave", resumeLogos);

  return () => {
    if (logosSlider) logosSlider.destroy();
    pauseLogos();
    logosSliderRef.current?.removeEventListener("mouseenter", pauseLogos);
    logosSliderRef.current?.removeEventListener("mouseleave", resumeLogos);
  };
}, []);

  

  return (
      <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname} // Use location instead of router
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
    <div className='w-full'>
        {/* <div className='px-5 py-3'> <TopNavigation></TopNavigation></div> */}
        <div className='px-6 md:px-14 py-1 md:py-3 bg-gradient-to-l from-[#BDBDB9] via-[#D2D2CD] to-[#D2D0CC]'> <MainHeader></MainHeader></div>
        <div className=''> <MainHero></MainHero> </div>

{/* Logos Highlights */}
<section className="bg-white py-12 sm:py-16 lg:py-20 px-4 border-y border-gray-200">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
      
      {/* Text Content */}
      <div className="w-full lg:w-2/5 text-center md:text-left">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 leading-tight">
          <span className="block">{t("knowmore.recognitionText1")}</span>
          <span className="block mt-1">{t("knowmore.recognitionText2")}</span>
        </h2>
      </div>

      {/* Logos Container */}
      <div className="w-full lg:w-3/5">
        <div className="relative overflow-hidden">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling container - Using logosSliderRef */}
          <div
            ref={logosSliderRef}
            className="keen-slider"
          >
            {/* Logo Items */}
            <div className="keen-slider__slide flex items-center justify-center px-2 sm:px-4">
              <img
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/utkrsh-odisha-h-logo.png?updatedAt=1749890491528"
                alt="Utkarsh Odisha"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain transition-all duration-300"
                loading="lazy"
              />
            </div>

            <div className="keen-slider__slide flex items-center justify-center px-2 sm:px-4">
              <img
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/startup_odisha_official_logo.png?updatedAt=1749890491698"
                alt="Startup Odisha"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain transition-all duration-300"
                loading="lazy"
              />
            </div>

            <div className="keen-slider__slide flex items-center justify-center px-2 sm:px-4">
              <img
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/OSC2024.png?updatedAt=1749890493096"
                alt="OSC 2024"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain transition-all duration-300"
                loading="lazy"
              />
            </div>

            <div className="keen-slider__slide flex items-center justify-center px-2 sm:px-4">
              <img
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/NITI_Aayog_logo.png?updatedAt=1749890491462"
                alt="NITI Aayog"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain transition-all duration-300"
                loading="lazy"
              />
            </div>

            <div className="keen-slider__slide flex items-center justify-center px-2 sm:px-4">
              <img
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Screenshot%202025-06-17%20114036.png?updatedAt=1750140701712"
                alt="Recognition Award"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain transition-all duration-300"
                loading="lazy"
              />
            </div>

            <div className="keen-slider__slide flex items-center justify-center px-2 sm:px-4">
              <img
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Screenshot%202025-09-06%20122911.png?updatedAt=1757142038800"
                alt="Achievement Badge"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain transition-all duration-300"
                loading="lazy"
              />
            </div>

            <div className="keen-slider__slide flex items-center justify-center px-2 sm:px-4">
              <img
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/DPIIT-header.png?updatedAt=1757142113113"
                alt="Achievement Badge"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain transition-all duration-300"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        <div className='md:px-14 py-28'> <MainFeatures></MainFeatures> </div>
        <div className=' py-3'> <MainWhyUs></MainWhyUs> </div>
        <div className='md:px-14 py-12'> <MainBestsellers></MainBestsellers> </div>
        <div className='px-3 md:px-14 pt-14 pb-28 '> <MainColors></MainColors> </div>
        <div className='py-3 '> <MainCone></MainCone> </div>
        <div className='py-3 px-6 md:px-14'> <MainProcess></MainProcess> </div>
        <div className='py-3'> <MainMarketing></MainMarketing> </div>
        <div className='px-4 md:px-14 pt-14 pb-28 '> <MainMap></MainMap> </div>
        <div className='py-28 bg-[#fffbed]'> <MainFAQ></MainFAQ> </div>
        <div className='pt-28 pb-6'> <MainParallax></MainParallax> </div>
        <div className='px-6 md:px-14 pt-20 pb-20 '> <FeturesList></FeturesList></div>
        <div className=' py-6'> <MainNews></MainNews> </div>
        <div className=' py-3 mt-10'> <Testimonial /></div>
        <div className='px-6 md:px-14 py-6 mt-20 '> <Inqueries></Inqueries></div>
        <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
        
       
    </div>

    </motion.div>
  </AnimatePresence>
  );
}

export default MainHomepage