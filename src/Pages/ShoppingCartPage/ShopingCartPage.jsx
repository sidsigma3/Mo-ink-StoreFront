import React from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import HeroSection from '../../Components/HeroSection/HeroSection'
import ProductList from '../../Components/ProductList/ProductList'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import Cart from './Cart'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";


const ShopingCartPage = () => {

  const navigate = useNavigate();



  const breadcrumbs = [
    { label: "Home", link: "/home" },
    { label: "Account", link: "/account" },
    { label: "Shopping cart", link: "/shoppingCart" },
  ];


    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div>
        <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>
        <div className='px-6 md:px-14 py-3 mt-0 md:mt-10'> 
            <HeroSection productName={"Shopping Cart"} breadcrumbs={breadcrumbs}></HeroSection>
        </div>
        <div className='px-6 md:px-14 py-3 mt-0 md:mt-10'> <Cart></Cart>
        <div className='text-center mt-3'>
        <button className='bg-violet-700 text-white p-2 rounded-md font-semibold' onClick={()=>navigate("/checkOut")}>Add to Checkout</button>
        </div>
       
        </div>
      
        <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>

        <BottomNav></BottomNav>
    </div>
  )
}

export default ShopingCartPage