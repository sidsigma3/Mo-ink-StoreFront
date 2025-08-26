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
import { initiatePayment } from '../../Services/PaymentService' // Add this import
import { Link } from 'react-router-dom'
import { downloadCreditReceipt } from '../../Services/InvoiceService'
import moment from 'moment-timezone';
import BottomNav from '../../Components/BottomNav/BottomNav'
import Toast from '../../Components/Toast/Toast'
import { addToCart , getCart ,removeFromCart } from '../../Services/CartService'
import { useAppContext } from '../../Utils/commoncontext'
import ModalConfirmReplaceCart from '../../Components/Modal/ModalConfirmReplaceCart'
import PaymentModal from '../../Components/Modal/PaymentModal'
import { sendCodOrderById , getCodOrderById } from '../../Services/OrderService'

const OrderDetails = () => {

    const {state} = useLocation()
    const { updateCartAndWishlistCounts } = useAppContext();
    const order =state?.order || {};

    const customer = JSON.parse(localStorage.getItem('userData'))

    const billingAddress = customer.addresses?.find(addr => addr.addressType === 'HOME');

    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const [toasts, setToasts] = useState([]);

    const [summary, setSummary] = useState(null);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingOrder, setPendingOrder] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const platformFees = 0

    const [paymentHistory, setPaymentHistory] = useState([
      // Example structure - replace with actual data from your API
      // {
      //   id: 1,
      //   transactionId: "pay_123456789",
      //   date: "2024-01-15",
      //   amount: 500,
      //   status: "PAID"
      // }
    ]);

    const walletAmount = order?.payment?.walletAmount || 0;
    const cancelRefundAmount = order?.payment?.cancelRefundAmount || 0;

    const [walletDeduction, setWalletDeduction] = useState(
      walletAmount > cancelRefundAmount ? walletAmount - cancelRefundAmount : 0
    );

    useEffect(() => {
      window.scrollTo(0, 0);
      
      // Load Razorpay script
      const loadRazorpayScript = () => {
        return new Promise((resolve) => {
          if (window.Razorpay) {
            resolve(true);
            return;
          }
          
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };
      
      loadRazorpayScript();
    }, []);

    // Fetch payment history - Replace with actual API call
    const fetchPaymentHistory = async (orderId) => {
      try {
        const res = await getCodOrderById(orderId);
        const codTransactions = res.data?.paymentCodTransactions || [];

        // Standard structure for COD transactions
        const formattedTransactions = codTransactions.map((tx, index) => ({
          srNo: index + 1, // optional serial number
          transactionId: tx.razorpayReferenceId,
          date: tx.paidAt ? new Date(tx.paidAt).toLocaleString() : "N/A",
          paymentMode: tx.razorpayOrderId ? "Online Payment Link" : "Cash",
          amountCollected: tx.amountPaid || 0,
          remainingAmount: tx.remainingAmount ?? 0,
          status: tx.status || (tx.remainingAmount === 0 ? "Completed" : "Pending"),
        }));

    setPaymentHistory(formattedTransactions);
  } catch (error) {
    console.error("Failed to fetch COD transactions:", error);
  }
    };

    // Load payment history on component mount
    useEffect(() => {
      console.log('hello')
      if (order?.orderId) {
        fetchPaymentHistory(order?.orderId);
      }
    }, [order?.orderId]);

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

   
    const orderDateObj = new Date(order.createdAt); // RAW Date object

    const orderDate = moment.utc(order.createdAt).tz("Asia/Kolkata").format("D MMM YYYY, h:mm A");


     const showToast = (message, type = "error") => {
            setToasts([{ message, type }]);
            setTimeout(() => setToasts([]), 3000);
          };
          
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
    (variant) => variant.status !== 'CANCELLED'
  );

  let baseTotal = 0;
  let discountByCoupon = 0;
  let discountByPayment = 0;
  let gstAmount = 0;
  let totalWeight = 0;

  const productDataMap = new Map();
  const itemCosts = [];

  // Step 1: Calculate base total, total weight, and store item cost data
  for (const variant of orderVariants) {
    const weight = Number(variant.orderWeight) || 0;
    const { productId, size, color, variantType } = variant;
    const colorId = color?.id;

    let pricePerKg = 0;

    if (productDataMap.has(productId)) {
      const cachedProduct = productDataMap.get(productId);
      const matchedVariant = cachedProduct.variants.find(
        (v) => v.size === size && v.color?.id === colorId && v.variantType === variantType
      );
      pricePerKg = matchedVariant?.pricePerKg || 0;
    } else {
      const res = await fetchProductsById(productId);
      if (res.success) {
        const product = res.data;
        productDataMap.set(productId, product);
        const matchedVariant = product.variants.find(
          (v) => v.size === size && v.color?.id === colorId && v.variantType === variantType
        );
        pricePerKg = matchedVariant?.pricePerKg || 0;
      }
    }

    const cost = weight * pricePerKg;
    baseTotal += cost;
    totalWeight += weight;

    itemCosts.push({
      variant,
      cost,
      gstRate: productDataMap.get(productId)?.gstOnProduct || 0,
    });
  }

  // Step 2: Check coupon eligibility
  const couponDiscountValue = Number(appliedCoupon?.discountValue) || 0;
  const couponDiscountType = appliedCoupon?.discountType || 'Percentage';
  let discountAllowed = true;

  if (appliedCoupon?.minPurchaseRequirement?.includes('Minimum purchase amount')) {
    const match = appliedCoupon.minPurchaseRequirement.match(/\₹\s?(\d+)/);
    const minAmount = match ? Number(match[1]) : 0;
    discountAllowed = baseTotal >= minAmount;
  } else if (appliedCoupon?.minPurchaseRequirement?.includes('Minimum quantity required')) {
    const match = appliedCoupon.minPurchaseRequirement.match(/(\d+)/);
    const minQty = match ? Number(match[1]) : 0;
    discountAllowed = totalWeight >= minQty;
  }

  // Step 3: Calculate coupon discount amount
  let couponDiscountAmount = 0;
  if (discountAllowed) {
    if (couponDiscountType === 'Percentage') {
      couponDiscountAmount = (baseTotal * couponDiscountValue) / 100;
    } else if (couponDiscountType === 'FixedAmount') {
      // Fixed amount applies to whole order, not per item
      couponDiscountAmount = couponDiscountValue;
    }
  }

  const subtotalAfterCoupon = baseTotal - couponDiscountAmount;

  // Step 4: Payment discount
  const paymentDiscountPercent = paymentDiscountMap[order.paymentTypeDiscount] || 0;
  const paymentDiscountAmount = (subtotalAfterCoupon * paymentDiscountPercent) / 100;
  const finalTotal = subtotalAfterCoupon - paymentDiscountAmount;

  discountByCoupon = couponDiscountAmount;
  discountByPayment = paymentDiscountAmount;
  const totalDiscount = discountByCoupon + discountByPayment;

  // Step 5: GST calculation per item
  for (const { cost, gstRate } of itemCosts) {
    let discountedPrice = cost;

    if (discountAllowed) {
      if (couponDiscountType === 'Percentage') {
        const combinedPercent =
          couponDiscountValue +
          paymentDiscountPercent -
          (couponDiscountValue * paymentDiscountPercent) / 100;
        discountedPrice = cost - (cost * combinedPercent) / 100;
      } else if (couponDiscountType === 'FixedAmount') {
        // Distribute fixed amount proportionally by cost share
        const itemShare = (cost / baseTotal) * couponDiscountAmount;
        const afterCoupon = cost - itemShare;
        const paymentDiscount = (afterCoupon * paymentDiscountPercent) / 100;
        discountedPrice = afterCoupon - paymentDiscount;
      }
    } else {
      discountedPrice = cost - (cost * paymentDiscountPercent) / 100;
    }

    const gstForItem = (discountedPrice * gstRate) / 100;
    gstAmount += gstForItem;
  }

  // Step 6: Final payable calculations
  const netPayable = finalTotal + gstAmount + handlingCharges + platformFees;
  const walletAmount = order?.payment?.walletAmount || 0;
  const cancelRefundAmount = order?.payment?.cancelRefundAmount || 0;
  const walletUsed =
    Number(walletAmount > cancelRefundAmount ? walletAmount - cancelRefundAmount : 0).toFixed(0) ||
    0;
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
      couponDiscountType === 'Percentage'
        ? discountAllowed
          ? couponDiscountValue +
            paymentDiscountPercent -
            (couponDiscountValue * paymentDiscountPercent) / 100
          : paymentDiscountPercent
        : discountAllowed && baseTotal > 0
        ? Number(((couponDiscountAmount + discountByPayment) / baseTotal) * 100)
        : paymentDiscountPercent,
  };
};



