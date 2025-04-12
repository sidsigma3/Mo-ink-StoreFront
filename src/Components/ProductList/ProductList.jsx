import React ,{useState,useEffect,useRef} from 'react'
import ProductDetailBox from './ProductDetailBox'
import { fetchProducts } from '../../Services/ProductService';
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";


const ProductList = () => {
  const sliderRef = useRef(null);
     const keenSliderInstance = useRef(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
      if (sliderRef.current) {
        keenSliderInstance.current = new KeenSlider(sliderRef.current, {
          loop: true,
          slides: {
            origin: "center",
            perView: 1.25,
            spacing: 16,
          },
          breakpoints: {
            "(min-width: 1024px)": {
              slides: {
                origin: "auto",
                perView: 2.5,
                spacing: 32,
              },
            },
          },
        });
  
        
        const interval = setInterval(() => {
          keenSliderInstance.current.next();
        }, 1500);
  
       
        return () => {
          if (keenSliderInstance.current) {
            keenSliderInstance.current.destroy();
          }
          clearInterval(interval);
        };
      }
    }, []);

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
    
            if (!acc[size].variants.some((v) => v.colorName === color.colorName)) {
              acc[size].variants.push({
                colorName: color.colorName,
                hexCode: color.hexCode || "#ccc",
                available:variant.availableWeight,
                price:variant.pricePerKg,
                id:variant.id,
              });
            }
            
            acc[size].totalWeight += Number(availableWeight);
      
            return acc;
          }, {});
      
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

    
    useEffect(() => {
      const checkScroll = () => {
          if (scrollRef.current) {
              setCanScrollLeft(scrollRef.current.scrollLeft > 0);
              setCanScrollRight(
                  scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth
              );
          }
      };
  
      checkScroll(); 
      window.addEventListener("resize", checkScroll);
      scrollRef.current?.addEventListener("scroll", checkScroll);
  
      return () => {
          window.removeEventListener("resize", checkScroll);
          scrollRef.current?.removeEventListener("scroll", checkScroll);
      };
  

  const scroll = (direction) => {
      if (scrollRef.current) {
          const scrollAmount = 300; 
          scrollRef.current.scrollBy({
              left: direction === "left" ? -scrollAmount : scrollAmount,
              behavior: "smooth",
          });
      }
  };

  }, [products]); 
  const handlePrevious = () => keenSliderInstance.current?.prev();
  const handleNext = () => keenSliderInstance.current?.next();
  
  return (
    
    <div className="relative flex flex-col">
     <div className='flex justify-end items-end'>
      <div className="mt-8 flex gap-4 lg:mt-0">
            <button
              aria-label="Previous slide"
              onClick={handlePrevious}
              className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 rtl:rotate-180"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              aria-label="Next slide"
              onClick={handleNext}
              className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
            >
              <svg
                className="size-5 rtl:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
      </div>
      </div>
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
    </div>
  )
}

export default ProductList