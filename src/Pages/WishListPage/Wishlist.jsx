import React, { useState, useEffect , useCallback } from "react";
import { getWishlist } from "../../Services/WishlistService";
import { fetchProducts } from "../../Services/ProductService";
import ProductDetailBox from "../../Components/ProductList/ProductDetailBox";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const customer = JSON.parse(localStorage.getItem("userData") || "{}");

  // Fetch wishlist data
  const fetchWishlistData = useCallback(async () => {
      if (!customer?.customerId) return;

      setLoading(true);
      try {
          const wishlistResponse = await getWishlist(customer.customerId);
          const wishlistVariantIds = wishlistResponse?.variantIds || [];
          const wishlistId = wishlistResponse.wishlistId

          // Store variant IDs in state for quick lookup
          setWishlistIds(wishlistVariantIds);
          console.log(wishlistVariantIds)

          let allProducts = JSON.parse(localStorage.getItem("allProducts"));
          if (!allProducts) {
              const productResponse = await fetchProducts();
              allProducts = productResponse?.data || [];
              localStorage.setItem("allProducts", JSON.stringify(allProducts));
          }

          

          // Filter products that match the wishlist variants
          const wishlistProducts = allProducts.flatMap((product) =>
              product.variants
                  .filter((variant) => wishlistVariantIds.includes(variant.id))
                  .map((variant) => ({
                      productName: product.productName,
                      size: variant.size,
                      colorName: variant.color.colorName,
                      price: variant.pricePerKg,
                      markupPrice: variant.markrupPrice,
                      variantId: variant.id,
                      hexCode:variant.color.hexCode,
                      productImage: product.productImage[0],
                      variantType:variant.variantType,
                      wishlistId,
                  }))
          );

          setWishlistItems(wishlistProducts);
      } catch (error) {
          console.error("Error fetching wishlist:", error);
      } finally {
          setLoading(false);
      }
  }, [customer.customerId]);

  useEffect(() => {
      fetchWishlistData();
  }, [fetchWishlistData]);

  useEffect(() => {
    fetchWishlistData();
}, []);

console.log(wishlistIds)
console.log(wishlistItems)

  return (
    <div className="">
      {loading ? (
        <p>Loading wishlist...</p>
      ) : wishlistItems.length > 0 ? (
        <ul className="mt-4 overflow-auto d-flex gap-3">
          {wishlistItems.map((item) => (
            <li key={item.variantId}>
              <ProductDetailBox
                productName={item.productName}
                size={item.size}
                color={item.colorName}
                price={item.price}
                markupPrice={item.markrupPrice}
                variantId={item.variantId}
                isWishlist={wishlistIds.includes(item.variantId)}
                onWishlistToggle={fetchWishlistData}
                hexCode={item.hexCode}
                imageUrl={item.productImage}
                variantType={item.variantType}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No wishlist items found.</p>
      )}
    </div>
  );
};

export default Wishlist;
