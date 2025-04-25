import React from 'react'
import { TbFileInvoice } from "react-icons/tb";
import { CiStar } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";
import { downloadInvoice } from '../../Services/InvoiceService';

const OrderBox = ({order}) => {

    const handleDownloadInvoice = async(orderId) => {
        const result = await downloadInvoice(orderId);
        if (!result.success) {
          alert("Failed to download invoice.");
        }
      };
    
      const totalWeight = order.orderVariantResponse?.reduce((sum, item) => sum + Number(item.orderWeight), 0) || 0;


  return (
    <div className='grid grid-cols-9 md:grid-cols-7 gap-3 border-1 rounded p-3'>
        <div className='col-span-3 md:col-span-2 lg:col-span-1'>
            <img src='/images/wool-item-1.png' className='sm:h-2/3 md:h-40 rounded-md w-full'></img>
        </div>

        <div className='col-span-6 md:col-span-3 lg:col-span-4 text-gray-500 font-medium'>

        <div className='flex justify-between'>
            <h5>Order ID: <span className='text-black font-bold'>{order.orderId}</span></h5>
        </div>

        <h5 className='mt-2'>Total: ₹{order.totalAmount.toFixed(0)}</h5>

        <h5 className='mt-2'>Weight: {totalWeight}Kg</h5>

        <h4 className='mt-2'>Your order <span className='text-green-600'>Delivered</span> on Sunday, 05 February</h4>

        <div className='flex mt-2 gap-2'>
            <div className='flex'>
                <button><span><CiStar size={20} /></span></button>

                <button><span><CiStar size={20} /></span></button>

                <button><span><CiStar size={20} /></span></button>

                <button><span><CiStar size={20} /></span></button>

                <button><span><CiStar size={20} /></span></button>
            </div>

            <h5 className='hidden md:block'>Rate & review the product.</h5>
        </div>

        </div>

        <div className='col-span-9 md:col-span-1 flex flex-col items-end justify-center gap-1'>
  <button 
    onClick={(e) => {
      e.stopPropagation()
      handleDownloadInvoice(order.orderId)
    }}
    className='flex gap-2 bg-violet-100 text-violet-800 md:px-6 lg:px-8 py-1 rounded items-center'
  >
    <span><TbFileInvoice size={20}/></span>
    <h5 className='text-sm md:text-md'>INVOICE</h5>
  </button>

  {/* Return Status Tag */}
  {/* {order.isReturned && ( */}
    <span className="mt-2 inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded">
      <span className="w-2 h-2 me-2 rounded-full bg-yellow-600"></span>
      Returned ({order.totalReturnItems}2 items)
    </span>
  {/* )} */}
  <span className="mt-1 inline-flex items-center gap-1 bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded">
      <span className="w-2 h-2 me-2 rounded-full bg-red-600"></span>
      Cancelled ({order.totalCancelledItems}2 items)
    </span>
</div>


        <div className='flex items-center justify-end hidden md:flex'>
            <span className='text-gray-400'><MdArrowForwardIos size={20}/></span>
        </div>

    </div>
  )
}

export default OrderBox