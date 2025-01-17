import React from 'react'
import TopNavigation from '../../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'
import Cta from '../../../Components/CTA/Cta'
import HeroSection from '../../../Components/HeroSection/HeroSection'


const Category = () => {
  return (
    <div>
        <TopNavigation></TopNavigation>
        <NavbarHeader></NavbarHeader>
        <Navbar></Navbar>
        <HeroSection></HeroSection>
        <Cta></Cta>
        <Footer></Footer>

    </div>
  )
}

export default Category