import React from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Cta from '../../Components/CTA/Cta'
import HeroSection from '../../Components/HeroSection/HeroSection'
import { TiStarFullOutline } from "react-icons/ti";
import CategoryBox from '../../Components/CategoryBox/CategoryBox'

const Category = () => {
  return (
    <div>
       
        <div className='px-5 py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-5 py-3'>   <Navbar></Navbar></div>
        <div className='px-5 py-3 mt-10'>  <HeroSection productName={"Cotton"}></HeroSection></div>

        <div className='grid grid-cols-4 px-5 py-3 gap-5 mt-10'>
            <div className='col-span-1 '>
                <div className='border rounded p-3 shadow-md'>
                    <h4 className='text-xl font-semibold'>Category</h4>
                    <ul>
                        <li className='p-2 border border-1 rounded mt-2'>
                            <div className='flex justify-content-between font-medium'>
                                <h5 className='text-base'>Silk Yarn</h5>
                                <div className='bg-violet-100 rounded-circle w-6 h-6 d-flex justify-content-center align-items-center'>
                                    <h6 className='text-sm'>11</h6>
                                </div>
                            </div>
                        </li>

                        <li className='p-2 border border-1 rounded mt-2'>
                            <div className='flex justify-content-between font-medium'>
                                <h5 className='text-base'>Jute Yarn</h5>
                                <div className='bg-violet-100 rounded-circle w-6 h-6 d-flex justify-content-center align-items-center'>
                                    <h6 className='text-sm'>11</h6>
                                </div>
                            </div>
                        </li>

                        <li className='p-2 border border-1 rounded mt-2'>
                            <div className='flex justify-content-between font-medium'>
                                <h5 className='text-base'>Nylon Yarn</h5>
                                <div className='bg-violet-100 rounded-circle w-6 h-6 d-flex justify-content-center align-items-center'>
                                    <h6 className='text-sm'>11</h6>
                                </div>
                            </div>
                        </li>

                        <li className='p-2 border border-1 rounded mt-2'>
                            <div className='flex justify-content-between font-medium'>
                                <h5 className='text-base'>Wool Yarn</h5>
                                <div className='bg-violet-100 rounded-circle w-6 h-6 d-flex justify-content-center align-items-center'>
                                    <h6 className='text-sm'>11</h6>
                                </div>
                            </div>
                        </li>

                        <li className='p-2 border border-1 rounded mt-2'>
                            <div className='flex justify-content-between font-medium'>
                                <h5 className='text-base'>Polyster Yarn</h5>
                                <div className='bg-violet-100 rounded-circle w-6 h-6 d-flex justify-content-center align-items-center'>
                                    <h6 className='text-sm'>11</h6>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>    


                <div className='border rounded p-3 shadow-md mt-3'>
                <h4 className='text-xl font-semibold'>New Stock</h4>
                <ul className='divide-y-2 divide-dotted'>
                    <li className='pb-2 flex justify-between gap-4 mt-2 pt-2'>
                        <div className=''> 
                            <img src='/images/wool-item.png'></img>
                        </div>

                        <div className='flex-1'>
                            <h4 className='font-bold text-violet-800'>Wool - 2/92
                                <br></br>
                                (Pink)
                            </h4>
                            <p className='text-lg font-medium mt-2'>₹328.85</p>
                            <div className='flex justify-end'>
                                <div className='bg-yellow-100 d-flex gap-2 rounded-2 align-items-center h-50 px-2 py-1'>
                                        <span className='text-yellow-300'><TiStarFullOutline /></span>
                                        <p>4.5</p>
                                </div>
                            </div>
                        </div>
                       
                    </li>

                    <li className='pb-2 flex justify-between gap-4 mt-2 pt-2'>
                        <div className=''> 
                            <img src='/images/wool-item.png'></img>
                        </div>

                        <div className='flex-1'>
                            <h4 className='font-bold text-violet-800'>Wool - 2/92
                                <br></br>
                                (Pink)
                            </h4>
                            <p className='text-lg font-medium mt-2'>₹328.85</p>
                            <div className='flex justify-end'>
                                <div className='bg-yellow-100 d-flex gap-2 rounded-2 align-items-center h-50 px-2 py-1'>
                                        <span className='text-yellow-300'><TiStarFullOutline /></span>
                                        <p>4.5</p>
                                </div>
                            </div>
                        </div>
                       
                    </li>

                    <li className='pb-2 flex justify-between gap-4 mt-2 pt-2'>
                        <div className=''> 
                            <img src='/images/wool-item.png'></img>
                        </div>

                        <div className='flex-1'>
                            <h4 className='font-bold text-violet-800'>Wool - 2/92
                                <br></br>
                                (Pink)
                            </h4>
                            <p className='text-lg font-medium mt-2'>₹328.85</p>
                            <div className='flex justify-end'>
                                <div className='bg-yellow-100 d-flex gap-2 rounded-2 align-items-center h-50 px-2 py-1'>
                                        <span className='text-yellow-300'><TiStarFullOutline /></span>
                                        <p>4.5</p>
                                </div>
                            </div>
                        </div>
                       
                    </li>
                </ul>

                </div>



            </div>

            <div className='col-span-3 grid grid-cols-3 gap-3'>
                <div>
                    <CategoryBox></CategoryBox>
                </div>

                <div>
                    <CategoryBox></CategoryBox>
                </div>

                <div>
                    <CategoryBox></CategoryBox>
                </div>

                <div>
                    <CategoryBox></CategoryBox>
                </div>


                <div>
                    <CategoryBox></CategoryBox>
                </div>


                <div>
                    <CategoryBox></CategoryBox>
                </div>

                <div>
                    <CategoryBox></CategoryBox>
                </div>

                <div>
                    <CategoryBox></CategoryBox>
                </div>


                <div>
                    <CategoryBox></CategoryBox>
                </div>




            </div>
        </div>



        <div className='px-5 py-3 mt-10'> <Cta></Cta></div>
        <div className='px-5 py-3'> <Footer></Footer></div>

               
    </div>
  )
}

export default Category