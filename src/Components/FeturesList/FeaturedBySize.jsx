import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../Services/ProductService';

const backendUrl = process.env.REACT_APP_IMAGE_URL;

// Build full image path with fallback
const getImageUrl = (path) => {
  if (!path || typeof path !== 'string' || path.trim() === '' || path.includes('undefined')) {
    return '/placeholder.png';
  }
  return path.startsWith('http')
    ? path
    : `${backendUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

const FeaturedBySize = () => {
  const [variantCards, setVariantCards] = useState([]);

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
              size: variant.size,
              variantType: variant.variantType,
              productName: product.productName,
              productImage: product.productImage,
              variants: [],
              price: variant.pricePerKg,
              markupPrice: variant.markupPricePerKg,
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

  return (
    <div className="px-6 md:px-14 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {variantCards.map((card, i) => (
        <div key={i} className="border rounded-lg shadow-sm p-4 bg-white">
          {/* Product Name */}
          <h2 className="text-lg font-semibold mb-1 text-purple-800">{card.productName}</h2>

          {/* Variant Info */}
          <p className="text-sm mb-2 text-gray-700">
            <strong>Size:</strong> {card.size} &nbsp; | &nbsp;
            <strong>Type:</strong> {card.variantType}
          </p>

          {/* Price Info */}
          <p className="text-sm text-gray-800 mb-2">
            <strong>Price:</strong> ₹{Math.round(card.price)}/kg
            {card.markupPrice && (
              <span className="text-sm text-gray-500 ml-2 line-through">
                ₹{Math.round(card.markupPrice)}
              </span>
            )}
          </p>

          {/* Color Swatches */}
          <div className="flex items-center mt-3">
            {card.variants
              .map((variant) => {
                const rawImage =
                  variant.color?.colorImage ||
                  variant.productImage?.find((img) =>
                    img.toLowerCase().includes(variant.variantType?.toLowerCase())
                  ) ||
                  variant.productImage?.[0];

                const imageSrc = getImageUrl(rawImage);

                // Skip placeholder or missing images
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedBySize;
