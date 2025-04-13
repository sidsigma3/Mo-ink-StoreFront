import React from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import MainHero from '../../Components/MainHero/MainHero' 
import MainFeatures from '../../Components/MainFeatures/MainFeatures'
import MainWhyUs from '../../Components/MainWhyUs/MainWhyUs'
import Cta from '../../Components/CTA/Cta'
import FeturesList from '../../Components/FeturesList/FeturesList'
import Footer from '../../Components/Footer/Footer'
import BottomNav from '../../Components/BottomNav/BottomNav'

const MainHomepage = () => {
  return (
    <div className='w-full'>
        {/* <div className='px-5 py-3'> <TopNavigation></TopNavigation></div> */}
        <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='md:px-14 py-3'> <MainHero></MainHero> </div>
        <div className='md:px-14 py-3'> <MainFeatures></MainFeatures> </div>
        <div className=' py-3'> <MainWhyUs></MainWhyUs> </div>
        <div className='px-6 md:px-14 py-3 mt-10'> <FeturesList></FeturesList></div>
        <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
        <BottomNav />
        
    </div>
  )
}

export default MainHomepage