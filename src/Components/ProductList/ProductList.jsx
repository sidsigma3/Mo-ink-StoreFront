import React ,{useState,useEffect,useRef} from 'react'
import ProductDetailBox from './ProductDetailBox'
import { fetchProducts } from '../../Services/ProductService';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductList = () => {
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const getProducts = async () => {
        const response = await fetchProducts();
        if (response.success) {
          setProducts(response.data);
        } else {
          console.error(response.message);
        }
      };
  
      getProducts();
    }, []);


    const aggregateProductData = (productData) => {
        return productData.map((product) => {
          const groupedVariants = product.variants.reduce((acc, variant) => {
            const { size, color, availableWeight ,id } = variant;
      
            if (!acc[size]) {
              acc[size] = {
                id,
                size,
                variants: [],
                totalWeight: 0,
              };
            }
    
            
      
            // Add unique colors for this size
            if (!acc[size].variants.some((v) => v.colorName === color.colorName)) {
              acc[size].variants.push({
                colorName: color.colorName,
                hexCode: color.hexCode || "#ccc",
                available:variant.availableWeight,
                price:variant.pricePerKg,
                id:variant.id,
              });
            }
            
            // Accumulate availableWeight for this size
            acc[size].totalWeight += Number(availableWeight);
      
            return acc;
          }, {});
      
          // Return the aggregated product with grouped variants
          return {
            productId: product.id,
            productName: product.productName,
            productDescription: product.productDescription,
            productImage: product.productImage,
            compareAtPrice:product.productPrice?.compareAtPrice,
            costPerItemPerKg:product.productPrice?.costPerItemPerKg,
            gstOnProduct:product.productPrice?.gstOnProduct,
            pricePerKg:product.productPrice?.pricePerKg,
            availableStatus:product.availableStatus,
            groupedVariants: Object.values(groupedVariants),
          };
        });
      };
    
    
    const finalData = aggregateProductData(products)

    
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Check if scrolling is possible
    useEffect(() => {
      const checkScroll = () => {
          if (scrollRef.current) {
              setCanScrollLeft(scrollRef.current.scrollLeft > 0);
              setCanScrollRight(
                  scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth
              );
          }
      };
  
      checkScroll(); // ✅ Ensure state is updated on mount
      window.addEventListener("resize", checkScroll);
      scrollRef.current?.addEventListener("scroll", checkScroll);
  
      return () => {
          window.removeEventListener("resize", checkScroll);
          scrollRef.current?.removeEventListener("scroll", checkScroll);
      };
  }, [products]); // ✅ Run again if products change
  

  // Scroll left & right
  const scroll = (direction) => {
      if (scrollRef.current) {
          const scrollAmount = 300; // Adjust for smooth scrolling
          scrollRef.current.scrollBy({
              left: direction === "left" ? -scrollAmount : scrollAmount,
              behavior: "smooth",
          });
      }
  };


  return (
    <div className="relative flex items-center">
 
       {canScrollLeft && (
                <button
                    className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 transition-all z-20"
                    onClick={() => scroll("left")}
                >
                    <FaChevronLeft size={20} />
                </button>
            )}

        <ul ref={scrollRef} className="mt-4 flex overflow-x-auto gap-3 scrollbar-hide">
           
                {products.length > 0 ? (
                finalData.map((product, index) =>
                    product.groupedVariants.map((size, ix) =>
                    size.variants.map((color, i) => (
                        <li key={`${index}-${ix}-${i}`}>
                        <ProductDetailBox
                            productName={product.productName}
                            size={size.size}
                            color={color.colorName}
                            price={color.price}
                            variantId={color.id}
                            navigateCart={true}
                            hexCode={color.hexCode}
                        />
                        </li>
                    ))
                    )
                )
                ) : (
                <p>No products available</p>
                )}

        </ul>

        {canScrollRight && (
                <button
                    className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 transition-all"
                    onClick={() => scroll("right")}
                >
                    <FaChevronRight size={20} />
                </button>
            )}

    </div>
  )
}

export default ProductList