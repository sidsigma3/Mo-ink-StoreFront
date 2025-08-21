import React, { useState, useMemo } from 'react';
import { TbFileInvoice } from "react-icons/tb";
import { CiStar } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";
import { downloadInvoice } from '../../Services/InvoiceService';
import { downloadCreditReceipt } from '../../Services/InvoiceService';
import Toast from '../Toast/Toast';

const OrderBox = ({order}) => {
  const [toasts, setToasts] = useState([]);

  const handleDownloadInvoice = async(orderId) => {
    const result = await downloadInvoice(orderId);
    const showToast = (message, type = "error") => {
      setToasts([{ message, type }]);
      setTimeout(() => setToasts([]), 3000);
    };

    if (!result.success) {
      showToast("Failed to download invoice.", "error");
    }
  };

  const handleDownloadCreditReceipt = async (e,orderId,type) => {
    e.stopPropagation()
    try {
      await downloadCreditReceipt(orderId, type);
    } catch (error) {
      console.error("Failed to download credit receipt:", error);
    }
  };

const calculatedAmounts = useMemo(() => {
  const orderVariants = order.orderVariantResponse || [];
  
  const activeVariants = orderVariants.filter(variant => 
    variant.status !== 'CANCELLED' && variant.status !== 'RETURNED'
  );
  
  // Calculate totals
  const totalWeight = orderVariants.reduce((sum, item) => sum + Number(item.orderWeight || 0), 0);
  const activeWeight = activeVariants.reduce((sum, item) => sum + Number(item.orderWeight || 0), 0);
  
  const totalCancelledItems = orderVariants.reduce((total, item) => {
    if (item.status === 'CANCELLED') total += 1;
    return total;
  }, 0);

  const totalReturnedItems = orderVariants.reduce((total, item) => {
    if (item.status === 'RETURNED') total += 1;
    return total;
  }, 0);

  let adjustedNetPay = 0;
  let refundAdjustedWalletUsed = 0;
  
  if (activeVariants.length > 0) {
    const activeItemsDiscountedPrice = activeVariants.reduce((sum, item) => {
      const itemPrice = Number(item.discountedPrice || item.finalPrice || item.price || 0);
      return sum + itemPrice;
    }, 0);
    
    let discountedPriceOfActiveItems = activeItemsDiscountedPrice;
    
    if (activeItemsDiscountedPrice === 0 && activeWeight > 0 && totalWeight > 0) {
      const totalOrderValue = Number(order.totalAmount || order.totalCost || 0);
      const totalDiscount = Number(order.totalDiscount || 0);
      const totalDiscountedPrice = totalOrderValue - totalDiscount;
      
      const activeWeightRatio = activeWeight / totalWeight;
      discountedPriceOfActiveItems = totalDiscountedPrice * activeWeightRatio;
    }
    
    const totalGST = Number(order.gstAmount || 0);
    const gstForActiveItems = totalWeight > 0 ? (totalGST * activeWeight / totalWeight) : 0;
    
    const totalPlatformFees = Number(order.platformFees || 0);
    const platformFeesForActiveItems = totalWeight > 0 ? 
      (totalPlatformFees * activeWeight / totalWeight) : 0;
    
    const totalHandlingCharges = Number(order.handlingCharges || 0);
    const handlingChargesForActiveItems = totalWeight > 0 ? 
      (totalHandlingCharges * activeWeight / totalWeight) : 0;
    
    const totalWalletUsed = Number(order.walletUsed || 0);
    const inactiveWeight = totalWeight - activeWeight;
    const refundAdjustmentRatio = totalWeight > 0 ? (inactiveWeight / totalWeight) : 0;
    refundAdjustedWalletUsed = totalWalletUsed * (1 - refundAdjustmentRatio);
    
    adjustedNetPay = discountedPriceOfActiveItems + 
                    gstForActiveItems + 
                    platformFeesForActiveItems + 
                    handlingChargesForActiveItems - 
                    refundAdjustedWalletUsed;
    
    adjustedNetPay = Math.max(0, adjustedNetPay);
  }

  return {
    adjustedNetPay: Math.round(adjustedNetPay * 100) / 100, 
    totalWeight,
    activeWeight,
    totalCancelledItems,
    totalReturnedItems,
    activeVariants: activeVariants.length,
    totalVariants: orderVariants.length,
    refundAdjustedWalletUsed: Math.round(refundAdjustedWalletUsed * 100) / 100
  };
}, [order]);


  const orderDateObj = new Date(order.createdAt); 
  const estimatedDeliveryDateObj = new Date(orderDateObj);
  estimatedDeliveryDateObj.setDate(orderDateObj.getDate() + 18);

  const estimatedDeliveryDate = estimatedDeliveryDateObj.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='grid grid-cols-9 md:grid-cols-7 gap-3 border-1 rounded p-3'>
      <div className='col-span-3 md:col-span-2 lg:col-span-1'>
        <img src='https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/download%20(14).png?updatedAt=1755759401456' className='w-5/4 aspect-square object-cover rounded-md' alt='Wool Item' />
      </div>

      <div className='col-span-6 md:col-span-3 lg:col-span-2 flex flex-col items-start justify-center text-gray-500 font-medium'>
        <div className='flex justify-between'>
          <h5>Order ID: <span className='text-dark font-bold'>{order.orderId}</span></h5>
        </div>

        <h5 className='mt-2'>
          Total: <span className='text-dark-400 font-bold'>₹{calculatedAmounts.adjustedNetPay}</span>
          {calculatedAmounts.totalCancelledItems > 0}
        </h5>

        <h5 className='mt-2'>
          Weight: <span className='text-dark-400 font-bold'>{calculatedAmounts.activeWeight}Kg</span>
          {calculatedAmounts.totalCancelledItems > 0}
        </h5>

        <h4 className='mt-2'>
          <span className='font-semibold text-green-600'>Delivery expected</span> before 
          <span className='font-semibold text-dark-600'> {estimatedDeliveryDate}</span>
        </h4>

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
        {calculatedAmounts.totalReturnedItems > 0 && (
          <span className="bg-yellow-100 text-yellow-800 text-sm md:text-md font-medium flex gap-2 px-6 py-1 h-8 w-46 rounded items-center">
            <span className="w-2 h-2 me-2 rounded-full bg-yellow-600"></span>
            Returned ({calculatedAmounts.totalReturnedItems} items)
          </span>
        )}

        {calculatedAmounts.totalCancelledItems > 0 && (
          <span className="bg-red-100 text-red-800 text-sm md:text-md font-medium flex gap-2 px-6 py-1 h-8 w-46 rounded items-center">
            <span className="w-2 h-2 me-2 rounded-full bg-red-600"></span>
            Cancelled ({calculatedAmounts.totalCancelledItems} items)
          </span>
        )}

        {calculatedAmounts.adjustedNetPay === 0 && calculatedAmounts.totalCancelledItems === calculatedAmounts.totalVariants && (
          <span className="bg-gray-100 text-gray-800 text-sm md:text-md font-medium flex gap-2 px-6 py-1 h-8 w-46 rounded items-center">
            <span className="w-2 h-2 me-2 rounded-full bg-gray-600"></span>
            Fully Refunded
          </span>
        )}
      </div>

      <div className='hidden md:flex md:col-span-1 flex-col items-center justify-center gap-2'>
        {(order.status === 'SHIPPED' || order.status === 'DELIVERED' || order.status === 'RETURNED') && (
          <button 
            onClick={(e) => {
              e.stopPropagation()
              handleDownloadInvoice(order.orderId)
            }}
            className='bg-purple-100 text-purple-800 text-sm md:text-md font-medium flex gap-2 px-6 py-1 h-8 w-48 rounded items-center'
          >
            <span><TbFileInvoice size={20}/></span>
            <h5>Order Invoice</h5>
          </button>
        )}

        {order.cancelCreditReceiptGenerated === "true" && (
          <button
            onClick={(e) => handleDownloadCreditReceipt(e,order.orderId, "cancelled")}
            className='bg-red-100 text-red-800 text-sm md:text-md font-medium flex gap-2 px-6 py-1 h-8 w-48 rounded items-center'
          >
            <TbFileInvoice size={20} />
            <h5>Cancel Receipt</h5>
          </button>
        )}
      </div>

      <div className='flex items-center justify-end hidden md:flex'>
        <span className='text-gray-400'><MdArrowForwardIos size={20}/></span>
      </div>

      {/* Toast Notification */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast, index) => (
          <Toast
            key={index}
            message={toast.message}
            type={toast.type}
            onClose={() =>
              setToasts((prev) => prev.filter((_, i) => i !== index))
            }
          />
        ))}
      </div>
    </div>
  )
}

export default OrderBox