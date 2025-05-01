import React from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import MainHeader from '../../Components/MainHeader/MainHeader'
import ColorCatalog from '../../Components/MainColors/ColorCatalog'

const ColorPalette = () => {
  

  return (
    <div className='w-full'>
        {/* <div className='px-5 py-3'> <TopNavigation></TopNavigation></div> */}
        <div className='px-6 md:px-14 py-1 md:py-3'> <MainHeader></MainHeader></div>
        <div className='px-6` md:px-14 pt-14 pb-28 '> <ColorCatalog></ColorCatalog> </div>
        <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
        
       
    </div>
  )
}

export default ColorPalette