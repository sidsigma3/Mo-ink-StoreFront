
import { createContext, useContext, useState , useEffect} from "react";
import { getWishlist } from "../Services/WishlistService";
import { getCart } from "../Services/CartService";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(null);

  const updateCartAndWishlistCounts = async () => {
    const customerId = JSON.parse(localStorage.getItem("userData"))?.customerId;
    if (!customerId) return;
  
    try {
      const [wishlistResponse, cartResponse] = await Promise.all([
        getWishlist(customerId),
        getCart(customerId),
      ]);
  
      const wishlistItems = wishlistResponse?.variantIds || [];
      const cartItems = cartResponse?.cartItems || [];
  
      // Update localStorage
      localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
  
      // Update state counts
      setWishlistCount(wishlistItems.length);
      setCartCount(cartItems.length);
    } catch (error) {
      console.error("Failed to fetch cart or wishlist", error);
    }
  };

      useEffect(() => {
        updateCartAndWishlistCounts();
      }, []);


  return (
    <AppContext.Provider value={{ cartCount, setCartCount , wishlistCount, setWishlistCount , updateCartAndWishlistCounts}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);



