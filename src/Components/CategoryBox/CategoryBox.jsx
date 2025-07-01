import React from 'react'
import { TiStarFullOutline } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { LuPencilRuler } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const CategoryBox = ({ size, color, price , product , variantType ,markupPrice , variantDescription}) => {
  const navigate = useNavigate();
  const variant = variantType?.toLowerCase();


  const handleClick = () => {
    navigate("/productDetails", {
      state: { product, size, variantType, color, price ,markupPrice ,variantDescription},
    });
  };

  let variantColorClass = 'text-gray-600'; 
  if (variantType === 'CONE') {
    variantColorClass = 'text-pink-500';
  } else if (variantType === 'HANK') {
    variantColorClass = 'text-amber-500'; 
  }

  return (
    <div className="bg-purple-100 border rounded-4 p-3 cursor-pointer h-fit w-full " onClick={handleClick}>
      {/* <div className="flex justify-end">
        <div className="bg-yellow-100 d-flex gap-2 rounded-2 align-items-center h-50 px-2 py-1">
          <span className="text-yellow-300"><TiStarFullOutline /></span>
          <p>4.5</p>
        </div>
      </div> */}

      <div className="flex flex-col items-center gap-2"> 
       <span className="text-purple-800">
        {variant  === "hank" ? (
          <img src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/yarn%20(1).png?updatedAt=1748516744330" alt="Hank" className="w-10 h-10" />
        ) : variantType === "cone" ? (
          <img src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/balls.png?updatedAt=1748517272738" alt="Cone" className="w-10 h-10" />
        ) : (
          <img src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/balls.png?updatedAt=1748517272738" alt="Default" className="w-10 h-10" />
        )}
      </span>
        <h4 className="text-lg md:text-lg text-center font-semibold">Count - {size}</h4>
        <h4 className="text-lg md:text-lg font-semibold">
          Total color - {Array.isArray(color) ? color.length : 1}
        </h4>
        {/* <h5 className="text-xl font-bold text-purple-900">₹{price}<span>/KG</span></h5> */}

        <h5 className={`text-lg md:text-xl font-bold ${variantColorClass}`}>{variantType}<span></span></h5>

        <div className="d-flex gap-2 mt-4 w-full">
          <button className="d-flex align-items-center justify-content-center gap-2 bg-white p-2 purple-text font-semibold rounded flex-1">
            VIEW COLORS
          </button>
          {/* <button className="bg-white p-2 purple-text rounded px-4"><FaRegHeart /></button> */}
        </div>
      </div>
    </div>
  )
}

export default CategoryBox;
