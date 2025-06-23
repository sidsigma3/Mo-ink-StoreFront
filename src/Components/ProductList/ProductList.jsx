import React, { useState, useEffect, useRef } from 'react';
import ProductDetailBox from './ProductDetailBox';
import { fetchProducts } from '../../Services/ProductService';

const SlilderCard = ({ title, children }) => {
  const sliderRef = useRef(null); // ✅ added ref to UL

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
      <div className="flex justify-between items-end ">
        <h2 className="text-2xl font-semibold md:text-3xl py-4">Top Selling {title}</h2>
        <div className="mb-2 flex gap-2">
          <button
            onClick={handlePrevious}
            className="rounded-full border-1 border-violet-800 p-3 text-violet-800 transition hover:bg-violet-800  hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 rtl:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={handleNext} 
            className="rounded-full border-1 border-violet-800 p-3 text-violet-800 transition hover:bg-violet-800 hover:text-white"
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

      <ul
        ref={sliderRef}
        className="flex flex-nowrap gap-4 overflow-x-auto p-0 m-0 list-none scroll-smooth snap-x snap-mandatory"
      >
        {children}
      </ul>
    </>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
  const getProducts = async () => {
    const response = await fetchProducts();
    if (response.success) {
      const activeProducts = response.data.filter(
        (product) => product.availableStatus === "ACTIVE"
      );
      setProducts(activeProducts);
    } else {
      console.error(response.message);
    }
  };
  getProducts();
}, []);


  useEffect(() => {
    if (products.length > 0) {
      const aggregated = aggregateProductData(products);
      setFinalData(aggregated);
    }
  }, [products]);

  const aggregateProductData = (productData) => {
    return productData.map((product) => {
      const groupedVariants = product.variants.reduce((acc, variant) => {
        const { size, color, availableWeight, id, variantType, pricePerKg } = variant;
        const key = `${size}_${variantType}`;

        if (!acc[key]) {
          acc[key] = {
            id,
            size,
            variantType,
            variants: [],
            totalWeight: 0,
          };
        }

        acc[key].variants.push({
          colorName: color.colorName,
          hexCode: color.hexCode || '#ccc',
          available: Number(availableWeight),
          price: pricePerKg,
          id: id,
        });

        acc[key].totalWeight += Number(availableWeight);
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
        groupedVariants: Object.values(groupedVariants).sort(
          (a, b) => b.totalWeight - a.totalWeight
        ),
      };
    });
  };

console.log(products)

  return (
    <div className="space-y-12">
      {products.map((product) => (
        <div key={product.id} className="relative flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm">
          <SlilderCard title={product.productName}>
            {product.variants.map((variant) => (
              <li
                key={`${product.id}-${variant.id}`}
                className="snap-start bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col items-center flex-shrink-0"
                style={{ minWidth: '250px', padding: '1rem' }} 
              >
                <ProductDetailBox
                  productName={product.productName}
                  size={variant.size}
                  color={variant.color.colorName}
                  price={variant.pricePerKg}
                  variantId={variant.id}
                  markupPrice={variant.markupPricePerKg}
                  navigateCart={true}
                  hexCode={variant.color.colorCode || '#ccc'}
                  variantType={variant.variantType}
                  imageUrl={product.productImage}
                  colorImage={variant.color.colorImage}
                />
              </li>
            ))}
          </SlilderCard>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
