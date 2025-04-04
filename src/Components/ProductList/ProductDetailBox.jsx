import React , {useState} from 'react'
import { TiStarFullOutline } from "react-icons/ti";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { addToWishlist , removeFromWishlist , getWishlist} from '../../Services/WishlistService';
import { addToCart, removeFromCart ,getCart } from '../../Services/CartService';
import { useNavigate } from 'react-router-dom';

const ProductDetailBox = ({productName,price,size,color,itemQuantity,variantId,isWishlist, onWishlistToggle,onCartToggle,navigateCart,hexCode,showCart=true}) => {

    const navigate = useNavigate()

    const [isWishlisted, setIsWishlisted] = useState(isWishlist || false);
    const customer = JSON.parse(localStorage.getItem("userData") || "{}");

    const [quantity, setQuantity] = useState(itemQuantity || 1); 

    const handleIncrease = () => {
      setQuantity(prev => prev + 1);
    };

    const handleDecrease = () => {
      if (quantity > 1) {
        setQuantity(prev => prev - 1);
      }
    };

  
    const handleWishlistClick = async () => {
      if (!customer?.customerId) return;
    
      
      console.log("Clicked Wishlist for Variant ID:", variantId);
      try {
    
        const wishlistItems = await getWishlist(customer.customerId);
        const alreadyInWishlist = wishlistItems.some(item => item.variantId === variantId);
    
        if (alreadyInWishlist) {

          setIsWishlisted(false);  
          await removeFromWishlist(customer.customerId, variantId);
          alert("Item removed from Wishlist");
        } else {
         
          setIsWishlisted(true);  
          await addToWishlist(customer.customerId, variantId);
          alert("Item added to Wishlist");
        }
    
        onWishlistToggle(); 
      } catch (error) {
        console.error("Error updating wishlist:", error);
        setIsWishlisted(!isWishlisted); 
      }
    };
    


    const handleAddToCart = async () => {
    
      if (!customer?.customerId) {
        alert("Please log in to add items to your cart.");
        return;
      }
    
      try {
 
        const cart = await getCart(customer.customerId);
    
        const alreadyInCart = cart.cartItems.some(item => item.variantId === variantId);
     
        if (alreadyInCart) {
          alert("Item is already in your Cart!");
          return;
        }
    
        await addToCart(customer.customerId, variantId, quantity);
        alert("Item added to cart successfully!");
    
        const updatedCart = await getCart(customer.customerId);
        if (navigateCart){
          navigate("/shoppingCart")
        }

      } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Failed to add item to cart!");
      }
    };
    
    
  
   

  return (
    <div>
        <a className="relative block bg-white rounded-tr-3xl border border-gray-100 rounded" style={{width:'19rem'}}>
        <span
        className="absolute -left-px -top-px rounded-bl-3xl rounded-tr-3xl bg-yellow-300 px-6 py-2 font-medium uppercase tracking-widest text-black z-20"
    >
        Sale
    </span>

            <div className="relative">
        {/* Image */}
        <img
            src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-80 w-full rounded-tr-3xl object-cover"
            style={{ height: '10rem' }}
        />
        
        {/* Color Overlay */}
        <div
            className="absolute inset-0 "
            style={{
                backgroundColor: hexCode, // Use the hex code provided in `color` prop
                opacity: 0.4, // Adjust transparency level (0.4 = 40%)
            }}
        ></div>
    </div>

            {/* <img
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="h-80 w-full rounded-tr-3xl object-cover"
                style={{height:'10rem'}}
            /> */}

            <div className="p-3">
                <h5 className='font-medium'>{productName}-{size} ({color})</h5>

                <div className='d-flex align-items-center justify-content-between mt-3'>
                  <div className='border px-3 py-2 rounded col-4'>
                    <h5>100 Kg</h5>
                  </div>

                  <div className='col-4'>
                    <label htmlFor="Quantity" className="sr-only"> Quantity </label>

                    <div className="flex justify-between items-center rounded border border-gray-200 w-100">
                      <button 
                        type="button" 
                        onClick={handleDecrease}
                        className="leading-9 text-gray-600 transition hover:opacity-75 w-25"
                      >
                        &minus;
                      </button>

                      <input
                        type="number"
                        id="Quantity"
                        value={quantity}
                        readOnly
                        className="border-transparent text-center sm:text-sm w-25" 
                      />

                      <button 
                        type="button" 
                        onClick={handleIncrease}
                        className="leading-9 text-gray-600 transition hover:opacity-75 w-25"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>


                <div className='mt-2 d-flex justify-content-between rounded'>
                    <div className='d-flex gap-2 align-items-center'>
                    <h4 className='purple-text font-semibold text-2xl'>₹{price}</h4>
                    <p className='text-slate-400'><s>₹542.85</s></p>
                    </div>

                    <div className='bg-yellow-100 d-flex gap-2 align-items-center h-50 p-1 rounded-md'>
                        <span className='text-yellow-300'><TiStarFullOutline /></span>
                        <p>4.5</p>
                    </div>
                    
                </div>


                <div className='d-flex gap-2 mt-3 justify-between'>

                  {showCart && (
                     <button  onClick={handleAddToCart} className='d-flex align-items-center justify-content-center gap-2 bg-purple-100 p-1 purple-text font-medium rounded flex-1 text-md'>ADD TO CART 
                     <span><MdOutlineShoppingCart size={20}/></span>
                   </button>
                  )}
                   

                    <button className="bg-purple-100 p-2 purple-text rounded px-3" onClick={handleWishlistClick}>
                        <span>{isWishlisted ? <FaHeart color="red" /> : <FaRegHeart />}</span>
                    </button>

                    {/* <button className="bg-purple-100 purple-text rounded p-2 font-medium" onClick={()=>navigate("/checkOut")}>BUY NOW</button> */}

                </div>


            </div>

            
            </a>
    </div>
  )
}

export default ProductDetailBox