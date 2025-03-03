import React from 'react'
import { TiStarFullOutline } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { LuPencilRuler } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
const CategoryBox = ({ size, color, price , product}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/productDetails", {
      state: { product, size, color, price },
    });
  };

  return (
    <div className="bg-violet-100 rounded-4 p-3 cursor-pointer h-fit w-full" onClick={handleClick}>
      <div className="flex justify-end">
        <div className="bg-yellow-100 d-flex gap-2 rounded-2 align-items-center h-50 px-2 py-1">
          <span className="text-yellow-300"><TiStarFullOutline /></span>
          <p>4.5</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2"> 
        <span className="text-violet-800"><LuPencilRuler size={50}/></span>
        <h4 className="text-2xl font-bold">{size}</h4>
        <h5 className="text-3xl font-bold text-violet-900">₹{price} <span>/KG</span></h5>

        <div className="d-flex gap-2 mt-3 w-full">
          <button className="d-flex align-items-center justify-content-center gap-2 bg-white p-2 purple-text font-semibold rounded flex-1">
            VIEW PRODUCT
          </button>
          <button className="bg-white p-2 purple-text rounded px-4"><FaRegHeart /></button>
        </div>
      </div>
    </div>
  )
}

export default CategoryBox