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

const LandingPage = () => {
  return (
    <div>
        <TopNavigation></TopNavigation>
        <NavbarHeader></NavbarHeader>
        <Navbar></Navbar>
        <Banner></Banner>
        <FeturedList></FeturedList>
        <ProductList></ProductList>
        <CtaCard></CtaCard>
        <Testimonial></Testimonial>
        <BlogList></BlogList>
        <Inqueries></Inqueries>
        <FeturesList></FeturesList>
        <Cta></Cta>
        <Footer></Footer>
    </div>
  )
}

export default LandingPage