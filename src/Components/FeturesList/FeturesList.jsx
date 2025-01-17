import React from 'react'
import { RiTruckLine } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { TbRosetteDiscount } from "react-icons/tb";
import { LuHeadphones } from "react-icons/lu";

const FeturesList = () => {
  return (
    <div className='grid grid-cols-4 gap-4 p-5'>
        <div className='p-4 rounded-start-4 bg-gray-200 d-flex align-items-center gap-3 justify-content-center'>
            <span className='text-violet-800'><RiTruckLine size={40}/></span>
            <div>
                <h4 className='text-xl font-semibold'>Free Delivery</h4>
                <p className='font-medium text-base'>Orders from all item</p>
            </div>
        </div>


        <div className='p-4 bg-gray-200 d-flex align-items-center gap-3 justify-content-center'>
            <span className='text-violet-800'><FaIndianRupeeSign size={30}/></span>
            <div>
                <h4 className='text-xl font-semibold'>Return & Refund</h4>
                <p className='font-medium text-base'>Money back gurantee</p>
            </div>
        </div>



        <div className='p-4 bg-gray-200 d-flex align-items-center gap-3 justify-content-center'>
            <span className='text-violet-800'><TbRosetteDiscount size={40}/></span>
            <div>
                <h4 className='text-xl font-semibold'>Member Discount</h4>
                <p className='font-medium text-base'>For selected customers</p>
            </div>
        </div>

        <div className='p-4 rounded-end-4 bg-gray-200 d-flex align-items-center gap-3 justify-content-center'>
            <span className='text-violet-800'><LuHeadphones size={35}/></span>
            <div>
                <h4 className='text-xl font-semibold'>Support 24/7</h4>
                <p className='font-medium text-base'>Contact us hours a day</p>
            </div>
        </div>

    </div>
  )
}

export default FeturesList