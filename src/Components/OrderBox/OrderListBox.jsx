import React, { useState, useEffect } from 'react';
import { fetchProductsById } from '../../Services/ProductService';
import { Undo2 } from 'lucide-react';
import ReturnModal from '../Modal/ReturnModal';
import { updateOrderVariantStatuses } from '../../Services/OrderService';
import { downloadCreditReceipt } from '../../Services/InvoiceService';
import { TbFileInvoice } from "react-icons/tb";
import Toast from '../Toast/Toast';


const statusClassMap = {
  "New Order": "bg-blue-100 border border-blue-400 text-blue-600",
  "Shipped": "bg-yellow-100 border border-yellow-400 text-yellow-700",
  "Manufactured": "bg-purple-100 border- border-purple-400 text-purple-700",
  "Delivered": "bg-green-100 border border-green-400 text-green-600",
  "Cancelled": "bg-red-100 border border-red-400 text-red-600",
  "Returned": "bg-gray-100 border border-gray-400 text-gray-600",
};

const OrderListBox = ({ item , status , orderId}) => {
  const [productName, setProductName] = useState("Product");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returnRequested, setReturnRequested] = useState(item.status === 'RETURN_REQUESTED');
  const [pricePerKg, setPricePerKg] = useState(0);
  const [gstRate, setGstRate] = useState(0);
  const [productFetched, setProductFetched] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [productImage,setProductImage] = useState()
  const backendUrl = process.env.REACT_APP_IMAGE_URL

  const weight = parseFloat(item.orderWeight) || 0;
  
  const fetchProductData = async () => {
    const res = await fetchProductsById(item.productId);
    if (res.success) {
      const product = res.data;
      setProductName(product.productName);
      setGstRate(Number(product.gstOnProduct) || 0);
      setProductImage(product.productImage)

      const matchedVariant = product.variants.find(
        (v) =>
          v.size === item.size &&
          v.color?.id === item.color?.id &&
          (item.variantType ? v.variantType === item.variantType : true)
      );
  
      setPricePerKg(matchedVariant?.pricePerKg || 0);
      setProductFetched(true);
    }
  };
  

  useEffect(() => {
    if (item?.productId) {
      fetchProductData();
    }
  }, [item.productId]);

  // Compute pricing only after data is fetched
  const baseCost = weight * pricePerKg;
  // const discountedCost = baseCost - (baseCost * combinedDiscountPercent) / 100;
  // const gstAmount = (discountedCost * gstRate) / 100;
  // const totalPrice = discountedCost + gstAmount;


  const handleConfirmReturn = async ({ reason, comment ,returnWeight}) => {

     const showToast = (message, type = "error") => {
            setToasts([{ message, type }]);
            setTimeout(() => setToasts([]), 3000);
          };

    try {
      await updateOrderVariantStatuses(orderId, 
        {
          orderVariantId: item.orderVariantId,
          status: "RETURN_REQUESTED",
          reason,
          returnWeight,
          remark: comment || "Customer initiated return",
        },
      );

      setReturnRequested(true);
      showToast("Return request submitted successfully!", "success");
    } catch (error) {
      console.error("Failed to submit return request", error);
      showToast("Failed to submit return request", "error");
    } finally {
      setIsModalOpen(false);
    }
  };


  const handleDownloadCreditReceipt = async (orderId,type,orderVariantId) => {
    try {
      
      await downloadCreditReceipt(orderId, type, orderVariantId);
    } catch (error) {
      console.error("Failed to download credit receipt:", error);
    }
  };


  const statusOptions = {
    NEW: "New Order" ,
    CANCELLED: "Cancelled",
    CONFIRMED: "Confirmed",
    MANUFACTURING: "Manufactured",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
    RETURNED: "Returned",
    RETURN_REQUESTED: "Return Requested",
    RETURN_REJECTED: "Return Rejected",
  };

  const statusClassMap = {
    NEW: "bg-blue-100 border border-blue-400 text-blue-600",
    CONFIRMED: "bg-lime-100 border border-lime-400 text-lime-600" ,
    SHIPPED: "bg-yellow-100 border border-yellow-400 text-yellow-700",
    MANUFACTURING: "bg-purple-100 border border-purple-400 text-purple-700",
    DELIVERED: "bg-green-100 border border-green-400 text-green-600",
    CANCELLED: "bg-red-100 border border-red-400 text-red-600",
    RETURNED: "bg-gray-100 border border-gray-400 text-gray-600",
    RETURN_REQUESTED: "bg-orange-100 border border-orange-400 text-orange-600",
    RETURN_REJECTED: "bg-pink-100 border border-pink-400 text-pink-600",
  };
  
  
