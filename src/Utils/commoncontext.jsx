
import { createContext, useContext, useState } from "react";
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
          const wishlistItems = await getWishlist(customerId);
          setWishlistCount(wishlistItems?.variantIds?.length || 0);
          const cartItems = await getCart(customerId);
          setCartCount(cartItems?.cartItems?.length || 0);
        } catch (error) {
          console.error("Failed to fetch counts", error);
        }
      };

  return (
    <AppContext.Provider value={{ cartCount, setCartCount , wishlistCount, setWishlistCount , updateCartAndWishlistCounts}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);



