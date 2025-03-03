import React , {useState} from 'react'
import { PiHeadphonesBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

  const navigate = useNavigate()
  


  return (
  
   
    <nav className="hidden md:flex justify-between items-center border-b px-6 py-3 bg-white">
      {/* Navigation Links */}
      <ul className="flex gap-6 font-medium">
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

      {/* Contact Info */}
      <div className="flex items-center gap-2">
        <PiHeadphonesBold size={30} />
        <div>
          <h6 className="text-purple-600 font-bold m-0">+91 78788654122</h6>
          <p className="text-gray-500 text-sm m-0">24/7 Support center</p>
        </div>
      </div>
    </nav>

   
  )
}

export default Navbar