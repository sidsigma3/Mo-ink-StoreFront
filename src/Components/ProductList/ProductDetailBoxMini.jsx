import React, { useState, useEffect } from 'react'
import { TiStarFullOutline } from "react-icons/ti";



const ProductDetailBoxMini = ({ productName, price, size, color, itemQuantity, variantId, isWishlist, onWishlistToggle, onCartToggle,
  isSelected = false,
  onSelectChange = () => {}
 }) => {


  const [quantity, setQuantity] = useState(itemQuantity || 1);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
const handleCheckboxChange = (variantId) => {
  setSelectedItems(prev =>
    prev.includes(variantId)
      ? prev.filter(id => id !== variantId)
      : [...prev, variantId]
  );
};

  return (
    <div className='relative'>
       <input
        type="checkbox"
        className="absolute top-2 left-2 z-20 w-4 h-4 accent-violet-800"
        checked={isSelected}
        onChange={() => onSelectChange(variantId)}
      />

      <a className="flex relative block bg-white divide-y divide-dotted w-full">
        <img
          src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-30 w-1/3 rounded-tr-3xl object-cover"
          style={{ height: '11rem' }}
        />

        <div className="p-4 w-4/5">
          <h5 className='font-medium'>{productName}-{size} ({color})</h5>
          <div className='mt-2 d-flex justify-content-between rounded'>
            <div className='d-flex gap-2 align-items-center'>
              <h4 className='purple-text font-semibold text-2xl'>₹{price}</h4>
              <p className='text-slate-400'><s>₹542.85</s></p>
            </div>

            <div className='bg-yellow-100 d-flex gap-2 align-items-center h-50 p-1'>
              <span className='text-yellow-300'><TiStarFullOutline /></span>
              <p>4.5</p>
            </div>
          </div>


          <div className='flex justify-between items-center mt-3'>
            <div className='border py-2 rounded col-5 sm:text-sm md:text-sm w-20 sm:w-20 md:w-20 h-9 text-center'>
              <p>100 Kg</p>
            </div>

            <div className='col-4'>
              <label htmlFor="Quantity" className="sr-only"> Quantity </label>

              <div className="flex items-center justify-between w-20 sm:w-20 md:w-20 h-9 border border-gray-300 rounded">
                <button
                  type="button"
                  onClick={handleDecrease}
                  className="w-10 h-full text-lg text-gray-600 hover:opacity-75 transition"
                >
                  &minus;
                </button>

                <input
                  type="number"
                  id="Quantity"
                  value={quantity}
                  readOnly
                  className="w-8 text-center text-sm border-none focus:outline-none"
                />

                <button
                  type="button"
                  onClick={handleIncrease}
                  className="w-10 h-full text-lg text-gray-600 hover:opacity-75 transition"
                >
                  +
                </button>
              </div>

            </div>
          </div>





        </div>


      </a>
    </div>
  )
}

export default ProductDetailBoxMini