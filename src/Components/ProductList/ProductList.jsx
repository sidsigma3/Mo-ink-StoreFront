import React from 'react'
import ProductDetailBox from './ProductDetailBox'

const ProductList = () => {
  return (
    <div className='p-5'>

        <h3 className='text-3xl font-medium'>Top Selling Product</h3>

        <ul className='mt-4 overflow-auto d-flex gap-3'>
            <li>
                <ProductDetailBox></ProductDetailBox>
            </li>

            <li>
                <ProductDetailBox></ProductDetailBox>
            </li>


            <li>
                <ProductDetailBox></ProductDetailBox>
            </li>

            <li>
                <ProductDetailBox></ProductDetailBox>
            </li>

            <li>
                <ProductDetailBox></ProductDetailBox>
            </li>

        </ul>

    </div>
  )
}

export default ProductList