const getImageByVariantType = (variantType) => {
  if (!productImage || productImage.length === 0) return '';

  const match = productImage.find((url) =>
    url.includes(variantType.toLowerCase())
  );

  return match || '';
};


  return (
    <div className="grid grid-cols-10 gap-2 relative  justify-center rounded-lg bg-white">
      
      {/* Product Image */}
      <div className="col-span-3 lg:col-span-2 flex items-center justify-end">
        <img
          src={`${backendUrl}${item.color?.colorImage}`}
          // src={`${backendUrl}${getImageByVariantType(item.variantType)}`}
          className="rounded-md size-32"
          alt="Product"
        />
      </div>


      {/* Product Info */}
      <div className="col-span-4 lg:col-span-3 flex flex-col justify-between">
        <div>
          <h3 className="text-sm lg:text-lg font-bold">
            {productName} - {item.size} - {item.variantType.toLowerCase()}
          </h3>
          <div className="flex flex-col gap-2 items-start mt-2 gap-1">
            {/* <div
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: item.color.colorCode }}
            ></div> */}
            <h5 className="text-sm lg:text-base font-bold text-gray-500">{item.color.colorName} </h5>
             <h5 className="text-sm lg:text-base font-bold text-gray-500">{item.color.colorCode.toUpperCase()}</h5>
          </div>
          
        </div>

        {/* Mobile Status */}
        <div className="block lg:hidden mt-3">
        <span
          className={`text-md font-semibold px-4 py-1 rounded-md ${statusClassMap[item.status] || ''}`}
        >
          {statusOptions[item.status]}
        </span>

        </div>
      </div>

      {/* Status Badge (Desktop) */}
      <div className="col-span-3 lg:col-span-2 hidden lg:flex justify-center items-center">
        <span
          className={`text-md font-semibold px-4 py-1 rounded-md ${statusClassMap[item.status] || ''}`}
        >
          {statusOptions[item.status]}
        </span>
      </div>

      {/* Pricing and Return Button */}
      <div className="col-span-3 lg:col-span-2 flex flex-col justify-center items-center relative">
        <div className="flex items-center gap-2">
          <div className="text-right">
            <h4 className="text-xl font-bold text-purple-800">
              ₹{baseCost.toFixed(0)}
            </h4>
            <p className="text-gray-500 font-medium">
              Weight: {weight}KG
            </p>

            {returnRequested && (
              <span className="mt-2 inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded">
                <span className="w-2 h-2 me-2 rounded-full bg-yellow-600"></span>
                Return Requested
              </span>
            )}
          </div>

          {status === 'DELIVERED' && item.status !== 'RETURNED' && item.status!=='CANCELLED' && (
             <button
             className={`text-gray-500 ms-3 hover:text-gray-900 focus:outline-none ${
               returnRequested ? "opacity-50 cursor-not-allowed" : ""
             }`}
             onClick={() => {
               if (!returnRequested) {
                 setDropdownOpen(!dropdownOpen);
               }
             }}
             disabled={returnRequested}
           >
             <Undo2 className="w-6 h-6" />
           </button>
          )}
         
        </div>

        {dropdownOpen && (
          <div className="absolute top-20 right-0 mt-1 w-40 bg-purple-800 border-2 border-purple-100 shadow-md rounded-md z-10">
            <button
              className="block w-full text-white font-medium text-left px-4 py-2 hover:bg-purple-700 rounded-md text-sm"
              onClick={() => {
                setDropdownOpen(false);
                setIsModalOpen(true);
              }}
            >
              Request Return
            </button>
          </div>
        )}
      </div>

       {
         (item.status === 'RETURNED') && (
           <div className='flex flex-column justify-center'>
            <button
              onClick={() => handleDownloadCreditReceipt(orderId, "returned",item.orderVariantId)}
              className=' bg-green-100 text-green-800  text-sm md:text-md font-medium flex gap-2  px-2 py-1 h-8 w-40 rounded items-center'
            >
              <TbFileInvoice size={20} />
              <h5>Return Receipt</h5>
            </button>
            </div>
          )}

      {/* Return Modal */}
      <ReturnModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmReturn}
        weight={item.orderWeight}

      />

        {/* Toast Notification */}
     <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() =>
                            setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                        }
                    />
                ))}
            </div>
    </div>

    
  );
};

export default OrderListBox;
