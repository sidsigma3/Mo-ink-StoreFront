import React from 'react'
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

const LandingPage = () => {
  

  return (
    <div className='w-full'>
        {/* <div className='px-5 py-3'> <TopNavigation></TopNavigation></div> */}
        <div className='px-5 py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-5 py-3'> <Navbar></Navbar></div>
        <div className='px-5 py-3'> <Banner></Banner></div>
        <div className='py-3'><FeturedList></FeturedList></div>
        <div className='px-5 py-3 mt-10'> 

          <h3 className='text-3xl font-medium'>Top Selling Product</h3>
                                                                        
          <ProductList></ProductList>

        </div>
        <div className='px-5 py-3 mt-10 overflow-auto'> <CtaCard></CtaCard></div>
        <div className='mt-10'>  <Testimonial></Testimonial></div>
        <div className='px-5 py-3 mt-10'> <BlogList></BlogList></div>
        <div className='px-5 py-3 mt-10 hidden lg:block'> <Inqueries show={true}></Inqueries></div>
        <div className='px-5 py-3 mt-10'> <FeturesList></FeturesList></div>
        <div className='px-5 py-3 mt-10'><Cta></Cta></div>
        <div className='px-5 py-3'> <Footer></Footer></div>
        <BottomNav />
       
    </div>
  )
}

export default LandingPage