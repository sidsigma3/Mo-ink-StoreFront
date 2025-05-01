import React, { useEffect, useState } from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Banner from '../../Components/Banner/Banner'
import FeturedList from '../../Components/FeturedList/FeturedList'
import ProductList from '../../Components/ProductList/ProductList'
import Cta from '../../Components/CTA/Cta'
import Testimonial from '../../Components/Testimonial/Testimonial'
import BlogList from '../../Components/BlogList/BlogList'
import Inqueries from '../../Components/Inqueries/Inqueries'
import FeturesList from '../../Components/FeturesList/FeturesList'
import Footer from '../../Components/Footer/Footer'
import CtaCard from '../../Components/CTA/CtaCard'
import BottomNav from '../../Components/BottomNav/BottomNav'
import WhatsAppWidget from '../../Components/WhatsappWidget';


const LandingPage = () => {
  
  const [showWelcome, setShowWelcome] = useState(false)
  const [customerName, setCustomerName] = useState("")

  useEffect(() => {
    const justLoggedIn = localStorage.getItem("justLoggedIn") === "true";
    if (justLoggedIn) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const name = userData?.customerName || "Customer";

      setCustomerName(name);
      setShowWelcome(true);

      localStorage.removeItem("justLoggedIn");

      setTimeout(() => {
        setShowWelcome(false);
      }, 2000);
    }
  }, []);
  return (
    <div className='w-full'>
              {showWelcome && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50">
                <div className="bg-white text-black rounded-md shadow-lg p-2 w-full max-w-md text-center">
                    <h2 className="text-md font-bold mb-2">Welcome {customerName}!</h2>
                    <p className="text-xs">Please Enjoy Shopping 🛍️</p>
                </div>
            </div>
        )}
        {/* <div className='px-5 py-3'> <TopNavigation></TopNavigation></div> */}
        <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>
        <div className='md:px-14 py-3'> <Banner></Banner></div>
        <div className='py-3'><FeturedList></FeturedList></div>
        <div className='mt-5'>                                                                     
          <ProductList></ProductList>
        </div>
        <div className='px-6 md:px-14 py-3 mt-10'> <FeturesList></FeturesList></div>
        <div className='px-6 md:px-14 py-3 mt-10 overflow-auto'> <CtaCard></CtaCard></div>
        <div className='mt-10'>  <Testimonial></Testimonial></div>
        <div className='px-6 md:px-14 py-3 mt-10'> <BlogList></BlogList></div>
        <div className='px-6 md:px-14 py-3 mt-10 hidden lg:block'> <Inqueries show={true}></Inqueries></div>
        <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
        <BottomNav />
        <WhatsAppWidget />

    </div>
  )
}

export default LandingPage