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
  isWishlist, onWishlistToggle, onCartToggle, navigateCart, hexCode,variantType,imageUrl,
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
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const wishlistItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
  
      const alreadyInCart = cartItems.some(item => item.variantId === variantId);
      if (alreadyInCart) {
        setIsInCart(true);
        showToast("Item is already in your Cart!");
        return;
      }
  
      await removeFromWishlist(customer.customerId, variantId);
      const updatedWishlist = wishlistItems.filter(item => item.variantId !== variantId);
      localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
      setIsWishlisted(false);
      setJustRemoved(true);
      onWishlistToggle?.();
  
      await addToCart(customer.customerId, variantId, quantity);
      const updatedCart = [...cartItems, { variantId, quantity }];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      setIsInCart(true);
      setCartItems(updatedCart);
  
      updateCartAndWishlistCounts();
      showToast("Item is moved to cart!");
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


console.log(isWishlist,isWishlistPage,justRemoved)

  return (
    <>
      {/* Product Card */}
      <div>
        <a
          className="relative block bg-white rounded-lg border border-gray-100 rounded"
          style={{ width: '19rem' }}
        >
          {/* SALE Badge */}
          <span className="absolute -left-px -top-px rounded-bl-3xl rounded-tr-3xl bg-yellow-300 px-6 py-2 font-medium uppercase tracking-widest text-black z-20">
            Sale
          </span>
  
          {/* Image with Color Overlay original*/}
          <div className="relative rounded-lg">
            <img
              src={`${backendUrl}${getImageByVariantType(variantType)}`}
              alt=""
              className="h-80 w-full rounded-lg object-contain"
              style={{ height: '10rem' }}
            />
            <div
              className="absolute inset-0 rounded-lg"
              style={{ backgroundColor: hexCode, opacity: 0.4 }}
            ></div>
          </div>
  




{/* <div className="relative rounded-lg overflow-hidden bg-white w-full h-40"> */}
  {/* White background container */}
  {/* <div className="absolute inset-0 bg-white"> */}
  
  {/* Original image with color overlay */}
  {/* <div 
    className="relative w-full h-full"
    style={{
      backgroundColor: hexCode,
      backgroundImage: `url(${backendUrl}${imageUrl})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundBlendMode: 'multiply',
    }}
  > */}
    {/* Fallback for browsers that don't support blend modes */}
    {/* <img
      src={`${backendUrl}${imageUrl}`}
      alt="Product image"
      className="w-full h-full object-contain opacity-0"
      aria-hidden="true"
    /> */}
    {/* </div>
  </div>
</div> */}




{/* <div className="relative rounded-lg overflow-hidden bg-white w-full h-40">
  <div className="relative w-full h-full">

    <div className="absolute inset-0 bg-white"></div>
    
    <div 
      className="absolute inset-0"
      style={{
        backgroundColor: hexCode,
        WebkitMaskImage: `url(${backendUrl}${imageUrl})`,
        WebkitMaskSize: 'contain',
        WebkitMaskPosition: 'center',
        WebkitMaskRepeat: 'no-repeat',
        maskImage: `url(${backendUrl}${imageUrl})`,
        maskSize: 'contain',
        maskPosition: 'center',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
      }}
    ></div>
    
  </div>
</div> */}



          {/* Card Body */}
          <div className="p-3">
            <h5 className="font-medium flex items-center flex-wrap">
            {productName}
            <span className="mx-1 text-xl leading-none px-1">•</span>
            {size}
            <span className="flex items-center gap-1">
               <span className="mx-1 text-xl leading-none px-1">•</span>
              {color}
            </span>
            <span className="mx-1 text-xl leading-none px-1">•</span>
            {variantType}
          </h5>


            <h5></h5>
  
            {/* Quantity Row */}
            <div className="d-flex align-items-center justify-content-between mt-3">
              <div className="border px-3 py-2 rounded col-4">
                 {variantType === "CONE" ? (
                <h5>50 Kg</h5>
              ):(
                <h5>10 Kg</h5>
              )
            }
              </div>
  
              <div className="col-4">
                <label htmlFor="Quantity" className="sr-only">Quantity</label>
                <div className="flex items-center justify-between w-20 sm:w-32 md:w-20 h-9 border border-gray-300 rounded">
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
  
            {/* Price & Rating */}
            <div className="mt-2 d-flex justify-content-between rounded">
              <div className="d-flex gap-2 align-items-center">
                <h4 className="purple-text font-semibold text-2xl">₹{Math.round(price)}</h4>
               <p className="text-slate-400 font-medium"><s>₹{Math.round(markupPrice)}</s></p>
              </div>
  
              <div className="bg-yellow-100 d-flex gap-2 align-items-center h-50 p-1 rounded-md">
                <span className="text-yellow-300">
                  <TiStarFullOutline />
                </span>
                <p>4.5</p>
              </div>
            </div>
  
            {/* Buttons */}
            <div className="d-flex gap-2 mt-3 justify-between">
              {showCart && location.pathname !== "/shoppingCart" && (
                <button
                  onClick={handleCartButtonClick}
                  className={`d-flex align-items-center justify-content-center gap-2 p-1 font-medium rounded flex-1 text-md ${isInCart ? 'bg-green-500 text-white' : 'bg-purple-100 purple-text'}`}
                >
                  {isInCart ? "GO TO CART" : "ADD TO CART"}
                  <span>
                    <MdOutlineShoppingCart size={20} />
                  </span>
                </button>
              )}
  
              <button
                className="bg-purple-100 p-2 purple-text rounded px-3"
                onClick={handleWishlistClick}
              >
                {isWishlistPage && justRemoved ? (
                  <FaHeart  />
                ) : isWishlist ? (
                  <FaHeart color="red" />
                ) : (
                  <FaRegHeart />
                )}
              </button>
            </div>
          </div>
        </a>
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
