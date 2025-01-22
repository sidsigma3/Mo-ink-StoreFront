import React from 'react'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import Inqueries from '../../Components/Inqueries/Inqueries'

const ContactPage = () => {
  return (
    <div>
        <div className='px-5 py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-5 py-3'> <Navbar></Navbar></div>
        <div className='px-5 py-3 mt-10'>  <HeroSection productName={"Contact Us"}></HeroSection></div>


        <div className='px-5 py-3 mt-10'>
            <Inqueries show={false}></Inqueries>
        </div>

        <div className='px-5 py-3 mt-10'><Cta></Cta></div>
        <div className='px-5 py-3'> <Footer></Footer></div>
    </div>
  )
}

export default ContactPage