import React from 'react'
import { TbFileInvoice } from "react-icons/tb";
import { CiStar } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";
import { downloadInvoice } from '../../Services/InvoiceService';
import { downloadCreditReceipt } from '../../Services/InvoiceService';

const OrderBox = ({order}) => {

    const handleDownloadInvoice = async(orderId) => {
        const result = await downloadInvoice(orderId);
        if (!result.success) {
          alert("Failed to download invoice.");
        }
      };
    
      const totalWeight = order.orderVariantResponse?.reduce((sum, item) => sum + Number(item.orderWeight), 0) || 0;

      const totalCancelledItems = order.orderVariantResponse.reduce((total, item) => {
        if (item.status === 'CANCELLED') {
            total += 1;
        }
        return total;
    }, 0);

    const totalReturnedItems = order.orderVariantResponse.reduce((total, item) => {
      if (item.status === 'RETURNED') {
          total += 1;
      }
      return total;
  }, 0);
    
const handleDownloadCreditReceipt = async (e,orderId,type) => {
      e.stopPropagation()
      try {
        await downloadCreditReceipt(orderId, type);
      } catch (error) {
        console.error("Failed to download credit receipt:", error);
      }
    };

  return (
    <div className='grid grid-cols-9 md:grid-cols-7 gap-3 border-1 rounded p-3'>
        <div className='col-span-3 md:col-span-2 lg:col-span-1'>
        <img src='/images/wool-item-1.png' className='w-4/5 aspect-square object-cover rounded-md' alt='Wool Item' />
        </div>

        <div className='col-span-6 md:col-span-3 lg:col-span-2 flex flex-col items-start justify-center text-gray-500 font-medium'>

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

        <div className='col-span-9 md:col-span-2 flex flex-col items-start justify-center gap-2'>

      
  
    {totalReturnedItems > 0 && (
      <span className="bg-yellow-100 text-yellow-800 text-sm md:text-md font-medium flex gap-2  px-6 py-1 h-8 w-52 rounded items-center">
        <span className="w-2 h-2 me-2 rounded-full bg-yellow-600"></span>
        Returned ({totalReturnedItems} items)
      </span>
    )}
   

    {totalCancelledItems > 0 && (
       <span className="bg-red-100 text-red-800 text-sm md:text-md font-medium flex gap-2  px-6 py-1 h-8 w-52 rounded items-center">
       <span className="w-2 h-2 me-2 rounded-full bg-red-600"></span>
       Cancelled ({totalCancelledItems} items)
     </span>
    )}
   
  </div>

  <div className= 'col-span-9 md:col-span-1 flex flex-col items-start justify-center gap-2'>

  {(order.status === 'SHIPPED' || order.status === 'DELIVERED' || order.status === 'RETURNED') && (
          <button 
            onClick={(e) => {
              e.stopPropagation()
              handleDownloadInvoice(order.orderId)
            }}
            className=' bg-violet-100 text-violet-800 text-sm md:text-md font-medium flex gap-2  px-6 py-1 h-8 w-52 rounded items-center'
          >
            <span><TbFileInvoice size={20}/></span>
            <h5>Order Invoice</h5>
          </button>
           )}
     {order.orderVariantResponse?.some(variant => variant.status === 'CANCELLED') &&
                    order?.payment?.totalRefundAmount > 0 && (
                      <button

                        onClick={() => handleDownloadCreditReceipt(order.orderId, "CANCELLED")}
                        className=' bg-red-100 text-red-800  text-sm md:text-md font-medium flex gap-2  px-6 py-1 h-8 w-52 rounded items-center'

                      >
                        <TbFileInvoice size={20} />
                        <h5>Cancel Receipt</h5>
                      </button>
                    )}
    
                    {
                      order.orderVariantResponse?.some(variant => variant.status === 'RETURNED') && (
                        <button
                          onClick={() => handleDownloadCreditReceipt(order.orderId, "RETURNED")}
                          className='bg-green-100  text-green-800 text-sm md:text-md font-medium flex gap-2  px-6 py-1 h-8 w-52 rounded items-center'

                        >
                          <TbFileInvoice size={20} />
                          <h5 className='text-sm md:text-md'>Return Receipt</h5>
                        </button>
                     )}
  </div>


        <div className='flex items-center justify-end hidden md:flex'>
            <span className='text-gray-400'><MdArrowForwardIos size={20}/></span>
        </div>

    </div>
  )
}

export default OrderBox