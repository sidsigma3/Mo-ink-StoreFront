import React, { useState, useEffect } from 'react'
import { TiStarFullOutline } from "react-icons/ti";
import { FaHeart } from "react-icons/fa";
import { addToWishlist, removeFromWishlist } from "../../Services/WishlistService";
import { getCart, removeFromCart } from "../../Services/CartService"
import { useAppContext } from '../../Utils/commoncontext';
import Toast from '../Toast/Toast';
import { FaTrash } from "react-icons/fa";





const ProductDetailBoxMiniMobile = ({ productName, price, size, color ,itemQuantity, variantId, isWishlist, onWishlistToggle, onCartToggle, hexCode,variantType, productImage,markupPrice, colorCode, onRemove,   cartItems, setCartItems, 
  isSelected = false, 
  fetchOrders = () => {},
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
  const [isRemoving, setIsRemoving] = useState(false);
  const [justRemoved, setJustRemoved] = useState(false);
  
  const customer = JSON.parse(localStorage.getItem("userData") || "{}");
  const customerId = customer?.customerId;


  const getDisplayColor = (item) => {
  return item.colorName || item.color || item.colour || item.colorCode || 'Default Color';
  };


 const groupedProducts = cartItems.reduce((groups, item) => {
  const key = `${item.productName}-${item.size}-${item.variantType}`;
  if (!groups[key]) groups[key] = [];
  groups[key].push(item);
  return groups;
}, {});

const handleIncrease = (variantId, currentQty) => {
  const newQty = currentQty + 1;
  onQuantityChange(variantId, newQty);
};
const handleDecrease = (variantId, currentQty) => {
  if (currentQty > 1) {
    const newQty = currentQty - 1;
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

const handleRemoveFromCart = async (variantId) => {
  if (!customer?.customerId) {
    setToasts([{ message: "Please log in to manage your cart.", type: "error" }]);
    setTimeout(() => setToasts([]), 3000);
    return;
  }

  setIsRemoving(true);
  
  try {
    await removeFromCart(customer.customerId, variantId);
    
    // Optimistically update UI
    const updatedCartItems = cartItems.filter(item => item.variantId !== variantId);
    setCartItems(updatedCartItems);
    
    // Update global counts
    updateCartAndWishlistCounts();
    
    // Show success message
    setToasts([{ message: "Item removed from cart!", type: "success" }]);
    
    // Only call fetchOrders if it's provided
    if (typeof fetchOrders === 'function') {
      await fetchOrders();
    }
  } catch (error) {
    console.error("Remove from cart error:", error);
    setToasts([{ 
      message: error.response?.data?.message || "Failed to remove item from cart!", 
      type: "error" 
    }]);
    
    // Revert UI if needed
    if (typeof fetchOrders === 'function') {
      fetchOrders(); // Force refresh from server
    }
  } finally {
    setIsRemoving(false);
    setTimeout(() => setToasts([]), 3000);
  }
};



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
 {Object.entries(groupedProducts).map(([groupKey, groupItems]) => {
  if (!groupItems.length) return null;

  const firstItem = groupItems[0];

  const getWeightPerUnit = (type) => (type === "CONE" ? 50 : 10);

  const totalQuantityKg = groupItems.reduce(
    (sum, item) => sum + (item?.quantity || 0) * getWeightPerUnit(item.variantType),
    0
  );

  const totalPrice = groupItems.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0) * getWeightPerUnit(item.variantType),
    0
  );

  return (
    <div key={groupKey} className="sm:hidden bg-white rounded-lg  border-1 p-4 mb-3">
      {/* Header */}
      <div className="flex items-start mb-3">
        <div className="w-20 h-20 rounded-md overflow-hidden mr-3 border border-gray-200">
          <img
            src={`${backendUrl}${firstItem.productImage?.[0] || ''}`}
            alt={firstItem.productName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">{firstItem.productName}</h3>
          <p className="text-md font-medium capitalize text-gray-800">
            {firstItem.size} • {firstItem.variantType.toLowerCase()} • {groupItems.length} colors
          </p>
          <p className="text-md font-medium text-gray-900 mt-1">
            ₹{Math.round(firstItem.price)} per kg
          </p>
        </div>
      </div>

      {/* Color Variants */}
      <div className="space-y-2 mb-3">
        {groupItems.map((item) => {
          const weightPerUnit = getWeightPerUnit(item.variantType); 
          const quantityInKg = item.quantity * weightPerUnit; 
          const totalPriceForItem = item.price * item.quantity * weightPerUnit; 

          return (
            <div key={`${item.id}-${item.colorCode}`} className="bg-purple-50 rounded-xl p-3 text-sm">
              <div className="flex justify-between items-start">
            <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full mr-2 border border-gray-300 overflow-hidden">
                    <img
                      src={`${backendUrl}${item.colorImage}`}
                      alt="color"
                      className="w-full h-full object-cover scale-[4]"
                    />
                  </div>
                   <span className="font-semibold text-md capitalize">
                          {getDisplayColor(item)}
                        </span>
                </div>
                <button onClick={() => handleRemoveFromCart(item.variantId)} className="text-gray-400 hover:text-red-500">
                  <span className="text-[30px] text-red-400 font-medium leading-none">×</span>
                </button>
              </div>

              <div className="flex justify-between items-center mt-2">
                <div className="flex flex-col">
                  <div className="flex items-center border rounded h-7 overflow-hidden">
                   <button
                    onClick={() => handleDecrease(item.variantId, item.quantity)}
                    className="w-6 h-7 flex items-center justify-center text-gray-600 text-sm"
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="w-14 text-center text-[12px] font-semibold">
                    {item.quantity * getWeightPerUnit(item.variantType)}kg
                  </span>
                  <button
                    onClick={() => handleIncrease(item.variantId, item.quantity)}
                    className="w-6 h-7 flex items-center justify-center text-gray-600 text-sm"
                  >
                    +
                  </button>
                  </div>
                  {/* <p className="text-xs text-gray-500 mt-1">
                    {weightPerUnit} Kg per unit
                  </p> */}
                </div>

                <span className="text-md font-semibold text-right w-20">
                  ₹{totalPriceForItem.toFixed(0)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Group Total */}
      <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
        <p className="font-medium text-lg">Total ({totalQuantityKg}kg):</p>
        <p className="font-bold text-lg text-purple-800">₹{totalPrice.toFixed(0)}</p>
      </div>
    </div>
  );
})}




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

  )
}

export default ProductDetailBoxMiniMobile