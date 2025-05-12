import React, { useState, useEffect } from 'react'
import { TiStarFullOutline } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";
import { addToWishlist, removeFromWishlist } from "../../Services/WishlistService";
import { getCart, removeFromCart } from "../../Services/CartService"
import { useAppContext } from '../../Utils/commoncontext';



const ProductDetailBoxMini = ({ productName, price, size, color, itemQuantity, variantId, isWishlist, onWishlistToggle, onCartToggle,variantType,
  isSelected = false,
  onSelectChange = () => { },
  onQuantityChange = () => {},
  onVariantTypeChange = () => {},
}) => {
  const { updateCartAndWishlistCounts } = useAppContext();


  const [quantity, setQuantity] = useState(itemQuantity || 1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(isWishlist || false);
  const [isInCart, setIsInCart] = useState(true);
  const [justRemoved, setJustRemoved] = useState(false);
  

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onQuantityChange(variantId, newQty);
  };
  
  const handleDecrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onQuantityChange(variantId, newQty);
    }
  };
  
  
  const handleCheckboxChange = (variantId) => {
    setSelectedItems(prev =>
      prev.includes(variantId)
        ? prev.filter(id => id !== variantId)
        : [...prev, variantId]
    );
  };


  const handleWishlistClick = async () => {
    const customer = JSON.parse(localStorage.getItem("userData") || "{}");
    if (!customer?.customerId) return;

    try {
      if (isWishlisted) {
        await removeFromWishlist(customer.customerId, variantId);
        setIsWishlisted(false);
        setJustRemoved(true);
        updateCartAndWishlistCounts();
        alert("Item is removed from wishlist");
      } else {
        const cart = await getCart(customer.customerId);

        const inCart = cart?.cartItems?.some(item => item.variantId === variantId);

        if (inCart) {
          console.log("Removing from cart:", variantId);
          await removeFromCart(customer.customerId, variantId);
          updateCartAndWishlistCounts();
          setIsInCart(false);
        } else {
          console.log("Item not found in cart");
        }

        await addToWishlist(customer.customerId, variantId);
        updateCartAndWishlistCounts();
        setIsWishlisted(true);
        setJustRemoved(false);
        alert("Item is added back to wishlist");
      }
      window.location.reload();
      onWishlistToggle?.();
      onCartToggle?.();
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
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
          src="/images/Picture1.png"
          alt=""
          className="h-30 w-1/3 object-cover p-1"
          style={{ height: '12rem' }}
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
              <p>50 Kg</p>
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

          <div className='mt-2 float-start'>
            <div className="mt-3">
              <div className="flex items-center gap-2">
              <span className="inline-block rounded bg-purple-100 text-purple-700 px-4 py-1 text-sm font-medium">
                  {variantType}
                </span>

                <button
                  onClick={handleWishlistClick}
                  className={`bg-purple-100 p-2 rounded px-4 ${isInCart
                    ? "text-white"
                    : isWishlisted
                      ? "text-white"
                      : "text-red-700"
                    }`}
                  title="Move to Wishlist"
                >
                  <FaHeart size={18} />
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