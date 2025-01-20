import React from 'react'
import ProductDetailBox from './ProductDetailBox'

const ProductList = () => {
  return (
    <div className=''>

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