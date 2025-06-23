import React, { useState, useEffect } from 'react'
import { TiStarFullOutline } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";
import { addToWishlist, removeFromWishlist } from "../../Services/WishlistService";
import { getCart, removeFromCart } from "../../Services/CartService"
import { useAppContext } from '../../Utils/commoncontext';
import Toast from '../Toast/Toast';
import { FaTrash } from "react-icons/fa";




const ProductDetailBoxMini = ({ productName, price, size, color ,itemQuantity, variantId, isWishlist, onWishlistToggle, onCartToggle, hexCode,variantType,productImage,markupPrice, colorCode, onRemove,         
  isSelected = false,
   variants = [] ,
  showCart = true,
  onSelectChange = () => { },
  onQuantityChange = () => {},
  onVariantTypeChange = () => {},
}) => {
  const { updateCartAndWishlistCounts } = useAppContext();
const [toasts, setToasts] = useState([]);

  const backendUrl = process.env.REACT_APP_IMAGE_URL

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
  
  
  const showToast = (message, type = "error") => {
    setToasts([{ message, type }]);
    setTimeout(() => setToasts([]), 3000);
  };

  const handleCheckboxChange = (variantId) => {
    setSelectedItems(prev =>
      prev.includes(variantId)
        ? prev.filter(id => id !== variantId)
        : [...prev, variantId]
    );
  };

  const handleRemove = async () => {
    try {
      await onRemove(variantId);
      showToast("Item removed from cart", "success");
      updateCartAndWishlistCounts();
    } catch (err) {
      showToast("Failed to remove item", "error");
      console.error("Error removing item:", err);
    }
  };

  useEffect(() => {
    setQuantity(itemQuantity);
  }, [itemQuantity]);

  const handleWishlistClick = async () => {
     const showToast = (message, type = "error") => {
            setToasts([{ message, type }]);
            setTimeout(() => setToasts([]), 3000);
          };
    const customer = JSON.parse(localStorage.getItem("userData") || "{}");
    if (!customer?.customerId) return;

    try {
      if (isWishlisted) {
        await removeFromWishlist(customer.customerId, variantId);
        setIsWishlisted(false);
        setJustRemoved(true);
        updateCartAndWishlistCounts();
        showToast("Item is removed from wishlist", "error");
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
        showToast("Item is added back to wishlist", "success");
      }
      window.location.reload();
      onWishlistToggle?.();
      onCartToggle?.();
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

const getImageByVariantType = (variantType, imageUrls) => {
  if (!imageUrls || imageUrls.length === 0) return '';
  return imageUrls.find(url => url.includes(variantType.toLowerCase())) || '';
};

  return (

    <div>

    <div className='hidden sm:block relative border rounded-lg justify-center items-center '>
    
      <input
        type="checkbox"
        className="absolute top-7 left-6 z-20 w-4 h-4 accent-purple-800"
        checked={isSelected}
        onChange={() => onSelectChange(variantId)}
      />

      <a className="flex relative block bg-white  w-full">
     
        <div className="relative flex items-center justify-center ps-3 rounded-lg">
          <div className="relative w-full h-40 rounded-lg overflow-hidden">
            <img
              src={`${backendUrl}${getImageByVariantType(variantType, productImage)}`}
              alt=""
              className="w-full h-full object-cover z-0"
            />
            <div
              className="absolute inset-0 z-10 rounded-lg"
              style={{ backgroundColor: hexCode, opacity: 0.4 }}
            ></div>
          </div>
        </div>

                

        <div className="p-3 w-4/5">
          {/* Card Body */}
            <h5 className="font-medium flex items-center flex-wrap">
            {productName}
            <span className="mx-1 text-xl leading-none px-1">•</span>
            {size}
            <span className="mx-1 text-xl leading-none px-1">•</span>
              {color}
          </h5>
          
          <div className='mt-2 d-flex justify-content-between rounded'>
            <div className='d-flex gap-2 align-items-center'>
              <h4 className='purple-text font-semibold text-2xl'>₹{Math.round(price)}</h4>
              <p className='text-slate-400'><s>₹{Math.round(markupPrice)}</s></p>
            </div>

            <div className='bg-yellow-100 d-flex gap-2 rounded-lg align-items-center h-50 p-1'>
              <span className='text-yellow-300'><TiStarFullOutline /></span>
              <p>4.5</p>
            </div>
          </div>


          <div className='flex justify-right gap-4 align-items-center mt-3'>
            <div className='border rounded w-20 h-9 flex items-center justify-center sm:text-sm md:text-sm '>
              {variantType === "CONE" ? (
                <p>50 Kg</p>
              ):(
                <p>10 Kg</p>
              )
            }
             
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
              <span className="inline-block rounded bg-purple-100 text-purple-700 px-4 py-2 text-sm font-medium">
                  {variantType}
                </span>

                <button
                  onClick={handleWishlistClick}
                  className={`bg-purple-100 py-2 rounded px-4 ${isInCart
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
        {/* Toast Notification */}
     <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() =>
                            setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                        }
                    />
                ))}
            </div>
    </div>



    </div>

  )
}

export default ProductDetailBoxMini