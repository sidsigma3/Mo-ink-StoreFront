import React from 'react'
import { FaRegPaperPlane } from "react-icons/fa6";


const Cta = () => {
  return (
    <div
    className="position-relative p-5"
    >
        <div
        className='p-5 rounded-5'
        style={{
            height: '30rem',
            backgroundImage: "url('/images/cta-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}
        >
        <h3 className='text-6xl font-bold text-white'>
        Stay updated with our <br />
        latest products and offers.
        </h3>

        <p className='text-2xl text-white mt-5'>Subscribe to Mo Ink n Dyes and get notified</p>

        <div className='mt-5 bg-white rounded-pill d-flex align-items-center justify-content-between' style={{height:'5rem',width:'50%'}}>
            <h4 className='ps-3 text-xl font-medium d-flex gap-3 align-items-center col-7'><span><FaRegPaperPlane /></span>Your email address</h4>
            <button className='col-3 bg-violet-800 rounded-pill text-white font-medium h-100'>Subscribe</button>
        </div>

        </div>

   
    </div>
  )
}

export default Cta