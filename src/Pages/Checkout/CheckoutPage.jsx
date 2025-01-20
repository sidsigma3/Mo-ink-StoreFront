import React from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import HeroSection from '../../Components/HeroSection/HeroSection'
import ProductDetailBoxMini from '../../Components/ProductList/ProductDetailBoxMini'
import { RiLock2Line } from "react-icons/ri";

const CheckoutPage = () => {
  return (
    <div>
        <div className='px-5 py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-5 py-3'> <Navbar></Navbar></div>

        <div className='px-5 py-3'>
            <HeroSection productName={"Check out"}></HeroSection>
        </div>

        <div className='px-5 py-3 flex gap-5'>
            <div className='p-2 flex-1'>
                <h5 className='font-bold text-2xl'>Shipping Information</h5>

                <div className='mt-6 flex flex-col gap-1'>
                    <label className='font-semibold text-lg'>Full name <span className='text-red-900'>*</span></label>
                    <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter full name'></input>
                </div>

                <div className='mt-6 flex flex-col gap-1'>
                    <label className='font-semibold text-lg'>Email address <span className='text-red-900'>*</span></label>
                    <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter Email'></input>
                </div>

                <div className='mt-6 flex flex-col gap-1'>
                    <label className='font-semibold text-lg'>Calling number <span className='text-red-900'>*</span></label>
                    <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter number'></input>
                </div>

                <div className='mt-6 flex flex-col gap-1'>
                    <label className='font-semibold text-lg'>Whatsapp number <span className='text-red-900'>*</span></label>
                    <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter number'></input>
                </div>

                <div className='mt-6 flex flex-col gap-1'>
                    <label className='font-semibold text-lg'>Country <span className='text-red-900'>*</span></label>
                    <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Choose'></input>
                </div>

                    <div className='flex gap-2'>
                            <div className='mt-6 flex-1 flex flex-col gap-1'>
                                <label className='font-semibold text-lg'>City <span className='text-red-900'>*</span></label>
                                <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter City'></input>
                            </div>

                            <div className='mt-6 flex-1 flex flex-col gap-1'>
                                <label className='font-semibold text-lg'>State <span className='text-red-900'>*</span></label>
                                <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter State'></input>
                            </div>

                            <div className='mt-6 flex-1 flex flex-col gap-1'>
                                <label className='font-semibold text-lg'>Zip Code <span className='text-red-900'>*</span></label>
                                <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter Zip code'></input>
                            </div>

                    </div>

                    <div className='flex gap-2 mt-6'>
                        <input type='checkbox'></input>
                        <p>I have read and agree to the Terms and Conditions</p>
                    </div>


                    <div className='mt-6'>
                        <h5 className='font-bold text-2xl'>Payment</h5>

                        <div className='flex justify-between mt-4'>
                            <div className='border-violet-800 border-1 font-medium p-1 rounded-md bg-violet-100'>
                                Pay <span className='text-violet-800'>25%</span> in advance
                            </div>

                            <div className='border-violet-800 border-1 font-medium p-1 rounded-md bg-white-100'>
                                Pay <span className='text-violet-800'>50%</span> in advance
                            </div>

                            <div className='border-violet-800 border-1 font-medium p-1 rounded-md bg-white-100'>
                                Pay <span className='text-violet-800'>75%</span> in advance
                            </div>

                            <div className='border-violet-800 border-1 font-medium p-1 rounded-md bg-white-100'>
                                Pay <span className='text-violet-800'>Full</span> in advance
                            </div>
                        </div>

                        <h6 className='mt-6'>Flat<span className='text-violet-800'> 25%</span> discount is applied to your order total</h6>

                    </div>

                    <div className='mt-6'>
                        <div className='flex gap-2 border-1 rounded-t-md bg-violet-100 border-violet-800 p-3'>
                            <input type='radio'></input>
                            <h5 className='font-semibold'>Credit card</h5>
                        </div>
                        
                        <div className='grid grid-cols-2 gap-2 bg-gray-100 p-3 border'>
                            <input placeholder='Card number' className='col-span-2 border-1 border-gray-300 h-10 p-1 rounded-md'></input>
                        
                          
                            <input placeholder='Expiration date(MM/YY)' className='border-1 border-gray-300 h-10 p-1 rounded-md'></input>
                        
                            <input placeholder='Security code' className='border-1 border-gray-300 h-10 p-1 rounded-md'></input>
                        

                            <input placeholder='Name on card' className='col-span-2 border-1 border-gray-300 h-10 p-1 rounded-md'></input>
                        
                        </div>

                        <div className='flex gap-2 p-3 border-1 rounded-b-md'>
                            <input type='radio'></input>
                            <h5 className='font-semibold'>Cash on Delivery(COD)</h5>
                        </div>

                    </div>

                    <div className='mt-6'>

                        <button className='bg-violet-900 text-white p-3 rounded-md w-full'>PAY NOW</button>
                    </div>


                    <div className='mt-6'>
                        <h4 className='font-semibold flex gap-2'><span className='text-violet-800'><RiLock2Line size={20}/></span>Ensure Checkout- SSL Encrypted</h4>
                        
                        <p className='text-slate-400 mt-2'>Ensuring your financial and personal details are secure during every transaction</p>
                    </div>


            </div>

           


            <div className='p-2 flex-1'>
                 <h5 className='font-bold text-2xl'>Review your cart</h5>

                 <ul className='mt-6'>
                    <li>
                        <ProductDetailBoxMini></ProductDetailBoxMini>
                    </li>

                    <li>
                        <ProductDetailBoxMini></ProductDetailBoxMini>
                    </li>

                    <li>
                        <ProductDetailBoxMini></ProductDetailBoxMini>
                    </li>

                    <li>
                        <ProductDetailBoxMini></ProductDetailBoxMini>
                    </li>

                    <li>
                        <ProductDetailBoxMini></ProductDetailBoxMini>
                    </li>
                 </ul>

                 <div className='border-1 rounded-md p-3 mt-10'>
                       
        
                        <table className='w-100   rounded mt-2 font-semibold'>
                            
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
                                    <input placeholder='Enter amount' className='w-28 border-1 border-gray-300 rounded-md ps-2'></input>
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








        <div className='px-5 py-3 mt-10'><Cta></Cta></div>
        <div className='px-5 py-3'> <Footer></Footer></div>
    </div>
  )
}

export default CheckoutPage