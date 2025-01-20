import React from 'react'
import { TiStarFullOutline } from "react-icons/ti";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

const ProductDetailBoxMini = ({productName,number}) => {
  return (
    <div>
        <a className="flex relative block bg-white divide-y divide-dotted w-full">
          

           

            <img
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="h-30 w-1/2 rounded-tr-3xl object-cover"
                style={{height:'11rem'}}
            />

            <div className="p-4 w-1/2">
                <h5 className='font-medium'>Cotton - 2/74 (Grey)</h5>

               
                <div className='mt-2 d-flex justify-content-between rounded'>
                    <div className='d-flex gap-2 align-items-center'>
                    <h4 className='purple-text font-semibold text-3xl'>₹328.85</h4>
                    <p className='text-slate-400'><s>₹542.85</s></p>
                    </div>

                    <div className='bg-yellow-100 d-flex gap-2 align-items-center h-50 p-1'>
                        <span className='text-yellow-300'><TiStarFullOutline /></span>
                        <p>4.5</p>
                    </div>
                    
                    
                </div>


                <div className='d-flex align-items-center justify-content-between mt-3'>
                    <div className='border px-4 py-2 rounded col-5'>
                        <h5>100 Kg</h5>
                    </div>

                    <div className='col-5'>
                        <label htmlFor="Quantity" className="sr-only"> Quantity </label>

                        <div className="flex justify-between rounded border border-gray-200">
                            <button type="button" className="size-10 leading-10 text-gray-600 transition hover:opacity-75">
                            &minus;
                            </button>

                            <input
                            type="number"
                            id="Quantity"
                            value="1"
                            className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                            />

                            <button type="button" className="size-10 leading-10 text-gray-600 transition hover:opacity-75">
                            +
                            </button>
                        </div>
                        </div>
                </div>


              


            </div>

            
            </a>
    </div>
  )
}

export default ProductDetailBoxMini