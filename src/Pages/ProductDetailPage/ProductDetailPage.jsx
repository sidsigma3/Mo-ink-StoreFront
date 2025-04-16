import React, { useState, useRef, useEffect } from 'react'
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

const ColorCard = ({item , onSelect, selected = false}) => {

    return <div 
    onClick={() => onSelect(item, 'custom')}
    className={`border-4 rounded-md cursor-pointer ${selected
        ? 'border-blue-500'
        : 'border-gray-300'
        }`}
>
    <div className="relative h-20 overflow-hidden">
        <img
            src="/images/wool-item-1.png"
            className="w-full h-full object-cover"
            alt="Product"
        />
        <div
            className="absolute inset-0 opacity-50 mix-blend-multiply"
            style={{ backgroundColor: item.hexCode }}
        ></div>
    </div>
    <div className="flex flex-col items-center mt-2">
        <h5 className="text-black font-bold">{item.colorName}</h5>
        <h5 className="text-gray-600">{item.hexCode}</h5>
    </div>
</div>
}
const ProductDetailPage = ({ variantId, quantity, onWishlistToggle }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [isInCart, setIsInCart] = useState();
    const [isWishlisted, setIsWishlisted] = useState();
    const [justRemoved, setJustRemoved] = useState();
    const { product, size, color, price } = location.state || {};
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
    const [searchTerm, setSearchTerm] = useState("");
    const [presetColors, setPresetColors] = useState([]);
    const customer = JSON.parse(localStorage.getItem("userData") || "{}");

    const handleColorSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        setSearchTerm(searchText);

        const filtered = customColors.filter(
            (color) =>
                color.colorName.toLowerCase().includes(searchText) ||
                color.hexCode.toLowerCase().includes(searchText)
        );

        setFilteredColors(filtered);
    };

    useEffect(() => {
        setFilteredColors(customColors);
    }, [customColors]);

    const handleSubmitSelectedColor = () => {
        const newColors = selectedColors.filter(
            (color) =>
                (color.source === 'preset' || color.source === 'custom') &&
                !moreColors.some((c) => c.hexCode === color.hexCode)
        );

        if (newColors.length === 0) {
            alert("Selected color already exists in More Colors or nothing selected.");
            return;
        }

        setMoreColors((prev) => [...prev, ...newColors]);

        setSelectedColors([]);
        setIsColorSelected(false);
        setIsModalOpen(false);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewColor((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveColor = () => {
        if (newColor.colorName && newColor.hexCode) {
            setTempCustomColors((prev) => [...prev, newColor]);
            setNewColor({ colorName: "", hexCode: "" });
        }
    };

    const handleCartButtonClick = () => {
        if (isInCart) {
            navigate("/shoppingCart");
        } else {
            handleAddToCart();
        }
    };

    const handleAddToCart = async () => {
        if (!customer?.customerId) {
            alert("Please log in to add items to your cart.");
            return;
        }

        if (selectedColors.length === 0) {
            alert("Please select a color before adding to cart.");
            return;
        }

        try {
       

            moreColors.forEach(async (color)=> {
                const cart = await getCart(customer.customerId);
                const alreadyInCart = cart?.cartItems?.some(item => item.variantId === color.id);
    
                if (alreadyInCart) {
                    return;
                } else {

                    await addToCart(customer.customerId, color.id, 1);
                }
            })
            
            alert("Items added to cart");
            setIsInCart(true);
            setMoreColors([])
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add item to cart!");
        }
    };


    const handleAddColor = () => {
        const uniqueNewColors = tempCustomColors.filter(
            (newColor) =>
                !customColors.some(
                    (existingColor) =>
                        existingColor.colorName === newColor.colorName ||
                        existingColor.hexCode === newColor.hexCode
                )
        );

        if (uniqueNewColors.length === 0) {
            alert("Color already added!");
            return;
        }

        setCustomColors((prev) => [...prev, ...uniqueNewColors]);

        setPresetColors((prev) => [...prev, ...uniqueNewColors]);
        setTempCustomColors([]);
        setIsAddingColor(false);
    };

    if (!product) return <p>No product details available</p>;


    // const handleColorSearch = (e) => {
    //     setSearchColor(e.target.value.toLowerCase());
    // }


    // const filteredColors = color.filter((item) =>
    //     item.colorName.toLowerCase().includes(searchColor) ||
    //     item.hexCode.toLowerCase().includes(searchColor)
    // );


    const visibleColors = color.slice(0, 4); // Only take the first 4 colors
    const hasMore = color.length > 4;


    const handleSelectColor = (color, source) => {

        
        const alreadySelected = selectedColors.some(
            (c) => c.hexCode === color.hexCode && c.source === source
        );

        if (alreadySelected) {
            // Remove if already selected
            setSelectedColors((prev) =>
                prev.filter(
                    (c) => !(c.hexCode === color.hexCode && c.source === source)
                )
            );
        } else {
            // Add to selection
            setSelectedColors((prev) => [...prev, { ...color, source }]);
        }

        setIsColorSelected(true);
    };


    // const handleColorSearch = (e) => {
    //     const searchText = e.target.value.toLowerCase();
    //     const filtered = customColors.filter(
    //         (color) =>
    //             color.colorName.toLowerCase().includes(searchText) ||
    //             color.hexCode.toLowerCase().includes(searchText)
    //     );
    //     setFilteredColors(filtered);
    // };

    let filteredColorsTemp = [];
    product.groupedVariants.forEach(aVarient => {
        if (aVarient.id == product.productId) {
            filteredColorsTemp.push(...aVarient.variants);
        }
        
    });
    filteredColorsTemp = filteredColorsTemp.filter ((aColor)=> {
        return  !!!(moreColors.find((tempColor) =>tempColor.id ==  aColor.id )) 
    }) 

    return (
        <div>

            <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
            <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>


            <div class="px-6 md:px-14 py-3">


                <div class="grid items-start grid-cols-1 lg:grid-cols-5 gap-8 mt-6">
                    <div class="lg:col-span-3">
                        <div class="grid sm:grid-cols-3 gap-2 text-center">
                            <div class="sm:col-span-2 bg-gray-100 flex items-center rounded">
                                <img src="/images/wool-item-1.png" alt="Product" class="w-full object-contain object-top" />
                            </div>

                            <div class="sm:space-y-2 w-full h-full max-sm:grid max-sm:grid-cols-2 max-sm:gap-2">
                                <div class="bg-gray-100 flex items-center rounded w-full h-[140px] sm:h-[200px]">
                                    <img src="/images/wool-item-1.png" alt="Product" class="w-full max-h-full object-contain object-top" />
                                </div>

                                <div class="bg-gray-100 flex items-center rounded w-full h-[140px] sm:h-[200px]">
                                    <img src="/images/wool-item-1.png" alt="Product" class="w-full max-h-full object-contain object-top" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full lg:col-span-2">

                        <span class="inline-flex items-center rounded-md bg-pink-200 px-2 py-1 text-xs font-medium text-pink-600 ring-1 ring-inset ring-pink-700/10">Sale off</span>
                        <div className='flex gap-3 lg:block'>
                            <p className="text-gray-800 text-2xl md:2xl font-bold mt-6">{product.productName} - {size}</p>
                            <div class="flex items-center space-x-1 gap-2 mt-6">
                                <div className='bg-yellow-100 d-flex gap-2 rounded-2 align-items-center h-50 px-2 py-1'>
                                    <span className='text-yellow-300'><TiStarFullOutline /></span>
                                    <p>4.5</p>
                                </div>

                                <h5 className='text-gray-400'>(32 reviews)</h5>
                            </div>
                        </div>
                        <div className='d-flex gap-2 align-items-center mt-3'>
                            <h4 className="purple-text font-bold text-2xl md:text-4xl">₹{price}</h4>
                            <div>
                                <p className='text-yellow-500 font-medium text-sm'>26% Off</p>
                                <p className="text-slate-400 font-medium"><s>₹{product.compareAtPrice}</s></p>
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

                            <div className="cursor-pointer flex gap-2 items-center mt-3" onClick={() => setIsModalOpen(true)}>
                                <img src="/images/select-color.png" className="w-10 h-10" alt="More Colors" />
                                <h4 className="text-sm text-center text-blue-600 font-semibold">Click here for color catalogue</h4>
                            </div>

                            <div
                                ref={modalRef}
                                className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg transform z-40 ${isModalOpen ? "translate-x-0" : "translate-x-full"
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
                                            />

                                            <label className="font-medium">Hex Code</label>
                                            <input
                                                type="text"
                                                name="hexCode"
                                                value={newColor.hexCode}
                                                onChange={handleInputChange}
                                                className="border p-2 rounded"
                                                placeholder='e.g. #fff000'
                                            />

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
                                                    <div className="grid grid-cols-3 gap-3 p-2">
                                                        {tempCustomColors.map((item, index) => (
                                                            <div key={index} className="border-4 rounded-md border-gray-300">
                                                                <div className="relative h-16 overflow-hidden">
                                                                    <div
                                                                        className="absolute inset-0 opacity-50"
                                                                        style={{ backgroundColor: item.hexCode }}
                                                                    ></div>
                                                                </div>
                                                                <h5 className="text-black font-bold text-center">{item.colorName}</h5>
                                                                <h5 className="text-black font-bold text-center">{item.hexCode}</h5>
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
                                            <input onChange={(e) => handleColorSearch(e)} className='border w-full rounded-md p-2 mt-2' placeholder='Search by name or hexcode'></input>
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

                              

                                        {customColors.length === 0 ?  (
                                            <div
                                                className="flex flex-col items-center justify-center bg-gray-100 p-3 cursor-pointer"
                                                onClick={() => setIsAddingColor(true)}
                                            >
                                                <span>
                                                    <FaPlus />
                                                </span>
                                                <h4>Add new color</h4>
                                            </div>
                                        ) : <div className="grid grid-cols-3 gap-3 p-2">
                                        {customColors.map((item, index) => (
                                            <ColorCard  onSelect={handleSelectColor} item={item}></ColorCard>
                                        ))}
                                    </div>}



                                        <h4 className="mt-4 text-lg font-semibold ">Preset Catalogue</h4>
                                         <div className="grid grid-cols-3 gap-3 p-2">
                                        {filteredColorsTemp.map((aVariant)=> {
                                                     return <ColorCard selected={selectedColors.find((color)=> color.id == aVariant.id ) ? true : false} onSelect={handleSelectColor} item={aVariant}></ColorCard>
                                                     
                                                    })
                                                }
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
                                                onClick={handleAddColor}
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
                                    ) : isColorSelected ? (
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
                        <div className='mt-6'>
                            <div className='overflow-auto'>
                                <div className="grid grid-cols-6 gap-3 p-2">
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
                        <div className='d-flex gap-2 mt-2'>
                            <button
                                onClick={handleCartButtonClick}
                                className="d-flex align-items-center justify-content-center gap-2 p-1 font-medium rounded flex-1 text-md bg-purple-100 purple-text">
                                ADD TO CART
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
                        <li class="text-gray-600 font-bold text-sm hover:bg-gray-100 py-3 px-8 cursor-pointer transition-all">Reviews</li>
                    </ul>

                    <div class="mt-8">
                        <h3 class="text-md md:text-lg font-bold text-gray-800">Product Description</h3>
                        <p class="text-sm text-gray-600 mt-4">Step up your footwear game with our premium men's shoes. Designed for comfort and crafted with a contemporary aesthetic, these versatile shoes are a must-have addition to your wardrobe. The supple and breathable materials ensure all-day comfort, making them perfect for everyday wear.</p>
                    </div>

                    <div class="mt-8">
                        <h3 class="text-md md:text-lg font-bold text-gray-800">Packaging & Delivery</h3>
                        <p class="text-sm text-gray-600 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias atque asperiores blanditiis eligendi tenetur. Nostrum esse quibusdam temporibus porro. Totam dolorem qui alias omnis excepturi nam magnam, soluta inventore, possimus iste commodi et, deserunt eius facere ipsam voluptates nesciunt beatae ducimus explicabo incidunt molestias similique assumenda. Quae doloribus consequuntur dolorum.</p>
                    </div>

                    <div class="mt-8">
                        <h3 class="text-md md:text-lg font-bold text-gray-800">Suggested Use</h3>
                        <p class="text-sm text-gray-600 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias atque asperiores blanditiis eligendi tenetur. Nostrum esse quibusdam temporibus porro. Totam dolorem qui alias omnis excepturi nam magnam, soluta inventore, possimus iste commodi et, deserunt eius facere ipsam voluptates nesciunt beatae ducimus explicabo incidunt molestias similique assumenda. Quae doloribus consequuntur dolorum.</p>
                    </div>

                    <div class="mt-8">
                        <h3 class="text-md md:text-lg font-bold text-gray-800">Other Ingrediets</h3>
                        <p class="text-sm text-gray-600 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias atque asperiores blanditiis eligendi tenetur. Nostrum esse quibusdam temporibus porro. Totam dolorem qui alias omnis excepturi nam magnam, soluta inventore, possimus iste commodi et, deserunt eius facere ipsam voluptates nesciunt beatae ducimus explicabo incidunt molestias similique assumenda. Quae doloribus consequuntur dolorum.</p>
                    </div>

                    <div class="mt-8">
                        <h3 class="text-md md:text-lg font-bold text-gray-800">Warnings</h3>
                        <p class="text-sm text-gray-600 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias atque asperiores blanditiis eligendi tenetur. Nostrum esse quibusdam temporibus porro. Totam dolorem qui alias omnis excepturi nam magnam, soluta inventore, possimus iste commodi et, deserunt eius facere ipsam voluptates nesciunt beatae ducimus explicabo incidunt molestias similique assumenda. Quae doloribus consequuntur dolorum.</p>
                    </div>


                </div>
            </div>

            <div className='px-6 md:px-14 py-3'> <ProductList></ProductList></div>
            <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
            <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
            <BottomNav></BottomNav>
        </div>

    )
}

export default ProductDetailPage