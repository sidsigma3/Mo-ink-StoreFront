import React , {useEffect,useState} from 'react'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import TimelineComponent from '../../Components/TImeline/TimelineComponent'
import { TbFileInvoice } from "react-icons/tb";
import { HiOutlineTruck } from "react-icons/hi";
import OrderListBox from '../../Components/OrderBox/OrderListBox'
import { MdArrowOutward } from "react-icons/md";
import { AiOutlineIssuesClose } from "react-icons/ai";
// import { HiOutlineTruck } from "react-icons/hi";
import { LuBox } from "react-icons/lu";
import { fetchProductsById } from '../../Services/ProductService'
import { useLocation } from 'react-router-dom'
import { downloadInvoice } from '../../Services/InvoiceService'
import { getDiscountById } from '../../Services/DiscountService'
import { Link } from 'react-router-dom'
import { downloadCreditReceipt } from '../../Services/InvoiceService'
import moment from 'moment-timezone';
import BottomNav from '../../Components/BottomNav/BottomNav'
import Toast from '../../Components/Toast/Toast'


const OrderDetails = () => {

    const {state} = useLocation()

    const order =state?.order || {};

    const customer = JSON.parse(localStorage.getItem('userData'))

    const billingAddress = customer.addresses?.find(addr => addr.addressType === 'HOME');

    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const [toasts, setToasts] = useState([]);

    const [summary, setSummary] = useState(null);

    const walletAmount = order?.payment?.walletAmount || 0;
    const cancelRefundAmount = order?.payment?.cancelRefundAmount || 0;

    const [walletDeduction, setWalletDeduction] = useState(
      walletAmount > cancelRefundAmount ? walletAmount - cancelRefundAmount : 0
    );

    useEffect(() => {
        const fetchDiscount = async () => {
            if (order?.discountId) {
            try {
                const coupon = await getDiscountById(order.discountId);
                setAppliedCoupon(coupon.data);
            } catch (err) {
                console.error("Failed to fetch coupon:", err);
            }
            }
        };

    fetchDiscount();
    }, [order?.discountId]);

    console.log(appliedCoupon)
    const orderDateObj = new Date(order.createdAt); // RAW Date object

    const orderDate = moment.utc(order.createdAt).tz("Asia/Kolkata").format("D MMM YYYY, h:mm A");
    console.log(orderDate);

    
    // const orderDate = new Date(order.createdAt).toLocaleString("en-IN", {
    //     timeZone: "Asia/Kolkata",
    //     year: "numeric",
    //     month: "short",
    //     day: "numeric",
    //   hour: "numeric",
    //   minute: "numeric",
    //   hour12: true, 
    //   });

    
    const estimatedDeliveryDateObj = new Date(orderDateObj);
    estimatedDeliveryDateObj.setDate(orderDateObj.getDate() + 18);
    
    const estimatedDeliveryDate = estimatedDeliveryDateObj.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    


      const paymentDescriptions = {
        "100%": "100% Online Payment",
        "50%": "50% Online + 50% COD",
        "30%": "30% Online + 70% COD",
        "25%": "25% Online + 75% COD",
        "0%": "0% Online + 100% COD",
      };

      const paymentDiscountMap = {
        "100%": 1.5,
        "50%": 0.5,
        "30%": 0.3,
        "25%": 0.5,
        "0%": 0,
    };

      const selectedPayment = order.paymentTypeDiscount;

      const handleDownloadInvoice = async(orderId) => {
         const showToast = (message, type = "error") => {
            setToasts([{ message, type }]);
            setTimeout(() => setToasts([]), 3000);
          };

        const result = await downloadInvoice(orderId);
        if (!result.success) {
          showToast("Failed to download invoice.", "error");
        }
      };


      const calculateHandlingCharges = (cartItems, shippingAddressString) => {
        if (!shippingAddressString) return 0;
      
        const parts = shippingAddressString.split(",") || [];
        const state = parts.length >= 3 ? parts[parts.length - 3]?.trim().toLowerCase() : "";
      
        if (!state) return 0;
      
        const ratePerKg = state === "odisha" ? 3 : 5;
      
        const totalWeight = cartItems.reduce((acc, item) => {
          if (item.status === 'CANCELLED') return acc; // 👈 Skip cancelled items
          const weight = Number(item.orderWeight) || 0;
          return acc + weight;
        }, 0);
      
        return Number((totalWeight * ratePerKg).toFixed(2));
      };
      
      
      
      const handlingCharges = calculateHandlingCharges(order.orderVariantResponse, order.shippingAddress);

      const calculateOrderSummary = async (
        order,
        appliedCoupon = null,
        handlingCharges = 0,
        platformFees = 0
      ) => {
        const orderVariants = (order.orderVariantResponse || []).filter(
          (variant) => variant.status !== 'CANCELLED' // ✅ Exclude cancelled
        );
      
        let baseTotal = 0;
        let discountByCoupon = 0;
        let discountByPayment = 0;
        let gstAmount = 0;
      
        const productDataMap = new Map();
      
        // Step 1: Accumulate base total
        for (const variant of orderVariants) {
          const weight = Number(variant.orderWeight) || 0;
          const productId = variant.productId;
          const size = variant.size;
          const colorId = variant.color.id;
          const variantType = variant.variantType
      
          let pricePerKg = 0;
      
          if (productDataMap.has(productId)) {
            const cachedProduct = productDataMap.get(productId);
            const matchedVariant = cachedProduct.variants.find(
              (v) =>
                v.size === size &&
                v.color?.id === colorId &&
                (variantType ? v.variantType === variantType : true)
            );
            pricePerKg = matchedVariant?.pricePerKg || 0;
          } else {
            const res = await fetchProductsById(productId);
            if (res.success) {
              const product = res.data;
              productDataMap.set(productId, product);
              const matchedVariant = product.variants.find(
                (v) =>
                  v.size === size &&
                  v.color?.id === colorId &&
                  (variantType ? v.variantType === variantType : true)
              );
              pricePerKg = matchedVariant?.pricePerKg || 0;
            }
          }
          
      
          baseTotal += weight * pricePerKg;
        }
      
        // Step 2: Apply discounts sequentially
        const couponDiscountPercent = Number(appliedCoupon?.discountValue) || 0;
        const couponDiscountType = appliedCoupon?.discountType || "Percentage";
      
        const couponDiscountAmount =
          couponDiscountType === "Percentage"
            ? (baseTotal * couponDiscountPercent) / 100
            : couponDiscountPercent;
      
        const subtotalAfterCoupon = baseTotal - couponDiscountAmount;
      
        const paymentDiscountPercent =
          paymentDiscountMap[order.paymentTypeDiscount] || 0;
        const paymentDiscountAmount =
          (subtotalAfterCoupon * paymentDiscountPercent) / 100;
      
        const finalTotal = subtotalAfterCoupon - paymentDiscountAmount;
      
        discountByCoupon = couponDiscountAmount;
        discountByPayment = paymentDiscountAmount;
        const totalDiscount = discountByCoupon + discountByPayment;
      
       
       for (const variant of orderVariants) {
            const weight = Number(variant.orderWeight) || 0;
            const productId = variant.productId;
            const size = variant.size;
            const colorId = variant.color.id;
            const varinatType = variant.variantType

            const productData = productDataMap.get(productId);
            if (!productData) continue;

            const matchedVariant = productData.variants.find(
              (v) => v.size === size && v.color?.id === colorId && v.variantType === varinatType
            );
            if (!matchedVariant) continue;

            const pricePerKg = matchedVariant.pricePerKg || 0;
            const gstRate = Number(productData.gstOnProduct || 0);

     
            const cost = weight * pricePerKg;

            const combinedDiscountPercent =
              couponDiscountPercent + paymentDiscountPercent -
              (couponDiscountPercent * paymentDiscountPercent) / 100;

            const discountedPrice = cost - (cost * combinedDiscountPercent) / 100;
            const gstForItem = (discountedPrice * gstRate) / 100;
            gstAmount += gstForItem;
          }
      
        // Step 4: Final amounts
        const netPayable = finalTotal + gstAmount + handlingCharges + platformFees;
        const walletUsed = Number(order.walletAmount) || 0;
        const adjustedNetPay = netPayable - walletUsed;
      
        const online = Number(order.paymentTypeDiscount?.replace('%', '')) || 0;
        const cod = 100 - online;
      
        const onlinePay = (adjustedNetPay * online) / 100;
        const codPay = adjustedNetPay - onlinePay;
      
        return {
          totalCost: baseTotal,
          discountByCoupon,
          discountByPayment,
          totalDiscount,
          finalTotal,
          gstAmount,
          netPayable,
          adjustedNetPay,
          walletUsed,
          online,
          cod,
          onlinePay,
          codPay,
          combinedDiscountPercent:
            couponDiscountType === "Percentage"
              ? couponDiscountPercent +
                paymentDiscountPercent -
                (couponDiscountPercent * paymentDiscountPercent) / 100
              : null,
        };
      };
      
      
      
      
      useEffect(() => {
        const fetchSummary = async () => {
          const summaryData = await calculateOrderSummary(order, appliedCoupon, handlingCharges, 49);
          setSummary(summaryData);
        };
        fetchSummary();
      }, [order, appliedCoupon, handlingCharges]);
      
      if (!summary) return <div>Loading...</div>;
      
      const {
        totalCost,
        gstAmount,
        discountByCoupon,
        discountByPayment,
        totalDiscount,
        finalTotal,
        netPayable,
        adjustedNetPay,
        walletUsed,
        online,
        cod,
        onlinePay,
        codPay,
        combinedDiscountPercent
      } = summary;


   const handleDownloadCreditReceipt = async (orderId,type) => {
      try {
        await downloadCreditReceipt(orderId, type);
      } catch (error) {
        console.error("Failed to download credit receipt:", error);
      }
    };

  const breadcrumbs = [
    { label: "Home", link: "/home" },
    { label: "Account", link: "/account" },
    { label: "Orders", link: "/orders" },
    { label: "Order Details", link: "/orderDetails" },
  ];


  const getStateFromBillingAddress = (billingAddress) => {
    try {
      const beforePin = billingAddress.split("PIN:")[0];
      const parts = beforePin.split(",").map(p => p.trim()).filter(Boolean);
      const state = parts[parts.length - 1]?.toLowerCase(); // Safely get last non-empty entry
      return state;
    } catch (err) {
      console.error("Failed to parse billing address:", err);
      return "";
    }
  };
  
  const billingState = getStateFromBillingAddress(order?.billingAddress)
  const isOdisha = billingState?.toLowerCase() === "odisha";


  console.log(order)

  return (
    <div>
         <div className='px-6 lg:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
            <div className='px-6 lg:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>
        <div className='px-6 lg:px-14 py-3'>  <HeroSection productName={"Order Details"}  breadcrumbs={breadcrumbs}></HeroSection></div>

        


        <div className='px-6 md:px-14 py-3 mt-10'>

            <div className= 'd-flex flex-wrap gap-4 justify-between border-bottom pb-6'>
                <div>
                    <h4 className='font-semibold text-xl md:text-2xl'>Order ID: {order.orderId}</h4>
                    <div className='d-flex flex-wrap divide-x-4 mt-6 gap-6'>
                        <h5>Order date:  <span className='font-semibold'>{orderDate}</span></h5>
                        <h4 className='ps-6 text-violet-800 font-medium flex items-center gap-4'>
      <span><HiOutlineTruck size={22} /></span> Estimated delivery {estimatedDeliveryDate}</h4>                    
      </div>
                </div>

                <div className='d-flex flex-wrap justify-start items-end gap-3'>
                {(order.status === 'SHIPPED' || order.status === 'DELIVERED' || order.status === 'RETURNED') && (
                  <div className='flex items-center g-2'>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadInvoice(order.orderId);
                      }}
                      className='bg-violet-100 text-violet-800  text-sm md:text-md font-medium flex gap-2  px-2 py-1 h-8 w-40 rounded items-center'
                    >
                      <span><TbFileInvoice size={20} /></span>
                      <h5>Order Invoice</h5>
                    </button>
                  </div>
                )}


                {order.cancelCreditReceiptGenerated === "true" && (
                  <button
                    onClick={() => handleDownloadCreditReceipt(order.orderId, "cancelled")}
                    className='bg-red-100 text-red-800  text-sm md:text-md font-medium flex gap-2  px-2 py-1 h-8 w-40 rounded items-center'
                  >
                    <TbFileInvoice size={20} />
                    <h5>Cancel Receipt</h5>
                  </button>
                )}

                {/* {
                  order.orderVariantResponse?.some(variant => variant.status === 'RETURNED') && (
                    <button
                      onClick={() => handleDownloadCreditReceipt(order.orderId, "RETURNED")}
                      className=' bg-green-100 text-green-800  text-sm md:text-md font-medium flex gap-2  px-2 py-1 h-8 w-40 rounded items-center'
                    >
                      <TbFileInvoice size={20} />
                      <h5>Return Receipt</h5>
                    </button>
                 )} */}
            
                 </div>
            </div>

            <div className='mt-16'>
            <TimelineComponent orderStatus={order.status}></TimelineComponent>
            </div>


            <div className='mt-20 border-bottom pb-6 lg:px-40'>
                <ul className="flex flex-col gap-5">
                    {order?.orderVariantResponse.map((item, idx) => (
                    <li key={idx}>
                        <OrderListBox item={item} status={order.status} orderId={order.orderId}/>
                    </li>
                    ))}
                </ul>

            </div>


            <div className="flex flex-wrap gap-4 mt-10 border-b pb-10  md:px-24">

              <div className="flex-1 min-w-[250px] text-left">
                <h5 className="font-semibold text-xl md:text-2xl">Payment</h5>
                <p className="text-gray-600 mt-2">{paymentDescriptions[selectedPayment]}</p>
              </div>

              <div className="flex-1 min-w-[250px] text-left">
                <h5 className="font-semibold text-xl md:text-2xl">Billing Address</h5>
                <p className="text-gray-500 font-medium whitespace-pre-line mt-2">{order.billingAddress}</p>
              </div>

              <div className="flex-1 min-w-[250px] text-left">
                <h5 className="font-semibold text-xl md:text-2xl">Shipping Address</h5>
                <p className="text-gray-500 font-medium whitespace-pre-line mt-2">{order.shippingAddress}</p>
              </div>
              
            </div>


            <div className='flex flex-col-reverse md:grid md:grid-cols-2 mt-6  gap-6'>

                <div className=''>

                    <h5 className='font-semibold text-lg'>Need Help</h5>

                    <div className='flex flex-col gap-3 mt-6'>
                    <Link to="/orderissues" className="flex gap-4 items-center text-gray-500 font-medium hover:text-gray-700 transition">
                    <div className="flex gap-2 items-center">
                        <span><AiOutlineIssuesClose size={20} /></span>
                        <p>Order Issues</p>
                    </div>
                    <span><MdArrowOutward /></span>
                    </Link>

                    <Link to="/deliveryInfo" className="flex gap-4 items-center text-gray-500 font-medium hover:text-gray-700 transition">
                    <div className="flex gap-2 items-center">
                        <span><HiOutlineTruck size={20} /></span>
                        <p>Delivery Info</p>
                    </div>
                    <span><MdArrowOutward /></span>
                    </Link>

                    <Link to="/ReturnInfo" className="flex gap-4 items-center text-gray-500 font-medium hover:text-gray-700 transition">
                    <div className="flex gap-2 items-center">
                        <span><LuBox size={20} /></span>
                        <p>Returns</p>
                    </div>
                    <span><MdArrowOutward /></span>
                    </Link>
                    </div>

                </div>

                
                <div>
                <div className='border-1 rounded-md p-3 mt-10 '>                  
                <table className='w-100 rounded mt-2 font-semibold'>
                    <tbody className='leading-8'>
                        <tr>
                        <td>Total Cost</td>
                        <td></td>
                        <td style={{ textAlign: 'end' }}>₹{(totalCost).toFixed(0)}</td>
                        </tr>

                        <tr className='border-b-2'>
                        <td>
                            <div>
                            <p>Total Discount</p>
                            <p className='text-gray-400 pl-6'>Pay type</p>
                            <p className='text-gray-400 pl-6'>Coupon </p>
                            </div>
                        </td>
                        <td>
                            <div>
                            <p>{combinedDiscountPercent.toFixed(2)}%</p>
                            <p className="text-gray-400">{order.paymentTypeDiscount}</p>
                            <p className='text-gray-400'>
                                {appliedCoupon
                                ? `${appliedCoupon.discountValue}${appliedCoupon.discountType === 'Percentage' ? '%' : '₹'}`
                                : '0%'}
                            </p>
                            </div>
                        </td>
                        <td>
                            <div>
                            <p className='text-end text-green-500'>
                            <span className="mr-1 font-semibold">-</span> ₹{totalDiscount.toFixed(0)}</p>
                            <p className='text-gray-400 text-end'>₹{Math.round(discountByPayment)}</p>
                            <p className='text-gray-400 text-end'>₹{Math.round(discountByCoupon)}</p>
                            </div>
                        </td>
                        </tr>

                        <tr>
                        <td className='pb-2'>Final Cost</td>
                        <td className='pb-2'></td>
                        <td className='text-end pb-2'>₹{Math.round(finalTotal)}</td>
                        </tr>

                        {
                      isOdisha ? (
                        <>

                        <tr>
                        <td className='pb-2'>CGST</td>
                        <td className='pb-2'></td>
                        <td className='text-end pb-2'>₹{(gstAmount / 2).toFixed(0)}</td>
                        </tr>
                        <tr>
                        <td className='pb-2'>SGST</td>
                        <td className='pb-2'></td>
                        <td className='text-end pb-2'>₹{(gstAmount / 2).toFixed(0)}</td>
                        </tr>

                        </>
                            ) : (
                              <tr>
                              <td>IGST</td>
                              <td></td>
                              <td className="text-end pb-2">₹{(gstAmount).toFixed(0)}</td>
                            </tr>
                          )
                        }

                        <tr>
                        <td className='pb-2'>Handling Charges</td>
                        <td className='pb-2'></td>
                        <td className='text-end pb-2'>₹{handlingCharges}</td>
                        </tr>

                        <tr className='border-b-2'>
                        <td className='pb-2'>Platform Fees</td>
                        <td className='pb-2'></td>
                        <td className='text-end pb-2'>₹49</td>
                        </tr>

                        <tr>
                        <td className='pt-2'>Net Pay</td>
                        <td className='pt-2'></td>
                        <td className='text-end pt-2'>₹{Math.round(netPayable).toLocaleString()}</td>
                        </tr>

                        <tr className='border-b-2'>
                            <td className='pb-2'>Wallet</td>
                            <td className='pb-2'></td>
                            <td className='text-end text-green-500 pb-2'>
                            <span className="mr-1 font-semibold">-</span>₹{ walletDeduction || 0}
                            </td>
                        </tr>


                        <tr className='border-b-2'>
                        <td className='pt-2 pb-2'>To pay</td>
                        <td className='pt-2'></td>
                        <td className='text-end pt-2 pb-2'>₹{Math.round(adjustedNetPay).toLocaleString()}</td>
                        </tr>

                        <tr>
                        <td>Advance Paid</td>
                        <td>{online}%</td>
                        <td className='text-end'>₹{order?.payment.totalAmountPaid.toFixed(0)}</td>
                        </tr>

                        <tr>
                        <td className='pt-2'>Balance Due</td>
                        <td className='pt-2'>{cod}%</td>
                        <td className='text-end pt-2'>₹{ order?.payment.pendingAmount.toFixed(0)-order?.payment.totalAdjustedAmount.toFixed(0)}</td>
                        </tr>
                    </tbody>
                    </table>
  
       
                   </div>
                     <div className="md:col-start-2 mt-2">
                    <div className="d-flex flex-wrap items-center gap-2 text-black font-medium">
                      <span>
                       Want to repeat order?
                      </span>
                      <a
                        href="#"
                        className="text-violet-800 font-bold underline hover:text-violet-900"
                      >
                        Buy Again
                      </a>
                    </div>
                  </div>
                   </div>
                  

             <div>
                       
         </div>



    </div>

              




        </div>

        <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
                    <BottomNav></BottomNav>
        

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
  )
}

export default OrderDetails