import React from 'react'

const OrderListBox = () => {
  return (
    <div className='grid grid-cols-10 gap-4'>
        <div>
            <img src='/images/wool-item-1.png' className='h-30 rounded-md w-full'></img>
        </div>

        <div className='col-span-7 '>
            <h3 className='text-xl font-semibold'>Cotton - 2/74</h3>

            <div className='flex gap-2 items-center mt-2'>
                <div className='w-6 h-6 rounded-full bg-gray-500'></div>
                <h5>(Ivory Grey)</h5>
            </div>
        </div>

        <div className='col-span-2 flex flex-col justify-center items-end'>
            <h4 className='text-2xl font-bold text-violet-800'>₹4056.36</h4>
            <p className='font-medium text-gray-500'>Weight: 100KG</p>
        </div>


    </div>
  )
}

export default OrderListBox