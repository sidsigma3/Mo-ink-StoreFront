import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TopNavigation from '../../Components/TopNavigation/TopNavigation';
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader';
import Navbar from '../../Components/Navbar/Navbar';
import Cta from '../../Components/CTA/Cta';
import Footer from '../../Components/Footer/Footer';
import HeroSection from '../../Components/HeroSection/HeroSection';
import BottomNav from '../../Components/BottomNav/BottomNav';
import { CreditCard, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { updateOrderStatuses } from '../../Services/OrderService';
import Toast from '../../Components/Toast/Toast';
import { initiatePayment } from '../../Services/PaymentService';
import { removeFromCart } from '../../Services/CartService';
import { useAppContext } from '../../Utils/commoncontext';
import { useEffect } from "react";

const PaymentFailure = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { updateCartAndWishlistCounts } = useAppContext();
  const navigate = useNavigate()
  const [toasts, setToasts] = useState([]);
  const [retryCount, setRetryCount] = useState(state?.retryCount || 0);

  const orderId = state?.orderId;
  const customerId = state?.customerId;
  const selectedCartItems = state?.selectedCartItems;
  const onlinePay = state?.onlinePay;
  const codPay = state?.codPay;
  const customer = state?.customer

  const showToast = (message, type = "error") => {
    setToasts([{ message, type }]);
    setTimeout(() => setToasts([]), 3000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRetryPayment = async () => {
    if (retryCount >= 2) return;
  
    setRetryCount(retryCount + 1);
  
    try {
      const paymentData = await initiatePayment(orderId);
      const { razorpayOrderId } = paymentData.data;
  
      if (!razorpayOrderId || paymentData.status !== "SUCCESS") {
        showToast(t('payment.failedRazorpayOrder'), "error");
        return;
      }
  
      const loadScript = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };
  
      const razorpayLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  
      if (!razorpayLoaded) {
        showToast(t('payment.failedLoadRazorpay'), "error");
        return;
      }
  
      const rzp = new window.Razorpay({
        key: "rzp_test_oqL33XMoXAV4ym",
        amount: Number(onlinePay) * 100,
        currency: "INR",
        name: "Mo ink and Dye",
        description: `${t('payment.paymentFor')} #${razorpayOrderId}`,
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            await updateOrderStatuses(orderId, { status: "NEW" });
  
            await Promise.all(
              selectedCartItems.map(item =>
                removeFromCart(customerId, item.variantId)
              )
            );

            updateCartAndWishlistCounts() 
  
            navigate('/paymentSuccess');
          } catch (error) {
            console.error("Post-payment flow failed:", error);
            showToast(t('payment.postProcessingFailed'), "error");
            navigate('/paymentFail');
          }
        },
        prefill: {
          name: customer.customerName || "",
          email: customer.email || "",
          contact: customer.phoneNumber || "",
        },
        notes: {
          orderId,
        },
        theme: {
          color: "#3399cc",
        },
      });
  
      rzp.open();
    } catch (error) {
      console.error("Order creation failed:", error);
      const errorMessage = error?.response?.data?.data.message || t('payment.failedPlaceOrder');
      showToast(errorMessage, "error");
    }
  };
  
  const handlePlaceAsCOD = async () => {
    try {
      await updateOrderStatuses(orderId, {
        status: 'NEW'
      });
  
      await Promise.all(
        selectedCartItems.map(item =>
          removeFromCart(customerId, item.variantId)
        )
      );

      updateCartAndWishlistCounts()
  
      navigate('/orders');
    } catch (error) {
      console.error("Order creation failed:", error);
      const errorMessage = error?.response?.data?.data.message || t('payment.failedPlaceOrder');
      showToast(errorMessage, "error");
    }
  };
  
  const handleCloseOrder = async () => {
    try {
      await updateOrderStatuses(orderId, { status: 'FAILED' });
      navigate('/home');
    } catch (err) {
      console.error(err);
      setToasts([{ message: t('payment.failedUpdateOrder'), type: "error" }]);
    }
  };

  const breadcrumbs = [
    { label: t('breadcrumb.home'), link: "/home" },
    { label: t('breadcrumb.checkout'), link: "/CheckoutPage" },
    { label: t('breadcrumb.paymentFailure'), link: "PaymentFailure" },
  ];

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar /></div>
  
      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
        <HeroSection productName={t('payment.paymentFailure')} breadcrumbs={breadcrumbs} />
      </div>
  
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12">
        <div className="flex flex-col items-center text-center bg-white rounded-5 p-6 md:px-20">
          {/* Image */}
          <div className="flex justify-center mb-6">
            <img
              src="/images/Card-Declined.png"
              alt={t('payment.paymentDeclined')}
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 object-contain"
            />
          </div>

          {/* Text Content */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            {t('payment.transitionFailed')}
          </h1>

          <p className="text-gray-600 mb-6">
            {t('payment.paymentFailedMessage')}{' '}
            <a href="#support" className="text-purple-700 hover:text-purple-500 font-medium">
              {t('payment.writeToSupport')}
            </a>
            {t('payment.weWillHelp')}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-1/2">
            <button
              className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-400 transition-colors font-medium flex items-center justify-center gap-2"
              onClick={handlePlaceAsCOD}
            >
              {t('payment.placeAsCOD')}
              <ArrowRight size={20} />
            </button>

            <button
              onClick={handleRetryPayment}
              disabled={retryCount >= 2}
              className={`w-full px-4 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-500 transition-colors font-medium flex items-center justify-center gap-2 ${
                retryCount >= 2 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <CreditCard size={20} />
              {t('payment.retryPayment')}
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row mt-3 gap-3 w-full lg:w-1/2">
            <button
              className="w-full px-4 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              onClick={handleCloseOrder}
            >
              {t('payment.close')}
            </button>
          </div>
        </div>
      </main>
  
      <div className='px-6 md:px-14 py-3 mt-10'><Cta /></div>
      <div className='px-6 md:px-14 py-3'> <Footer /></div>
      <BottomNav />

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
}

export default PaymentFailure;