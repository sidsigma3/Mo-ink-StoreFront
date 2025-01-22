import React from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import HeroSection from '../../Components/HeroSection/HeroSection'
import { RxExit } from "react-icons/rx";

const SettingPage = () => {
  return (
    <div>
        <div className='px-5 py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-5 py-3'> <Navbar></Navbar></div>

        <div className='px-5 py-3 mt-10'> 
            <HeroSection productName={"General Settings"}></HeroSection>
        </div>

        <div className='px-5 py-4 grid grid-cols-2 gap-x-16 gap-y-4'>

            <div className='flex flex-col'>
                <label className='font-medium'>Full Name</label>
                <input className='border-1 p-1 rounded mt-2'></input>
            </div>

            <div className='flex flex-col'>
                <label className='font-medium'>Password</label>
                <input className='border-1 p-1 rounded mt-2'></input>
            </div>

            <div className='flex flex-col'>
                <label className='font-medium'>Gender</label>
                <input className='border-1 p-1 rounded mt-2'></input>
            </div>

            <div className='flex flex-col'>
                <label className='font-medium'>Country</label>
                <input className='border-1 p-1 rounded mt-2'></input>
            </div>

            <div className='flex flex-col'>
                <label className='font-medium'>Email</label>
                <input className='border-1 p-1 rounded mt-2'></input>
            </div>

            <div className='flex flex-col'>
                <label className='font-medium'>Language</label>
                <input className='border-1 p-1 rounded mt-2'></input>
            </div>

            <div className='flex flex-col'>
                <label className='font-medium'>Mobile number</label>
                <input className='border-1 p-1 rounded mt-2'></input>
            </div>

            <div className='flex flex-col'>
                <label className='font-medium'>Whatsapp number</label>
                <input className='border-1 p-1 rounded mt-2'></input>
            </div>

            <div className='flex flex-col'>
                <label className='font-medium'>Pincode</label>
                <input className='border-1 p-1 rounded mt-2'></input>
            </div>

            <div className='flex flex-col'>
                <label className='font-medium'>State</label>
                <input className='border-1 p-1 rounded mt-2'></input>
            </div>


            <div className='flex flex-col'>
                <label className='font-medium'>District</label>
                <input className='border-1 p-1 rounded mt-2'></input>
            </div>

           
            <div className='flex flex-col'>
                <label className='font-medium'>Landmark</label>
                <input className='border-1 p-1 rounded mt-2'></input>
            </div>


        </div>

        <div className='px-5 py-3 flex justify-between'>
            <button className='bg-red-100 text-red-500 rounded p-1 w-40 font-bold flex items-center justify-center gap-2'><span><RxExit size={20}/></span>LOG OUT</button>

            <button className='bg-violet-100 text-violet-700 rounded p-1 w-40 font-bold'>SAVE CHANGES</button>

        </div>

        
      
        <div className='px-5 py-3 mt-10'><Cta></Cta></div>
        <div className='px-5 py-3'> <Footer></Footer></div>

    </div>
  )
}

export default SettingPage