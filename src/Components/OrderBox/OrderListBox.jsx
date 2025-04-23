import React , {useState , useEffect } from 'react'
import { fetchProductsById } from '../../Services/ProductService';


const OrderListBox = ({ item }) => {

  const [productName, setProductName] = useState("Product");

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

  


  return (
    <div className="grid grid-cols-10 gap-4">
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

      <div className="col-span-2 flex flex-col justify-center items-end">
        <h4 className="text-2xl font-bold text-violet-800">₹{totalPrice.toFixed(0)}</h4>
        <p className="font-medium text-gray-500">Weight: {item.orderWeight}KG</p>
      </div>
    </div>
  )
}

export default OrderListBox