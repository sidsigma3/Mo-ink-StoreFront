import React from 'react'
import { PiHeadphonesBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

  const navigate = useNavigate()


  return (
    <nav className='navbar border-bottom'>
        <div  id="navbarNav">
            <ul class="navbar-nav d-flex flex-row gap-3 fw-medium">
                <li class="nav-item">
                <a class="nav-link " href="#" onClick={()=>navigate('/')}>Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Blog</a>
                </li>
                <li class="nav-item">
                <a class="nav-link">Contact</a>
                </li>
            </ul>
        </div>


        <div className='d-flex align-items-center gap-2'>
            <span><PiHeadphonesBold size={30}/></span>
            <div>
                <h6 className='purple-text fw-bold m-0'>+91 78788654122</h6>
                <p className='text-body-tertiary m-0' style={{fontSize:'0.75rem'}}>24/7 Support center</p>
            </div>
        </div>

    </nav>
  )
}

export default Navbar