
import React, { useState, useEffect, useRef } from 'react'
import FeturedBox from './FeturedBox'
import { fetchProducts } from '../../Services/ProductService';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


// Add this component inside your FeaturedList.js file, before the main FeaturedList component
const SliderCard = ({ title, children }) => {
  const sliderRef = useRef(null);
  

  const handlePrevious = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -500, 
        behavior: 'smooth',
      });
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 500, 
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center pe-4">
        <h2 className="text-2xl font-semibold md:text-3xl py-4 mb-3">{title}</h2>
        <div className="flex gap-2 hidden sm:flex">
          <button
            onClick={handlePrevious}
            className="rounded-full border-1 border-purple-800 p-2 transition sm:bg-purple-800 sm:text-white md:bg-transparent md:text-purple-800 md:p-4 md:hover:bg-purple-800 md:hover:text-white"          
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 rtl:rotate-180">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={handleNext} 
            className="rounded-full border-1 border-purple-800 p-2 transition sm:bg-purple-800 sm:text-white md:bg-transparent md:text-purple-800 md:p-4 md:hover:bg-purple-800 md:hover:text-white"       
          >
            <svg className="size-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>

      <ul
        ref={sliderRef}
        className="flex flex-nowrap gap-4 overflow-x-auto p-0 m-0 list-none scroll-smooth snap-x scrollbar-hide snap-mandatory"
      >
        {children}
      </ul>
    </>
  );
};

const FeturedList = () => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
      const { t } = useTranslation();


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


const handleNavigation = (selectedCategory) => {
  navigate(`/category?name=${encodeURIComponent(selectedCategory)}`);
};




  


 const aggregateProductData = (productData) => {
  return productData
    .filter(product => product.availableStatus === "ACTIVE") // ✅ Only ACTIVE products
    .map((product) => {
      const groupedVariants = product.variants
        .filter(variant => variant.availableStatus === "ACTIVE") // ✅ Only ACTIVE variants
        .reduce((acc, variant) => {
          const { size, color, availableWeight, id } = variant;

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
              available: availableWeight,
              price: variant.pricePerKg,
              id: id,
            });
          }

          // Accumulate availableWeight for this size
          acc[size].totalWeight += Number(availableWeight);

          return acc;
        }, {});

      return {
        productId: product.id,
        productName: product.productName,
        productDescription: product.productDescription,
        productImage: product.productImage,
        compareAtPrice: product.productPrice?.compareAtPrice,
        costPerItemPerKg: product.productPrice?.costPerItemPerKg,
        gstOnProduct: product.productPrice?.gstOnProduct,
        pricePerKg: product.productPrice?.pricePerKg,
        availableStatus: product.availableStatus,
        groupedVariants: Object.values(groupedVariants),
      };
    });
};



  return (
<div className='mt-2 bg-gradient-to-b from-white via-purple-100 to-white ps-6 md:px-14 pb-18 '>

      {/* <h3 className='text-2xl font-semibold md:text-5xl text-center text-gray-900 mb-12 '>Featured Categories</h3> */}

      {/* <ul className='overflow-auto m-0 d-flex gap-3 justify-content-around mt-5'>
            <li><FeturedBox productName={'Cotton Yran'} number={2}></FeturedBox></li>
            <li><FeturedBox productName={'Nylon Yran'} number={5}></FeturedBox></li>
            <li><FeturedBox productName={'Special Yran'} number={7}></FeturedBox></li>
            <li><FeturedBox productName={'Wool Yarn'} number={12}></FeturedBox></li>
            <li><FeturedBox productName={'Wool Yarn'} number={12}></FeturedBox></li>
            <li><FeturedBox productName={'Wool Yarn'} number={12}></FeturedBox></li>
        </ul> */}

     <SliderCard title={t('featuredCategories')}>
  {products.length > 0 ? (
    aggregateProductData(products).map((product, index) => {
      return (
              <li key={index} onClick={() => handleNavigation(product.productName)}>
                <FeturedBox productName={product.productName} color={product.groupedVariants.map((group) => group.variants.length).reduce(
                  (accumulator, currentValue) => accumulator + currentValue, 0,
                )} number={product.groupedVariants.length} 
                
                />
              </li>)
          })
        ) : (
          <p>No products available</p>
        )}
      </SliderCard>


    </div>
  )
}

export default FeturedList
