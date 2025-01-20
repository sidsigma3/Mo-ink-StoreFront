import React from 'react'
import FeturedBox from './FeturedBox'


const FeturedList = () => {
  return (
    <div className=' mt-2 bg-violet-100 px-5 pb-10'>

        <h3 className='text-3xl font-medium pt-14'>Featured Categories</h3>

        <ul className='overflow-auto m-0 d-flex gap-3 justify-content-around mt-5'>
            <li><FeturedBox productName={'Cotton Yran'} number={2}></FeturedBox></li>
            <li><FeturedBox productName={'Nylon Yran'} number={5}></FeturedBox></li>
            <li><FeturedBox productName={'Special Yran'} number={7}></FeturedBox></li>
            <li><FeturedBox productName={'Wool Yarn'} number={12}></FeturedBox></li>
            <li><FeturedBox productName={'Wool Yarn'} number={12}></FeturedBox></li>
            <li><FeturedBox productName={'Wool Yarn'} number={12}></FeturedBox></li>
        </ul>

       
    </div>
  )
}

export default FeturedList