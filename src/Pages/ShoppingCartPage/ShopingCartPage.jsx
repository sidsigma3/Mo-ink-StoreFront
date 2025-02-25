import React from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import HeroSection from '../../Components/HeroSection/HeroSection'
import ProductList from '../../Components/ProductList/ProductList'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'

import { SfButton } from '@storefront-ui/react';
import Cart from './Cart'

const ShopingCartPage = () => {
  return (
    <div>
        <div className='px-5 py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-5 py-3'> <Navbar></Navbar></div>
        <div className='px-5 py-3 mt-10'>  <HeroSection productName={"Shopping cart"}></HeroSection></div>
        <div className='px-5 py-3 mt-10'> <Cart></Cart></div>
        <div className='px-5 py-3 mt-10'><Cta></Cta></div>
        <div className='px-5 py-3'> <Footer></Footer></div>

      
    </div>
  )
}

export default ShopingCartPage