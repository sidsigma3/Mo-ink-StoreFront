import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { FcCheckmark } from "react-icons/fc";

const CtaCard = () => {
  return (

    <div className='md:grid md:grid-cols-3 gap-4 lg:w-full md:w-[78rem] sm:w-full flex-column flex '>

    <div className='p-4 lg:w-full bg-green-100 rounded-lg position-relative h-[300px] md:h-full'>
      <h4 className='font-semibold text-xl md:text-3xl'>What factors make us exceptional?</h4>
      <ul className='mt-3'>
          <li className='d-flex gap-2 font-medium text-lg'><span><FcCheckmark  size={20}/></span>Eco-friendly practices</li>
          <li className='d-flex gap-2 font-medium text-lg'><span><FcCheckmark  size={20}/></span>Customizable solutions</li>
          <li className='d-flex gap-2 font-medium text-lg'><span><FcCheckmark  size={20}/></span>Competitive pricing</li>
          <li className='d-flex gap-2 font-medium text-lg'><span><FcCheckmark  size={20}/></span>Premium quality</li>
          <li className='d-flex gap-2 font-medium text-lg'><span><FcCheckmark  size={20}/></span>Transparent Policies</li>
          <li className='d-flex gap-2 font-medium text-lg'><span><FcCheckmark  size={20}/></span>On-time delivery</li>
      </ul>
      <img src='/images/cta-wool-2.png' className='position-absolute w-1/3' style={{bottom:0 , right:0}}></img>

    </div>


    <div className='bg-purple-100 position-relative p-4 rounded-2 lg:w-full  h-[300px] md:h-full' >
        <h4 className='font-semibold text-xl md:text-3xl'>Premium yarns designed for industries that demand only perfection.</h4>

        <button className='font-medium d-flex align-items-center gap-2 position-absolute bottom-0 mb-5'>LEARN MORE <span><FaArrowRightLong /></span></button>

        <img src='/images/cta-wool.png' className='position-absolute w-1/3' style={{bottom:0 , right:0}}></img>


    </div>


    <div className='bg-yellow-50 position-relative p-4 rounded-2 lg:w-full  h-[300px] md:h-full' >
      <h4 className='font-semibold text-xl md:text-3xl'>Suppplying quality to fashion, home textiles, industrial, and craft sectors.</h4>

      <button className='font-medium d-flex align-items-center gap-2 position-absolute bottom-0 mb-5'>LEARN MORE <span><FaArrowRightLong /></span></button>

      <img src='/images/cta-wool-2.png' className='position-absolute w-1/3' style={{bottom:0 , right:0}}></img>

    </div>

    </div>
  )
}

export default CtaCard