import React, { useState, useEffect, useRef } from 'react';
import ProductDetailBox from './ProductDetailBox';
import { fetchProducts } from '../../Services/ProductService';
import KeenSlider from 'keen-slider';
import 'keen-slider/keen-slider.min.css';

const SlilderCard = ({ title, children }) => {
  const sliderRef = useRef(null);
  const instance = useRef(null);

  useEffect(() => {
    if (sliderRef.current && children?.length > 0) {
      // Destroy existing instance before creating a new one (important if children change)
      if (instance.current) {
        instance.current.destroy();
      }

      instance.current = new KeenSlider(sliderRef.current, {
        loop: false,
        slides: {
          origin: "center",
          perView: 4,
          spacing: 8,
        },
        breakpoints: {
          "(min-width: 1024px)": {
            slides: {
              origin: "auto",
              perView: 4,
              spacing: 16,
            },
          },
        },
      });
    }

    return () => instance.current?.destroy(); // clean up on unmount
  }, [children]);

  const handlePrevious = () => instance.current?.prev();
  const handleNext = () => instance.current?.next();

  return (
    <>
      <div className="flex justify-between items-end mr-2">
        <h2 className="text-xl text-black p-4">Top Selling {title}</h2>
        <div className="mb-2 flex gap-4">
          <button
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
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

      <ul ref={sliderRef} className="keen-slider mt-2">
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
        setProducts(response.data);
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
  
  console.log(finalData)

  return (
<div className="space-y-12">
  {products.map((product) => (
    <div key={product.id} className="relative flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm">
      <SlilderCard title={product.productName}>
        <ul className="flex flex-nowrap gap-4 overflow-x-auto p-0 m-0 list-none">
          {product.variants.map((variant) => (
            <li
              key={`${product.id}-${variant.id}`}
              className="bg-white rounded-xl shadow p-4 flex-shrink-0"
              style={{ minWidth: '250px' }}
            >
              <ProductDetailBox
                productName={product.productName}
                size={variant.size}
                color={variant.color.colorName}
                price={variant.pricePerKg}
                variantId={variant.id}
                navigateCart={true}
                hexCode={variant.color.hexCode || '#ccc'}
                variantType={variant.variantType}
                imageUrl={product.productImage}
              />
            </li>
          ))}
        </ul>
      </SlilderCard>
    </div>
  ))}
</div>


  );
};

export default ProductList;
