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
import { MdChevronRight } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";



const NavbarHeader = () => {
  const { cartCount , wishlistCount, updateCartAndWishlistCounts} = useAppContext();
   
  const navigate = useNavigate()
  const dropdownRef = useRef(null);
  const customerId = JSON.parse(localStorage.getItem("userData"))?.customerId;
  const purpuleColor = deepPurple[500]

  const [accountOpen, setAccountOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(()=> {
    updateCartAndWishlistCounts()
  },[])

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


  const accountMenuItems = [
    { label: "Profile", path: "/setting" },
    { label: "Your Orders", path: "/orders" },
    { label: "Wallet", path: "/wallet" },
    { label: "Shopping Cart", path: "/shoppingCart" },
    { label: "Wishlist", path: "/wishlist" },
    { label: "Address", path: "/address" },
  ];

  

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
              <a className="hover:text-purple-600 cursor-pointer" onClick={() => navigate("/blogs")}>Blogs</a>
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

        <div
  ref={dropdownRef}
  onClick={() => setAccountOpen((prev) => !prev)}
  className="flex items-center justify-center rounded-full yellow-light-bg relative"
  style={{ width: '2.3rem', height: '2.3rem', cursor: 'pointer' }}
>
  <GoPerson size={20} />

  {accountOpen && (
    <div className="absolute top-full right-0 w-64 z-50 mt-2 rounded-lg shadow-lg bg-white text-md">
      {/* User Info */}
      <div className="px-4 py-3 border-b border-gray-300">
        <p className="font-bold text-gray-800">User Name</p>
        <p className="text-gray-600 text-sm">useremail@gmail.com</p>
      </div>

      {/* Account Menu */}
      <ul className="py-2  text-gray-800">
      <li
  className="flex justify-between items-center px-4 py-2 font-semibold hover:bg-gray-200 rounded cursor-pointer"
  onClick={() => navigate("/account")}
>
  Account <MdChevronRight size={20} className="text-gray-500 text-lg" />
</li>
        {accountMenuItems.map(({ label, path }) => (
    <li
      key={label}
      className="px-4 py-2 hover:bg-gray-200 rounded cursor-pointer"
      onClick={() => navigate(path)}
    >
      {label}
    </li>
        ))}
      </ul>

      {/* Logout */}
      <div className="border-t border-gray-300">
        <li
          className="flex justify-between items-center px-4 py-3 text-md font-semibold hover:bg-gray-200 cursor-pointer"
          onClick={handleLogout}
        >
          Logout <AiOutlineLogout size={20} className="text-red-500"/>
        </li>
      </div>
    </div>
  )}
</div>



      </div>

    </div>
  )
}

export default NavbarHeader