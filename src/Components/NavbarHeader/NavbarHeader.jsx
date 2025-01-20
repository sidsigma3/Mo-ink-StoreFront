import React from 'react'
import ProductSearch from '../ProductSearch/ProductSearch'
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import Badge from '@mui/material/Badge';
import { deepPurple } from '@mui/material/colors';
import YourLocation from '../YourLocation/YourLocation';

const NavbarHeader = () => {
  
  const purpuleColor = deepPurple[500]
  
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
          <div className='d-flex align-items-center justify-content-center rounded-circle yellow-light-bg' style={{width:'2.3rem' , height:'2.3rem'}}>
              <Badge badgeContent={4} 
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: purpuleColor,
                  color: '#fff', // Text color
                },
              }}
              >
              <span><FaRegHeart /></span>
              </Badge>
          </div>

          <div className='d-flex align-items-center justify-content-center rounded-circle yellow-light-bg' style={{width:'2.3rem' , height:'2.3rem'}}>
              <Badge badgeContent={5}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: purpuleColor,
                  color: '#fff', // Text color
                },
              }}
              >
              <span><MdOutlineShoppingCart size={20}/></span>
              </Badge>
          </div>

          <div className='d-flex align-items-center justify-content-center rounded-circle yellow-light-bg' style={{width:'2.3rem' , height:'2.3rem'}}>
              
              <span><GoPerson /></span>
          </div>
        </div>

    </div>
  )
}

export default NavbarHeader