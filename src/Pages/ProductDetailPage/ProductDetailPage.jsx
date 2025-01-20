import React from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import ProductList from '../../Components/ProductList/ProductList'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import { TiStarFullOutline } from "react-icons/ti";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

const ProductDetailPage = () => {
  return (
    <div>
       
        <div className='px-5 py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-5 py-3'> <Navbar></Navbar></div>


        <div class="px-5 py-3">
            

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
                <p class="text-gray-800 text-3xl font-bold">Cotton - 2/74(Grey)</p>
                <div class="flex items-center space-x-1 mt-2 gap-2">
                    <div className='bg-yellow-100 d-flex gap-2 rounded-2 align-items-center h-50 px-2 py-1'>
                        <span className='text-yellow-300'><TiStarFullOutline /></span>
                        <p>4.5</p>
                      </div>

                      <h5 className='text-gray-400'>(32 reviews)</h5>
                </div>

                <div className='d-flex gap-2 align-items-center'>
                <h4 className='purple-text font-bold text-4xl'>₹328.85</h4>
                <div>
                <p className='text-yellow-500 font-medium text-sm'>26% Off</p>
                <p className='text-slate-400 font-medium'><s>₹542.85</s></p>
                </div>
              
                </div>


                <div className='mt-6'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quia odio repellat fugit illum voluptatem accusantium excepturi vero expedita similique modi quasi dolore voluptate fugiat sed minus, nemo in facilis. Magni qui nam perspiciatis iure temporibus? Officiis expedita necessitatibus ad, magni amet, sunt ipsam debitis velit tempore veniam id mollitia!</p>
                </div>

               
                <div className='flex mt-6 text-gray-500 gap-2 items-center'>
                    <h5>Size/Weight:</h5>
                    <ul className='flex gap-3'>
                        <li>50Kg</li>
                        <li>100Kg</li>
                        <li>150Kg</li>
                        <li>200Kg</li>   
                        <li>250Kg</li>
                    </ul>
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
                
                        <button className='d-flex align-items-center justify-content-center gap-2 bg-violet-800 p-2 text-white font-medium rounded flex-1'>ADD TO CART <span><MdOutlineShoppingCart size={20}/></span></button>

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

        <div className='px-5 py-3'> <ProductList></ProductList></div>
        <div className='px-5 py-3 mt-10'><Cta></Cta></div>
        <div className='px-5 py-3'> <Footer></Footer></div>

    </div>
  )
}

export default ProductDetailPage