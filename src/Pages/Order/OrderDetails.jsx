import React from 'react'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import TimelineComponent from '../../Components/TImeline/TimelineComponent'
import { TbFileInvoice } from "react-icons/tb";
import { HiOutlineTruck } from "react-icons/hi";
import OrderListBox from '../../Components/OrderBox/OrderListBox'
import { MdArrowOutward } from "react-icons/md";
import { AiOutlineIssuesClose } from "react-icons/ai";
// import { HiOutlineTruck } from "react-icons/hi";
import { LuBox } from "react-icons/lu";

const OrderDetails = () => {
  return (
    <div>
        <div className='px-6 md:px-14 py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3'> <Navbar></Navbar></div>
        <div className='px-6 md:px-14 py-3 mt-10'>  <HeroSection productName={"Your Orders"}></HeroSection></div>

        


        <div className='px-6 md:px-14 py-3 mt-10'>

            <div className='flex justify-between border-bottom pb-6'>
                <div>
                    <h4 className='font-bold text-3xl'>Order ID:33657895</h4>
                    <div className='flex divide-x-4 mt-6 gap-6'>
                        <h5>Order date:  <span className='font-semibold'>Feb 14, 2080</span></h5>
                        <h4 className='ps-6 text-violet-800 font-medium flex items-center gap-2'><span><HiOutlineTruck size={22}/></span>Estimated delivery May 16, 2022</h4>
                    </div>
                </div>

                <div className='flex items-center'>
                <div className='flex gap-2 bg-violet-100 text-violet-800 px-16 py-1 h-10 rounded items-center'>
                    <span><TbFileInvoice size={20}/></span>
                    <h5>INVOICE</h5>
                </div>
                </div>

                  

                
            </div>

            <div className='mt-16'>
            <TimelineComponent></TimelineComponent>
            </div>


            <div className='mt-20 border-bottom pb-6 px-40'>
                <ul className='flex flex-col  gap-5'>
                    <li><OrderListBox></OrderListBox></li>

                    <li><OrderListBox></OrderListBox></li>

                    <li><OrderListBox></OrderListBox></li>

                    <li><OrderListBox></OrderListBox></li>

                    <li><OrderListBox></OrderListBox></li>
                </ul>


            </div>


            <div className='grid grid-cols-3 mt-10 border-bottom pb-10 px-24'>

                <div>
                    <h5 className='font-semibold text-lg'>Payment</h5>

                </div>


                <div className='flex flex-col items-center'>
                    <h5 className='font-semibold text-lg'>Shipping Address</h5>

                    <p className='text-gray-500 font-medium'>874 jwess Bridge Apt 148</p>

                    <p className='text-gray-500 font-medium'>London, UK 475-658-136</p>
                </div>


                <div className='flex flex-col items-end'>
                    <h5 className='font-semibold text-lg'>Delivery Address</h5>

                    <p className='text-gray-500 font-medium'>874 jwess Bridge Apt 148</p>

                    <p className='text-gray-500 font-medium'>London, UK 475-658-136</p>

                </div>


            </div>


            <div className='grid grid-cols-2 mt-6 px-10'>

                <div className=''>

                    <h5 className='font-semibold text-lg'>Need Help</h5>

                    <div className='flex flex-col gap-3 mt-6'>
                        <div className='flex gap-4 items-center text-gray-500 font-medium'>
                            <div className='flex gap-2 items-center'>
                                <span><AiOutlineIssuesClose size={20}/></span>
                                <p>Order Issues</p>
                            </div>
                            <span><MdArrowOutward /></span>
                        </div>

                        <div className='flex gap-4 items-center text-gray-500 font-medium'>
                            <div className='flex gap-2 items-center'>
                                <span><HiOutlineTruck size={20}/></span>
                                <p>Delivery Info</p>
                            </div>
                            <span><MdArrowOutward /></span>
                        </div>

                        <div className='flex gap-4 items-center text-gray-500 font-medium'>
                            <div className='flex gap-2 items-center'>
                                <span><LuBox size={20}/></span>
                                <p>Returns</p>
                            </div>
                            <span><MdArrowOutward /></span>
                        </div>
                    </div>

                </div>

                

                <div className='border-1 rounded-md p-3 '>
                       
        
                       <table className='w-100 rounded  font-semibold'>
                           
                           <tbody>
                                <tr>
                                   <td>Subtotal</td>
                                   <td>items</td>
                                   <td style={{textAlign:'end'}}>₹3,07,458</td>
                               </tr>
                               <tr>
                                   <td>Wallet Ballance</td>
                                   <td>₹4116</td>
                                   <td style={{textAlign:'end'}}>
                                   {/* <input placeholder='Enter amount' className='w-28 border-1 border-gray-300 rounded-md ps-2'></input> */}
                                   </td>
       
                               </tr>

                               <tr>
                                   <td>Discounts by payment</td>
                                   <td>5%</td>
                                   <td style={{textAlign:'end'}}>₹748</td>
                                   
                               </tr>
       
                               <tr>
                                   <td>Discounts</td>
                                   <td>5%</td>
                                   <td style={{textAlign:'end'}}>-₹5,000</td>
                                   
                               </tr>
       
                               <tr>
                                   <td>Shipping or delivery</td>
                                   <td></td>
                                   <td style={{textAlign:'end'}}>₹2,156</td>
                                   
                               </tr>

                               <tr>
                                   <td>SubTotal</td>
                                   <td></td>
                                   <td style={{textAlign:'end'}}>₹2,121,156</td>
                                   
                               </tr>

                               <tr className='border-b-4'>
                                   <td>Remaining Balance</td>
                                   <td></td>
                                   <td style={{textAlign:'end'}}>₹3,526,379</td>
                                   
                               </tr>
       
                               <tr className=''>
                                   <td>Total</td>
                                   <td></td>
                                   <td style={{textAlign:'end'}}>₹2,121,156</td>
                                   
                               </tr>
       
       
       
       
                           </tbody>
                       </table>
       
                     
       
                   </div>
                
            </div>




        </div>

        <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
    </div>
  )
}

export default OrderDetails