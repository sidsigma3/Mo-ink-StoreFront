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

const OrderDetails = () => {

    const {state} = useLocation()

    const order =state?.order || {};

    const customer = JSON.parse(localStorage.getItem('userData'))

    const billingAddress = customer.addresses?.find(addr => addr.addressType === 'HOME');

    const [appliedCoupon, setAppliedCoupon] = useState(null);

    useEffect(() => {
        const fetchDiscount = async () => {
            if (order?.discountId) {
            try {
                const coupon = await getDiscountById(order.discountId);
                setAppliedCoupon(coupon);
            } catch (err) {
                console.error("Failed to fetch coupon:", err);
            }
            }
        };

    fetchDiscount();
    }, [order?.discountId]);

    const orderDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "short",
        day: "numeric",
      });


      const paymentDescriptions = {
        "100%": "100% Online Payment",
        "50%": "50% Online + 50% COD",
        "30%": "30% Online + 70% COD",
        "25%": "25% Online + 75% COD",
        "0%": "0% Online + 100% COD",
      };

      const selectedPayment = order.paymentTypeDiscount;

      const handleDownloadInvoice = async(orderId) => {
        const result = await downloadInvoice(orderId);
        if (!result.success) {
          alert("Failed to download invoice.");
        }
      };


      const calculateHandlingCharges = (cartItems, selectedAddress) => {
        if (!selectedAddress?.state) return 0;
      
        const customerState = selectedAddress.state.toLowerCase();
        const ratePerKg = customerState === "odisha" ? 3 : 5;
      
        // Sum total weight from cart items
        const totalWeight = cartItems.reduce((acc, item) => {
          const weight = Number(item.quantity) * 50 || 0; // assuming 1 quantity = 1kg
          return acc + weight;
        }, 0);
      
        return Number((totalWeight * ratePerKg).toFixed(2));
      };
      
      

      const handlingCharges = calculateHandlingCharges(order.orderVariantResponse, order.address);



      const calculateOrderSummary = (order, appliedCoupon = null, handlingCharges = 0, platformFees = 0) => {
        const gstRate = 5; // Assuming 5% GST on all items
        const orderVariants = order.orderVariantResponse || [];
        let baseTotal = 0;
        let gstAmount = 0;
        let discountByCoupon = 0;
        let discountByPayment = 0;
      
        orderVariants.forEach(variant => {
          const weight = Number(variant.orderWeight);
          const price = Number(variant.pricePerKg);
          baseTotal += weight * price;
        });
      
        const totalCost = baseTotal;
        gstAmount = (totalCost * gstRate) / 100;
      
        // Discounts
        const couponDiscountPercent = appliedCoupon?.discountValue || 0;
        const couponDiscountType = appliedCoupon?.discountType || "Percentage";
        discountByCoupon = couponDiscountType === "Percentage"
          ? (totalCost * couponDiscountPercent) / 100
          : couponDiscountPercent;
      
        const paymentDiscountPercent = parseFloat(order.paymentTypeDiscount.replace("%", "") || 0);
        discountByPayment = (totalCost * paymentDiscountPercent) / 100;
      
        // Combined discount
        const combinedDiscountPercent =
          couponDiscountPercent + paymentDiscountPercent -
          (couponDiscountPercent * paymentDiscountPercent) / 100;
      
        const totalDiscount = discountByCoupon + discountByPayment;
      
        const finalTotal = totalCost - totalDiscount;
      
        const netPayable = finalTotal + gstAmount + handlingCharges + platformFees;
      
        const walletUsed = Number(order.walletAmount) || 0;
        const adjustedNetPay = netPayable - walletUsed;
      
        const online = parseFloat(order.paymentTypeDiscount) || 0;
        const cod = 100 - online;
      
        const onlinePay = (adjustedNetPay * online) / 100;
        const codPay = adjustedNetPay - onlinePay;
      
        return {
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
        };
      };
      
    

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
      } = calculateOrderSummary(order, appliedCoupon, handlingCharges, 49);





  const breadcrumbs = [
    { label: "Home", link: "/home" },
    { label: "Account", link: "/account" },
    { label: "Orders", link: "/orders" },
    { label: "Order Details", link: "/orderDetails" },
  ];



  return (
    <div>
        <div className='px-6 md:px-14 py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3'> <Navbar></Navbar></div>
        <div className='px-6 md:px-14 py-3 mt-10'>  <HeroSection productName={"Order Details"}  breadcrumbs={breadcrumbs}></HeroSection></div>

        


        <div className='px-6 md:px-14 py-3 mt-10'>

            <div className='flex justify-between border-bottom pb-6'>
                <div>
                    <h4 className='font-bold text-2xl'>Order ID: {order.orderId}</h4>
                    <div className='flex divide-x-4 mt-6 gap-6'>
                        <h5>Order date:  <span className='font-semibold'>{orderDate}</span></h5>
                        <h4 className='ps-6 text-violet-800 font-medium flex items-center gap-2'><span><HiOutlineTruck size={22}/></span>Estimated delivery May 16, 2022</h4>
                    </div>
                </div>

                <div className='flex items-center'>
                <button 
                onClick={(e)=>{
                    handleDownloadInvoice(order.orderId)
                }}
                className='flex gap-2 bg-violet-100 text-violet-800 px-16 py-1 h-10 rounded items-center'>
                    <span><TbFileInvoice size={20}/></span>
                    <h5>INVOICE</h5>
                </button>
                </div>

                  

                
            </div>

            <div className='mt-16'>
            <TimelineComponent orderStatus={order.status}></TimelineComponent>
            </div>


            <div className='mt-20 border-bottom pb-6 px-40'>
                <ul className="flex flex-col gap-5">
                    {order?.orderVariantResponse.map((item, idx) => (
                    <li key={idx}>
                        <OrderListBox item={item}/>
                    </li>
                    ))}
                </ul>

            </div>


            <div className="grid grid-cols-3 mt-10 border-bottom pb-10 px-24">
            <div>
            <h5 className='font-semibold text-lg'>Payment</h5>
            <p className='text-gray-600 mt-2'>{paymentDescriptions[selectedPayment]}</p>
            </div>

            <div className='flex flex-col items-start'>
                <h5 className="font-semibold text-lg">Billing Address</h5>
                <p className="text-gray-500 font-medium">{billingAddress.customerAddress}</p>
                <p className="text-gray-500 font-medium text-right">
                {billingAddress.street}, {billingAddress.city}, {billingAddress.state}, {billingAddress.zipcode}
                </p>
                <p className="text-gray-500 font-medium">{billingAddress.country}</p>
            </div>

            <div className="flex flex-col items-end">
                <h5 className="font-semibold text-lg">Shipping Address</h5>
                <p className="text-gray-500 font-medium">{order.address.customerAddress}</p>
                <p className="text-gray-500 font-medium">
                {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipcode}
                </p>
                <p className="text-gray-500 font-medium">{order.address.country}</p>
            </div>
            </div>


            <div className='grid grid-cols-2 mt-6 px-10'>

                <div className=''>

                    <h5 className='font-semibold text-lg'>Need Help</h5>

                    <div className='flex flex-col gap-3 mt-6'>
                        <div className='flex gap-4 items-center text-gray-500 font-medium'>
                            <div className='flex gap-2 items-center'>
                                <span><AiOutlineIssuesClose size={20}/></span>
                                <p>Order Issues</p>
                            </div>
                            <span><MdArrowOutward /></span>
                        </div>

                        <div className='flex gap-4 items-center text-gray-500 font-medium'>
                            <div className='flex gap-2 items-center'>
                                <span><HiOutlineTruck size={20}/></span>
                                <p>Delivery Info</p>
                            </div>
                            <span><MdArrowOutward /></span>
                        </div>

                        <div className='flex gap-4 items-center text-gray-500 font-medium'>
                            <div className='flex gap-2 items-center'>
                                <span><LuBox size={20}/></span>
                                <p>Returns</p>
                            </div>
                            <span><MdArrowOutward /></span>
                        </div>
                    </div>

                </div>

                

                <div className='border-1 rounded-md p-3 '>
                       
        
                <table className='w-100 rounded mt-2 font-semibold'>
                    <tbody className='leading-8'>
                        <tr>
                        <td>Total Cost (Incl GST)</td>
                        <td></td>
                        <td className='text-end'>₹{(totalCost + gstAmount).toLocaleString()}</td>
                        </tr>

                        <tr className='border-b-2'>
                        <td>
                            <div>
                            <p>Total Discount</p>
                            <p className='text-gray-400 pl-12'>By payment Type</p>
                            <p className='text-gray-400 pl-12'>By coupon Code</p>
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
                            <p className='text-end'>₹{Math.round(totalDiscount)}</p>
                            <p className='text-gray-400 text-end'>₹{Math.round(discountByPayment)}</p>
                            <p className='text-gray-400 text-end'>₹{Math.round(discountByCoupon)}</p>
                            </div>
                        </td>
                        </tr>

                        <tr>
                        <td className='pb-2'>Final Cost</td>
                        <td></td>
                        <td className='text-end pb-2'>₹{Math.round(finalTotal)}</td>
                        </tr>

                        <tr>
                        <td className='pb-2'>CGST</td>
                        <td></td>
                        <td className='text-end pb-2'>₹{(gstAmount / 2).toFixed(1)}</td>
                        </tr>
                        <tr>
                        <td className='pb-2'>SGST</td>
                        <td></td>
                        <td className='text-end pb-2'>₹{(gstAmount / 2).toFixed(1)}</td>
                        </tr>

                        <tr>
                        <td className='pb-2'>Handling Charges</td>
                        <td></td>
                        <td className='text-end pb-2'>₹{handlingCharges}</td>
                        </tr>

                        <tr className='border-b-2'>
                        <td className='pb-2'>Platform Fees</td>
                        <td></td>
                        <td className='text-end pb-2'>₹49</td>
                        </tr>

                        <tr>
                        <td className='pt-2'>Net Pay</td>
                        <td></td>
                        <td className='text-end pt-2'>₹{Math.round(netPayable).toLocaleString()}</td>
                        </tr>

                        <tr className='border-b-2'>
                        <td className='pb-2'>Wallet</td>
                        <td className='pb-2'>₹{walletUsed}</td>
                        <td className='text-end pb-2'>
                            <input
                            type="text"
                            placeholder="Amount"
                            className="w-24 border rounded-md text-right px-1"
                            value={walletUsed || ''}
                            readOnly
                            />
                        </td>
                        </tr>

                        <tr className='border-b-2'>
                        <td className='pt-2 pb-2'>To pay</td>
                        <td></td>
                        <td className='text-end pt-2 pb-2'>₹{Math.round(adjustedNetPay).toLocaleString()}</td>
                        </tr>

                        <tr>
                        <td>Advance Paid</td>
                        <td>{online}%</td>
                        <td className='text-end'>₹{onlinePay.toFixed(0)}</td>
                        </tr>

                        <tr>
                        <td className='pt-2'>Balance Due</td>
                        <td>{cod}%</td>
                        <td className='text-end pt-2'>₹{codPay.toFixed(0)}</td>
                        </tr>
                    </tbody>
                    </table>
       
                     
       
                   </div>
                
            </div>




        </div>

        <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
    </div>
  )
}

export default OrderDetails