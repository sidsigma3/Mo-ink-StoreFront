import React from 'react'
import { TbFileInvoice } from "react-icons/tb";
import { CiStar } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";

const OrderBox = () => {
  return (
    <div className='grid grid-cols-9 md:grid-cols-7 gap-3 border-1 rounded p-3'>
        <div className='col-span-3 md:col-span-2 lg:col-span-1'>
            <img src='/images/wool-item-1.png' className='sm:h-2/3 md:h-40 rounded-md w-full'></img>
        </div>

        <div className='col-span-6 md:col-span-3 lg:col-span-4 text-gray-500 font-medium'>

        <div className='flex justify-between'>
            <h5>Order ID: <span className='text-black font-bold'>33546</span></h5>
        </div>

        <h5 className='mt-2'>Total: ₹328.78</h5>

        <h5 className='mt-2'>Weight: 178Kg</h5>

        <h4 className='mt-2'>Your order <span className='text-green-600'>Delivered</span> on Sunday, 05 February</h4>

        <div className='flex mt-2 gap-2'>
            <div className='flex'>
                <button><span><CiStar size={20} /></span></button>

                <button><span><CiStar size={20} /></span></button>

                <button><span><CiStar size={20} /></span></button>

                <button><span><CiStar size={20} /></span></button>

                <button><span><CiStar size={20} /></span></button>
            </div>

            <h5 className='hidden md:block'>Rate & review the product.</h5>
        </div>

        </div>

        <div className='col-span-9 md:col-span-1 flex items-center justify-content-end'>
        <div className='flex gap-2 bg-violet-100 text-violet-800 md:px-6 lg:px-8 py-1 rounded items-center'>
            <span><TbFileInvoice size={20}/></span>
            <h5 className='text-sm md:text-md'>INVOICE</h5>
        </div>
        </div>

        <div className='flex items-center justify-end hidden md:flex'>
            <span className='text-gray-400'><MdArrowForwardIos size={20}/></span>
        </div>

    </div>
  )
}

export default OrderBox