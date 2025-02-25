import { useState, useEffect, useCallback } from "react";
import { getCart } from "../../Services/CartService";
import ProductDetailBox from "../../Components/ProductList/ProductDetailBox";
import { fetchProducts } from "../../Services/ProductService";
import { RxCross2 } from "react-icons/rx";
import { removeFromCart } from "../../Services/CartService";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const customer = JSON.parse(localStorage.getItem("userData") || "{}");

  // Function to fetch cart data
  const fetchCartData = useCallback(async () => {
    if (!customer?.customerId) return;

    setLoading(true);
    try {
      // Fetch cart items from API
      const cartResponse = await getCart(customer.customerId);
      const cartData = cartResponse?.data?.cartItems || [];

      // Fetch all products from local storage or API
      let allProducts = JSON.parse(localStorage.getItem("allProducts"));

      if (!allProducts) {
        const productResponse = await fetchProducts();
        allProducts = productResponse?.data || [];
        localStorage.setItem("allProducts", JSON.stringify(allProducts)); // Cache products
      }

      // Map the cart items with product details
      const cartProducts = cartData.map((item) => {
        const product = allProducts.find((p) =>
          p.variants.some((v) => v.id === item.variantId)
        );
        const variant = product?.variants.find((v) => v.id === item.variantId);

        return {
          productName: product?.productName || "Unknown Product",
          size: variant?.size || "Unknown",
          colorName: variant?.color?.colorName || "Unknown",
          price: variant?.pricePerKg || 0,
          variantId: variant?.id || 0,
          quantity: item.quantity,
          productImage: product?.productImage?.[0] || "/images/default.png", // Default image
        };
      });

      setCartItems(cartProducts);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  }, [customer.customerId]);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  const handleRemoveFromCart = async (variantId) =>{
    if (!customer?.customerId) {
      alert("Please log in to add items to your cart.");
      return;
    }
  
    try {
      await removeFromCart(customer.customerId, variantId);
      fetchCartData();
      alert("Item removed from cart successfully!"); // Success message
    } catch (error) {
      alert("Failed to remove item from cart!");
    }
  }


  return (
    <div>
      {loading ? (
        <p>Loading cart...</p>
      ) : cartItems.length > 0 ? (
        <ul className="mt-4 overflow-auto d-flex gap-3">
          {cartItems.map((item) => (
            <li key={item.variantId} >
              <div className="position-relative pt-3">
              <button onClick={()=>handleRemoveFromCart(item.variantId)} className="rounded-full border-2 position-absolute top-2 -right-2 z-20 border-violet-800 text-violet-800 font-bold">
                <RxCross2 size={20}/>
              </button>
              <ProductDetailBox
                productName={item.productName}
                size={item.size}
                color={item.colorName}
                price={item.price}
                variantId={item.variantId}
                itemQuantity={item.quantity} 
                onCartToggle={fetchCartData}
              />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cart items found.</p>
      )}
    </div>
  );
};

export default Cart;
