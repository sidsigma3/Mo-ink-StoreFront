import React, { useState } from 'react'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import { RiAddLargeFill } from "react-icons/ri";
import { MdOutlineWrongLocation } from "react-icons/md";
import AddressBox from '../../Components/AddressBox/AddressBox'
import ModalAddress from '../../Components/Modal/ModalAddress'
import BottomNav from '../../Components/BottomNav/BottomNav'

const AddressPage = () => {

    const [showModal,setShowModal] = useState(false)

    const customer = JSON.parse(localStorage.getItem("userData") || "{}");

    const handleClose = () =>{
        setShowModal(!showModal)
    }



  return (
    <div>
        <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>
        <div className='px-6 md:px-14 py-3 mt-0 md:mt-10'>  <HeroSection productName={"Address"}></HeroSection></div>

        <div className='px-6 md:px-14 py-4'>

            <div className='flex justify-center md:justify-end'>
                <div className='flex font-semibold gap-2 bg-violet-100 text-violet-800 px-4 py-2 rounded cursor-pointer' onClick={handleClose}>
                    <span><RiAddLargeFill size={20}/></span>
                    <h4>ADD NEW ADDRESS</h4>
                </div>
            </div>

            {customer.addresses.length === 0 ? (
            <div className='h-60 flex flex-col gap-2 items-center justify-center'>
                <span className='text-gray-300'><MdOutlineWrongLocation size={70}/></span>
                <h5 className='text-xl text-gray-500'>There's no saved adresses !</h5>
            </div>
            ):(

            <div className='mt-7'>
                <ul className='flex flex-col gap-3'>
                    {
                        customer.addresses.map((item,index)=>(
                            <li key={index}>
                                <AddressBox address={item} name={customer.customerName} company={customer.company} phone={customer.phoneNumber}></AddressBox>
                            </li>
                        ))
                    }
                    {/* <li><AddressBox></AddressBox></li>

                    <li><AddressBox></AddressBox></li>

                    <li><AddressBox></AddressBox></li> */}
                </ul>
            </div>
            )
        }

            

         
        </div>

        <ModalAddress show={showModal} handleClose={handleClose} customer={customer}></ModalAddress>

        <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
        <BottomNav></BottomNav>
    </div>
  )
}

export default AddressPage