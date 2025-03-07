import React , {useState} from 'react'
import ProductSearch from '../ProductSearch/ProductSearch'
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCart } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import Badge from '@mui/material/Badge';
import { deepPurple } from '@mui/material/colors';
import YourLocation from '../YourLocation/YourLocation';
import { useNavigate } from 'react-router-dom';
import { FiMenu } from "react-icons/fi"; // Hamburger Icon
import { IoClose } from "react-icons/io5"; // Close Icon

const NavbarHeader = () => {
  
  const navigate = useNavigate()
  const purpuleColor = deepPurple[500]


  const [isOpen, setIsOpen] = useState(false);

  const handleWishlist = () => {
      navigate("/wishlist")
  }


  const handleCart = () =>{
    navigate("/shoppingCart")
  }

  
  return (
    <div className='d-flex align-items-center justify-content-between border-bottom'>
    
    <div className="flex md:hidden justify-between items-center p-4 ps-0 border-b bg-white">
      <FiMenu size={30} className="cursor-pointer" onClick={() => setIsOpen(true)} />
     
    </div>

   
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      onClick={() => setIsOpen(false)}
    >
   
      <div
        className="bg-white w-64 h-full shadow-lg transform transition-transform"
        onClick={(e) => e.stopPropagation()} 
      >
        
        <div className='flex justify-between bg-black text-white p-3'>
        <h4 className='text-xl font-bold'>Menu</h4>
        <IoClose size={24} className="cursor-pointer mb-4" onClick={() => setIsOpen(false)} />
        </div>
       

     
        <ul className="space-y-4 text-lg font-medium p-3">
          <li>
            <a className="hover:text-purple-600 cursor-pointer" onClick={() => navigate("/")}>
              Home
            </a>
          </li>
          <li>
            <a className="hover:text-purple-600 cursor-pointer">About</a>
          </li>
          <li>
            <a className="hover:text-purple-600 cursor-pointer">Blog</a>
          </li>
          <li>
            <a className="hover:text-purple-600 cursor-pointer">Contact</a>
          </li>
        </ul>
      </div>
    </div>



        <div>
            <img className='h-12' src='/images/logo.png'></img>
        </div>

        <div className='hidden lg:block'>
            <ProductSearch></ProductSearch>
        </div>

        <div className="hidden lg:block">
          <YourLocation />
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

          <div onClick={()=>navigate('/account')} className='d-flex align-items-center justify-content-center rounded-circle yellow-light-bg' style={{width:'2.3rem' , height:'2.3rem',cursor:'pointer'}}>
              
              <span><GoPerson size={20}/></span>
          </div>
        </div>

    </div>
  )
}

export default NavbarHeader