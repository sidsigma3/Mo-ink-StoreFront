import React from 'react';

    const backendUrl = process.env.REACT_APP_IMAGE_URL

// ✅ Build full image path
const getImageUrl = (path) => {
  if (!path) return '/placeholder.png';
  return path.startsWith('http')
    ? path
    : `${backendUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

const ColorSwatches = ({ item, onSelect, selected = false, disabled = false }) => {
  const handleClick = () => {
    if (!disabled && typeof onSelect === 'function') {
      onSelect(item);
    }
  };

  const fallbackImage =
    item.productImage?.find((img) =>
      img.toLowerCase().includes(item.variantType?.toLowerCase())
    ) || item.productImage?.[0] || '';

  const imageSrc = item.color?.colorImage
    ? getImageUrl(item.color.colorImage)
    : getImageUrl(fallbackImage);

  console.log({
    backendUrl,
    fallbackImage,
    colorImage: item.color?.colorImage,
    imageSrc,
  });

  return (
    <div
      onClick={handleClick}
      className={`border-4 rounded-md cursor-pointer transition-all duration-200 ${
        selected ? 'border-blue-500' : 'border-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className="relative h-24 overflow-hidden">
        <img
          src={imageSrc}
          alt={item.color?.colorName || 'Product'}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/placeholder.png';
          }}
        />
      </div>

      <div className="flex flex-col text-center items-center mx-1 my-2">
        <h5 className="text-black text-[0.6rem] font-medium">
          {item.color?.colorName}
        </h5>
        <h5 className="text-gray-600 text-[0.7rem]">
          {(item.color?.colorCode || item.color?.hexCode || '').toUpperCase()}
        </h5>
      </div>
    </div>
  );
};

export default ColorSwatches;
