import React , {useState} from 'react'
import { TiStarFullOutline } from "react-icons/ti";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { addToWishlist , removeFromWishlist} from '../../Services/WishlistService';
import { addToCart, removeFromCart } from '../../Services/CartService';

const ProductDetailBox = ({productName,price,size,color,itemQuantity,variantId,isWishlist, onWishlistToggle,onCartToggle}) => {

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

        try {
            if (isWishlisted) {
                await removeFromWishlist(customer.customerId, variantId);
                alert("Item removed from Wishlist")
            } else {
                await addToWishlist(customer.customerId, variantId);
                alert("Item added to Wishlist")
            }
            onWishlistToggle(); // Refresh wishlist
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    };



    const handleAddToCart = async () => {
      if (!customer?.customerId) {
        alert("Please log in to add items to your cart.");
        return;
      }
    
      try {
        await addToCart(customer.customerId, variantId, quantity);
        alert("Item added to cart successfully!"); // Success message
      } catch (error) {
        alert("Failed to add item to cart!");
      }
    };


   

  return (
    <div>
        <a className="relative block bg-white rounded-tr-3xl border border-gray-100 rounded" style={{width:'20rem'}}>
            <span
                className="absolute -left-px -top-px rounded-bl-3xl rounded-tr-3xl bg-yellow-300 px-6 py-2 font-medium uppercase tracking-widest text-black"
            >
                Sale
            </span>

           

            <img
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="h-80 w-full rounded-tr-3xl object-cover"
                style={{height:'15rem'}}
            />

            <div className="p-4">
                <h5 className='font-medium'>{productName}-{size} ({color})</h5>

                <div className='d-flex align-items-center justify-content-between mt-3'>
                  <div className='border px-4 py-2 rounded col-5'>
                    <h5>100 Kg</h5>
                  </div>

                  <div className='col-5'>
                    <label htmlFor="Quantity" className="sr-only"> Quantity </label>

                    <div className="flex justify-between rounded border border-gray-200">
                      <button 
                        type="button" 
                        onClick={handleDecrease}
                        className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                      >
                        &minus;
                      </button>

                      <input
                        type="number"
                        id="Quantity"
                        value={quantity}
                        readOnly
                        className="h-10 w-16 border-transparent text-center sm:text-sm"
                      />

                      <button 
                        type="button" 
                        onClick={handleIncrease}
                        className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>


                <div className='mt-2 d-flex justify-content-between rounded'>
                    <div className='d-flex gap-2 align-items-center'>
                    <h4 className='purple-text font-semibold text-3xl'>₹{price}</h4>
                    <p className='text-slate-400'><s>₹542.85</s></p>
                    </div>

                    <div className='bg-yellow-100 d-flex gap-2 align-items-center h-50 p-1'>
                        <span className='text-yellow-300'><TiStarFullOutline /></span>
                        <p>4.5</p>
                    </div>
                    
                </div>


                <div className='d-flex gap-2 mt-3'>

                    <button  onClick={handleAddToCart} className='d-flex align-items-center justify-content-center gap-2 bg-purple-100 p-2 purple-text font-medium rounded flex-1'>ADD TO CART <span><MdOutlineShoppingCart size={20}/></span></button>

                    <button className="bg-purple-100 p-2 purple-text rounded px-4" onClick={handleWishlistClick}>
                        <span>{isWishlisted ? <FaHeart color="red" /> : <FaRegHeart />}</span>
                    </button>

                </div>


            </div>

            
            </a>
    </div>
  )
}

export default ProductDetailBox