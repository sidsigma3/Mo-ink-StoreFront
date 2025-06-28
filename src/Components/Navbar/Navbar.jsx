import React , {useState} from 'react'
import { PiHeadphonesBold } from "react-icons/pi";
import { FaLinkedin, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();
  
  return (
    <nav className="hidden md:flex justify-between items-center border-b px-6 py-3 bg-white">
      {/* Navigation Links */}
      <ul className="flex gap-6 font-medium">
        <li>
          <a className="hover:text-purple-600 cursor-pointer" onClick={() => navigate("/home")}>
            Home
          </a>
        </li>
        <li>
          <a className="hover:text-purple-600 cursor-pointer" onClick={() => navigate("/about")}>About</a>
        </li>
        <li>
          <a className="hover:text-purple-600 cursor-pointer" onClick={() => navigate("/blogs")}>Blog</a>
        </li>
        <li>
          <a className="hover:text-purple-600 cursor-pointer" onClick={() => navigate("/contact")}>Contact</a>
        </li>
      </ul>

      {/* Contact Info with Social Icons */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <a 
            href="https://www.linkedin.com/company/inkndyes/?originalSubdomain=in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <FaLinkedin size={20} />
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
          >
            <FaFacebook size={20} />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500 transition-colors duration-200"
          >
            <FaInstagram size={20} />
          </a>
          <a 
            href="https://wa.me/917878865412" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-green-500 transition-colors duration-200"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>

        {/* Separator */}
        <div className="h-8 w-px bg-gray-300"></div>

        {/* Phone Contact */}
        <div className="flex items-center gap-2">
          <PiHeadphonesBold size={30} />
          <div>
            <h6 className="text-purple-600 font-bold m-0">+91 78788654122</h6>
            <p className="text-gray-500 text-sm m-0">24/7 Support center</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar