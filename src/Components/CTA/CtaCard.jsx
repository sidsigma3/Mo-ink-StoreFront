import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { FcCheckmark } from "react-icons/fc";

const CtaCard = () => {
  return (

    <div className='d-flex gap-2 p-5'>

    <div className='col-4 p-4'>
    <h4 className='font-semibold text-3xl'>What factors make us exceptional?</h4>
    <ul className='mt-3'>
        <li className='d-flex gap-2 font-medium text-lg'><span><FcCheckmark  size={20}/></span>Eco-friendly practices</li>
        <li className='d-flex gap-2 font-medium text-lg'><span><FcCheckmark  size={20}/></span>Customizable solutions</li>
        <li className='d-flex gap-2 font-medium text-lg'><span><FcCheckmark  size={20}/></span>Competitive pricing,premium quality</li>
        <li className='d-flex gap-2 font-medium text-lg'><span><FcCheckmark  size={20}/></span>Transparent Policies</li>
        <li className='d-flex gap-2 font-medium text-lg'><span><FcCheckmark  size={20}/></span>On-time delivery</li>
    </ul>

    </div>


    <div className='bg-purple-100 position-relative p-4 rounded-2' style={{height:'17rem'}}>
        <h4 className='font-semibold text-3xl'>Premium yarns designed for industries that demand only perfection.</h4>

        <button className='font-medium d-flex align-items-center gap-2 position-absolute bottom-0 mb-5'>LEARN MORE <span><FaArrowRightLong /></span></button>

        <img src='/images/cta-wool.png' className='position-absolute' style={{bottom:0 , right:0}}></img>


    </div>


    <div className='bg-yellow-50 position-relative p-4 rounded-2' style={{height:'17rem'}}>
    <h4 className='font-semibold text-3xl'>Suppplying quality to fashion, home textiles, industrial, and craft sectors.</h4>

    <button className='font-medium d-flex align-items-center gap-2 position-absolute bottom-0 mb-5'>LEARN MORE <span><FaArrowRightLong /></span></button>

    <img src='/images/cta-wool-2.png' className='position-absolute' style={{bottom:0 , right:0}}></img>


    </div>

    </div>
  )
}

export default CtaCard