import React from 'react'
import { TiStarFullOutline } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { LuPencilRuler } from "react-icons/lu";

const CategoryBox = () => {
  return (
    <div className='bg-violet-100 rounded-4 p-3'>
       <div className='flex justify-end'>
            <div className='bg-yellow-100 d-flex gap-2 rounded-2 align-items-center h-50 px-2 py-1'>
                    <span className='text-yellow-300'><TiStarFullOutline /></span>
                    <p>4.5</p>
            </div>
        </div>

        <div className='flex flex-col items-center gap-2'> 
        
            <span className='text-violet-800'><LuPencilRuler size={50}/></span>

            <h4 className='text-2xl font-bold'>2/60</h4>

            <h5 className='text-3xl font-bold text-violet-900'>₹328.78 <span>/KG</span></h5>

            <div className='d-flex gap-2 mt-3 w-full'>
            
                <button className='d-flex align-items-center justify-content-center gap-2 bg-white p-2 purple-text font-semibold rounded flex-1'>VIEW PRODUCT</button>

                <button className='bg-white p-2 purple-text rounded px-4'><span><FaRegHeart /></span></button>

            </div>
        </div>



    </div>
  )
}

export default CategoryBox