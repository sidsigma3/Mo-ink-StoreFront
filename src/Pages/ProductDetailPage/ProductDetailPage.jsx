import React, { useState, useRef, useEffect , useMemo} from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import ProductList from '../../Components/ProductList/ProductList'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import { TiStarFullOutline } from "react-icons/ti";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import BottomNav from '../../Components/BottomNav/BottomNav';
import { addToWishlist, removeFromWishlist } from "../../Services/WishlistService";
import { getCart, removeFromCart, addToCart } from "../../Services/CartService"
import { RxCross2 } from "react-icons/rx";
import { updateProduct , fetchProductsById, fetchProducts} from '../../Services/ProductService'
import ModalAddColor from '../../Components/Modal/ModalAddColor'
import Toast from '../../Components/Toast/Toast';
import namer from 'color-namer';
import { useAppContext } from '../../Utils/commoncontext'




const ProductDetailPage = ({ variantId, quantity, onWishlistToggle }) => {
    const {updateCartAndWishlistCounts } = useAppContext()
    const backendUrl = process.env.REACT_APP_IMAGE_URL
    const location = useLocation();
    const navigate = useNavigate();
    const [isInCart, setIsInCart] = useState();
    const [isWishlisted, setIsWishlisted] = useState();
    const [justRemoved, setJustRemoved] = useState();
    const { product, size, color, price ,variantType , markupPrice} = location.state || {};
    const [filteredColors, setFilteredColors] = useState([]);
    const [moreColors, setMoreColors] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchColor, setSearchColor] = useState('')
    const [isAddingColor, setIsAddingColor] = useState(false);
    const [newColor, setNewColor] = useState({ colorName: "", hexCode: "" });
    const [tempCustomColors, setTempCustomColors] = useState([]);
    const [customColors, setCustomColors] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [isColorSelected, setIsColorSelected] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [presetColors, setPresetColors] = useState([]);
    const customer = JSON.parse(localStorage.getItem("userData") || "{}");
    const [modalSelectedColors, setModalSelectedColors] = useState([]);
    const [showAddColorModal, setShowAddColorModal] = useState(false);
    const [toasts, setToasts] = useState([]);
    

    

    const filteredColorsTemp = useMemo(() => {
  if (!product?.variants?.length) return [];

  return product.variants
    .filter((variant) => variant.size === size && variant.variantType === variantType)
    .filter(
      (variant) =>
        variant.color.colorName.toLowerCase().includes(searchColor) ||
        variant.color.hexCode.toLowerCase().includes(searchColor)
    );
}, [product, size, variantType, searchColor]);




      useEffect(() => {
        setFilteredColors(customColors);
    }, [customColors]);

//     const handleColorSearch = (e) => {
//             const searchText = e.target.value.toLowerCase();
//             setSearchTerm(searchText);

//             const filtered = filteredColorsTemp.filter(
//                 (color) =>
//                     color.colorName.toLowerCase().includes(searchText) ||
//                     color.hexCode.toLowerCase().includes(searchText)
//             );

//             setFilteredColors(filtered);
        
//         };

