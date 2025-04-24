import React, { useState, useEffect } from 'react';
import { fetchProductsById } from '../../Services/ProductService';
import { Undo2 } from 'lucide-react';
import ReturnModal from '../Modal/ReturnModal';

const OrderListBox = ({ item }) => {
  const [productName, setProductName] = useState("Product");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returnRequested, setReturnRequested] = useState(false);

  const totalPrice = parseFloat(item.orderWeight) * item.pricePerKg;

  useEffect(() => {
    const getProductName = async () => {
      const res = await fetchProductsById(item.productId);
      if (res.success) {
        setProductName(res.data.productName);
      }
    };

    if (item?.productId) {
      getProductName();
    }
  }, [item.productId]);

  const handleConfirmReturn = ({ reason, comment }) => {
    console.log("Return Requested for:", item._id);
    console.log("Reason:", reason);
    console.log("Comment:", comment);
    setReturnRequested(true);
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-10 gap-4 relative">
      <div>
        <img src="/images/wool-item-1.png" className="h-30 rounded-md w-full" />
      </div>

      <div className="col-span-7">
        <h3 className="text-xl font-semibold">
          {productName} - {item.size}
        </h3>

        <div className="flex gap-2 items-center mt-2">
          <div
            className="w-6 h-6 rounded-full"
            style={{ backgroundColor: item.color.hexCode }}
          ></div>
          <h5>({item.color.colorName})</h5>
        </div>
      </div>

      <div className="col-span-2 flex flex-col justify-center items-end relative">
        <div className="flex items-center gap-2">
          <div>
            <h4 className="text-2xl font-bold text-violet-800">₹{totalPrice.toFixed(0)}</h4>
            <p className="font-medium text-gray-500">Weight: {item.orderWeight}KG</p>
            {returnRequested && (
              <span className="mt-2 inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded">
  <span className="w-2 h-2 me-2 rounded-full bg-yellow-600"></span>
  Return Requested
</span>
            )}
          </div>
          <button
            className={`text-gray-500 ms-3 hover:text-gray-900 focus:outline-none ${returnRequested ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => {
              if (!returnRequested) {
                setDropdownOpen(!dropdownOpen);
              }
            }}
            disabled={returnRequested}
          >
            <Undo2 className="w-6 h-6" />
          </button>
        </div>

        {dropdownOpen && (
          <div className="absolute top-20 right-0 mt-1 w-40 bg-violet-800 border-2 border-purple-100 shadow-md rounded-md z-10">
            <button
              className="block w-full text-white font-medium text-left px-4 py-2 hover:bg-violet-700 rounded-md text-sm"
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

      <ReturnModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmReturn}
      />
    </div>
  );
};

export default OrderListBox;
