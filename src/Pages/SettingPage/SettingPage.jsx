import React from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import HeroSection from '../../Components/HeroSection/HeroSection'

const SettingPage = () => {
  return (
    <div>
        <div className='p-4'> <TopNavigation></TopNavigation></div>
        <div className='p-4'> <NavbarHeader></NavbarHeader></div>
        <div className='p-4'> <Navbar></Navbar></div>

        <div>
            <HeroSection productName={"General Settings"}></HeroSection>
        </div>

        <div>

            <div>

            </div>


        </div>

        
      
        <div className='p-4'><Cta></Cta></div>
        <div className='p-4'> <Footer></Footer></div>

    </div>
  )
}

export default SettingPage