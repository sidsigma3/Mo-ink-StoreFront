import React from 'react'
import { TiStarFullOutline } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { LuPencilRuler } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";

const CategoryBox = ({ 
  size, 
  color, 
  price, 
  product, 
  variantType, 
  markupPrice, 
  variantDescription, 
  categoryName,
  currentFilters 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const variant = variantType?.toLowerCase();

  const handleClick = () => {
    // Get category from URL params as backup
    const urlParams = new URLSearchParams(location.search);
    const categoryFromUrl = urlParams.get('name');
    
    // Use the category name passed as prop or from URL or fallback
    const currentCategory = categoryName || (categoryFromUrl ? decodeURIComponent(categoryFromUrl) : 'All Products');
    
    // Navigate to ProductDetails with all necessary state
    navigate("/productDetails", {
      state: { 
        product, 
        size, 
        variantType, 
        color, 
        price, 
        markupPrice, 
        variantDescription,
        // Include information to restore Category page state
        categoryName: currentCategory,
        selectedVariantType: currentFilters?.selectedVariantType,
        selectedCounters: currentFilters?.selectedCounters,
        // Store the current URL for potential back navigation
        previousUrl: location.pathname + location.search
      },
    });
  };

  let variantColorClass = 'text-gray-600'; 
  if (variantType === 'CONE') {
    variantColorClass = 'text-pink-500';
  } else if (variantType === 'HANK') {
    variantColorClass = 'text-amber-500'; 
  }

  return (
    <div className="bg-purple-100 border rounded-4 p-3 cursor-pointer h-fit w-full sm:h-[320px] md:h-auto" onClick={handleClick}>
      <div className="flex flex-col items-center gap-2"> 
        <span className="text-purple-800">
          {variant === "hank" ? (
            <img 
              src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/yarn%20(1).png?updatedAt=1748516744330" 
              alt="Hank" 
              className="w-10 h-10" 
            />
          ) : variantType === "cone" ? (
            <img 
              src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/balls.png?updatedAt=1748517272738" 
              alt="Cone" 
              className="w-10 h-10" 
            />
          ) : (
            <img 
              src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/balls.png?updatedAt=1748517272738" 
              alt="Default" 
              className="w-10 h-10" 
            />
          )}
        </span>
        <h4 className="text-md md:text-lg text-center font-semibold">Count - {size}</h4>
        <h4 className="text-md md:text-lg font-medium">
          Total color - {Array.isArray(color) ? color.length : 1}
        </h4>
        <h5 className={`text-md md:text-xl font-bold ${variantColorClass}`}>{variantType}</h5>
        <div className="d-flex gap-2 mt-4 w-full">
          <button className="d-flex align-items-center justify-content-center gap-2 bg-white p-2 purple-text font-semibold rounded flex-1">
            VIEW COLORS
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryBox;