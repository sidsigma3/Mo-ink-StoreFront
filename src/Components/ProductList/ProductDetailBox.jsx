import React, { useEffect, useState } from 'react'
import { TiStarFullOutline } from "react-icons/ti";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { addToWishlist, removeFromWishlist, getWishlist } from '../../Services/WishlistService';
import { addToCart, removeFromCart, getCart } from '../../Services/CartService';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../Utils/commoncontext';
import Toast from '../Toast/Toast';

const ProductDetailBox = ({
  productName, price, size, color, markupPrice, itemQuantity, variantId,
  isWishlist, onWishlistToggle, onCartToggle, navigateCart, hexCode,variantType,imageUrl,colorImage,
  isWishlistPage = false,
  showCart = true,
}) => {
  const { cartCount, setCartCount, wishlistCount, setWishlistCount, updateCartAndWishlistCounts } = useAppContext();
  const backendUrl = process.env.REACT_APP_IMAGE_URL
  const navigate = useNavigate()
  const location = useLocation();
  const [isWishlisted, setIsWishlisted] = useState(isWishlist);
  const [isInCart, setIsInCart] = useState(false);
  const customer = JSON.parse(localStorage.getItem("userData") || "{}");
  const [justRemoved, setJustRemoved] = useState(false);
  const [quantity, setQuantity] = useState(itemQuantity || 1);
  const [cartItems, setCartItems] = useState([]);

  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };
  
 

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => quantity > 1 && setQuantity(prev => prev - 1);

  const handleWishlistClick = async () => {
    if (!customer?.customerId) return;
  
    try {
      const wishlistItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  
      if (isWishlisted) {
        await removeFromWishlist(customer.customerId, variantId);
        const updatedWishlist = wishlistItems.filter(item => item.variantId !== variantId);
        localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
        setIsWishlisted(false);
        setJustRemoved(true);
        setToasts(prev => [...prev, { message: "Removed from wishlist!", type: "error" }]);
      } else {
        const inCart = cartItems.some(item => item.variantId === variantId);
        if (inCart) {
          await removeFromCart(customer.customerId, variantId);
          const updatedCart = cartItems.filter(item => item.variantId !== variantId);
          localStorage.setItem("cartItems", JSON.stringify(updatedCart));
          setIsInCart(false);
          setCartItems(updatedCart);
        }
  
        await addToWishlist(customer.customerId, variantId);
        const updatedWishlist = [...wishlistItems, { variantId }];
        localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
        setIsWishlisted(true);
        setJustRemoved(false);
        setToasts(prev => [...prev, { message: "Item added to wishlist" }]);
      }
  
      onWishlistToggle?.();
      onCartToggle?.();
      updateCartAndWishlistCounts();
    } catch (err) {
      console.error("Error toggling wishlist:", err);
      showToast("Failed to update wishlist.", "error");
    }
  };
   
  

const handleAddToCart = async () => {
  if (!customer?.customerId) {
    showToast("Please log in to add items to your cart.", "error");
    return;
  }

  try {
   
    const cartResponse = await getCart(customer.customerId);
    const cartItems = cartResponse?.cartItems || [];

    const wishlistItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]");

    const alreadyInCart = cartItems.some(item => item.variantId === variantId);

 
    await removeFromWishlist(customer.customerId, variantId);
    const updatedWishlist = wishlistItems.filter(item => item.variantId !== variantId);
    localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
    setIsWishlisted(false);
    setJustRemoved(true);
    onWishlistToggle?.();

  
    await addToCart(customer.customerId, variantId, quantity);

 
    let updatedCart;
    if (alreadyInCart) {
      updatedCart = cartItems.map(item =>
        item.variantId === variantId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      showToast(`You already had this item. Increased quantity by ${quantity}.`);
    } else {
      updatedCart = [...cartItems, { variantId, quantity }];
      showToast("Item is moved to cart!");
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setIsInCart(true);
    setCartItems(updatedCart);
    updateCartAndWishlistCounts();

  } catch (error) {
    console.error("Error adding to cart:", error);
    showToast("Failed to add item to cart!", "error");
  }
};

  

  const handleCartButtonClick = () => {
    isInCart ? navigate("/shoppingCart") : handleAddToCart();
  };

  useEffect(() => {
    if (!customer?.customerId) return;
  
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const storedWishlistItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
  
    setCartItems(storedCartItems);
    setIsInCart(storedCartItems.some(item => item.variantId === variantId));
    setIsWishlisted(storedWishlistItems.some(item => item.variantId === variantId));
  }, [customer?.customerId]);
  

  const getImageByVariantType = (variantType) => {
  if (!imageUrl || imageUrl.length === 0) return '';

  const match = imageUrl.find((url) =>
    url.includes(variantType?.toLowerCase())
  );

  return match || '';
};




  return (
    <>
      {/* Product Card */}
  <div className="relative block bg-white border-2 border-gray-200 rounded-xl overflow-hidden" style={{ width: '19rem' }}>
 
<div className={`relative flex justify-center items-center ${
  variantType === "CONE" 
    ? "bg-gradient-to-b from-[#979EA4] via-[#A2A5AC] to-[#C0C4C6]" 
    : variantType === "HANK"
    ? "bg-gradient-to-b from-[#D6D2D3] via-[#D6D2D3] to-[#D6D2D3]"
    : "bg-gradient-to-b from-[#979EA4] via-[#A2A5AC] to-[#C0C4C6]" // fallback gradient
}`} style={{ height: '10rem', overflow: 'hidden' }}>
  <img
    src={`${backendUrl}${colorImage}`}
    alt=""
    className="h-full object-contain"
    style={{ 
      transform: 'scale(1.1)',
      // transformOrigin: 'center top',
      // marginBottom: '-5%'
    }}
  />
</div>
  <div className="p-2 bg-white">
    <div className='mb-3'>
      <h5 className="font-bold text-md flex items-center flex-wrap justify-center text-purple-800">
        {productName}
        <span className="mx-1 text-xl leading-none px-1 text-purple-500">•</span>
        {size}
        <span className="mx-1 text-xl leading-none px-1 text-purple-500">•</span>
        {variantType}
      </h5>

  <h5 className="flex items-center justify-center gap-2 mt-2">
  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
    {color}
  </span>
  <span 
    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200"
    style={{ backgroundColor: hexCode }}
  >
    {hexCode?.toUpperCase()}
  </span>
</h5>
    </div>

    {/* Quantity Row */}
    <div className="flex items-center justify-between mt-3 mb-2">
      <div className="border-2 border-purple-200 px-3 py-2 rounded-lg col-4 bg-purple-50">
        {variantType === "CONE" ? (
          <h5 className="font-medium text-purple-800">50 Kg</h5>
        ) : (
          <h5 className="font-medium text-purple-800">10 Kg</h5>
        )}
      </div>

      <div className="col-4">
        <label htmlFor="Quantity" className="sr-only">Quantity</label>
        <div className="flex items-center justify-between w-20 sm:w-32 md:w-20 h-9 border-2 border-purple-300 rounded-lg bg-white">
          <button
            type="button"
            onClick={handleDecrease}
            className="w-10 h-full text-lg text-purple-600 hover:opacity-75 transition font-bold"
          >
            &minus;
          </button>

          <input
            type="number"
            id="Quantity"
            value={quantity}
            readOnly
            className="w-8 text-center pl-2 text-sm font-medium text-purple-800"
          />

          <button
            type="button"
            onClick={handleIncrease}
            className="w-10 h-full text-lg text-purple-600 hover:opacity-75 transition font-bold"
          >
            +
          </button>
        </div>
      </div>
    </div>

    {/* Price & Rating */}
    <div className="mt-2 flex justify-between items-center rounded-lg bg-purple-50 p-2">
      <div className="flex gap-2 items-center">
        <h4 className="text-purple-800 font-bold text-2xl">₹{Math.round(price)}</h4>
        <p className="text-gray-400 font-medium"><s>₹{Math.round(markupPrice)}</s></p>
      </div>

      <div className="bg-yellow-100 flex gap-1 items-center h-8 px-2 rounded-md border border-yellow-200">
        <span className="text-yellow-500">
          <TiStarFullOutline />
        </span>
        <p className="text-sm font-bold text-yellow-700">4.5</p>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex gap-2 mt-3 justify-between">
      {showCart && location.pathname !== "/shoppingCart" && (
        <button
          onClick={handleCartButtonClick}
          className={`flex items-center justify-center gap-2 py-2 font-bold rounded-lg flex-1 text-md ${
            isInCart 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-purple-800 text-white hover:bg-purple-600'
          } transition-colors`}
        >
          {isInCart ? "GO TO CART" : "ADD TO CART"}
          <span>
            <MdOutlineShoppingCart size={20} />
          </span>
        </button>
      )}

      <button
        className="bg-purple-100 p-2 text-purple-800 rounded-lg px-3 border-2 border-purple-200 hover:bg-purple-200 transition-colors"
        onClick={handleWishlistClick}
      >
        {isWishlistPage && justRemoved ? (
          <FaHeart className="text-purple-600" />
        ) : isWishlisted ? (
          <FaHeart color="red" />
        ) : (
          <FaRegHeart className="text-purple-600" />
        )}
      </button>
    </div>
  </div>
</div>

  
      {/* Toast Notification*/}
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
    </>
  );
  
}

export default ProductDetailBox;
