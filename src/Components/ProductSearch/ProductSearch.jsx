import React from 'react'
import { Dropdown, DropdownHeader, DropdownMenu } from 'react-bootstrap'
import './ProductSearch.css'
import Divider from '@mui/material/Divider';


const ProductSearch = () => {
  return (
    <div className='product-search d-flex bg-white gap-3 purple-border border-2 rounded' style={{width:'30rem'}}>

        <Dropdown >
            <Dropdown.Toggle variant='light' className='bg-white border-0 fw-medium'>All categories</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item>Cotton</Dropdown.Item>
                <Dropdown.Item>Silk</Dropdown.Item>
                <Dropdown.Item>Nylon</Dropdown.Item>

            </Dropdown.Menu>
        </Dropdown>

        <Divider orientation="vertical" variant="middle" flexItem />

        <input placeholder='search for item' className='border-0 w-100 ps-2 me-2'></input>


    </div>
  )
}

export default ProductSearch