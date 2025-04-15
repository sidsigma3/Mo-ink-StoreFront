import React, { useState, useEffect, useRef } from 'react'
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
import UserDropdown from '../Buttons/UserDropdown/UserDropdown';
import { addToWishlist, getWishlist, removeFromWishlist } from "../../Services/WishlistService"
import { getCart } from "../../Services/CartService"
import { useAppContext } from '../../Utils/commoncontext';


const NavbarHeader = () => {
  const { cartCount , wishlistCount, updateCartAndWishlistCounts} = useAppContext();
   
  const navigate = useNavigate()
  const dropdownRef = useRef(null);
  const customerId = JSON.parse(localStorage.getItem("userData"))?.customerId;
  const purpuleColor = deepPurple[500]

  const [accountOpen, setAccountOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleWishlist = () => {
    navigate("/wishlist")
  }


  const handleCart = () => {
    navigate("/shoppingCart")
  }


  const handleAddToWishlist = async (variantId) => {
    try {
      await addToWishlist(customerId, variantId);
      const updatedWishlist = await getWishlist(customerId);
      updateCartAndWishlistCounts()
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const handleRemoveFromWishlist = async (variantId) => {
    try {
      await removeFromWishlist(customerId, variantId);
      const updatedWishlist = await getWishlist(customerId);
      updateCartAndWishlistCounts()

    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };


  const handleLogout = () => {
    localStorage.clear();
    navigate("/"); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    };

    if (accountOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [accountOpen]);

  return (
    <div className='d-flex align-items-center justify-content-between border-bottom'>

      <div className="flex md:hidden justify-between items-center p-4 ps-0 border-b bg-white">
        <FiMenu size={30} className="cursor-pointer" onClick={() => setIsOpen(true)} />

      </div>


      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        onClick={() => setIsOpen(false)}
      >

        <div
          className="bg-white w-64 h-full shadow-lg transform transition-transform"
          onClick={(e) => e.stopPropagation()}
        >

          <div className='flex justify-between bg-yellow-200 p-3'>
            <h4 className='text-xl font-bold'>Menu</h4>
            <IoClose size={24} className="cursor-pointer " onClick={() => setIsOpen(false)} />
          </div>



          <ul className="space-y-4 text-lg font-medium p-3">
            <li>
              <a className="hover:text-purple-600 cursor-pointer" onClick={() => navigate("/home")}>
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
        <img className='h-12 cursor-pointer' src='/images/logo.png' onClick={() => navigate("/home")}></img>
      </div>

      {/* <div className='hidden lg:block'>
        <ProductSearch></ProductSearch>
      </div> */}

      <div className="hidden lg:block">
        <YourLocation />
      </div>


      <div className='d-flex gap-3'>
        <div onClick={handleWishlist} className='d-flex align-items-center justify-content-center rounded-circle yellow-light-bg' style={{ width: '2.3rem', height: '2.3rem', cursor: 'pointer' }}>
          <Badge badgeContent={wishlistCount}
          //display context value here
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: purpuleColor,
                color: '#fff',
                top: '-7px',
                right: '-7px'
              },
            }}
          >
            <span><FaRegHeart /></span>
          </Badge>
        </div>

        <div onClick={handleCart} className='d-flex align-items-center justify-content-center rounded-circle yellow-light-bg' style={{ width: '2.3rem', height: '2.3rem', cursor: 'pointer' }}>
          <Badge badgeContent={cartCount}
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: purpuleColor,
                color: '#fff',
                top: '-4px',
                right: '-4px'
              },
            }}
          >
            <span><PiShoppingCart size={22} /></span>
          </Badge>
        </div>

        <div ref={dropdownRef} onClick={() => setAccountOpen((prev) => !prev)} className='d-flex align-items-center justify-content-center rounded-circle yellow-light-bg relative' style={{ width: '2.3rem', height: '2.3rem', cursor: 'pointer' }}>

          <span><GoPerson size={20} /></span>
          {accountOpen && (
            <div
              className="absolute bg-white shadow rounded py-2 px-3"
              style={{ top: "100%", right: "12", minWidth: "150px", zIndex: 10 }}
            >
              <ul className="list-unstyled m-0">
                <li className="p-2 cursor-pointer hover:bg-gray-200 rounded" onClick={() => navigate("/account")}>Account</li>
                <li className="p-2 cursor-pointer hover:bg-gray-200 rounded" onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>


      </div>

    </div>
  )
}

export default NavbarHeader