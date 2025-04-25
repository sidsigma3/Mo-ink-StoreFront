import React from 'react'
import { MdArrowForwardIos, MdDeleteOutline } from "react-icons/md";
import { BiHomeAlt, BiBuildingHouse } from "react-icons/bi";
import { PiSuitcaseSimpleBold } from "react-icons/pi";

const AddressBox = ({ address, name, company, phone, onDelete }) => {
  return (
    <div className='grid grid-cols-6 border-1 rounded p-3 relative'>
      <div className='col-span-5'>
        <div className='flex gap-16'>
          <h3 className='text-xl font-bold'>{name}</h3>
          <div className='flex gap-2 items-center rounded-full border-1 border-violet-800 text-violet-800 px-3 h-1/2 font-semibold'>
            {address.addressType === 'HOME' ? (
              <span><BiHomeAlt size={20} /></span>
            ) : address.addressType === 'WORK' ? (
              <span><PiSuitcaseSimpleBold size={20} /></span>
            ) : (
              <span><BiBuildingHouse size={20} /></span>
            )}
            <p>{address.addressType}</p>
          </div>
          {address?.addressType !== 'HOME' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const confirmed = window.confirm("Do you really want to delete this address?");
                  if (confirmed) {
                    onDelete();
                  }
                }}
                className='flex items-center gap-1 text-red-700 border-1 border-red-700 px-3 py-1 rounded-full hover:bg-red-50 transition-all'
                title='Delete address'
              >
                <MdDeleteOutline size={18} />
                <span className='text-sm font-semibold'>DELETE</span>
              </button>
            )}

        </div>

        <h4 className='font-medium text-gray-500 mt-1'>{company && <span>{company}</span>}</h4>

        <h4 className='font-medium text-gray-500 mt-1'>{address.street}</h4>

        <h4 className='font-medium text-gray-500 mt-1'>{address.city} - {address.zipcode}</h4>

        <h4 className='font-medium text-gray-500 mt-1'>{address.state}</h4>

        <h4 className='font-medium text-gray-500 mt-1'>Mobile: {phone}</h4>
      </div>

      <div className='flex items-center justify-end'>
        <span className='text-gray-400'><MdArrowForwardIos size={20} /></span>
      </div>
    </div>
  )
}

export default AddressBox;
