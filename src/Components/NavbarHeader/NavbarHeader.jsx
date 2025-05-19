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
  // Only showing updated JSX portion for visual improvements (same logic retained)

<div className='d-flex align-items-center justify-content-between border-bottom px-3 py-2 bg-white'>

  

 

  {/* Logo */}
  <div>
    <img className="h-10 cursor-pointer" src="/images/logo.png" alt="Logo" onClick={() => navigate("/home")} />
  </div>

{/* Mobile Menu */}
    <div className="right-3 block lg:hidden  ">
    <FiMenu size={26} className="cursor-pointer" onClick={() => setIsOpen(true)} />
  </div>

 {/* Slide-out Sidebar */}
  <div
    className={`fixed inset-y-0 right-0  z-50 transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    onClick={() => setIsOpen(false)}
  >
    <div className="bg-white w-80 h-screen shadow-xl flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
  {/* Header */}
  <div>
    <div className="flex justify-between items-center bg-yellow-300 p-4">
      <h4 className="text-xl font-bold">Menu</h4>
      <IoClose size={22} className="cursor-pointer text-gray-800" onClick={() => setIsOpen(false)} />
    </div>

    {/* Menu Items */}
    <ul className="p-4 space-y-3 text-base">
      <li className="cursor-pointer text-lg hover:text-purple-600" onClick={() => navigate("/home")}>Home</li>
      <li className="cursor-pointer text-lg hover:text-purple-600" onClick={() => navigate("/about")}>About</li>
      <li className="cursor-pointer text-lg hover:text-purple-600" onClick={() => navigate("/blogs")}>Blogs</li>
      <li className="cursor-pointer text-lg hover:text-purple-600" onClick={() => navigate("/contact")}>Contact</li>
    </ul>

    {/* Banner Image */}
    <div className="mt-6 h-62 overflow-hidden rounded-lg">
      <img
        src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Mobile%20Navbar%20Banner.png?updatedAt=1747462801201"
        alt="Banner"
        className="w-full h-full object-contain"
      />
    </div>
  </div>

  {/* Logout Button */}
  <div className="py-4 px-2">
    <button
      className="w-full py-2 rounded-full bg-red-500 text-lg text-white hover:bg-red-700"
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>
</div>

  </div>

  {/* Location */}
  <div className="hidden lg:block">
    <YourLocation />
  </div>

  {/* Right Icons Section */}
  <div className="hidden lg:flex gap-4 items-center">
    
    {/* Wishlist */}
    <div onClick={handleWishlist} className="flex items-center justify-center w-10 h-10 rounded-full yellow-light-bg cursor-pointer relative">
      <Badge badgeContent={wishlistCount} sx={{
        '& .MuiBadge-badge': {
          backgroundColor: purpuleColor,
          color: '#fff',
          top: '-6px',
          right: '-6px',
        }
      }}>
        <FaRegHeart size={18} />
      </Badge>
    </div>

    {/* Cart */}
    <div onClick={handleCart} className="flex items-center justify-center w-10 h-10 rounded-full yellow-light-bg cursor-pointer relative">
      <Badge badgeContent={cartCount} sx={{
        '& .MuiBadge-badge': {
          backgroundColor: purpuleColor,
          color: '#fff',
          top: '-4px',
          right: '-4px',
        }
      }}>
        <PiShoppingCart size={20} />
      </Badge>
    </div>

    {/* Account Dropdown */}
    <div ref={dropdownRef} onClick={() => setAccountOpen((prev) => !prev)}
      className="flex items-center justify-center w-10 h-10 rounded-full yellow-light-bg cursor-pointer relative">
      <GoPerson size={20} />

      {accountOpen && (
        <div className="absolute top-full right-0 w-64 mt-2 z-50 bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="font-bold text-gray-800">User Name</p>
            <p className="text-sm text-gray-500">useremail@gmail.com</p>
          </div>

          {/* Navigation Items */}
          <ul className="text-sm py-2">
            <li onClick={() => navigate("/account")}
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold text-gray-800">
              Account <MdChevronRight size={18} className="text-gray-500" />
            </li>
            {accountMenuItems.map(({ label, path }) => (
              <li key={label}
                onClick={() => navigate(path)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                {label}
              </li>
            ))}
          </ul>

          {/* Logout */}
          <div className="border-t border-gray-200">
            <li onClick={handleLogout}
              className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 cursor-pointer">
              Logout <AiOutlineLogout size={18} className="text-red-500" />
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