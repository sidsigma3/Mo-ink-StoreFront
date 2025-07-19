import { useEffect } from "react";
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


const MainHomepage = () => {
const location = useLocation(); 
  
    useEffect(() => {
      window.scrollTo(0, 0);
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
        <div className='px-6 md:px-14 py-1 md:py-3'> <MainHeader></MainHeader></div>
        <div className='px-4 md:px-14'> <MainHero></MainHero> </div>
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

