import React from 'react'
import { SlLocationPin } from "react-icons/sl";

const YourLocation = () => {
  return (
    <div className='d-flex align-items-center justify-content-between shadow-sm bg-white p-2 rounded' style={{width:'10rem'}}>
        <span className='text-secondary-subtle'><SlLocationPin /></span>
        <h6 className='purple-text m-0'>Your Location</h6>
    </div>
  )
}

export default YourLocation