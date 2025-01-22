import React from 'react'
import { MdArrowForwardIos } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";

const AddressBox = () => {
  return (
    <div className='grid grid-cols-6 border-1 rounded p-3'>
        <div className='col-span-5'>
        <div className='flex gap-16'>
            <h3 className='text-xl font-bold'>Anuj Sharma</h3>
            <div className='flex gap-2 items-center rounded-full border-1 border-violet-800 text-violet-800 px-3 font-semibold'>
                <span><BiHomeAlt /></span>
                <p>HOME</p>
            </div>
        </div>

        <h4 className='font-medium text-gray-500 mt-1'>Vishal Mega Mart</h4>

        <h4 className='font-medium text-gray-500 mt-1'>Friends colony House no 24, Bajrakabari Road</h4>

        <h4 className='font-medium text-gray-500 mt-1'>Cuttuck - 735001</h4>

        <h4 className='font-medium text-gray-500 mt-1'>Odisha</h4>

        <h4 className='font-medium text-gray-500 mt-1'>Mobile: 78936 45678</h4>

        </div>

        <div className='flex items-center justify-end'>
            <span className='text-gray-400'><MdArrowForwardIos size={20}/></span>
        </div>
    </div>
  )
}

export default AddressBox