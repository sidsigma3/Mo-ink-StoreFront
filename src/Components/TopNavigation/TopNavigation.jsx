import React from 'react'

const TopNavigation = () => {
  return (
    <div className='d-flex justify-content-between border-bottom'>
        <ul style={{listStyle:'none'}} className='d-flex p-0 gap-1 m-0'>
            <li className='border border-start-0 border-end p-1 d-flex align-items-center' style={{fontSize:'0.8rem'}}>
                About us
            </li>
            <li className='border-end p-1 d-flex align-items-center' style={{fontSize:'0.8rem'}}>My account</li>
            <li className='border-end p-1 d-flex align-items-center' style={{fontSize:'0.8rem'}}>Wishlist</li>
            <li className='border-end p-1 d-flex align-items-center' style={{fontSize:'0.8rem'}}>Order Tracking</li>
        </ul>


        <div className='d-flex align-items-center'>
            <p className='m-0' style={{fontSize:'0.8rem'}}>Need help? Call us <span className='purple-text'>+1800 900</span></p>
        </div>
    </div>
  )
}

export default TopNavigation