import React from 'react'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import { RiFilePaper2Line } from "react-icons/ri";

const WalletPage = () => {
  return (
    <div>
        <div className='px-5 py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-5 py-3'> <Navbar></Navbar></div>
        <div className='px-5 py-3 mt-10'>  <HeroSection productName={"Wallet"}></HeroSection></div>

        <div className='flex flex-col h-80 items-center justify-center gap-3'>
            <span className='text-gray-300'><RiFilePaper2Line size={60}/></span>

            <h4 className='text-gray-400 font-medium'> Thers's no transaction till now !</h4>
        </div>
        
        <div className='px-5 py-3 mt-10'><Cta></Cta></div>
        <div className='px-5 py-3'> <Footer></Footer></div>
    </div>
  )
}

export default WalletPage