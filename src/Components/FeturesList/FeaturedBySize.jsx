import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../Services/ProductService';

const backendUrl = process.env.REACT_APP_IMAGE_URL;

// Helper functions
const getImageUrl = (path) => {
  if (!path || typeof path !== 'string' || path.trim() === '' || path.includes('undefined')) {
    return '/placeholder.png';
  }
  return path.startsWith('http')
    ? path
    : `${backendUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

const CATEGORY_IMAGES = {
  'cotton': 'https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Group%2017078565.png?updatedAt=1751277730814',
  'bamboo': 'https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Group%201707478566.png?updatedAt=1751278205292',
  'micro modal': 'https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Group%201707478563.png?updatedAt=1751278205521',
  'excel': 'https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Group%201707478564.png?updatedAt=1751278205379',
  'viscose': 'https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Group%201707478570.png?updatedAt=1754984120078',
  'tencel': 'https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Group%201707478571.png?updatedAt=1754984120045',
  'ecovero': 'https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Group%201707478569.png?updatedAt=1754984120131',
  'livaeco': 'https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Group%201707478569.png?updatedAt=1754984120131',
  'flax varieties': 'https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Group%201707478568.png?updatedAt=1754984120259'

};

const getCategoryImage = (productName) => {
  const lowerName = productName.toLowerCase();
  for (const [key, value] of Object.entries(CATEGORY_IMAGES)) {
    if (lowerName.includes(key)) {
      return value;
    }
  }
  return '/placeholder.png';
};

// Card Component
const CardItem = ({ card, onClick }) => {
  const categoryImage = getCategoryImage(card.productName);
  
  return (
    <div 
      className="border-3 rounded-full !p-2 bg-white flex items-center gap-3 md:gap-4 hover:bg-purple-800 hover:border-purple-800 transition-colors duration-200 cursor-pointer  min-w-[196px] md:min-w-[300px]  flex-shrink-0"
      onClick={onClick}
    >
      <div className="w-12 h-12 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0">
        <img 
          src={categoryImage} 
          alt={card.productName}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 ">
        <div className="flex gap-2 items-center">
          <h2 className="text-md md:text-2xl font-bold mb-1 text-purple-800">{card.productName}</h2>
          
          {/* Color variants on the right side of product name */}
          {/* <div className="md:hidden flex items-center">
            {card.variants
              .map((variant) => {
                const rawImage =
                  variant.color?.colorImage ||
                  variant.productImage?.find((img) =>
                    img.toLowerCase().includes(variant.variantType?.toLowerCase())
                  ) ||
                  variant.productImage?.[0];

                const imageSrc = getImageUrl(rawImage);

                if (!rawImage || imageSrc.includes('placeholder')) return null;

                return { variant, imageSrc };
              })
              .filter(Boolean)
              .slice(0, 5) // Show fewer circles to fit better
              .map(({ variant, imageSrc }, index) => (
                <div
                  key={variant.id || index}
                  className="w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-white overflow-hidden -ml-1 md:-ml-2 first:ml-0"
                  style={{ zIndex: 10 - index }}
                >
                  <img
                    src={imageSrc}
                    alt={variant.color?.colorName || 'Color'}
                    className="w-full h-full object-cover transform scale-[12] translate-x-2"
                  />
                </div>
              ))}
          </div> */}
        </div>

        <p className="text-xs mb-2 text-gray-700">
          {/* <span className="hidden sm:inline">Size: </span> */}
          <strong>{card.size}</strong>
          <span> &nbsp; | &nbsp; </span>
          {/* <span className="hidden sm:inline">Type: </span> */}
          <strong className={card.variantType.toLowerCase() === 'cone' 
                              ? 'text-pink-500' 
                              : card.variantType.toLowerCase() === 'hank' 
                                ? 'text-amber-500' 
                                : ''
                            }>
                            {card.variantType}
                      </strong>
        </p>

        {/* Original variants container (shown on md screens and up) */}
        {/* <div className="hidden md:flex items-center mt-1 mb-2">
          {card.variants
            .map((variant) => {
              const rawImage =
                variant.color?.colorImage ||
                variant.productImage?.find((img) =>
                  img.toLowerCase().includes(variant.variantType?.toLowerCase())
                ) ||
                variant.productImage?.[0];

              const imageSrc = getImageUrl(rawImage);

              if (!rawImage || imageSrc.includes('placeholder')) return null;

              return { variant, imageSrc };
            })
            .filter(Boolean)
            .slice(0, 5)
            .map(({ variant, imageSrc }, index) => (
              <div
                key={variant.id || index}
                className="w-8 h-8 rounded-full border-2 border-white overflow-hidden -ml-2 first:ml-0"
                style={{ zIndex: 10 - index }}
              >
                <img
                  src={imageSrc}
                  alt={variant.color?.colorName || 'Color'}
                  className="w-full h-full object-cover transform scale-[12] translate-x-2"
                />
              </div>
            ))}
        </div> */}
      </div>
    </div>
  );
};

const FeaturedBySize = () => {
  const [variantCards, setVariantCards] = useState([]);
  const navigate = useNavigate();
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  // Single navigation for both sliders
  const handlePrevious = () => {
    [sliderRef1, sliderRef2].forEach(ref => {
      if (ref.current) {
        ref.current.scrollBy({
          left: -200,
          behavior: 'smooth',
        });
      }
    });
  };

  const handleNext = () => {
    [sliderRef1, sliderRef2].forEach(ref => {
      if (ref.current) {
        ref.current.scrollBy({
          left: 200,
          behavior: 'smooth',
        });
      }
    });
  };

  // Load products
  useEffect(() => {
    const loadVariants = async () => {
      const res = await fetchProducts();
      if (!res.success) return console.error(res.message);

      const products = res.data.filter(p => p.availableStatus === 'ACTIVE');
      const allVariantCards = [];

      products.forEach(product => {
        const grouped = {};

        product.variants.forEach(variant => {
          if (variant.availableStatus !== 'ACTIVE') return;

          const key = `${product.id}_${variant.size}_${variant.variantType}`;

          if (!grouped[key]) {
            grouped[key] = {
              productId: product.id,
              size: variant.size,
              variantType: variant.variantType,
              productName: product.productName,
              productImage: product.productImage,
              variants: [],
              price: variant.pricePerKg,
              markupPrice: variant.markupPricePerKg,
              product: product,
              variantDescription:variant.variantDescription,
            };
          }

          grouped[key].variants.push({
            ...variant,
            color: variant.color || { colorName: 'Unknown', hexCode: '#ccc' },
          });
        });

        Object.values(grouped).forEach(card => allVariantCards.push(card));
      });

      setVariantCards(allVariantCards);
    };

    loadVariants();
  }, []);

  const handleCardClick = (card) => {
    navigate("/productDetails", {
      state: { 
        product: card.product,
        size: card.size,
        variantType: card.variantType,
        color: card.variants[0]?.color,
        price: card.price,
        markupPrice: card.markupPrice,
        variantDescription:card.variantDescription,
      },
    });
  };

  // Split into two rows
  const halfLength = Math.ceil(variantCards.length / 2);
  const row1Cards = variantCards.slice(0, halfLength);
  const row2Cards = variantCards.slice(halfLength);

  return (
    <div className="mt-12 mb-20 space-y-2 ">
     <div className="flex justify-between items-center pe-4">
    <h2 className="text-2xl font-semibold md:text-3xl py-4">Shop by Size</h2>
      {/* Single Navigation for Both Rows */}
       <div className=" flex justify-end items-center gap-2">
          <button
            onClick={handlePrevious}
             className="rounded-full border-1 border-purple-800 p-2
                            transition 
                            sm:bg-purple-800 sm:text-white 
                            md:bg-transparent md:text-purple-800 md:p-4 
                            md:hover:bg-purple-800 md:hover:text-white"
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
                className="rounded-full border-1 border-purple-800 p-2
                            transition 
                            sm:bg-purple-800 sm:text-white 
                            md:bg-transparent md:text-purple-800 md:p-4 
                            md:hover:bg-purple-800 md:hover:text-white"
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

      {/* First Row */}
      <div
        ref={sliderRef1}
        className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 md:pb-6"
      >
        {row1Cards.map((card, i) => (
          <div key={`row1-${i}`} className="snap-start flex-shrink-0">
            <CardItem card={card} onClick={() => handleCardClick(card)} />
          </div>
        ))}
      </div>

      {/* Second Row */}
      <div
        ref={sliderRef2}
        className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
      >
        {row2Cards.map((card, i) => (
          <div key={`row2-${i}`} className="snap-start flex-shrink-0">
            <CardItem card={card} onClick={() => handleCardClick(card)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBySize;