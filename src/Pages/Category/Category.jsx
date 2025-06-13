import React, { useEffect, useState , useMemo } from 'react'
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
import { useNavigate } from 'react-router-dom'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { useSearchParams } from "react-router-dom";



const Category = () => {

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("name");
  console.log("Selected Category from URL:", categoryFromUrl);

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

      // Check if a category is provided via URL
      const categoryFromUrlDecoded = decodeURIComponent(categoryFromUrl || "");

      // If a matching category exists in the fetched products, set it
      const matchingProduct = activeProducts.find(
        (product) => product.productName === categoryFromUrlDecoded
      );

      if (matchingProduct) {
        setSelectedCategory(matchingProduct.productName);
      } else if (activeProducts.length > 0) {
        // Default to the first product
        setSelectedCategory(activeProducts[0].productName);
      }
    } else {
      console.error(response.message);
    }
  };

  getProducts();
}, [categoryFromUrl]);

  

  // const [selectedTypes, setSelectedTypes] = useState([]);
  // const [selectedType, setSelectedType] = useState(null);


  const variantType = [
    { name: "CONE" },
    { name: "HANK" },
  ];
  ;

const [selectedVariantType, setSelectedVariantType] = useState('CONE');


const [selectedCounter, setSelectedCounter] = useState(null);
const [selectedCounters, setSelectedCounters] = useState([]);

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





  const finalData = aggregateProductData(products)



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
  const sizeMatch = true;
  const typeMatch =
    !selectedVariantType || variant.variantType === selectedVariantType;
  return sizeMatch && typeMatch;
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
          markupPrice:variant.markupPricePerKg,
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
          <span className='text-violet-800'><IoFilterSharp /></span>
          <h4>Filters</h4>
        </div>

       
      </div>


      <div
        className={`fixed inset-0  z-50 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        onClick={() => setIsOpen(false)}
      >

        <div
          className="bg-white w-80 shadow-lg  md:w-2/5 h-full shadow-lg transform transition-transform"
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
                    className={`p-2 border border-1 rounded mt-2 cursor-pointer ${selectedCategory === product.productName ? "bg-violet-200" : ""
                      }`}
                    onClick={() => setSelectedCategory(product.productName)}
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

            {/* Counter Filter Section - Multi-selection */}
            {/* {selectedCategory && (
          <div className="border rounded p-3 my-3">
            <h4 className="text-xl font-semibold mb-3">Count</h4>
            <ul className="space-y-2">
              {derivedCounters.map((counter, index) => {
                const isSelected = selectedCounters.includes(counter.name);
                return (
                  <li
                    key={index}
                    className={`p-2 border border-1 rounded cursor-pointer ${isSelected ? "bg-violet-200" : "bg-white"} flex justify-between items-center`}
                   onClick={() => {
              const updatedSelection = isSelected
                ? []
                : [counter.name]; 
              setSelectedCounters(updatedSelection);
            }}
          >
                    <h5 className="text-base font-medium">{counter.name}</h5>
                  </li>
                );
              })}
            </ul>
          </div>
        )} */}



              {/* Type Filter - Multi-selection */}
              {selectedCategory && (
          <div className="border rounded mt-3 p-3">
            <h4 className="text-xl font-semibold mb-3">Type</h4>
            <ul className="space-y-2">
              {variantType.map((variant, index) => {
                const isSelected = selectedVariantType === variant.name;
                return (
                  <li
                    key={index}
                    className={`p-2 border border-1 rounded cursor-pointer ${isSelected ? "bg-violet-200" : "bg-white"} flex justify-between items-center`}
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




{/* Color Filter Section */}
{/* <div className='border rounded p-3'>
  <h4 className='text-xl font-semibold mb-3'>Color</h4>
  <ul className='space-y-2'>
    {[
      { color: "Black", code: "#000" },
      { color: "Blue", code: "#007bff" },
      { color: "White", code: "#f8f8f8", border: true },
      { color: "Grey", code: "#999" },
      { color: "Green", code: "#28a745" },
      { color: "Navy Blue", code: "#001f3f" },
      { color: "Brown", code: "#8B4513" },
      { color: "Beige", code: "#f5f5dc", border: true },
      { color: "Pink", code: "#ff69b4" },
      { color: "Red", code: "#dc3545" },
      { color: "Yellow", code: "#ffc107" },
    ].map((item, index) => (
      <li key={index} className='flex items-center gap-2'>
        <input type='checkbox' className='accent-violet-800' />
        <span
          className={`w-4 h-4 rounded-full inline-block ${item.border ? 'border' : ''}`}
          style={{ backgroundColor: item.code }}
        ></span>
        <label className='text-base font-medium'>{item.color}</label>
      </li>
    ))}
  </ul>
</div> */}

</div>


          </div>
        </div>
      </div>


      <div className='grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  px-6 md:px-14 py-3 gap-5 mt-2 md:mt-10'>
        <div className='hidden lg:block col-span-2 lg:col-span-1 '>
          <div className='border rounded p-3 max-w-xs'>
            <h4 className='text-xl font-semibold'>Category</h4>
            <ul>      
              
              {products.length > 0 ? (
                finalData.map((product, index) => (
                  <li
                    key={index}
                    className={`p-2 border border-1 rounded mt-2 cursor-pointer ${selectedCategory === product.productName ? "bg-violet-200" : ""
                      }`}
                    onClick={() => setSelectedCategory(product.productName)}
                  >
                    <div className="flex justify-between font-medium">
                      <h5 className="text-base">{product.productName}</h5>
                    </div>
                  </li>
                ))
              ) : (
                <p>No products available</p>
              )}

              {/* <li className='p-2 border border-1 rounded mt-2'>
                             <div className='flex justify-content-between font-medium'>
                                 <h5 className='text-base'>Silk Yarn</h5>
                                 <div className='bg-violet-100 rounded-circle w-6 h-6 d-flex justify-content-center align-items-center'>
                                     <h6 className='text-sm'>11</h6>
                                 </div>
                             </div>
                         </li>

                         <li className='p-2 border border-1 rounded mt-2'>
                             <div className='flex justify-content-between font-medium'>
                                 <h5 className='text-base'>Jute Yarn</h5>
                                 <div className='bg-violet-100 rounded-circle w-6 h-6 d-flex justify-content-center align-items-center'>
                                     <h6 className='text-sm'>11</h6>
                                 </div>
                             </div>
                         </li>

                         <li className='p-2 border border-1 rounded mt-2'>
                             <div className='flex justify-content-between font-medium'>
                                 <h5 className='text-base'>Nylon Yarn</h5>
                                 <div className='bg-violet-100 rounded-circle w-6 h-6 d-flex justify-content-center align-items-center'>
                                     <h6 className='text-sm'>11</h6>
                                 </div>
                             </div>
                         </li>

                         <li className='p-2 border border-1 rounded mt-2'>
                             <div className='flex justify-content-between font-medium'>
                                 <h5 className='text-base'>Wool Yarn</h5>
                                 <div className='bg-violet-100 rounded-circle w-6 h-6 d-flex justify-content-center align-items-center'>
                                     <h6 className='text-sm'>11</h6>
                                 </div>
                             </div>
                         </li>

                         <li className='p-2 border border-1 rounded mt-2'>
                             <div className='flex justify-content-between font-medium'>
                                 <h5 className='text-base'>Polyster Yarn</h5>
                                 <div className='bg-violet-100 rounded-circle w-6 h-6 d-flex justify-content-center align-items-center'>
                                     <h6 className='text-sm'>11</h6>
                                 </div>
                             </div>
                         </li> */}
            </ul>
          </div>



          <div className='w-full max-w-xs'>

              {/* {selectedCategory && (
          <div className="border rounded p-3 my-3">
            <h4 className="text-xl font-semibold mb-3">Count</h4>
            <ul className="space-y-2">
              {derivedCounters.map((counter, index) => {
                const isSelected = selectedCounters.includes(counter.name);
                return (
                  <li
                    key={index}
                    className={`p-2 border border-1 rounded cursor-pointer ${isSelected ? "bg-violet-200" : "bg-white"} flex justify-between items-center`}
                   onClick={() => {
              const updatedSelection = isSelected
                ? []
                : [counter.name]; 
              setSelectedCounters(updatedSelection);
            }}
          >
                    <h5 className="text-base font-medium">{counter.name}</h5>
                  </li>
                );
              })}
            </ul>
          </div>
        )} */}


        
              {selectedCategory && (
          <div className="border rounded mt-3 p-3">
            <h4 className="text-xl font-semibold mb-3">Type</h4>
            <ul className="space-y-2">
              {variantType.map((variant, index) => {
                const isSelected = selectedVariantType === variant.name;
                return (
                  <li
                    key={index}
                    className={`p-2 border border-1 rounded cursor-pointer ${isSelected ? "bg-violet-200" : "bg-white"} flex justify-between items-center`}
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



 

  {/* Color Filter Section */}
  {/* <div className='border rounded p-3'>
    <h4 className='text-xl font-semibold mb-3'>Color</h4>
    <ul className='space-y-2'>
      {[
        { color: "Black", code: "#000" },
        { color: "Blue", code: "#007bff" },
        { color: "White", code: "#f8f8f8", border: true },
        { color: "Grey", code: "#999" },
        { color: "Green", code: "#28a745" },
        { color: "Navy Blue", code: "#001f3f" },
        { color: "Brown", code: "#8B4513" },
        { color: "Beige", code: "#f5f5dc", border: true },
        { color: "Pink", code: "#ff69b4" },
        { color: "Red", code: "#dc3545" },
        { color: "Yellow", code: "#ffc107" },
      ].map((item, index) => (
        <li key={index} className='flex items-center gap-2'>
          <input type='checkbox' className='accent-violet-800' />
          <span
            className={`w-4 h-4 rounded-full inline-block ${item.border ? 'border' : ''}`}
            style={{ backgroundColor: item.code }}
          ></span>
          <label className='text-base font-medium'>{item.color}</label>
        </li>
      ))}
    </ul>
  </div> */}
  
</div>









        </div>

        <div className='col-span-3 h-1/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

        {/* {selectedCategory &&
        products
          .filter((product) => product.productName === selectedCategory)
          .flatMap((product) => {
            const combinations = {};

            product.variants.forEach((variant) => {
              const key = `${variant.size}_${variant.variantType}`;
              if (!combinations[key]) {
                combinations[key] = {
                  size: variant.size,
                  variantType: variant.variantType,
                  variants: [],
                  price: variant.pricePerKg,
                };
              }
              combinations[key].variants.push(variant);
            });

            return Object.values(combinations).map((combo, i) => (
              <CategoryBox
                key={i}
                size={combo.size}
                variantType={combo.variantType}
                color={combo.variants}
                price={combo.price}
                product={product}
              />
            ));
          })} */}

        {filteredVariants.map(combo => (
          <CategoryBox
            key={combo.key}
            size={combo.size}
            variantType={combo.variantType}
            color={combo.variants}
            price={combo.price}
            product={combo.product}
            markupPrice={combo.markupPrice}
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