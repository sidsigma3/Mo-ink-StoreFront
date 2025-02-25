import React from 'react'
import ProductSearch from '../ProductSearch/ProductSearch'
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCart } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import Badge from '@mui/material/Badge';
import { deepPurple } from '@mui/material/colors';
import YourLocation from '../YourLocation/YourLocation';
import { useNavigate } from 'react-router-dom';

const NavbarHeader = () => {
  
  const navigate = useNavigate()
  const purpuleColor = deepPurple[500]


  const handleWishlist = () => {
      navigate("/wishlist")
  }


  const handleCart = () =>{
    navigate("/shoppingCart")
  }

  
  return (
    <div className='d-flex align-items-center justify-content-between border-bottom'>
        <div>
            <img src='/images/logo.png'></img>
        </div>

        <div>
            <ProductSearch></ProductSearch>
        </div>

        <div>
          <YourLocation></YourLocation>
        </div>


        <div className='d-flex gap-3'>
          <div onClick={handleWishlist} className='d-flex align-items-center justify-content-center rounded-circle yellow-light-bg' style={{width:'2.3rem' , height:'2.3rem' , cursor:'pointer'}}>
              <Badge badgeContent={4} 
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: purpuleColor,
                  color: '#fff', 
                  top:'-7px',
                  right:'-7px'
                },
              }}
              >
              <span><FaRegHeart /></span>
              </Badge>
          </div>

          <div onClick={handleCart} className='d-flex align-items-center justify-content-center rounded-circle yellow-light-bg' style={{width:'2.3rem' , height:'2.3rem',cursor:'pointer'}}>
              <Badge badgeContent={5}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: purpuleColor,
                  color: '#fff', // Text color
                  top:'-7px',
                  right:'-7px'
                },
              }}
              >
              <span><PiShoppingCart size={22}/></span>
              </Badge>
          </div>

          <div className='d-flex align-items-center justify-content-center rounded-circle yellow-light-bg' style={{width:'2.3rem' , height:'2.3rem',cursor:'pointer'}}>
              
              <span><GoPerson size={20}/></span>
          </div>
        </div>

    </div>
  )
}

export default NavbarHeader