import React from 'react'
import { MdArrowForwardIos } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { BiBuildingHouse } from "react-icons/bi";

const AddressBox = ({address,name,company,phone}) => {
  return (
    <div className='grid grid-cols-6 border-1 rounded p-3'>
        <div className='col-span-5'>
        <div className='flex gap-16'>
            <h3 className='text-xl font-bold'>{name}</h3>
            <div className='flex gap-2 items-center rounded-full border-1 border-violet-800 text-violet-800 px-3 h-1/2 font-semibold '>
                {address.addressType === 'HOME' ? (
                  <span><BiHomeAlt /></span>
                ) : address.addressType === 'WORK' ? (
                  <span><PiSuitcaseSimpleBold /></span>
                ) : (
                  <span><BiBuildingHouse /></span>
                )}
                <p>{address.addressType}</p>
            </div>
        </div>
        
        <h4 className='font-medium text-gray-500 mt-1'>{company}</h4>

        <h4 className='font-medium text-gray-500 mt-1'>{address.street}</h4>

        <h4 className='font-medium text-gray-500 mt-1'>{address.city} - {address.zipcode}</h4>

        <h4 className='font-medium text-gray-500 mt-1'>{address.state}</h4>

        <h4 className='font-medium text-gray-500 mt-1'>Mobile: {phone}</h4>

        </div>

        <div className='flex items-center justify-end'>
            <span className='text-gray-400'><MdArrowForwardIos size={20}/></span>
        </div>
    </div>
  )
}

export default AddressBox