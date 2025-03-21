import React from 'react'
import { FaRegPaperPlane } from "react-icons/fa6";


const Cta = () => {
  return (
    <div
    className="position-relative"
    >
        <div
        className='p-5 rounded-5'
        style={{
            backgroundImage: "url('/images/cta-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}
        >
        <h3 className='text-xl md:text-3xl lg:text-6xl font-bold text-white text-center md:text-left'>
        Stay updated with our <br />
        latest products and offers.
        </h3>

        <p className='text-xl lg:text-2xl text-white mt-5 text-center md:text-left'>Subscribe to Mo Ink n Dyes and get notified</p>

        <div className='flex justify-center'>
        <div className='mt-5 bg-white rounded-pill d-flex align-items-center justify-content-between w-full h-10 md:h-20 lg:w-1/2'>
            <h4 className='ps-3 text-md lg:text-xl font-medium d-flex gap-3 align-items-center col-7'><span><FaRegPaperPlane /></span>Your email</h4>
            <button className='text-sm lg:text-xl col-4 bg-violet-800 rounded-pill text-white font-medium h-100 w-2xl lg:w-md'>Subscribe</button>
        </div>
        </div>

        </div>

   
    </div>
  )
}

export default Cta