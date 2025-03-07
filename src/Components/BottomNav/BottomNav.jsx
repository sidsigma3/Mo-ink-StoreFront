import { FiHome } from "react-icons/fi";
import { IoSearchSharp } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { FiHeart } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BottomNav = () => {
  const navigate = useNavigate();

  const [selected,setSelected] = useState()


  const handleClick = (value) =>{
    setSelected(value)
  }

  console.log(selected)

  return (
    <div className="bg-violet-700 fixed bottom-0 left-0 w-full shadow-lg border-t flex justify-around items-center py-2 md:hidden block z-40">
      {/* Home */}
      <button 
        onClick={() => {
        handleClick('home')
        navigate("/")
        }} className={selected==='home'?"flex flex-col items-center hover:text-purple-700 text-yellow-300":"flex flex-col items-center text-white hover:text-purple-700"} >
      <FiHome size={23}/>
        <span className="text-md font-semibold">Home</span>
      </button>

      {/* Search */}
      <button 
      onClick={() => {
        handleClick('search')
        navigate("/search")
       }} className="flex flex-col items-center text-white hover:text-purple-700">
         <IoSearchSharp size={23}/>
        <span className="text-md font-semibold">Search</span>
      </button>

      {/* Wishlist */}
      <button 
      onClick={() => {
      handleClick('profile')
      navigate("/account")}}
      className={selected==='profile'?"flex flex-col items-center hover:text-purple-700 text-yellow-300":"flex flex-col items-center text-white hover:text-purple-700"} >
      <GoPerson size={25}/>
        <span className="text-md font-semibold">Profile</span>
      </button>

      {/* Cart */}
      <button onClick={() => navigate("/wishlist")} className="flex flex-col items-center text-white hover:text-purple-700">
      <FiHeart size={23}/>
        <span className="text-md font-semibold">Wishlist</span>
      </button>

      {/* Profile */}
      <button onClick={() => navigate("/shoppingCart")} className="flex flex-col items-center text-white hover:text-purple-700">
      <BsCart3 size={23}/>
        <span className="text-md font-semibold">Cart</span>
      </button>
    </div>
  );
};

export default BottomNav;
