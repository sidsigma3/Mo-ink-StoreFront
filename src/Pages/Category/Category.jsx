import React, { useEffect, useState, useMemo } from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Cta from '../../Components/CTA/Cta'
import HeroSection from '../../Components/HeroSection/HeroSection'
import { TiStarFullOutline } from "react-icons/ti";
import CategoryBox from '../../Components/CategoryBox/CategoryBox'
import { fetchProducts } from '../../Services/ProductService'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { IoFilterSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { useSearchParams } from "react-router-dom";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedVariantType, setSelectedVariantType] = useState('CONE');
  const [selectedCounters, setSelectedCounters] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get category from URL or location state (when coming back from ProductDetails)
  const categoryFromUrl = searchParams.get("name");
  const stateFromNavigation = location.state;

  console.log("Selected Category from URL:", categoryFromUrl);
  console.log("State from navigation:", stateFromNavigation);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts();
      if (response.success) {
        const fetchedProducts = response.data;

        // Filter only ACTIVE products
        const activeProducts = fetchedProducts.filter(
          (product) => product.availableStatus === "ACTIVE"
        );

        setProducts(activeProducts);

        // Priority order for setting selected category:
        // 1. From navigation state (when coming back from ProductDetails)
        // 2. From URL parameter
        // 3. Default to first product
        let categoryToSet = null;

        if (stateFromNavigation?.categoryName) {
          // Coming back from ProductDetails - restore the previous category
          categoryToSet = stateFromNavigation.categoryName;
          
          // Also restore other filter states if provided
          if (stateFromNavigation.selectedVariantType) {
            setSelectedVariantType(stateFromNavigation.selectedVariantType);
          }
          if (stateFromNavigation.selectedCounters) {
            setSelectedCounters(stateFromNavigation.selectedCounters);
          }
          
          // Update URL to match the restored state
          setSearchParams({ name: encodeURIComponent(categoryToSet) });
        } else if (categoryFromUrl) {
          // From URL parameter
          const categoryFromUrlDecoded = decodeURIComponent(categoryFromUrl);
          const matchingProduct = activeProducts.find(
            (product) => product.productName === categoryFromUrlDecoded
          );
          
          if (matchingProduct) {
            categoryToSet = matchingProduct.productName;
          }
        }
        
        // Default to first product if no specific category found
        if (!categoryToSet && activeProducts.length > 0) {
          categoryToSet = activeProducts[0].productName;
          // Update URL to reflect the default selection
          setSearchParams({ name: encodeURIComponent(categoryToSet) });
        }

        if (categoryToSet) {
          setSelectedCategory(categoryToSet);
        }
      } else {
        console.error(response.message);
      }
    };

    getProducts();
  }, [categoryFromUrl, stateFromNavigation, setSearchParams]);

  // Update URL when category changes (but not when it's from navigation state)
  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setSearchParams({ name: encodeURIComponent(categoryName) });
  };

  const variantType = [
    { name: "CONE" },
    { name: "HANK" },
  ];

  const handleCounterSelection = (counterName) => {
    const isSelected = selectedCounters.includes(counterName);
    const updatedSelection = isSelected
      ? selectedCounters.filter(c => c !== counterName)
      : [...selectedCounters, counterName];
    setSelectedCounters(updatedSelection);
  };

  // Optional: Replace with actual counts if needed
  const counters = [
    { name: "2/80", count: 2 },
    { name: "2/60", count: 1 },
    { name: "1/90", count: 3 },
    { name: "2/100", count: 2 },
    { name: "1/40", count: 4 },
  ];

  const aggregateProductData = (productData) => {
    return productData
      .filter((product) => product.availableStatus === "ACTIVE") // Only include ACTIVE products
      .map((product) => {
        const groupedVariants = product.variants.reduce((acc, variant) => {
          const { size, color, availableWeight, id, availableStatus, pricePerKg } = variant;

          // Only include ACTIVE variants
          if (availableStatus !== "ACTIVE") return acc;

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
              price: pricePerKg,
              id,
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
      })
      .filter((product) => product.groupedVariants.length > 0); // Keep only products with at least 1 ACTIVE variant
  };

  const finalData = aggregateProductData(products);

  const derivedCounters = useMemo(() => {
    const selectedProduct = products.find(
      (p) => p.productName === selectedCategory
    );
    if (!selectedProduct) return [];

    const sizeSet = new Set();
    selectedProduct.variants.forEach((v) => sizeSet.add(v.size));

    return [...sizeSet].map((s) => ({ name: s }));
  }, [selectedCategory, products]);

  // Filtered and grouped variants
  const filteredVariants = useMemo(() => {
    const selectedProduct = products.find(
      (p) => p.productName === selectedCategory
    );
    if (!selectedProduct) return [];

    const matchingVariants = selectedProduct.variants.filter((variant) => {
      const sizeMatch = true; // add real filter if needed
      const typeMatch =
        !selectedVariantType || variant.variantType === selectedVariantType;
      const isActive = variant.availableStatus === "ACTIVE";
      return sizeMatch && typeMatch && isActive;
    });

    // Group by size + variantType
    const grouped = {};
    matchingVariants.forEach((variant) => {
      const key = `${variant.size}_${variant.variantType}`;
      if (!grouped[key]) {
        grouped[key] = {
          size: variant.size,
          variantType: variant.variantType,
          variants: [],
          price: variant.pricePerKg,
          markupPrice: variant.markupPricePerKg,
          variantDescription: variant.variantDescription,
        };
      }
      grouped[key].variants.push(variant);
    });

    return Object.values(grouped).map((group, i) => ({
      key: i,
      ...group,
      product: selectedProduct,
    }));
  }, [selectedCategory, selectedCounters, selectedVariantType, products]);

  const breadcrumbs = [
    { label: "Home", link: "/home" },
    { label: "Category", link: "/category" },
    { label: selectedCategory }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>
      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10'>  <HeroSection productName={selectedCategory} breadcrumbs={breadcrumbs}></HeroSection></div>

      <div className='px-6 md:px-14 py-3 flex justify-between lg:justify-end'>
        <div className='flex gap-2 border rounded-md p-2 items-center cursor-pointer block lg:hidden' onClick={() => setIsOpen(true)}>
          <span className='text-purple-800'><IoFilterSharp /></span>
          <h4>Filters</h4>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <div
        className={`fixed inset-0 z-50 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="bg-white w-80 shadow-lg md:w-2/5 h-full shadow-lg transform transition-transform"
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex justify-between bg-black text-white p-3 sticky top-0 z-10'>
            <h4 className='text-xl font-bold'>Filters</h4>
            <IoClose size={24} className="cursor-pointer mb-4" onClick={() => setIsOpen(false)} />
          </div>
          <div className='col-span-1 overflow-y-auto h-[calc(100vh-56px)] p-3 '>
            <div className='border rounded p-3'>
              <h4 className='text-xl font-semibold'>Category</h4>
              <ul>
                {products.length > 0 ? (
                  finalData.map((product, index) => (
                    <li
                      key={index}
                      className={`p-2 border border-1 rounded mt-2 cursor-pointer ${selectedCategory === product.productName ? "bg-purple-200" : ""
                        }`}
                      onClick={() => handleCategoryChange(product.productName)}
                    >
                      <div className="flex justify-between font-medium">
                        <h5 className="text-base">{product.productName}</h5>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>No products available</p>
                )}
              </ul>
            </div>

            <div className='w-full max-w-xs'>
              {/* Type Filter - Mobile */}
              {selectedCategory && (
                <div className="border rounded mt-3 p-3">
                  <h4 className="text-xl font-semibold mb-3">Type</h4>
                  <ul className="space-y-2">
                    {variantType.map((variant, index) => {
                      const isSelected = selectedVariantType === variant.name;
                      return (
                        <li
                          key={index}
                          className={`p-2 border border-1 rounded cursor-pointer ${isSelected ? "bg-purple-200" : "bg-white"} flex justify-between items-center`}
                          onClick={() =>
                            setSelectedVariantType(isSelected ? "" : variant.name)
                          }
                        >
                          <h5 className="text-base font-medium">{variant.name}</h5>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 px-6 md:px-14 py-3 gap-5 mt-2 md:mt-10'>
        {/* Desktop Sidebar */}
        <div className='hidden lg:block col-span-2 lg:col-span-1'>
          <div className='border rounded p-3 max-w-xs'>
            <h4 className='text-xl font-semibold'>Category</h4>
            <ul>
              {products.length > 0 ? (
                finalData.map((product, index) => (
                  <li
                    key={index}
                    className={`p-2 border border-1 rounded mt-2 cursor-pointer ${selectedCategory === product.productName ? "bg-purple-200" : ""
                      }`}
                    onClick={() => handleCategoryChange(product.productName)}
                  >
                    <div className="flex justify-between font-medium">
                      <h5 className="text-base">{product.productName}</h5>
                    </div>
                  </li>
                ))
              ) : (
                <p>No products available</p>
              )}
            </ul>
          </div>

          <div className='w-full max-w-xs'>
            {/* Type Filter - Desktop */}
            {selectedCategory && (
              <div className="border rounded mt-3 p-3">
                <h4 className="text-xl font-semibold mb-3">Type</h4>
                <ul className="space-y-2">
                  {variantType.map((variant, index) => {
                    const isSelected = selectedVariantType === variant.name;
                    return (
                      <li
                        key={index}
                        className={`p-2 border border-1 rounded cursor-pointer ${isSelected ? "bg-purple-200" : "bg-white"} flex justify-between items-center`}
                        onClick={() =>
                          setSelectedVariantType(isSelected ? "" : variant.name)
                        }
                      >
                        <h5 className="text-base font-medium">{variant.name}</h5>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className='col-span-3 h-1/4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredVariants.map(combo => (
            <CategoryBox
              key={combo.key}
              size={combo.size}
              variantType={combo.variantType}
              color={combo.variants}
              price={combo.price}
              product={combo.product}
              markupPrice={combo.markupPrice}
              variantDescription={combo.variantDescription}
              categoryName={selectedCategory}
              // Pass current filter state to CategoryBox
              currentFilters={{
                selectedVariantType,
                selectedCounters,
              }}
            />
          ))}
        </div>
      </div>

      <div className='px-6 md:px-14 py-3 mt-10'> <Cta></Cta></div>
      <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>

      <BottomNav></BottomNav>
    </div>
  )
}

export default Category