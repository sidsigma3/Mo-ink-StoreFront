import React from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import HeroSection from '../../Components/HeroSection/HeroSection'
import ProductList from '../../Components/ProductList/ProductList'
import { IoArrowForward } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";
import { RiSettingsLine } from "react-icons/ri";
import { LuWalletMinimal } from "react-icons/lu";
import { BsCart2 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import BottomNav from '../../Components/BottomNav/BottomNav'
import { useNavigate } from 'react-router-dom'

const AccountPage = () => {

  const navigate = useNavigate()


  return (
    <div>
       
        <div className='px-6 md:px-14 py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3'> <Navbar></Navbar></div>

        <div className='px-6 md:px-14 py-3 mt-10'>
            <HeroSection productName={"Account"}></HeroSection>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6 md:px-14 py-3 mt-10'>
            <div className='flex items-center gap-2 border-1 rounded-md p-2 cursor-pointer' onClick={()=>navigate('/orders')}>
                <div className='p-3 rounded-full bg-violet-100 text-violet-800'>
                <FiShoppingBag size={40}/>
                </div>
                <div className='flex-1'>
                    <h4 className='font-semibold text-2xl'>Your Orders</h4>
                    <div className='flex justify-between items-center gap-2'>
                        <p>View or buy products again</p>
                        <span className='rounded-full bg-gray-200 p-2'><IoArrowForward /></span>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-2 border-1 rounded-md p-2 cursor-pointer' onClick={()=>navigate('/setting')}>
                <div className='p-3 rounded-full bg-violet-100 text-violet-800'>
                <RiSettingsLine size={40}/>
                </div>
                <div className='flex-1'>
                    <h4 className='font-semibold text-2xl'>General Setting</h4>
                    <div className='flex justify-between items-center gap-2'>
                        <p>Edit log in name, password and address</p>
                        <span className='rounded-full bg-gray-200 p-2'><IoArrowForward /></span>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-2 border-1 rounded-md p-2 cursor-pointer pointer' onClick={()=>navigate('/wallet')}>
                <div className='p-3 rounded-full bg-violet-100 text-violet-800'>
                <LuWalletMinimal size={40}/>
                </div>
                <div className='flex-1'>
                    <h4 className='font-semibold text-2xl'>Wallet</h4>
                    <div className='flex justify-between items-center gap-2'>
                        <p>Add money to your wallet and use</p>
                        <span className='rounded-full bg-gray-200 p-2'><IoArrowForward /></span>
                    </div>
                </div>
            </div>


            <div className='flex items-center gap-2 border-1 rounded-md p-2 cursor-pointer' onClick={()=>navigate('/shoppingCart')}>
                <div className='p-3 rounded-full bg-violet-100 text-violet-800'>
                <BsCart2  size={40}/>
                </div>
                <div className='flex-1'>
                    <h4 className='font-semibold text-2xl'>Shopping Cart</h4>
                    <div className='flex justify-between items-center gap-2'>
                        <p>View your cart and proceed check out</p>
                        <span className='rounded-full bg-gray-200 p-2'><IoArrowForward /></span>
                    </div>
                </div>
            </div>


            <div className='flex items-center gap-2 border-1 rounded-md p-2 cursor-pointer'onClick={()=>navigate('/wishlist')} >
                <div className='p-3 rounded-full bg-violet-100 text-violet-800'>
                <FaRegHeart size={40}/>
                </div>
                <div className='flex-1'>
                    <h4 className='font-semibold text-2xl'>Wishlist</h4>
                    <div className='flex justify-between items-center gap-2'>
                        <p>Explore your wishlist and shop</p>
                        <span className='rounded-full bg-gray-200 p-2'><IoArrowForward /></span>
                    </div>
                </div>
            </div>


            <div className='flex items-center gap-2 border-1 rounded-md p-2 cursor-pointer' onClick={()=>navigate('/address')}>
                <div className='p-3 rounded-full bg-violet-100 text-violet-800'>
                <SlLocationPin size={40}/>
                </div>
                <div className='flex-1'>
                    <h4 className='font-semibold text-2xl'>Saved Address</h4>
                    <div className='flex justify-between items-center gap-2'>
                        <p>Add or update your addresses</p>
                        <span className='rounded-full bg-gray-200 p-2'><IoArrowForward /></span>
                    </div>
                </div>
            </div>

        </div>


        <div className='px-6 md:px-14 py-3 mt-10'><ProductList></ProductList></div>
        <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
        <BottomNav></BottomNav>
    </div>
  )
}

export default AccountPage