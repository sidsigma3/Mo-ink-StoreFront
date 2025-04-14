import React, { useState, useEffect, useRef } from 'react';
import ProductDetailBox from './ProductDetailBox';
import { fetchProducts } from '../../Services/ProductService';
import KeenSlider from 'keen-slider';
import 'keen-slider/keen-slider.min.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const sliderRefs = useRef([]);

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

  useEffect(() => {
    if (finalData.length > 0) {
      finalData.forEach((_, index) => {
        if (sliderRefs.current[index]) {
          const instance = new KeenSlider(sliderRefs.current[index], {
            loop: true,
            slides: {
              origin: 'center',
              perView: 4,
              spacing: 8,
            },
            breakpoints: {
              '(min-width: 1024px)': {
                slides: {
                  origin: 'auto',
                  perView: 4,
                  spacing: 16,
                },
              },
            },
          });

          const interval = setInterval(() => {
            instance?.next();
          }, 6000);

          return () => {
            instance.destroy();
            clearInterval(interval);
          };
        }
      });
    }
  }, [finalData]);

  const aggregateProductData = (productData) => {
    return productData.map((product) => {
      const groupedVariants = product.variants.reduce((acc, variant) => {
        const { size, color, availableWeight, id } = variant;

        if (!acc[size]) {
          acc[size] = {
            id,
            size,
            variants: [],
            totalWeight: 0,
          };
        }

        acc[size].variants.push({
          colorName: color.colorName,
          hexCode: color.hexCode || '#ccc',
          available: variant.availableWeight,
          price: variant.pricePerKg,
          id: variant.id,
        });

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
        groupedVariants: Object.values(groupedVariants).sort(
          (a, b) => b.totalWeight - a.totalWeight
        ),
      };
    });
  };

  return (
    <div className="space-y-12">
      {finalData.map((product, idx) => (
        <div key={product.productId} className="relative flex flex-col bg-gray-200 p-2 rounded-md">
          <h2 className="text-xl font-bold text-black">
            Top Selling {product.productName}
          </h2>

          <div className="flex justify-end items-end">
            <div className="mb-2 flex gap-4">
              <button
                onClick={() => sliderRefs.current[idx]?.keenSlider?.prev()}
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
                onClick={() => sliderRefs.current[idx]?.keenSlider?.next()}
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

          <ul
            ref={(ref) => (sliderRefs.current[idx] = ref)}
            className="keen-slider mt-2"
          >
            {product.groupedVariants.map((size, ix) =>
              size.variants.map((color, i) => (
                <li key={`${idx}-${ix}-${i}`} className="keen-slider__slide">
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
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