useEffect(() => {
  const fetchSummary = async () => {
    const summaryData = await calculateOrderSummary(order, appliedCoupon, handlingCharges, platformFees);
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
  combinedDiscountPercent,
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

const handleBuyAgain = async (orderToBuy) => {
    const customerId = customer?.customerId;
    if (!customerId || !orderToBuy?.orderVariantResponse?.length) return;

    try {
      const cartResponse = await getCart(customerId);
      const cartItems = cartResponse?.cartItems || cartResponse?.data?.cartItems || [];

      if (cartItems.length > 0) {
        setPendingOrder(orderToBuy);
        setShowConfirmModal(true);
        return;
      }

      await proceedWithBuyAgain(orderToBuy);
    } catch (err) {
      console.error("Error fetching cart:", err);
      showToast("Something went wrong.", "error");
    }
  };

  const proceedWithBuyAgain = async (orderToBuy) => {
    const customerId = customer?.customerId;

    try {
      const cartResponse = await getCart(customerId);
      const cartItems = cartResponse?.cartItems || cartResponse?.data?.cartItems || [];

      if (Array.isArray(cartItems) && cartItems.length > 0) {
        await Promise.all(
          cartItems.map((item) =>
            removeFromCart(customerId, item.variantId)
          )
        );
      }

      for (const item of orderToBuy.orderVariantResponse) {
        const { productId, size, color, variantType, orderWeight } = item;
        const res = await fetchProductsById(productId);
        if (!res.success) continue;

        const product = res.data;
        const matchedVariant = product.variants.find(
          (v) =>
            v.size === size &&
            v.color?.id === color?.id &&
            (!variantType || v.variantType === variantType)
        );

        if (!matchedVariant) continue;

        await addToCart(customerId, matchedVariant.id, 1);
      }

      showToast("All items added to cart!", "success");
      updateCartAndWishlistCounts();
    } catch (err) {
      console.error("Buy again failed:", err);
      showToast("Failed to add items to cart.", "error");
    }
  };

  const handleModalConfirm = () => {
    setShowConfirmModal(false);
    if (pendingOrder) {
      proceedWithBuyAgain(pendingOrder);
      setPendingOrder(null);
    }
  };

  const handleModalCancel = () => {
    setShowConfirmModal(false);
    setPendingOrder(null);
  };

  // Calculate balance due
  const balanceDue = order?.payment?.pendingAmount?.toFixed(0) - order?.payment?.totalAdjustedAmount?.toFixed(0);

  // Check if any balance payment has been made (only additional payments, not initial)
  const hasPaymentHistory = paymentHistory.length > 0;

  // Handle payment
  const handlePayNow = () => {
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const handlePaymentInitiate = async (paymentData) => {
    try {
      showToast("Initializing payment...", "success");
         
      const paymentRequestData = {
        orderId: order.orderId,
        amount: paymentData.amount, // Amount from the payment modal
        currency: paymentData.currency,
        customerDetails: paymentData.customerDetails
      };

      // Call your initiatePayment API with the specific amount
      // Note: Your API might need to be updated to accept custom amounts
      const paymentResponse = await sendCodOrderById(order.orderId, paymentData.amount);
      showToast("Payment link sent to your number", "success");
      handleClosePaymentModal()
      
    } catch (error) {
      console.error('Payment initiation failed:', error);
      
      const errorMessage = error?.response?.data?.data?.message || "Failed to initiate payment. Please try again.";
      showToast(errorMessage, "error");
      setShowPaymentModal(false);
    }
  };




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
                        <h4 className='ps-6 text-purple-800 font-medium flex items-center gap-4'>
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
                      className='bg-purple-100 text-purple-800  text-sm md:text-md font-medium flex gap-2  px-2 py-1 h-8 w-40 rounded items-center'
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
                <div className='border-1 rounded-md p-3 md:mt-10  '>                  
                <table className='w-100 rounded mt-2 font-semibold'>
                    <tbody className='leading-8'>
                        <tr>
                        <td className='pb-0.5'>Total Cost</td>
                        <td></td>
                        <td style={{ textAlign: 'end' }}>₹{(totalCost).toFixed(0)}</td>
                        </tr>

                        <tr className='border-b-2'>
                        <td>
                            <div>
                            <p  className='pb-0.5'>Total Discount</p>
                            <p className='text-gray-400 pl-6 pb-0.5'>Pay type</p>
                            <p className='text-gray-400 pl-6 pb-2'>Coupon </p>
                            </div>
                        </td>
                        <td>
                            <div>
                            <p>{combinedDiscountPercent.toFixed(2)}%</p>
                            <p className="text-gray-400">
                              {paymentDiscountMap[order.paymentTypeDiscount]
                                ? `${paymentDiscountMap[order.paymentTypeDiscount]}%`
                                : '0%'}
                            </p>
                           <p className='text-gray-400'>
                              {appliedCoupon ? (
                                appliedCoupon.discountType === 'Percentage'
                                  ? `${appliedCoupon.discountValue}%`
                                  : `₹${appliedCoupon.discountValue}`
                              ) : '0%'}
                            </p>

                            </div>
                        </td>
                        <td className='d-flex justify-end mt-2'>
                            <div>
                            <p className='text-end text-green-500'>
                            <span className="mr-1 font-semibold">-</span> ₹{totalDiscount.toFixed(0)}</p>
                            {/* <p className='text-gray-400 text-end'>₹{Math.round(discountByPayment)}</p> */}
                            {/* <p className='text-gray-400 text-end'>₹{Math.round(discountByCoupon)}</p> */}
                            </div>
                        </td>
                        </tr>

                        <tr>
                        <td className='pt-2 pb-0.5'>Final Cost</td>
                        <td className='pt-2 pb-0.5'></td>
                        <td className='text-end pt-2 pb-0.5'>₹{Math.round(finalTotal)}</td>
                        </tr>

                        {
                      isOdisha ? (
                        <>

                        <tr>
                        <td className='pb-0.5'>CGST</td>
                        <td className='pb-0.5'></td>
                        <td className='text-end pb-0.5'>₹{(gstAmount / 2).toFixed(0)}</td>
                        </tr>
                        <tr>
                        <td className='pb-0.5'>SGST</td>
                        <td className='pb-0.5'></td>
                        <td className='text-end pb-0.5'>₹{(gstAmount / 2).toFixed(0)}</td>
                        </tr>

                        </>
                            ) : (
                              <tr>
                              <td className='pb-0.5'>IGST</td>
                              <td className='pb-0.5'></td>
                              <td className='text-end pb-0.5'>₹{(gstAmount).toFixed(0)}</td>
                            </tr>
                          )
                        }

                        <tr>
                        <td className='pb-0.5'>Handling Charges</td>
                        <td className='pb-0.5'></td>
                        <td className='text-end pb-0.5'>₹{handlingCharges}</td>
                        </tr>

                        <tr className='border-b-2'>
                        <td className='pb-2'>Platform Fees</td>
                        <td className='pb-2'></td>
                        <td className='text-end pb-2'>₹{platformFees}</td>
                        </tr>

                        <tr>
                        <td className='pt-2 pb-0.5'>Net Pay</td>
                        <td className='pt-2 pb-0.5'></td>
                        <td className='text-end pt-2 pb-0.5'>₹{Math.round(netPayable).toLocaleString()}</td>
                        </tr>

                        <tr className='border-b-2'>
                            <td className='pb-2'>Wallet</td>
                            <td className='pb-2'></td>
                            <td className='text-end text-green-500 pb-2'>
                            <span className="mr-1 font-semibold">-</span>₹{ walletDeduction.toFixed(0) || 0}
                            </td>
                        </tr>


                        <tr className='border-b-2'>
                        <td className='pt-2 pb-2'>To pay</td>
                        <td className='pt-2'></td>
                        <td className='text-end pt-2 pb-2'>₹{Math.round(adjustedNetPay).toLocaleString()}</td>
                        </tr>

                        <tr>
                        <td className='pt-2 pb-0.5 '>Advance Paid</td>
                        <td className='pt-2 pb-0.5'>{online}%</td>
                        <td className='text-end pt-2 pb-0.5'>₹{order?.payment?.totalAmountPaid?.toFixed(0) || 0}</td>
                        </tr>

                        <tr>
                        <td className='pb-2'>Balance Due</td>
                        <td className='pb-2'>{cod}%</td>
                        <td className='text-end pb-2'>₹{balanceDue || 0}</td>
                        </tr>
                    </tbody>
                    </table>
                   </div>

                   {/* Table */}
                   {hasPaymentHistory ? (
                     <div className="mt-4 bg-white border border-gray-200 rounded-lg overflow-hidden">
                       <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
                         <h6 className="font-semibold text-gray-900 flex items-center gap-2">
                           <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                           Payment History
                         </h6>
                       </div>
                       
                       <div className="overflow-x-auto">
                         <table className="w-full text-sm">
                           <thead className="bg-gray-50 border-b border-gray-200">
                             <tr>
                               <th className="px-4 py-3 text-left font-medium text-gray-600">Transaction ID</th>
                               <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                                 <th className="px-4 py-3 text-center font-medium text-gray-600">Payment type</th>
                               <th className="px-4 py-3 text-center font-medium text-gray-600">Amount</th>
                               <th className="px-4 py-3 text-right font-medium text-gray-600">Remaining</th>
                               {/* <th className="px-4 py-3 text-center font-medium text-gray-600">Status</th> */}
                             </tr>
                           </thead>
                            <tbody className="divide-y divide-gray-200">
                              {paymentHistory.map((payment, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td>{payment.transactionId}</td>
                                  <td className="px-4 py-3 text-gray-600">
                                    {new Date(payment.date).toLocaleDateString("en-IN", {
                                      day: "numeric",
                                      month: "short", 
                                      year: "numeric",
                                      // hour: "2-digit",
                                      // minute: "2-digit"
                                    })}
                                  </td>
                                   <td className="px-4 py-3 text-center font-semibold text-gray-900">
                                    {payment.paymentMode}
                                  </td>
                                  <td className="px-4 py-3 text-center font-semibold text-gray-900">
                                    ₹{payment.amountCollected.toFixed(0)}
                                  </td>
                                  <td className="px-4 py-3 text-right font-semibold text-orange-600">
                                    ₹{payment.remainingAmount.toFixed(0)}
                                  </td>
                                  {/* <td className="px-4 py-3 text-center">
                                    <span
                                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        payment.status === "PAID"
                                          ? "bg-green-100 text-green-800"
                                          : payment.status === "PENDING"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {payment.status}
                                    </span>
                                  </td> */}
                                  {/* <td className="px-4 py-3 text-gray-600">{payment.remarks || "-"}</td> */}
                                </tr>
                              ))}
                            </tbody>
                         </table>
                       </div>
                       
                       {balanceDue > 0 && (
                         <div className="bg-orange-50 border-t border-orange-200 px-4 py-3">
                           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                             <div>
                               <p className="font-medium text-orange-800">
                                 Current Balance: <span className="font-bold">₹{balanceDue}</span>
                               </p>
                               <p className="text-xs text-orange-600 mt-1">
                                 Make a payment to reduce your pending balance
                               </p>
                             </div>
                             <button
                               onClick={handlePayNow}
                               className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm"
                             >
                               Pay Now
                             </button>
                           </div>
                         </div>
                       )}
                       
                       {/* Fully Paid Message */}
                       {balanceDue <= 0 && (
                         <div className="bg-green-50 border-t border-green-200 px-4 py-3">
                           <div className="flex items-center gap-2">
                             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                             <p className="font-medium text-green-800">
                               Order fully paid! No pending balance.
                             </p>
                           </div>
                         </div>
                       )}
                     </div>
                   ) : (
                     balanceDue > 0 && (
                       <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                           <div>
                             <h6 className="font-semibold text-lg text-orange-800">Payment Pending</h6>
                             <p className="text-orange-700 text-sm">
                               You have a pending balance of <span className="font-bold">₹{balanceDue}</span> for this order.
                             </p>
                           </div>
                           <button
                             onClick={handlePayNow}
                             className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 min-w-[120px] justify-center"
                           >
                             Pay Now
                           </button>
                         </div>
                       </div>
                     )
                   )}

                     <div className="md:col-start-2 mt-2">
                    <div className="d-flex flex-wrap items-center gap-2 text-black font-medium">
                      <span>
                       Want to repeat order?
                      </span>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleBuyAgain(order);
                        }}
                        className="text-purple-800 font-bold underline hover:text-purple-900"
                      >
                        Buy Again
                      </a>

                    </div>

                        <ModalConfirmReplaceCart
                          isOpen={showConfirmModal}
                            onCancel={handleModalCancel}
                            onConfirm={handleModalConfirm}
                        ></ModalConfirmReplaceCart>

                        <PaymentModal
                          isOpen={showPaymentModal}
                          onClose={handleClosePaymentModal}
                          orderDetails={order}
                          balanceDue={balanceDue}
                          onPaymentInitiate={handlePaymentInitiate}
                        />

                  </div>
                   </div>

            </div>

        </div>

        <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
        <BottomNav></BottomNav>
        

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

export default OrderDetails