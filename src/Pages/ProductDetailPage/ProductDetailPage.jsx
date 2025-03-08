import React , {useState} from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import ProductList from '../../Components/ProductList/ProductList'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import { TiStarFullOutline } from "react-icons/ti";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import BottomNav from '../../Components/BottomNav/BottomNav'


const ProductDetailPage = () => {

    const location = useLocation();
    const { product, size, color, price } = location.state || {};

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchColor,setSearchColor] = useState('')
    const [isAddingColor, setIsAddingColor] = useState(false);
    const [newColor, setNewColor] = useState({ colorName: "", hexCode: "" });
    const [tempCustomColors, setTempCustomColors] = useState([]); // Temporary added colors before finalizing
    const [customColors, setCustomColors] = useState([]); // Final custom colors added to catalog

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewColor((prev) => ({ ...prev, [name]: value }));
    };

    // Save color to temporary list (form only)
    const handleSaveColor = () => {
        if (newColor.colorName && newColor.hexCode) {
        setTempCustomColors((prev) => [...prev, newColor]);
        setNewColor({ colorName: "", hexCode: "" }); // Reset input fields
        }
    };

    // Add colors from temporary list to the catalog & switch view
    const handleAddColor = () => {
        setCustomColors((prev) => [...prev, ...tempCustomColors]);
        setTempCustomColors([]); // Clear temporary colors
        setIsAddingColor(false); // Switch back to catalog view
    };
  
    if (!product) return <p>No product details available</p>;


    const handleColorSearch = (e) =>{
        setSearchColor(e.target.value.toLowerCase());
    }

    
    const filteredColors = color.filter((item) => 
        item.colorName.toLowerCase().includes(searchColor) || 
        item.hexCode.toLowerCase().includes(searchColor)
      );

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
                <p className="text-gray-800 text-3xl font-bold mt-6">{product.productName} - {size}</p>
                <div class="flex items-center space-x-1 gap-2 mt-6">
                    <div className='bg-yellow-100 d-flex gap-2 rounded-2 align-items-center h-50 px-2 py-1'>
                        <span className='text-yellow-300'><TiStarFullOutline /></span>
                        <p>4.5</p>
                      </div>

                      <h5 className='text-gray-400'>(32 reviews)</h5>
                </div>
                </div>
                <div className='d-flex gap-2 align-items-center mt-3'>
                <h4 className="purple-text font-bold text-4xl">₹{price}</h4>
                <div>
                <p className='text-yellow-500 font-medium text-sm'>26% Off</p>
                <p className="text-slate-400 font-medium"><s>₹{product.compareAtPrice}</s></p>
                </div>
              
                </div>


                <div className='mt-6'>
                    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quia odio repellat fugit illum voluptatem accusantium excepturi vero expedita similique modi quasi dolore voluptate fugiat sed minus, nemo in facilis. Magni qui nam perspiciatis iure temporibus? Officiis expedita necessitatibus ad, magni amet, sunt ipsam debitis velit tempore veniam id mollitia!</p> */}
                    <p>{product.productDescription}</p>
                </div>

               
                <div className='flex mt-6 text-gray-500 gap-2 items-center'>
                    <h5>Size/Weight:</h5>
                    <ul className='flex gap-3'>
                        {/* <li>50Kg</li>
                        <li>100Kg</li>
                        <li>150Kg</li>
                        <li>200Kg</li>   
                        <li>250Kg</li> */}
                         <li>{size} Kg</li>
                    </ul>
                </div>
                
                <h5 className='mt-3'>Colors :</h5>
                <div className="flex gap-3 mt-1 items-center">
                <div className="flex gap-3">
                {color.map((item, index) => (
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
            </div>

                {/* More Colors Button */}
                <div className="cursor-pointer flex flex-col items-center" onClick={() => setIsModalOpen(true)}>
                    <img src="/images/select-color.png" className="w-10 h-10" alt="More Colors" />
                    <h4 className="text-blue-600 font-semibold">MORE COLORS</h4>
                </div>

                <div
                    className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg transform z-40 ${
                        isModalOpen ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out p-4`}
                    >
                    {/* Close Button */}
                    <button
                        className="absolute top-3 right-3 text-xl font-bold"
                        onClick={() =>{
                            setIsModalOpen(false)
                            setIsAddingColor(false)
                            setNewColor({})
                        }
                        }
                    >
                        &times;
                    </button>

                    {/* Modal Header */}
                    <h2 className="text-lg font-semibold">{isAddingColor ? "Add New Color" : "Add Colors"}</h2>

                    {/* Add Color View */}
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
                            />

                            {/* Color Preview */}
                            {newColor.hexCode && (
                            <div
                                className="w-16 h-16 border rounded mt-2"
                                style={{ backgroundColor: newColor.hexCode }}
                            ></div>
                            )}

                            {/* Save Button */}
                            <button
                            onClick={handleSaveColor}
                            className="bg-violet-600 text-white p-2 rounded mt-3"
                            >
                            SAVE COLOR
                            </button>

                            {/* List of Temporarily Added Colors */}
                            {tempCustomColors.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold">Added Colors:</h4>
                                <div className="grid grid-cols-3 gap-3 p-2">
                                {tempCustomColors.map((item, index) => (
                                    <div key={index} className="border-4 rounded-md border-gray-300">
                                    <div className="relative w-16 h-16 overflow-hidden">
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
                        // Catalogue View
                        <div>
                            <div>
                                <input onChange={(e)=>handleColorSearch(e)} className='border w-full rounded-md p-2 mt-2' placeholder='Search by name or hexcode'></input>
                            </div>

                            <div className='flex justify-between items-center mt-3 mb-3 border-b-2 pb-3'>
                                <h3 className="text-lg font-semibold ">Custom Colors</h3>
                            
                                {customColors.length > 0 && (
                                    <div
                                    className="flex  items-center gap-3 bg-violet-800 text-white rounded-md p-3 cursor-pointer"
                                    onClick={() => setIsAddingColor(true)}
                                >
                                    <span>
                                    <FaPlus />
                                    </span>
                                    <h4>New color</h4>
                                </div>
                                )}
                            </div>

                        {/* Custom Colors List */}
                        <div className="grid grid-cols-3 gap-3 p-2">
                        {customColors.map((item, index) => (
                            <div key={index} className="border-4 rounded-md border-gray-300">
                            <div className="relative w-20 h-20 overflow-hidden">
                                {/* Product Image */}
                                <img
                                src="/images/wool-item-1.png"
                                className="w-full h-full object-cover"
                                alt="Product"
                                />
                                {/* Color Overlay */}
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
                        ))}
                        </div>

                        {/* Add New Color Button */}
                        {customColors.length === 0 && (
                             <div
                             className="flex flex-col items-center justify-center bg-gray-100 p-3 cursor-pointer"
                             onClick={() => setIsAddingColor(true)}
                         >
                             <span>
                             <FaPlus />
                             </span>
                             <h4>Add new color</h4>
                         </div>
                        )}

                       

                        {/* Present Catalogue */}
                        <h4 className="mt-4 text-lg font-semibold ">Preset Catalogue</h4>
                        <div className="grid grid-cols-3 gap-3 p-2">
                            {filteredColors.map((item, index) => (
                            <div key={index} className="border-4 rounded-md border-gray-300">
                                <div className="relative w-20 h-20 overflow-hidden">
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
                        </div>
                    )}

                    {/* Footer Buttons */}
                    <div className="flex justify-between mt-4 absolute bottom-0 w-full pr-8 py-3">
                       {isAddingColor ? (
                        <button
                        className="bg-gray-300 text-white p-2 rounded"
                        onClick={() => setIsAddingColor(false)}
                        >
                        VIEW CATALOUGE
                        </button>
                        ) : (
                        
                        <button
                        className="bg-gray-300 text-white p-2 rounded"
                        onClick={() => setIsModalOpen(false)}
                        >
                        CANCEL
                        </button>

                       )}

                        {isAddingColor ? (
                        <button
                            className="bg-violet-200 text-violet-800 p-2 rounded"
                            onClick={handleAddColor}
                        >
                            ADD COLOR
                        </button>
                        ) : (
                        <button
                            className="bg-violet-200 text-violet-800 p-2 rounded"
                            onClick={() => setIsAddingColor(true)}
                        >
                            ADD COLOR
                        </button>
                        )}
                    </div>
                    </div>

                
                
                </div>

                   <div className='d-flex gap-2 mt-3'>
                            <div className="flex justify-between rounded border border-gray-200">
                            <button type="button" className="size-7 leading-10 text-gray-600 transition hover:opacity-75">
                            &minus;
                            </button>

                            <input
                            type="number"
                            id="Quantity"
                            value="1"
                            className="h-10 w-10 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                            />

                            <button type="button" className="size-7 leading-10 text-gray-600 transition hover:opacity-75">
                            +
                            </button>
                        </div>
                
                        <button className='d-flex align-items-center justify-content-center gap-2 bg-violet-800 p-2 text-white font-medium rounded flex-1 text-sm'>ADD TO CART <span><MdOutlineShoppingCart size={20}/></span></button>

                        <button className='bg-purple-100 p-2 purple-text rounded px-4'><span><FaRegHeart /></span></button>

                    </div>


                   
                            <div className='grid grid-cols-2 gap-3 mt-6'>
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
                <h3 class="text-lg font-bold text-gray-800">Product Description</h3>
                <p class="text-sm text-gray-600 mt-4">Step up your footwear game with our premium men's shoes. Designed for comfort and crafted with a contemporary aesthetic, these versatile shoes are a must-have addition to your wardrobe. The supple and breathable materials ensure all-day comfort, making them perfect for everyday wear.</p>
                </div>

                <div class="mt-8">
                <h3 class="text-lg font-bold text-gray-800">Packaging & Delivery</h3>
                <p class="text-sm text-gray-600 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias atque asperiores blanditiis eligendi tenetur. Nostrum esse quibusdam temporibus porro. Totam dolorem qui alias omnis excepturi nam magnam, soluta inventore, possimus iste commodi et, deserunt eius facere ipsam voluptates nesciunt beatae ducimus explicabo incidunt molestias similique assumenda. Quae doloribus consequuntur dolorum.</p>
                </div>

                <div class="mt-8">
                <h3 class="text-lg font-bold text-gray-800">Suggested Use</h3>
                <p class="text-sm text-gray-600 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias atque asperiores blanditiis eligendi tenetur. Nostrum esse quibusdam temporibus porro. Totam dolorem qui alias omnis excepturi nam magnam, soluta inventore, possimus iste commodi et, deserunt eius facere ipsam voluptates nesciunt beatae ducimus explicabo incidunt molestias similique assumenda. Quae doloribus consequuntur dolorum.</p>
                </div>

                <div class="mt-8">
                <h3 class="text-lg font-bold text-gray-800">Other Ingrediets</h3>
                <p class="text-sm text-gray-600 mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias atque asperiores blanditiis eligendi tenetur. Nostrum esse quibusdam temporibus porro. Totam dolorem qui alias omnis excepturi nam magnam, soluta inventore, possimus iste commodi et, deserunt eius facere ipsam voluptates nesciunt beatae ducimus explicabo incidunt molestias similique assumenda. Quae doloribus consequuntur dolorum.</p>
                </div>

                <div class="mt-8">
                <h3 class="text-lg font-bold text-gray-800">Warnings</h3>
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