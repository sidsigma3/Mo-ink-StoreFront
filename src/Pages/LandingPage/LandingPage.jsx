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
import FeturesList_LandingPage from '../../Components/FeturesList/FeturesList_LandingPage'
import Footer from '../../Components/Footer/Footer'
import CtaCard from '../../Components/CTA/CtaCard'
import BottomNav from '../../Components/BottomNav/BottomNav'
import WhatsAppWidget from '../../Components/WhatsappWidget';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ModalWelcome from '../../Components/Modal/ModalWelcome'
import { getCart } from '../../Services/CartService'
import { getWishlist } from '../../Services/WishlistService'

const LandingPage = () => {


  const customer = JSON.parse(localStorage.getItem("userData"))


  const fetchAndStoreCartAndWishlist = async (customerId) => {
    if (!customerId) return;
  
    try {
      const [cart, wishlist] = await Promise.all([
        getCart(customerId),
        getWishlist(customerId)
      ]);
  
      const cartItems = cart?.variantIds || [];
      const wishlistItems = wishlist?.wishlistItems || [];
  
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    } catch (err) {
      console.error("Failed to fetch cart or wishlist", err);
    }
  };
  

  useEffect(() => {
    if (customer?.customerId) {
      fetchAndStoreCartAndWishlist(customer.customerId);
    }
  }, [customer?.customerId]);
  


  return (
    <div className="overflow-hidden">
      <div className='w-full'> <ModalWelcome /></div>
      <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar /></div>
      <div className='md:px-14 py-3'> <Banner /></div>
      <div className='py-3'><FeturedList /></div>
      <div className='mt-5'> <ProductList /></div>
      <div className='px-6 md:px-14 py-3 mt-10'> <FeturesList_LandingPage /></div>
      <div className='px-6 md:px-14 py-3 mt-10 overflow-auto'> <CtaCard /></div>
      <div className='mt-10'> <Testimonial /></div>
      <div className='px-6 md:px-14 py-3 mt-10'> <BlogList /></div>
      <div className='px-6 md:px-14 py-3 mt-10 '> <Inqueries></Inqueries></div>
      <div className='px-6 md:px-14 py-3 mt-10'><Cta /></div>
      <div className='px-6 md:px-14 py-3'> <Footer /></div>
      <BottomNav />
      <WhatsAppWidget />
    </div>
  );
};


export default LandingPage