//   console.log(filteredColors)

    
    const handleSubmitSelectedColor = () => {
        setSelectedColors(modalSelectedColors); // FULLY REPLACE
        setModalSelectedColors([]);
        setIsModalOpen(false);
        setIsInCart(false); // Reset "Add to Cart" status if new colors submitted
      };
      

    const modalRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false);
                setIsAddingColor(false);
                setNewColor({});
            }
        };

        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]);  



    const ColorCard = ({ item, onSelect, selected = false, disabled }) => {
        return (
          <div
            onClick={() => !disabled && onSelect(item)}
            className={`border-4 rounded-md cursor-pointer ${
              selected ? "border-blue-500" : "border-gray-300"
            }`}
          >
           <div className="relative h-20 overflow-hidden">
            <img
                src={`${backendUrl}${product.productImage?.find(img => img.includes(item.variantType.toLowerCase())) || product.productImage?.[0]}`}
                className="w-full h-full object-cover"
                alt="Product"
            />
            <div
                className="absolute inset-0  opacity-50 mix-blend-multiply"
                style={{ backgroundColor: item.color?.hexCode }}
              ></div>
               

            </div>

            <div className="flex flex-col text-center items-center mx-1 my-2">
              <h5 className="text-black font-bold">{item.color?.colorName}</h5>
              {/* <h5 className="text-gray-600">{item.color?.hexCode}</h5> */}
            </div>
          </div>
        );
      };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        console.log(name,value)
    
        if (name === 'hexCode') {
            const hex = value;
          
            // Only proceed if it matches valid 3 or 6 digit hex
            const isValidHex = /^#([0-9A-F]{3}){1,2}$/i.test(hex);
            if (!isValidHex) {
              setNewColor((prev) => ({
                ...prev,
                hexCode: hex,
                colorName: '', // clear or keep previous
              }));
              return;
            }
          
            let suggestedName = '';
            try {
              const names = namer(hex);
              suggestedName = names.ntc[0].name.replace(/\s+/g, '-').toLowerCase(); // e.g., "Bright Red" → "bright-red"
            } catch {
              suggestedName = `color-${hex.replace('#', '').slice(0, 4).toUpperCase()}`;
            }
          
            setNewColor((prev) => ({
              ...prev,
              hexCode: hex,
              colorName: suggestedName,
            }));
          }
           else {
            setNewColor((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSaveColor = () => {
        if (!newColor.hexCode) return;
    
        const defaultName = `Color-${tempCustomColors.length + 1}`;
        const colorName = newColor.colorName || defaultName;
    
        setTempCustomColors((prev) => [...prev, { ...newColor, colorName }]);
        setNewColor({ colorName: "", hexCode: "" });
    };
    
    const handleCartButtonClick = () => {
        if (isInCart) {
            navigate("/shoppingCart");
        } else {
            handleAddToCart();
        }
    };

    const handleAddToCart = async () => {

        const showToast = (message, type = "error") => {
            setToasts([{ message, type }]);
            setTimeout(() => setToasts([]), 3000);
          };

        if (!customer?.customerId) {
          showToast("Please log in to add items to your cart.", "error");
          return;
        }
      
        // Ensure at least one color is selected
        if (selectedColors.length === 0) {
            showToast("Please select a color before adding to cart.", "error");
            return;
            
        }
      
        try {
          // Get the current cart to check if the item already exists
          const cart = await getCart(customer.customerId);
          
          // Iterate over each selected color and add it to the cart if not already there
          for (const color of selectedColors) {
            const alreadyInCart = cart?.cartItems?.some(item => item.variantId === color.id);
      
            if (!alreadyInCart) {
              // Add the color to the cart if it's not already in there
              await addToCart(customer.customerId, color.id, 1);
            }
          }
      

          showToast("Items added to cart", "success");

          setIsInCart(true);
          
          // Optionally, clear selected colors after adding them to the cart
          setSelectedColors([]);
          updateCartAndWishlistCounts();
      
        } catch (error) {
          console.error("Error adding to cart:", error);

          showToast("Failed to add item to cart!", "error");

        }
      };
      

      const handleAddColor = async () => {
        const showToast = (message, type = "error") => {
          setToasts([{ message, type }]);
          setTimeout(() => setToasts([]), 3000);
        };
      
        const { product, size, variantType: selectedVariantType } = location.state || {};
      
        if (tempCustomColors.length === 0) {
          showToast("Please add at least one color before saving.", "error");
          return;
        }
      
        try {
          const response = await fetchProductsById(product.id);
          const productData = response.data;
          const existingVariants = productData.variants || [];
      
          const typesToCreate = ["CONE", "HANK"];
      
          const averagePriceMap = {};
      
          typesToCreate.forEach((variantType) => {
            const matchingVariants = existingVariants.filter(
              (v) => v.size === size && v.variantType === variantType
            );
      
            const count = matchingVariants.length;
            if (count === 0) return;
      
            const total = matchingVariants.reduce(
              (acc, v) => ({
                pricePerKg: acc.pricePerKg + (v.pricePerKg || 0),
                costPerKg: acc.costPerKg + (v.costPerKg || 0),
                markupPricePerKg: acc.markupPricePerKg + (v.markupPricePerKg || 0),
              }),
              { pricePerKg: 0, costPerKg: 0, markupPricePerKg: 0 }
            );
      
            averagePriceMap[variantType] = {
              pricePerKg: +(total.pricePerKg / count).toFixed(2),
              costPerKg: +(total.costPerKg / count).toFixed(2),
              markupPricePerKg: +(total.markupPricePerKg / count).toFixed(2),
            };
          });
      
          const newVariants = tempCustomColors.flatMap((color) =>
            typesToCreate.map((variantType) => {
              const avg = averagePriceMap[variantType] || {
                pricePerKg: 150,
                costPerKg: 200,
                markupPricePerKg: 250,
              };
      
              return {
                size,
                variantType,
                color: {
                  colorName: color.colorName,
                  hexCode: color.hexCode,
                },
                availableWeight: 0,
                pricePerKg: avg.pricePerKg.toFixed(0),
                costPerKg: avg.costPerKg,
                markupPricePerKg: avg.markupPricePerKg.toFixed(0),
              };
            })
          );
      
          const isNewVariant = (variant) => {
            return !existingVariants.some(
              (existing) =>
                existing.size === variant.size &&
                existing.variantType === variant.variantType &&
                existing.color.colorName.toLowerCase() === variant.color.colorName.toLowerCase() &&
                existing.color.hexCode.toLowerCase() === variant.color.hexCode.toLowerCase()
            );
          };
      
          const filteredNewVariants = newVariants.filter(isNewVariant);
      
          if (filteredNewVariants.length === 0) {
            showToast("All selected colors already exist.", "error");
            return;
          }
      
          const formattedData = {
            title: productData.productName,
            description: productData.productDescription,
            media: productData.productImage || [],
            availableStatus: productData.availableStatus,
            gstOnProduct: Number(productData.gstOnProduct || 0),
            productType: productData.productTypes || {
              productName: productData.productName,
              description: productData.productDescription,
            },
            variants: filteredNewVariants,
            deletedVariantIds: [],
          };
      
          await updateProduct(product.id, formattedData);
      
          const updatedProductRes = await fetchProductsById(product.id);
          const updatedVariants = updatedProductRes.data.variants || [];
      
          const seenHexCodes = new Set();
          const updatedColorsWithIds = [];
      
          updatedVariants.forEach((variant) => {
            const hexCode = variant.color.hexCode.toLowerCase();
            const colorName = variant.color.colorName.toLowerCase();
            const variantTypeData = variant.variantType;
            const sizeData = variant.size;
      
            const key = `${hexCode}__${colorName}__${variantTypeData}__${sizeData}`;
      
            if (!seenHexCodes.has(key)) {
              const match = tempCustomColors.find(
                (temp) =>
                  temp.hexCode.toLowerCase() === hexCode &&
                  temp.colorName.toLowerCase() === colorName &&
                  size === sizeData
              );
      
              if (match) {
                updatedColorsWithIds.push({
                  id: variant.id,
                  color: {
                    id: variant.color.id,
                    colorName: variant.color.colorName,
                    hexCode: variant.color.hexCode,
                  },
                  variantType: variant.variantType,
                  size,
                });
      
                seenHexCodes.add(key);
              }
            }
          });
      
          const filteredBySelectedVariant = updatedColorsWithIds.filter(
            (variant) => variant.variantType === selectedVariantType
          );
      
          const allProductsResponse = await fetchProducts();
          const allProductsData = allProductsResponse.data || [];
          localStorage.setItem("allProducts", JSON.stringify(allProductsData));
      
          setCustomColors((prev) => [...prev, ...filteredBySelectedVariant]);
          setTempCustomColors([]);
          setIsAddingColor(false);
          setIsModalOpen(true);
        } catch (error) {
          console.error("Error adding color variants:", error);
          showToast("Failed to add color variants. Please try again.", "error");
        }
      };
      
      

    if (!product) return <p>No product details available</p>;


      console.log(customColors)

    // const handleColorSearch = (e) => {
    //     setSearchColor(e.target.value.toLowerCase());
    // }


    // const filteredColors = color.filter((item) =>
    //     item.colorName.toLowerCase().includes(searchColor) ||
    //     item.hexCode.toLowerCase().includes(searchColor)
    // );


    const visibleColors = color.slice(0, 4); // Only take the first 4 colors
    const hasMore = color.length > 4;


    const handleSelectColor = (item) => {
        const alreadySelected = modalSelectedColors.find((selected) => selected.id === item.id);
      
        if (alreadySelected) {
          setModalSelectedColors(modalSelectedColors.filter((selected) => selected.id !== item.id));
        } else {
          setModalSelectedColors([...modalSelectedColors, item]);
        }
      };
      
      
    const handleColorSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filtered = customColors.filter(
            (color) =>
                color.colorName.toLowerCase().includes(searchText) ||
                color.hexCode.toLowerCase().includes(searchText)
        );
        setFilteredColors(filtered);
    };

   
       
    console.log(product)
    console.log(selectedColors)
    console.log(modalSelectedColors)
  

    return (
        <div>

            <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
            <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>


            <div class="px-6 md:px-14 py-3">


                <div class="grid items-start grid-cols-1 lg:grid-cols-5 gap-8 mt-6">
                   <div class="lg:col-span-3">
                    <div className="grid sm:grid-cols-3 gap-2 text-center">
                    {/* Main Image: Prefer Hank if exists, else fallback */}
                    <div className="sm:col-span-2 bg-gray-100 flex items-center justify-center rounded-lg border-2 border-gray-300 aspect-square">
                        <img
                        src={`${backendUrl}${product.productImage?.find(img => img.includes(variantType.toLowerCase())) || product.productImage?.[0]}`}
                        alt="Main Product"
                        className="w-full h-full object-contain rounded-lg"
                        />
                    </div>

                    {/* Two Smaller Images */}
                    <div className="sm:space-y-2 w-full h-full max-sm:grid max-sm:grid-cols-2 max-sm:gap-2">
                        {/* Show Cone image */}
                        <div className="bg-gray-100 flex items-center justify-center rounded-lg border-2 border-gray-300 aspect-square">
                        <img
                            src={`${backendUrl}${product.productImage?.find(img => img.includes(variantType.toLowerCase())) || product.productImage?.[1]}`}
                            alt="Cone Product"
                            className="w-full h-full object-contain rounded-lg"
                        />
                        </div>

                        {/* Optional: Fallback image or duplicate */}
                        <div className="bg-gray-100 flex items-center justify-center rounded-lg border-2 border-gray-300 aspect-square">
                        <img
                             src={`${backendUrl}${product.productImage?.find(img => img.includes(variantType.toLowerCase())) || product.productImage?.[0]}`}
                            alt="Fallback Product"
                            className="w-full h-full object-contain rounded-lg"
                        />
                        </div>
                    </div>
                    </div>

</div>


                    <div class="w-full lg:col-span-2">

                        <span class="inline-flex items-center rounded-md bg-pink-200 px-2 py-1 text-xs font-medium text-pink-600 ring-1 ring-inset ring-pink-700/10">Sale off</span>
                        <div className='d-flex flex-wrap items-center gap-3 mt-6 lg:block'>
                            <p className="text-gray-800 text-2xl md:2xl font-bold">{product.productName} - {size} - {variantType}</p>
                            <div class="flex items-center space-x-1 gap-2">
                                <div className='bg-yellow-100 d-flex gap-2 rounded-2 align-items-center h-50 px-2 py-2'>
                                    <span className='text-md text-yellow-300'><TiStarFullOutline /></span>
                                    <p className='text-md'>4.5</p>
                                </div>

                                <h5 className='text-gray-400'>(32 reviews)</h5>
                            </div>
                        </div>
                        <div className='d-flex gap-2 align-items-center mt-3'>
                            <h4 className="purple-text font-bold text-2xl md:text-4xl">₹{Math.round(price)}</h4>
                            <div>
                                <p className='text-green-600 font-semibold text-sm'>
                                {Math.round(((markupPrice - price) / markupPrice) * 100)}% Off
                                </p>
                                <p className="text-slate-400 font-medium"><s>₹{Math.round(markupPrice)}</s></p>
                            </div>

                        </div>


                        <div className='mt-6'>
                            <p>{product.productDescription}</p>
                        </div>

                        {/* <div className='flex mt-6 text-gray-500 gap-2 items-center'>
                    <h5>Size/Weight:</h5>
                    <ul className='flex gap-3'>
                        <li>50Kg</li>
                        <li>100Kg</li>
                        <li>150Kg</li>
                        <li>200Kg</li>   
                        <li>250Kg</li>
                         <li>{size} Kg</li>
                    </ul>
                </div> */}

                        {/* <h5 className='mt-3'>Colors :</h5> */}
                        <div className="flex gap-3 mt-1 items-center">
                            {/* <div className="flex gap-3">
                {visibleColors.map((item, index) => (
                <div key={index} className="border-4 rounded-md border-gray-300">
                    <div className="relative w-20 h-20 overflow-hidden">
                  
                    <img src="/images/wool-item-1.png" className="w-full h-full object-cover" alt="Product" />

                   
                    <div
                        className="absolute inset-0 opacity-50"
                        style={{ backgroundColor: item.hexCode }}
                    ></div>
                    </div>

                   
                    <div className="flex flex-col items-center mt-2">
                    <h5 className="text-black font-bold">{item.colorName}</h5>
                    <h5 className="text-gray-600">{item.hexCode}</h5>
                    </div>
                </div>
                ))}
            </div> */}

                            <div className="cursor-pointer flex gap-2 items-center mt-3"
                             onClick={() => {
                                setIsModalOpen(true);
                                setModalSelectedColors([...selectedColors]); 
                              }}
                              
                             >
                                <img src="/images/select-color.png" className="w-10 h-10" alt="More Colors" />
                                <h4 className="text-sm text-center text-blue-600 font-semibold">Click here for color catalogue</h4>
                            </div>

                            <div
                                ref={modalRef}
                                className={`fixed top-0 right-0 w-80 md:w-1/2 lg:w-1/4 h-full bg-white shadow-lg transform z-50 ${isModalOpen ? "translate-x-0" : "translate-x-full"
                                    } transition-transform duration-300 ease-in-out p-4`}
                            >
                                <button
                                    className="absolute top-3 right-3 text-xl font-bold"
                                    onClick={() => {
                                        setIsModalOpen(false)
                                        setIsAddingColor(false)
                                        setNewColor({})
                                    }
                                    }
                                >
                                    &times;
                                </button>

                                <h2 className="text-lg font-semibold">{isAddingColor ? "Add New Color" : "Add Colors"}</h2>

                                {isAddingColor ? (
                                    <div className="mt-4">
                                        <div className="flex flex-col gap-3">
                                            <label className="font-medium">Color Name</label>
                                            <input
                                                type="text"
                                                name="colorName"
                                                value={newColor.colorName}
                                                onChange={handleInputChange}
                                                className="border p-2 rounded"
                                                disabled={true}
                                            />

                                            <label className="font-medium">Hex Code</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    name="hexCode"
                                                    value={newColor.hexCode}
                                                    onChange={handleInputChange}
                                                    className="border p-2 rounded w-full"
                                                    placeholder="e.g. #fff000"
                                                />
                                                <input
                                                    type="color"
                                                    name="hexCode"
                                                    value={newColor.hexCode}
                                                    onChange={handleInputChange}
                                                    className="w-10 h-10 p-0 border rounded cursor-pointer"
                                                    />

                                            </div>

                                            {newColor.hexCode && (
                                                <div
                                                    className="w-16 h-16 border rounded mt-2"
                                                    style={{ backgroundColor: newColor.hexCode }}
                                                ></div>
                                            )}

                                            <button
                                                onClick={handleSaveColor}
                                                className="bg-violet-600 text-white p-1 rounded mt-3"
                                            >
                                                SAVE COLOR
                                            </button>

                                            {tempCustomColors.length > 0 && (
                                                <div className="mt-4">
                                                    <h4 className="font-semibold">Added Colors:</h4>
                                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 p-2">
                                                        {tempCustomColors.map((item, index) => (
                                                            <div key={index} className="border-4 rounded-md border-gray-300">
                                                                <div className="relative h-16 overflow-hidden">
                                                                    <div
                                                                        className="absolute inset-0 opacity-50"
                                                                        style={{ backgroundColor: item.hexCode }}
                                                                    ></div>
                                                                     <button
                                                                        onClick={() => {
                                                                            setTempCustomColors((prev) => prev.filter((c) => c !== item));
                                                                        }}
                                                                        className="absolute top-0 right-0 z-20 bg-white border border-violet-800 text-violet-800 rounded-full p-1"
                                                                        >
                                                                        <RxCross2 size={16} />
                                                                        </button>

                                                                </div>
                                                                <h5 className="text-black font-bold mx-1 my-2 text-center">{item.colorName}</h5>
                                                                {/* <h5 className="text-black font-bold text-center">{item.hexCode}</h5> */}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div>

                                           <input
                                                onChange={(e) => setSearchColor(e.target.value.toLowerCase())}
                                                className="border w-full rounded-md p-2 mt-2"
                                                placeholder="Search by name or hexcode"
                                            />


                                         
                                        </div>

                                        <div className='flex justify-between items-center mt-3 mb-3 border-b-2 pb-3'>
                                            <h3 className="text-lg font-semibold ">Custom Colors</h3>

                                            {customColors.length > 0 && (
                                                <div
                                                    className="flex  items-center gap-1 bg-violet-800 text-white rounded-md p-2 cursor-pointer"
                                                    onClick={() => setIsAddingColor(true)}
                                                >
                                                    <span>
                                                        <FaPlus />
                                                    </span>
                                                    <h4>New color</h4>
                                                </div>
                                            )}
                                        </div>

                              

                                        {customColors.length === 0 ? (
                                        <div
                                            className="flex flex-col items-center justify-center bg-gray-100 p-3 cursor-pointer"
                                            onClick={() => setIsAddingColor(true)}
                                        >
                                            <span><FaPlus /></span>
                                            <h4>Add new color</h4>
                                        </div>
                                        ) : (
                                        <div className="grid grid-cols-3 gap-3 p-2">
                                            {customColors.map((item) => {
                                                const isSelected = modalSelectedColors.find((color) => color.id === item.id); // Fix here
                                                return (
                                                <ColorCard
                                                    key={item.id}
                                                    item={item}
                                                    selected={!!isSelected}
                                                    onSelect={handleSelectColor}
                                                />
                                                );
                                            })}
                                        </div>
                                        )}




                                        <h4 className="mt-4 text-lg font-semibold ">Preset Catalogue</h4>
                                        <div className="h-[32rem] overflow-y-auto p-2">
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                            {filteredColorsTemp.map((aVariant) => {
                                            const isSelected = modalSelectedColors.find((color) => color.color.id === aVariant.color.id);
                                            return (
                                                <ColorCard
                                                key={aVariant.id}
                                                item={aVariant}
                                                selected={!!isSelected}
                                                onSelect={handleSelectColor}
                                                />
                                            );
                                            })}
                                        </div>
                                        </div>

                                        

                                        {/* <div className='h-[28rem] md:h-[32rem] overflow-auto'>
                                            <div className="grid grid-cols-3 gap-3 p-2">
                                                {filteredColors.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleSelectColor(item, 'preset')}
                                                        className={`border-4 rounded-md cursor-pointer ${selectedColors.some((c) => c.hexCode === item.hexCode && c.source === 'preset')
                                                            ? 'border-blue-500'
                                                            : 'border-gray-300'
                                                            }`}
                                                    >
                                                        <div className="relative h-20 overflow-hidden">
                                                            <img src="/images/wool-item-1.png" className="w-full h-full object-cover" alt="Product" />
                                                            <div className="absolute inset-0 opacity-50" style={{ backgroundColor: item.hexCode }}></div>
                                                        </div>
                                                        <div className="flex flex-col items-center mt-2">
                                                            <h5 className="text-black font-bold">{item.colorName}</h5>
                                                            <h5 className="text-gray-600">{item.hexCode}</h5>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div> */}
                                    </div>
                                )}

                                <div className="flex justify-between mt-4 absolute bottom-16 md:bottom-0 w-full pr-8 py-3">
                                    <button
                                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 rounded"
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setIsAddingColor(false);
                                            setNewColor({});
                                            setTempCustomColors([]);
                                        }}
                                    >
                                        CANCEL
                                    </button>

                                    {isAddingColor ? (
                                        tempCustomColors.length > 0 ? (
                                            <button
                                                className="bg-violet-600 text-white px-4 py-2 rounded"
                                                onClick={() => setShowAddColorModal(true)}
                                            >
                                                SUBMIT
                                            </button>

                                        ) : (
                                            <button
                                                className="bg-violet-200 text-violet-800 p-2 rounded"
                                                onClick={handleSubmitSelectedColor}
                                            >
                                                ADD COLOR
                                            </button>
                                        )
                                    ) : modalSelectedColors.length > 0 ? (
                                        <button
                                            className="bg-violet-600 text-white px-4 py-2 rounded"
                                            onClick={handleSubmitSelectedColor}
                                        >
                                            SUBMIT
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-violet-200 text-violet-800 p-2 rounded"
                                            onClick={handleAddColor}
                                        >
                                            ADD COLOR
                                        </button>
                                    )}

                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-3 mt-4">
                        {selectedColors.map((color) => (
                            <div key={color.color.id} className="border-2 rounded-md overflow-hidden relative">
                                <div className="relative h-20 w-full">
                                <img
                                   src={`${backendUrl}${product.productImage?.find(img => img.includes(variantType.toLowerCase())) || product.productImage?.[0]}`}
                                    className="w-full h-full object-cover"
                                    alt="Product"
                                />
                                <div
                                    className="absolute inset-0 opacity-50 mix-blend-multiply"
                                    style={{ backgroundColor: color.color.hexCode }}
                                ></div>

                                <button
                                    onClick={() => {
                                        setSelectedColors((prev) => prev.filter((c) => c.id !== color.id));
                                        setIsInCart(false); // Reset the button
                                    }}
                                    className="absolute top-0 right-0 z-20 bg-white border border-violet-800 text-violet-800 rounded-full p-1"
                                >
                                    <RxCross2 size={16} />
                                </button>
                                </div>

                                <div className="flex flex-col items-center p-1">
                                <p className="text-black text-sm font-semibold">
                                    {color.color.colorName}
                                </p>
                                <p className="text-gray-600 text-xs">{color.color.hexCode}</p>
                                </div>
                            </div>
                            ))}

                        </div>


                        <div className='mt-6'>
                            <div className='overflow-auto'>
                                <div className="grid grid-cols-4 gap-3 p-2">
                                    {moreColors.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleSelectColor(item, 'more')}
                                            className={`border-2 cursor-pointer ${selectedColors.some(
                                                (c) => c.hexCode === item.hexCode && c.source === 'more'
                                            )
                                                ? 'border-blue-500'
                                                : 'border-gray-300'
                                                }`}
                                        >
                                            <div className="relative h-15 overflow-hidden">
                                                <img
                                                    src="/images/wool-item-1.png"
                                                    className="w-full h-full object-cover"
                                                    alt="Product"
                                                />
                                                <div
                                                    className="absolute inset-0 opacity-50"
                                                    style={{ backgroundColor: item.hexCode }}
                                                ></div>
                                                <div className="flex flex-col items-center">
                                                    <p className="text-black text-sm">{item.colorName}</p>
                                                    <p className="text-gray-600 text-xs">{item.hexCode}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                        <div className="d-flex gap-2 mt-2">
                        <button
                            onClick={handleCartButtonClick}
                            className={`d-flex align-items-center justify-content-center gap-2 p-1 font-medium rounded flex-1 text-md 
                            ${isInCart ? "bg-green-500 text-white" : "bg-purple-100 purple-text"}`}
                        >
                            {isInCart ? "GO TO CART" : "ADD TO CART"}
                            <span><MdOutlineShoppingCart size={20} /></span>
                        </button>
                        
                        </div>

                        <div className='grid grid-cols-2 gap-3 mt-8 text-sm md:text-md'>
                            <h5 className='text-violet-700 font-medium text-md'><span className='text-gray-500'>Type:</span> Organic</h5>
                            <h5 className='text-violet-700 font-medium text-md'><span className='text-gray-500'>SKU:</span> FWM15VKT</h5>
                            <h5 className='text-violet-700 font-medium text-md'><span className='text-gray-500'>MFG:</span> JUN 4,2022</h5>
                            <h5 className='text-violet-700 font-medium text-md'><span className='text-gray-500'>Stocks:</span> 8 Items in stock</h5>
                        </div>



                    </div>
                </div>

                <div class="mt-8">
                    <ul class="flex border-b">
                        <li
                            class="text-gray-800 font-bold text-sm bg-gray-100 py-3 px-8 border-b-2 border-gray-800 cursor-pointer transition-all">
                            Description</li>
                        {/* <li class="text-gray-600 font-bold text-sm hover:bg-gray-100 py-3 px-8 cursor-pointer transition-all">Reviews</li> */}
                    </ul>

                  <div class="mt-8">
                    <h3 class="text-md md:text-lg font-bold text-gray-800">Product Description</h3>
                    <p class="text-md text-gray-600 mt-4">Our premium yarns are spun from the finest quality natural and synthetic fibers including cotton, silk, nylon, and polyester. Ideal for weaving, knitting, and textile production, our yarns offer consistent strength, vibrant color retention, and a smooth finish that ensures durability and elegance in every stitch.</p>
                    </div>

                    <div class="mt-8">
                        <h3 class="text-md md:text-lg font-bold text-gray-800">Packaging & Delivery</h3>
                        <p class="text-md text-gray-600 mt-4">Each yarn cone is securely packed in moisture-resistant, eco-friendly packaging to preserve fiber quality during transport. Orders are dispatched within 2–4 business days and bulk deliveries are managed with care using trusted logistics partners to ensure timely arrival and minimal handling damage.</p>
                    </div>

                    <div class="mt-8">
                        <h3 class="text-md md:text-lg font-bold text-gray-800">Suggested Use</h3>
                        <p class="text-md text-gray-600 mt-4">Suitable for a wide range of textile applications including apparel manufacturing, handloom weaving, machine knitting, and home furnishings. Choose cotton or silk yarns for breathable, luxury garments, while nylon and polyester offer strength and elasticity ideal for sportswear and industrial fabrics.</p>
                    </div>

                    <div class="mt-8">
                        <h3 class="text-md md:text-lg font-bold text-gray-800">Other Ingredients</h3>
                        <p class="text-md text-gray-600 mt-4">Our yarns are produced using high-quality raw fibers such as long-staple cotton, reeled mulberry silk, virgin polyester, and industrial-grade nylon. Some variants may include eco-dyes, silicone softeners, or anti-pilling treatments depending on customer requirements.</p>
                    </div>

                    <div class="mt-8">
                        <h3 class="text-md md:text-lg font-bold text-gray-800">Warnings</h3>
                        <p class="text-md text-gray-600 mt-4">Store yarns in a dry, cool place away from direct sunlight to prevent discoloration and fiber degradation. Keep packaging sealed to avoid dust accumulation. Not recommended for use with open flames or high-heat machinery without appropriate processing treatments.</p>
                    </div>

                </div>
            </div>

            <ModalAddColor
        isOpen={showAddColorModal} 
        onCancel={() => setShowAddColorModal(false)} 
        onConfirm={() => {
          handleAddColor(); 
          setShowAddColorModal(false); 
        }}
      />
     {/* Toast Notification */}
     <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() =>
                            setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                        }
                    />
                ))}
            </div>

            <div className='px-6 md:px-14 py-3'> <ProductList></ProductList></div>
            <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
            <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
            <BottomNav></BottomNav>
        </div>

    )
}

export default ProductDetailPage