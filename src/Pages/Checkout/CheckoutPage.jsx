import React, { useState, useEffect, useCallback , useMemo} from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import HeroSection from '../../Components/HeroSection/HeroSection'
import ProductDetailBoxMini from '../../Components/ProductList/ProductDetailBoxMini'
import { RiLock2Line } from "react-icons/ri";
import { getCart } from '../../Services/CartService'
import { fetchProducts } from '../../Services/ProductService'
import { RxCross2 } from "react-icons/rx";
import { removeFromCart , addToCart} from '../../Services/CartService'
import { FaPlus } from "react-icons/fa6";
import { Dropdown, DropdownHeader, DropdownToggle } from 'react-bootstrap'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { IoClose } from "react-icons/io5";
import { getAllDiscounts } from '../../Services/DiscountService'
import AddressBox from '../../Components/AddressBox/AddressBox'
import { useNavigate } from 'react-router-dom'
import { BiHomeAlt } from "react-icons/bi";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { BiBuildingHouse } from "react-icons/bi";
import { useRef } from "react";
import { Button } from 'react-bootstrap';
import { useAppContext } from '../../Utils/commoncontext'
import { getWalletTransactions } from '../../Services/CustomerService'
import { createOrder, updateOrderStatuses } from '../../Services/OrderService'
import { initiatePayment } from '../../Services/PaymentService'
import ModalSuccess from '../../Components/Modal/ModalSuccess' 
import ModalCoupon from '../../Components/Modal/ModalCoupon';
import Toast from '../../Components/Toast/Toast';
import ProductDetailBoxMiniMobile from '../../Components/ProductList/ProductDetailBoxMiniMobile'

const razorpayKey = process.env.RAZORPAY_CLIENT_KEY

const getOrderItemDiscountDetails = ({
  coupon,
  item,
  itemTotal,
  totalCartWeight,
  totalCartValue,
  paymentDiscountPercent
}) => {
  const isEligibleProduct = coupon?.applicableProducts?.some(p => p.id === item.productId);
  if (!isEligibleProduct) {
    return { allowed: false, itemDiscount: (itemTotal * paymentDiscountPercent) / 100 };
  }

  const requirement = coupon?.minPurchaseRequirement || "";
  let requirementMet = true;

  if (requirement.includes("Minimum purchase amount")) {
    const match = requirement.match(/\₹\s?(\d+)/);
    const minAmount = match ? Number(match[1]) : 0;
    requirementMet = totalCartValue >= minAmount;
  } else if (requirement.includes("Minimum quantity required")) {
    const match = requirement.match(/(\d+)/);
    const minQty = match ? Number(match[1]) : 0;
    requirementMet = totalCartWeight >= minQty;
  }

  if (!requirementMet) {
    return { allowed: false, itemDiscount: (itemTotal * paymentDiscountPercent) / 100 };
  }

  const couponValue = Number(coupon.discountValue || 0);
  const discountType = coupon.discountType;

  if (discountType === "FixedAmount") {
    // ✅ Distribute fixed amount proportionally to item value
    const proportion = itemTotal / totalCartValue;
    const itemFixedDiscount = couponValue * proportion;

    const afterFixed = itemTotal - itemFixedDiscount;
    const paymentDiscount = (afterFixed * paymentDiscountPercent) / 100;

    return { allowed: true, itemDiscount: itemFixedDiscount + paymentDiscount };
  } else {
    // Percentage coupon
    const combinedPercent = couponValue + paymentDiscountPercent - (couponValue * paymentDiscountPercent) / 100;
    return { allowed: true, itemDiscount: (itemTotal * combinedPercent) / 100 };
  }
};



const CheckoutPage = () => {


    const navigate = useNavigate()

    const { updateCartAndWishlistCounts } = useAppContext();
    

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState("100% Online and 0% COD");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [discounts, setDiscounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState("HOME");
    const [selectedItems, setSelectedItems] = useState([]);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [variantTypes, setVariantTypes] = useState({});
    const [quantities, setQuantities] = useState({});
    const lastTapRef = useRef(0);
    const singleClickTimeoutRef = useRef(null);
    const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
    const selectedCartItems = cartItems.filter(item =>
        selectedItems.includes(item.variantId)
    );
    const [walletUsed, setWalletUsed] = useState(0);
    const [walletError, setWalletError] = useState('');

    const [walletBalance, setWalletBalance] = useState(0);
    const platformFees = 0 ;
    const [toasts, setToasts] = useState([]);

    const [selectedWeight,setSelectedWeight] = useState({})

     useEffect(() => {
          window.scrollTo(0, 0);
        }, []);
    

    const paymentDiscountMap = {
        "100% Online and 0% COD": 1.5,
        "50% Online and 50% COD": 0.5,
        "30% Online and 70% COD": 0.3,
        "25% Online and 75% COD": 0.5,
        "0% Online and 100% COD": 0,
    };

 
    console.log(cartItems)

  
    const customer = JSON.parse(localStorage.getItem("userData") || "{}");
    const customerId = customer?.customerId;
    
  
    const billingAddress = customer?.addresses?.find(
      (addr) => addr.addressType === "HOME"
    );

    const selectedAddress =
    (customer?.addresses || []).find((addr) => addr.addressType === selectedType) ||
    customer?.addresses?.[0] ||
    null;


    useEffect(() => {
        if (cartItems.length > 0) {
            setSelectedWeight((prev) => {
            const newWeights = { ...prev };
            cartItems.forEach(item => {
                if (!newWeights[item.variantId]) {
                // set default to 10 (or from item if available)
                newWeights[item.variantId] = 10; 
                }
            });
            return newWeights;
            });
        }
    }, [cartItems]);


    const handleVariantTypeChange = (variantId, type) => {
        console.log(type)
        setVariantTypes((prev) => ({
          ...prev,
          [variantId]: type,
        }));
      };

     
    

  const handleQuantityChange = (variantId, newQty) => {
  setCartItems((prevItems) =>
    prevItems.map((item) =>
      item.variantId === variantId
        ? { ...item, quantity: newQty }
        : item
    )
  );
};


    
    

    useEffect(() => {
        const fetchWalletBalance = async () => {
            try {
              const transactions = await getWalletTransactions(customer.customerId);
              if (transactions && transactions.length > 0) {
                const latest = transactions[transactions.length - 1]; // Get the last one
                setWalletBalance(latest.totalAmount || 0);
              }
            } catch (error) {
              console.error("Failed to fetch wallet balance", error);
            }
          };
      
        if (customer?.customerId) {
          fetchWalletBalance();
        }
      }, [customer?.customerId]);
      

    const calculateHandlingCharges = (cartItems, selectedAddress) => {
        if (!selectedAddress?.state) return 0;
      
        const customerState = selectedAddress.state.toLowerCase();
        const ratePerKg = customerState === "odisha" ? 3 : 5;
      
        // Sum total weight from cart items
        const totalWeight = cartItems.reduce((acc, item) => {
          const unitWeight = selectedWeight[item.variantId]; 
          const weight = Number(item.quantity) * unitWeight || 0; // assuming 1 quantity = 1kg
          return acc + weight;
        }, 0);
      
        return Number((totalWeight * ratePerKg).toFixed(2));
      };
      

    const getPaymentSplit = (paymentOption) => {
        const regex = /(\d+)% Online and (\d+)% COD/;
        const match = paymentOption.match(regex);
        if (match) {
            return {
                online: parseInt(match[1], 10),
                cod: parseInt(match[2], 10),
            };
        } else {
            return {
                online: 0,
                cod: 100,
            };
        }
    };

    const { online, cod } = getPaymentSplit(selectedPayment);

   const getCouponDiscountDetails = (coupon, item, itemTotal, totalCartWeight, totalCartValue) => {
  if (!coupon) return { allowed: false, amount: 0, percent: 0 };

  const isEligibleProduct = coupon.applicableProducts?.some(p => p.id === item.productId);
  if (!isEligibleProduct) return { allowed: false, amount: 0, percent: 0 };

  const requirement = coupon.minPurchaseRequirement || "";
  let requirementMet = true;

  if (requirement.includes("Minimum purchase amount")) {
    const match = requirement.match(/₹\s?(\d+)/);
    const minAmount = match ? Number(match[1]) : 0;
    requirementMet = totalCartValue >= minAmount;
  } else if (requirement.includes("Minimum quantity required")) {
    const match = requirement.match(/(\d+)/);
    const minQty = match ? Number(match[1]) : 0;
    requirementMet = totalCartWeight >= minQty;
  }

  if (!requirementMet) return { allowed: false, amount: 0, percent: 0 };

  if (coupon.discountType === "FixedAmount") {
    const totalDiscount = Number(coupon.discountValue || 0);
    // Calculate this item's proportional share of the total discount
    const itemSharePercent = itemTotal / totalCartValue;
    const amount = totalDiscount * itemSharePercent;
    const percent = (amount / itemTotal) * 100;
    return { allowed: true, amount, percent };
  } else {
    const percent = Number(coupon.discountValue || 0);
    const amount = (itemTotal * percent) / 100;
    return { allowed: true, amount, percent };
  }
};



const checkDiscountEligibility = ({
  discount,
  totalCartWeight,
  totalCartValue,
  customerId,
  applicableProductIds
}) => {
  // Customer eligibility
  const isCustomerEligible =
    discount.customerEligibilityType === "All" ||
    discount.eligibleCustomers?.some(c => c.customerId === customerId);

  if (!isCustomerEligible)
    return { allowed: false, reason: "Not eligible customer" };

  // Discount must be active
  if (discount.discountStatus !== "ACTIVE")
    return { allowed: false, reason: "Inactive discount" };

  // Product eligibility
  const hasApplicableProduct = discount.applicableProducts?.some(p =>
    applicableProductIds.includes(p.id)
  );
  if (!hasApplicableProduct)
    return { allowed: false, reason: "No eligible products in cart" };

  // Min purchase requirements
  let requirementMet = true;
  let reason = "";

  if (
    discount.minPurchaseRequirement.includes(
      "No minimum purchase requirement"
    )
  ) {
    requirementMet = true;
    reason = "";
  } else if (
    discount.minPurchaseRequirement.includes("Minimum purchase amount")
  ) {
    const match = discount.minPurchaseRequirement.match(/₹\)?\s*:\s*(\d+)/);
    const minAmount = match ? Number(match[1]) : 0;
    requirementMet = totalCartValue >= minAmount;
    console.log(totalCartValue,minAmount)
    if (!requirementMet) reason = `Spend ₹${minAmount} or more`;
  } else if (
    discount.minPurchaseRequirement.includes("Minimum quantity required")
  ) {
    const match = discount.minPurchaseRequirement.match(/(\d+)/);
    const minQty = match ? Number(match[1]) : 0;
    requirementMet = totalCartWeight >= minQty;
    if (!requirementMet) reason = `Buy at least ${minQty}kg`;
  }

  return { allowed: requirementMet, reason };
};




    // const totalProductCost = selectedCartItems.reduce((total, item) => {
    //     return total + item.price * item.quantity;
    // }, 0);
    // const discountByPayment = (totalProductCost * (paymentDiscountMap[selectedPayment] || 0)) / 100;

    // let discountByCoupon = 0;
    // if (appliedCoupon) {
    //     if (appliedCoupon.discountType === 'Percentage') {
    //         discountByCoupon = (totalProductCost * appliedCoupon.discountValue) / 100;
    //     } else {
    //         discountByCoupon = appliedCoupon.discountValue;
    //     }
    // }
    // const totalDiscount = discountByCoupon + discountByPayment;
    // const handlingCharges = handlingChargesMap[selectedPayment] || 0;
    // const netPayable = totalProductCost - (totalDiscount + handlingCharges + platformFees);
    // const adjustedNetPay = Math.max(netPayable - walletUsed, 0);

    const {
  totalProductCost,
  discountByPayment,
  discountByCoupon,
  totalDiscount,
  finalTotal,
  gstAmount,
  netPayable,
  adjustedNetPay,
  onlinePay,
  codPay,
  totalDiscountPercentage,
  handlingCharges,
} = useMemo(() => {
  let totalProductCost = 0;
  let discountByPayment = 0;
  let discountByCoupon = 0;
  let gstAmount = 0;
  let totalCartWeight = 0;

  const paymentDiscountPercent = Number(paymentDiscountMap[selectedPayment] || 0);

  // Pre-calculate total cart weight and value
  selectedCartItems.forEach(item => {
    const unitWeight = selectedWeight[item.variantId]
    const itemWeight = item.quantity * unitWeight;
    const itemTotal = item.price * itemWeight;
    totalCartWeight += itemWeight;
    totalProductCost += itemTotal;
  });

  selectedCartItems.forEach(item => {
    const unitWeight = selectedWeight[item.variantId]
    const itemWeight = item.quantity * unitWeight;
    const itemTotal = item.price * itemWeight;
    const gstRate = item.gstRate || 0;

    const { allowed, amount: couponDiscountAmount, percent: couponPercent } =
      getCouponDiscountDetails(appliedCoupon, item, itemTotal, totalCartWeight, totalProductCost);

    const subtotalAfterCoupon = itemTotal - couponDiscountAmount;

    const paymentDiscountAmount = (subtotalAfterCoupon * paymentDiscountPercent) / 100;

    const discountedTotal = subtotalAfterCoupon - paymentDiscountAmount;
    const gstForItem = (discountedTotal * gstRate) / 100;

    gstAmount += gstForItem;
    discountByCoupon += allowed ? couponDiscountAmount : 0;
    discountByPayment += paymentDiscountAmount;
  });

  const handlingCharges = calculateHandlingCharges(selectedCartItems, selectedAddress);
  const totalDiscount = discountByCoupon + discountByPayment;
  const finalTotal = totalProductCost - totalDiscount;
  const netPayable = finalTotal + gstAmount + handlingCharges + platformFees;
  const adjustedNetPay = Math.max(netPayable - walletUsed, 0);
  const onlinePay = (online / 100) * adjustedNetPay;
  const codPay = (cod / 100) * adjustedNetPay;

  const totalDiscountPercentage =
    ((discountByCoupon + discountByPayment) / totalProductCost) * 100;

  return {
    totalProductCost,
    discountByPayment,
    discountByCoupon,
    totalDiscount,
    finalTotal,
    gstAmount,
    netPayable,
    adjustedNetPay,
    onlinePay,
    codPay,
    totalDiscountPercentage,
    handlingCharges,
  };
}, [selectedCartItems, selectedPayment, appliedCoupon, walletUsed, platformFees, online, cod, selectedAddress]);


    const handleWalletChange = (e) => {
        const value = e.target.value;

        if (value === '') {
            setWalletUsed(0);
            setWalletError('');
            return;
        }

        if (/^\d+$/.test(value)) {
            const numericValue = Number(value);

            if (numericValue > walletBalance) {
                setWalletError('Please enter value less than wallet balance');
            } else {
                setWalletError('');
                setWalletUsed(numericValue);
            }
        }

         const maxUsable = Math.min(walletBalance, netPayable);

        if (value > maxUsable) {
            setWalletError(`Amount should not exceed ₹${Math.round(maxUsable).toLocaleString()}`);
        } else {
            setWalletUsed(value);
            setWalletError('');
        }
        };


  

    // const onlinePay = (online / 100) * totalProductCost;
    // const codPay = (cod / 100) * totalProductCost;


    useEffect(() => {
        if (isSidebarOpen) {
            fetchDiscounts();
        }
    }, [isSidebarOpen]);

    const handleCheckboxChange = (variantId) => {
        setSelectedItems(prev =>
            prev.includes(variantId)
                ? prev.filter(id => id !== variantId)
                : [...prev, variantId]
        );
    };
    const fetchDiscounts = async () => {
        try {
            setLoading(true);
            const data = await getAllDiscounts();
            setDiscounts(data.data);
        } catch (error) {
            console.error("Failed to load discounts", error);
        } finally {
            setLoading(false);
        }
    };
    

    const totalCartWeight = selectedCartItems.reduce((acc, item) => {
        const unit = selectedWeight[item.variantId];
        return acc + (item.quantity * unit);
    }, 0);

    const totalCartValue = selectedCartItems.reduce((acc, item) => {
        const unit = selectedWeight[item.variantId];
        return acc + (item.price * item.quantity * unit);
    }, 0);

   const eligibleDiscounts = discounts
    .filter(discount => discount.discountStatus === "ACTIVE") 
    .map(discount => {
        const result = checkDiscountEligibility({
        discount,
        totalCartWeight,
        totalCartValue,
        customerId,
        applicableProductIds: cartItems.map(item => item.productId)
        });
        return { ...discount, allowed: result.allowed, reason: result.reason };
    });



    console.log(eligibleDiscounts)

    
    const filteredDiscounts = eligibleDiscounts.filter(discount =>
        discount.discountCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

     useEffect(() => {
        if (!appliedCoupon) return;

        // Re-check eligibility for the currently applied coupon
        const { allowed, reason } = checkDiscountEligibility({
            discount: appliedCoupon,
            totalCartWeight,
            totalCartValue,
            customerId,
            applicableProductIds: selectedCartItems.map(item => item.productId)
        });

        if (!allowed) {
            setAppliedCoupon(null);
            showToast(reason || "Discount removed due to cart changes");
        }
    }, [totalCartWeight, totalCartValue, selectedCartItems, appliedCoupon]);
    
    
    const fetchOrders = useCallback(async () => {
        if (!customer?.customerId) return;
    
     

        setLoading(true);
        try {
          
            const cartResponse = await getCart(customer.customerId);
            const cartData = cartResponse?.cartItems || [];

           
            const productResponse = await fetchProducts();
            const allProducts = productResponse?.data || [];
    
            
            const cartProducts = cartData.map((item) => {
                const product = allProducts.find((p) =>
                    p.variants.some((v) => v.id === item.variantId)
                );
                const variant = product?.variants.find((v) => v.id === item.variantId);
    
                if (!product || !variant) {
                    console.warn(`Variant ID ${item.variantId} not found`);
                    return null;
                }
    
                return {
                    productId: product.id,
                    productName: product.productName,
                    size: variant.size,
                    colorName: variant.color?.colorName,
                    hexCode:variant.color?.colorCode,
                    price: variant.pricePerKg,
                    markupPrice:variant.markupPricePerKg,
                    variantId: variant.id,
                    quantity: item.quantity || 1,
                    productImage: product.productImage || "/images/default.png",
                    colorImage:variant.color?.colorImage,
                    gstRate: product.gstOnProduct || 0,
                    variantType: variant.variantType || "Cone", // ← Now pulled directly from variant
                };
            }).filter(Boolean);
    
            setCartItems(cartProducts);
        } catch (error) {
            console.error("Failed to fetch cart items:", error);
        } finally {
            setLoading(false);
        }
    }, [customer?.customerId, setCartItems]);
    
      


    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);


    const handleRemoveFromCart = async (variantId) => {
    if (!customer?.customerId) {
      setToasts([{ message: "Please log in to manage your cart.", type: "error" }]);
      setTimeout(() => setToasts([]), 3000);
      return;
    }

    try {
      await removeFromCart(customer.customerId, variantId);
      fetchOrders(); // if you imported it
      updateCartAndWishlistCounts();
      setToasts([{ message: "Item removed from cart!", type: "success" }]);
    } catch (error) {
      setToasts([{ message: "Failed to remove item from cart!", type: "error" }]);
    }

    setTimeout(() => setToasts([]), 3000);
  };



    const handleSelectPayment = (type) => {
        setSelectedPayment(type)
    }

    // const filteredDiscounts = discounts.filter((discount) =>
    //     discount.discountCode.toLowerCase().includes(searchTerm.toLowerCase())
    // );

   
     const showToast = (message, type = "error") => {
          setToasts([{ message, type }]);
          setTimeout(() => setToasts([]), 3000);
    };


    const breadcrumbs = [
        { label: "Home", link: "/home" },
        { label: "Account", link: "/account" },
        { label: "Shopping Cart", link: "/shoppingCart" }
    ];

    const [showModal, setShowModal] = useState(false);
    
    const handleCouponClick = (discount) => {
        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;
        if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
            clearTimeout(singleClickTimeoutRef.current);
            setAppliedCoupon(discount);
        } else {

            singleClickTimeoutRef.current = setTimeout(() => {
                let savings = 0;

                if (discount.discountType === 'Percentage') {
                    savings = (totalProductCost * discount.discountValue) / 100;
                } else {
                    savings = discount.discountValue;
                }

                setAppliedCoupon(discount);
                // alert(`You have saved Rs ${savings.toFixed(2)}/- amount on your order`);
                setShowModal(true);
            setTimeout(() => {
            setShowModal(false);
        }, 3000);
            }, DOUBLE_TAP_DELAY);
        }

        lastTapRef.current = now;
        setIsSidebarOpen(false);
    };

    const handleQuantityUpdate = (variantId, newQty) => {
        const updatedCart = cartItems.map(item =>
            item.variantId === variantId ? { ...item, quantity: newQty } : item
        );
        setCartItems(updatedCart); // 👈 Your local state that controls the cart
    };

    useEffect(() => {
        if (cartItems.length > 0) {
            const allVariantIds = cartItems.map(item => item.variantId);
            setSelectedItems(allVariantIds);
        }
    }, [cartItems]);

    const extractPaymentTypeDiscount = (paymentTypeLabel) => {
        return paymentTypeLabel?.split(" ")[0] || "";
      };
      

     const buildDetailedOrderVariants = (cartItems) => {
  const paymentDiscount = paymentDiscountMap[selectedPayment] || 0;
  const coupon = appliedCoupon || null;

  const billingState = customer?.addresses?.find(addr => addr.addressType === "HOME")?.state?.toLowerCase() || "";
  const customerState = selectedAddress?.state?.toLowerCase() || "";
  const ratePerKg = customerState === "odisha" ? 3 : 5;

  const totalCartWeight = cartItems.reduce((acc, item) => {
    const unit = selectedWeight[item.variantId];
    return acc + (item.quantity * unit);
  }, 0);

  const totalCartValue = cartItems.reduce((acc, item) => {
    const unit = selectedWeight[item.variantId];
    return acc + (item.price * item.quantity * unit);
  }, 0);

  return cartItems
    .filter(item => item.variantId && item.quantity > 0)
    .map(item => {
      const unitWeight = selectedWeight[item.variantId];
      const itemWeight = item.quantity * unitWeight;
      const itemTotal = item.price * item.quantity * unitWeight;
      const gstRate = item.gstRate || 0;

      const { itemDiscount } = getOrderItemDiscountDetails({
        coupon,
        item,
        itemTotal,
        totalCartWeight,
        totalCartValue,
        paymentDiscountPercent: paymentDiscount
      });

      const discountedTotal = itemTotal - itemDiscount;
      const gstForItem = (discountedTotal * gstRate) / 100;

      const cgst = billingState === "odisha" ? gstForItem / 2 : 0;
      const sgst = billingState === "odisha" ? gstForItem / 2 : 0;
      const igst = billingState !== "odisha" ? gstForItem : 0;

      const handlingCharges = totalCartWeight > 0
        ? (itemWeight / totalCartWeight) * (totalCartWeight * ratePerKg)
        : 0;

      return {
        variantId: item.variantId,
        orderWeight: itemWeight,
        variantType: item.variantType || "Cone",
        orderVariantCgst: Number(cgst.toFixed(0)),
        orderVariantSgst: Number(sgst.toFixed(0)),
        orderVariantIgst: Number(igst.toFixed(0)),
        orderVariantDiscount: Number(itemDiscount.toFixed(0)),
        orderVariantHandlingCharges: Number(handlingCharges.toFixed(0)),
        orderVariantTotalAmount: Number((discountedTotal + gstForItem + handlingCharges).toFixed(0)),
        status: "NEW",
        statusReason: null,
        statusRemark: null,
      };
    });
};

      
      const buildDetailedOrderVariantsForPayment = (cartItems) => {
        const unitWeight = 50;
        const paymentDiscount = paymentDiscountMap[selectedPayment] || 0;
        const productDiscount = appliedCoupon?.discountValue ? Number(appliedCoupon.discountValue) : 0;
      
        const coupon = appliedCoupon || null;
      
        console.log(paymentDiscount,productDiscount)    

        const billingState = customer?.addresses?.find(addr => addr.addressType === "HOME").state.toLowerCase();
        const customerState = selectedAddress?.state?.toLowerCase() || "";
        const ratePerKg = customerState === "odisha" ? 3 : 5;
      
        // Total weight for proportional handling charge calculation
        const totalWeight = cartItems.reduce((acc, item) => {
            if (!item.variantId || item.quantity <= 0) return acc;
          
            const unitWeight = selectedWeight[item.variantId]; // grams
            return acc + item.quantity * unitWeight;
          }, 0);

            const totalCartWeight = cartItems.reduce((acc, item) => {
                const unit = selectedWeight[item.variantId];
                return acc + (item.quantity * unit);
            }, 0);

          const totalCartValue = cartItems.reduce((acc, item) => {
            const unit = selectedWeight[item.variantId];
            return acc + (item.price * item.quantity * unit);
        }, 0);
      
        return cartItems
          .filter(item => item.variantId && item.quantity > 0)
          .map(item => {
            const unitWeight = selectedWeight[item.variantId] ;
            const itemWeight = Number(item.quantity) * unitWeight;
            const itemTotal = item.price * item.quantity * unitWeight;
            const gstRate = item.gstRate || 0;


             const { itemDiscount    } = getOrderItemDiscountDetails({
                coupon,
                item,
                itemTotal,
                totalCartWeight,
                totalCartValue,
                paymentDiscountPercent: paymentDiscount
            });
      
            // let applicableCouponDiscount = 0;
            // if (appliedCoupon?.applicableProducts?.some(p => p.id === item.productId)) {
            //   applicableCouponDiscount = productDiscount;
            // }
      
            // const combinedDiscountPercent =
            //   applicableCouponDiscount + paymentDiscount - (applicableCouponDiscount * paymentDiscount) / 100;

            // console.log(combinedDiscountPercent)
      
            // const itemDiscount = (itemTotal * combinedDiscountPercent) / 100;
            const discountedTotal = itemTotal - itemDiscount;
            const gstForItem = (discountedTotal * gstRate) / 100;
      
            const cgst = billingState === "odisha" ? gstForItem / 2 : 0;
            const sgst = billingState === "odisha" ? gstForItem / 2 : 0;
            const igst = billingState !== "odisha" ? gstForItem : 0;
      
            const handlingCharges = totalWeight > 0 ? (itemWeight / totalWeight) * (totalWeight * ratePerKg) : 0;
      
            return {
              variantId: item.variantId,
              orderWeight: itemWeight,
              variantType: item.variantType || "Cone",
              orderVariantCgst: Number(cgst.toFixed(0)),
              orderVariantSgst: Number(sgst.toFixed(0)),
              orderVariantIgst: Number(igst.toFixed(0)),
              orderVariantDiscount: Number(itemDiscount.toFixed(0)),
              orderVariantHandlingCharges: Number(handlingCharges.toFixed(0)),
              orderVariantTotalAmount: Number((discountedTotal + gstForItem + handlingCharges).toFixed(0)),
              status: "PENDING",
              statusReason: null,
              statusRemark: null,
            };
          });
      };
      
      




      const handleCreateOrder = async () => {
        const showToast = (message, type = "error") => {
            setToasts([{ message, type }]);
            setTimeout(() => setToasts([]), 3000);
          };

        try {

          if (!customerId) {
            showToast("Customer info missing!", "error");
            return;
          }
      
          if (selectedCartItems.length === 0) {
            showToast("Cart is empty!", "error");
            return;
          }

          const isAddressValid = (address) => {
            return (
                address &&
                address.id &&
                address.customerAddress &&
                address.city &&
                address.state &&
                address.country &&
                address.zipcode
            );
            };

            if (!isAddressValid(billingAddress)) {
            showToast("Billing address is incomplete!", "error");
            return;
            }

            if (!isAddressValid(selectedAddress)) {
            showToast("Shipping address is incomplete!", "error");
            return;
            }

         
          const orderVariants = buildDetailedOrderVariants(selectedCartItems);
          const totalQuantity = orderVariants.length;
          const totalAmount = Number(adjustedNetPay).toFixed(0);
      
          if (orderVariants.length === 0 || totalQuantity === 0) {
            showToast("No valid items or weight!", "error");
            return;
          }
      
          const walletUsedAmount = walletUsed || 0;
      
          const totalCgst = orderVariants.reduce((sum, v) => sum + Number(v.orderVariantCgst || 0), 0);
          const totalSgst = orderVariants.reduce((sum, v) => sum + Number(v.orderVariantSgst || 0), 0);
          const totalIgst = orderVariants.reduce((sum, v) => sum + Number(v.orderVariantIgst || 0), 0);

          const totalDiscount = orderVariants.reduce((sum, v) => sum + Number(v.orderVariantDiscount || 0), 0);
          const totalHandlingCharges = orderVariants.reduce((sum, v) => sum + Number(v.orderVariantHandlingCharges || 0), 0);
      
          const orderData = {
            customer: {
              customerId,
              billingAddressId: billingAddress?.id || null,
              shippingAddressId: selectedAddress?.id || null,
            },
            status: "NEW",
            totalAmount: Number(totalAmount),
            discountId: appliedCoupon?.discountId || null,
            quantity: totalQuantity,
            paymentTypeDiscount: extractPaymentTypeDiscount(selectedPayment) || "",
            payment: {
                totalAmount: Number(totalAmount),
                codAmount: Number(codPay.toFixed(0)),
                onlineAmount: Number(onlinePay.toFixed(0)),
                transactionId: "COD" + Date.now(),
                paidAmount: Number(onlinePay.toFixed(0)),
                pendingAmount: Number(codPay.toFixed(0)),
                paymentStatus: "UNPAID",
                totalDiscount: totalDiscount.toFixed(0),
                totalSgst: Number(totalSgst.toFixed(0)),
                totalCgst: Number(totalCgst.toFixed(0)),
                totalIgst: Number(totalIgst.toFixed(0)),
                totalHandlingCharges: Number(totalHandlingCharges.toFixed(0)),
                walletAmount: walletUsedAmount,
            },
            orderVariants,
          };
      
         
          const response = await createOrder(orderData);
      
          await Promise.all(
            selectedCartItems.map(item =>
              removeFromCart(customerId, item.variantId)
            )
          );
      
        updateCartAndWishlistCounts()
        //   alert("Order placed successfully!");
        setIsOrderSuccessOpen(true);
        setTimeout(() => {
          setIsOrderSuccessOpen(false);
          navigate("/orders");
        }, 3000);
          
        } catch (error) {
            console.error("Order creation failed:", error);

            const errorMessage =
                error?.response?.data?.data.message || "Failed to place order";

            showToast(errorMessage, "error");
            }
      };
      

      const handleOnlinePaymentFlow = async () => {
       
      
        let orderId = null; // Declare here to use in catch
      
        try {
          if (!customerId) {
            showToast("Customer info missing!", "error");
            return;
          }
      
          if (selectedCartItems.length === 0) {
            showToast("Cart is empty!", "error");
            return;
          }

           const isAddressValid = (address) => {
            return (
                address &&
                address.id &&
                address.customerAddress &&
                address.city &&
                address.state &&
                address.country &&
                address.zipcode
            );
            };

            if (!isAddressValid(billingAddress)) {
            showToast("Billing address is incomplete!", "error");
            return;
            }

            if (!isAddressValid(selectedAddress)) {
            showToast("Shipping address is incomplete!", "error");
            return;
            }
      
          const orderVariants = buildDetailedOrderVariantsForPayment(selectedCartItems);
          if (orderVariants.length === 0) {
            showToast("No valid items or weight!", "error");
            return;
          }
      
          const totalAmount = Number(adjustedNetPay).toFixed(0);
          const walletUsedAmount = walletUsed || 0;
      
          const orderData = {
            customer: {
              customerId,
              billingAddressId: billingAddress?.id || null,
              shippingAddressId: selectedAddress?.id || null
            },
            status: "PENDING",
            totalAmount: Number(totalAmount),
            discountId: appliedCoupon?.discountId || null,
            quantity: orderVariants.length,
            paymentTypeDiscount: extractPaymentTypeDiscount(selectedPayment) || "",
            payment: {
                totalAmount: Number(totalAmount),
                codAmount: Number(codPay.toFixed(0)),
                onlineAmount: Number(onlinePay.toFixed(0)),
                transactionId: "COD" + Date.now(),
                paidAmount: Number(onlinePay.toFixed(0)),
                pendingAmount: Number(codPay.toFixed(0)),
                paymentStatus: "UNPAID",
                walletAmount: walletUsedAmount,
                totalDiscount: Number(
                    orderVariants.reduce((sum, v) => sum + Number(v.orderVariantDiscount || 0), 0).toFixed(0)
                ),
                totalIgst: isOdisha
                    ? 0.00
                    : Number(gstAmount.toFixed(0)),
                totalSgst: isOdisha
                    ? Number((gstAmount / 2).toFixed(0))
                    : 0.00,
                totalCgst: isOdisha
                    ? Number((gstAmount / 2).toFixed(0))
                    : 0.00,
                totalHandlingCharges: Number(
                    orderVariants.reduce((sum, v) => sum + Number(v.orderVariantHandlingCharges || 0), 0).toFixed(0)
                ),
                },
            orderVariants,
          };
      
          const createdOrder = await createOrder(orderData);
          orderId = createdOrder.data?.orderId;
      
          const paymentData = await initiatePayment(orderId);
          const { razorpayOrderId } = paymentData.data;
      
          if (!razorpayOrderId || paymentData.status !== "SUCCESS") {
            throw new Error("Failed to get valid Razorpay order");
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
            showToast("Razorpay script failed to load. Check your internet connection.", "error");
            return;
          }
      
          const rzp = new window.Razorpay({
            key: razorpayKey,
            amount: Number(onlinePay) * 100,
            currency: "INR",
            name: "Mo ink and Dye",
            description: `Payment for Order #${razorpayOrderId}`,
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
                showToast("Payment succeeded but post-processing failed.", "error");
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

            const errorMessage =
                error?.response?.data?.data.message || "Failed to place order";

            showToast(errorMessage, "error");
            }
      };
      
      
      
      const billingState = customer?.addresses?.find(addr => addr.addressType === "HOME").state.toLowerCase();

      const isOdisha = billingState === "odisha";

   

    return (
        <div>
            <div className='px-6 lg:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
            <div className='px-6 lg:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>

            <div className='px-6 lg:px-14 py-3'>
                <HeroSection productName={"Shopping Cart"} breadcrumbs={breadcrumbs}></HeroSection>
            </div>

            <div className='px-6 md:px-6 lg:px-14 py-3 gap-5 lg:w-full '>
                <h5 className='font-semibold text-xl md:text-2xl'>Review your cart</h5>
                {cartItems.length > 0 ? (
                    <ul className='hidden md:grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                        {cartItems.map((item) => {
                            const totalAmount = cartItems.reduce((acc, item) => {
                            const itemCost = item.price * item.quantity;
                            const gstAmount = (itemCost * 12) / 100;
                            return acc + itemCost + gstAmount;
                            }, 0);

                            return (

                            <li key={item.variantId} className={`${!selectedItems.includes(item.variantId) ? 'opacity-50' : ''}`}>

                                {item && item.productName ? (
                                <div className="position-relative  ">
                                    <button
                                    onClick={() => handleRemoveFromCart(item.variantId)}
                                    className="hidden sm:block rounded-full border-2 position-absolute -top-2 -right-2 z-20 border-purple-800 text-purple-800 font-bold"
                                    >
                                    <RxCross2 size={20} />
                                    </button>
                                    <ProductDetailBoxMini 
                                    productName={item.productName}
                                    productImage={item.productImage}
                                    price={item.price}
                                    size={item.size}
                                    color={item.colorName}
                                    hexCode={item.hexCode}
                                    variantType={item.variantType}
                                    variantId={item.variantId}
                                    isSelected={selectedItems.includes(item.variantId)}
                                    onSelectChange={handleCheckboxChange}
                                    onVariantTypeChange={handleVariantTypeChange}
                                    markupPrice={item.markupPrice}
                                    itemQuantity={item.quantity}
                                    onQuantityChange={handleQuantityChange}
                                    colorImage={item.colorImage}
                                    selectedWeight={selectedWeight}
                                    setSelectedWeight={setSelectedWeight}
                                    />

                                </div>
                                ) : null}
                            </li>
                            );
                        })}
                        </ul>
                ) : (
                    <div className='py-5 hidden sm:block'>
                        <p className='text-center text-xl font-medium'>No cart items found</p>
                    </div>
                )}


                                {cartItems.length > 0 ? (
                                <div className="mt-6">
                                    <ProductDetailBoxMiniMobile
                                    cartItems={cartItems}
                                    setCartItems={setCartItems}
                                    selectedItems={selectedItems}
                                    onSelectChange={handleCheckboxChange}
                                    onVariantTypeChange={handleVariantTypeChange}
                                    onQuantityChange={handleQuantityChange}
                                    onRemove={handleRemoveFromCart}
                                    selectedWeight={selectedWeight}
                                    setSelectedWeight={setSelectedWeight}

                                    />
                                </div>
                                ) : (
                                <div className='py-5 sm:hidden'>
                                    <p className='text-center text-xl font-medium'>No cart items found</p>
                                </div>
                                )}



                <div className=' flex-1 mt-10 md:px-24'>

                    <div className='flex justify-between'>
                        <h5 className='font-semibold text-xl md:text-2xl'>Shipping Address</h5>
                        <button 
                        onClick={() => navigate('/address')} 
                        className='flex items-center gap-2 border-1 p-2 rounded-md border-purple-700 text-purple-800 text-sm font-semibold'
                    >
                        {/* Full text hidden on small screens, shown on `sm` and above */}
                        <span className='hidden sm:inline'>ADD NEW ADDRESS</span>
                        
                        {/* Short version ("Add+") shown only on small screens */}
                        <FaPlus  className='h-5 w-5 sm:hidden' /> 
                    </button>
                    </div>


                    {selectedAddress && (
                        <div className='flex justify-between mt-3 border p-3 rounded-md'>
                            <div>
                                <h4>
                                    Deliver to: <span className='font-semibold'>{customer.customerName}</span>
                                </h4>
                                <p>{selectedAddress.customerAddress}</p>
                                <p>{selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state}</p>
                                <p>{selectedAddress.zipcode}, {selectedAddress.country}</p>
                            </div>

                            {/* Address Type Selection Dropdown */}
                            <div>
                                <Dropdown>
                                <Dropdown.Toggle
                                    className='font-semibold bg-purple-200 flex items-center text-purple-800 sm:w-36 w-15 justify-between px-2 sm:px-4'
                                    variant="light"
                                    id="dropdown-basic"
                                >
                                    {selectedType ? (
                                    <>
                                        <span className="hidden sm:inline ">{selectedType}</span>
                                        {selectedType === 'HOME' ? (
                                        <BiHomeAlt size={20} className="sm:ml-2 mx-auto " />
                                        ) : selectedType === 'WORK' ? (
                                        <PiSuitcaseSimpleBold size={20} className="sm:ml-2 mx-auto" />
                                        ) : (
                                        <BiBuildingHouse size={20} className="sm:ml-2 mx-auto" />
                                        )}
                                    </>
                                    ) : (
                                    <span className='hidden sm:inline'>Select type</span>
                                    )}
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='left-auto right-0 min-w-[2rem] sm:min-w-[9rem]'>
                                    {["HOME", "WORK", "OTHER"]
                                    .filter(type =>
                                        customer.addresses?.some(addr => addr.addressType === type)
                                    )
                                    .map((type) => (
                                        <Dropdown.Item
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className="text-sm"
                                        >
                                        {type}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                                </Dropdown>

                            </div>
                        </div>
                    )}


                    {/* { <ul className='flex flex-col gap-3 mt-3'>
                    {
                        customer.addresses.map((item,index)=>(
                            <li key={index}>
                                <AddressBox address={item} name={customer.customerName} company={customer.company} phone={customer.phoneNumber}></AddressBox>
                            </li>
                        ))
                    }
                     </ul>
                    } */}


                    {/* <div className='mt-6 flex flex-col gap-1'>
                    <label className='font-semibold text-lg'>Full name <span className='text-red-900'>*</span></label>
                    <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter full name'></input>
                </div>

                <div className='mt-6 flex flex-col gap-1'>
                    <label className='font-semibold text-lg'>Email address <span className='text-red-900'>*</span></label>
                    <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter Email'></input>
                </div>

                <div className='mt-6 flex flex-col gap-1'>
                    <label className='font-semibold text-lg'>Calling number <span className='text-red-900'>*</span></label>
                    <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter number'></input>
                </div>

                <div className='mt-6 flex flex-col gap-1'>
                    <label className='font-semibold text-lg'>Whatsapp number <span className='text-red-900'>*</span></label>
                    <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter number'></input>
                </div>

                <div className='mt-6 flex flex-col gap-1'>
                    <label className='font-semibold text-lg'>Country <span className='text-red-900'>*</span></label>
                    <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Choose'></input>
                </div>

                    <div className='block md:flex gap-2'>
                            <div className='mt-6 flex-1 flex flex-col gap-1'>
                                <label className='font-semibold text-lg'>City <span className='text-red-900'>*</span></label>
                                <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter City'></input>
                            </div>

                            <div className='mt-6 flex-1 flex flex-col gap-1'>
                                <label className='font-semibold text-lg'>State <span className='text-red-900'>*</span></label>
                                <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter State'></input>
                            </div>

                            <div className='mt-6 flex-1 flex flex-col gap-1'>
                                <label className='font-semibold text-lg'>Zip Code <span className='text-red-900'>*</span></label>
                                <input className='h-10 rounded-lg border-gray-300 ps-2 border-2' placeholder='Enter Zip code'></input>
                            </div>

                    </div>

                    <div className='flex gap-2 mt-6'>
                        <input type='checkbox'></input>
                        <p>I have read and agree to the Terms and Conditions</p>
                    </div> */}

                    <div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-3'>
                        <div className=''>
                            <h5 className='font-semibold text-xl md:text-2xl'>Payment</h5>
                            <Dropdown onSelect={handleSelectPayment} size="sm" className='mt-2 md:text-sm'>
                                <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center justify-content-between gap-2 w-100">
                                    <p className="m-0">{selectedPayment}</p>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='w-full'>
                                    <Dropdown.Item eventKey={"100% Online and 0% COD"}>
                                        <div className='p-2 border-bottom'>
                                            <h4 className='lg:lg:text-xl font-medium md:text-sm'>Pay <span className='text-purple-800'>100%</span> in Online & <span className='text-purple-800'>0%</span> COD</h4>
                                            <h5 className='md:text-sm'>1.50% discount applied.</h5>
                                        </div>
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey={"50% Online and 50% COD"}>
                                        <div className='p-2 border-bottom flex flex-wrap items-start gap-1 justify-between'>
                                            <div>
                                                <h4 className='lg:text-xl font-medium md:text-sm'>Pay <span className='text-purple-800'>50%</span> in Online & <span className='text-purple-800'>50%</span> COD</h4>
                                                <h5 className='md:text-sm'>0.50% discount applied.</h5>
                                            </div>

                                            {/* <div className=' lg:text-lg text-white text-bold border bg-purple-800 rounded-full px-2 py-1 text-xs'>
                                                Recommended
                                            </div> */}

                                        </div>
                                    </Dropdown.Item>

                                    {/* <Dropdown.Item eventKey={"30% Online and 70% COD"}>
                                        <div className='p-2 border-bottom'>
                                            <h4 className='lg:text-xl font-medium md:text-sm'>Pay <span className='text-purple-800'>30%</span> in Online & <span className='text-purple-800'>70%</span> COD</h4>
                                            <h5 className='md:text-sm'>0.30% discount applied.</h5>
                                        </div>
                                    </Dropdown.Item>

                                    <Dropdown.Item eventKey={"25% Online and 75% COD"}>
                                        <div className='p-2 border-bottom'>
                                            <h4 className='lg:text-xl font-medium md:text-sm'>Pay <span className='text-purple-800'>25%</span>in Online & <span className='text-purple-800'>75%</span> COD</h4>
                                            <h5 className='md:text-sm'>0.50% discount applied.</h5>
                                        </div>
                                    </Dropdown.Item> */}

                                    <Dropdown.Item eventKey={"0% Online and 100% COD"}>
                                        <div className='p-2 '>
                                            <h4 className='lg:text-xl font-medium md:text-sm'>Pay <span className='text-purple-800'>0%</span> in Online & <span className='text-purple-800'>100%</span> COD</h4>
                                            <h5 className='md:text-sm'>No discount on COD.</h5>
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <div className="">
                            <h5 className="font-semibold text-xl md:text-2xl">Discounts</h5>
                            <Button
                                variant="light"

                                className="d-flex align-items-center justify-content-between gap-2 w-100 mt-2"


                                onClick={() => setIsSidebarOpen(true)} // Open sidebar on click
                            >
                                { appliedCoupon ? appliedCoupon.discountCode : "Select Discount"}
                            </Button>
                        </div>
                    </div>

                    <div
                        className={`fixed top-0 right-0 w-5/6 md:w-2/5 lg:w-1/3 h-full bg-white shadow-lg transform transition-transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
                            } z-50 p-4`}
                        style={{ overflowY: "auto" }}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-gray-600 hover:text-black"
                            onClick={() => setIsSidebarOpen(false)} // Close sidebar
                        >
                            <IoClose size={24} />
                        </button>

                        {/* Sidebar Content */}
                        <h4 className="font-bold text-xl mb-4">Apply Coupon</h4>
                        {loading ? (
                            <p className="text-center text-gray-500">Loading discounts...</p>
                        ) : discounts.length > 0 ? (

                            <div>

                                <div>
                                    <input
                                        className='border-2 rounded-md p-2 w-full'
                                        placeholder='Enter Coupon Code'
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <h4 className='font-semibold text-lg mt-3'>Best Coupon</h4>

                               <ul className="space-y-2 mt-3 cursor-pointer">
                                {filteredDiscounts.map((discount) => (
                                    <li
                                    key={discount.discountId}
                                    className={`border rounded-xl flex ${!discount.allowed ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                    {/* Left Purple Discount Badge */}
                                    <div className="bg-purple-800 w-10 relative rounded-l-xl">
                                        <h4
                                        className="-rotate-90 text-sm font-bold text-white -translate-x-4 translate-y-12 w-20 select-none"
                                        onClick={() => discount.allowed && handleCouponClick(discount)}
                                        >
                                        {discount.discountValue}
                                        {discount.discountType === 'Percentage' ? '%' : '₹'} OFF
                                        </h4>
                                         <div className="absolute top-4 -left-2 w-3 h-3 bg-white rounded-full"></div>
                                            <div className="absolute top-8 -left-2 w-3 h-3 bg-white rounded-full"></div>
                                            <div className="absolute top-12 -left-2 w-3 h-3 bg-white rounded-full"></div>
                                            <div className="absolute top-16 -left-2 w-3 h-3 bg-white rounded-full"></div>
                                            <div className="absolute top-20 -left-2 w-3 h-3 bg-white rounded-full"></div>
                                            <div className="absolute top-24 -left-2 w-3 h-3 bg-white rounded-full"></div>
                                            <div className="absolute top-28 -left-2 w-3 h-3 bg-white rounded-full"></div>
                                            <div className="absolute top-32 -left-2 w-3 h-3 bg-white rounded-full"></div>
                                            <div className="absolute top-36 -left-2 w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                   

                                    {/* Right Discount Details */}
                                    <div
                                        className={`flex-1 p-2 hover:border-blue-800 hover:border-2 hover:rounded-tr-md hover:rounded-br-md 
                                        ${appliedCoupon?.discountId === discount.discountId ? "border-blue-800 border-2 rounded-tr-md rounded-br-md" : ""}`}
                                    >
                                        <div className="flex justify-between">
                                        <h3 className="font-semibold text-xl">{discount.discountCode}</h3>
                                        {discount.allowed ? (
                                            <h5
                                            className="text-purple-800 font-bold text-md cursor-pointer"
                                            onClick={() => handleCouponClick(discount)}
                                            >
                                            APPLY
                                            </h5>
                                        ) : (
                                            <h5 className="text-gray-400 font-bold text-md">
                                            Not Eligible
                                            </h5>
                                        )}
                                        </div>

                                        <h4 className="text-green-600 font-semibold mt-2 border-b-2 border-dotted pb-2">
                                        Save ₹
                                        {Math.round(
                                            discount.discountType === 'Percentage'
                                            ? (Number(totalProductCost) * Number(discount.discountValue)) / 100
                                            : Number(discount.discountValue)
                                        )} on this order!
                                        </h4>

                                        <h4 className="mt-3 font-medium">{discount.minPurchaseRequirement}</h4>

                                        <h4 className="mt-3 font-medium">
                                        Use Code {discount.discountCode} Get {discount.discountValue}
                                        {discount.discountType === 'Percentage' ? '%' : '₹'} off as discount bonus
                                        </h4>
                                    </div>
                                    </li>
                                ))}
                                </ul>

                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No discounts available.</p>
                        )}
                    </div>


                    {isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={() => setIsSidebarOpen(false)}
                        ></div>
                    )}


                    {/* <div className='mt-6'>
                        <h5 className='font-bold text-2xl'>Payment</h5>

                        <div className='flex justify-between mt-4'>
                            <div className='border-purple-800 border-1 font-medium p-1 rounded-md bg-purple-100'>
                                Pay <span className='text-purple-800'>25%</span> in advance
                            </div>

                            <div className='border-purple-800 border-1 font-medium p-1 rounded-md bg-white-100'>
                                Pay <span className='text-purple-800'>50%</span> in advance
                            </div>

                            <div className='border-purple-800 border-1 font-medium p-1 rounded-md bg-white-100'>
                                Pay <span className='text-purple-800'>75%</span> in advance
                            </div>

                            <div className='border-purple-800 border-1 font-medium p-1 rounded-md bg-white-100'>
                                Pay <span className='text-purple-800'>Full</span> in advance
                            </div>
                        </div>

                        <h6 className='mt-6'>Flat<span className='text-purple-800'> 25%</span> discount is applied to your order total</h6>

                    </div> */}

                    {/* <div className='mt-6'>
                        <div className='flex gap-2 border-1 rounded-t-md bg-purple-100 border-purple-800 p-3'>
                            <input type='radio'></input>
                            <h5 className='font-semibold'>Credit card</h5>
                        </div>
                        
                        <div className='grid grid-cols-2 gap-2 bg-gray-100 p-3 border'>
                            <input placeholder='Card number' className='col-span-2 border-1 border-gray-300 h-10 p-1 rounded-md'></input>
                        
                          
                            <input placeholder='Expiration date(MM/YY)' className='border-1 border-gray-300 h-10 p-1 rounded-md'></input>
                        
                            <input placeholder='Security code' className='border-1 border-gray-300 h-10 p-1 rounded-md'></input>
                        

                            <input placeholder='Name on card' className='col-span-2 border-1 border-gray-300 h-10 p-1 rounded-md'></input>
                        
                        </div>

                        <div className='flex gap-2 p-3 border-1 rounded-b-md'>
                            <input type='radio'></input>
                            <h5 className='font-semibold'>Cash on Delivery(COD)</h5>
                        </div>

                    </div> */}
                </div>
                <div className=' flex-1 md:px-24'>
                    <div className='border-1 rounded-md p-3 mt-10'>
                        <table className='w-100 rounded mt-2 font-semibold'>
                            <tbody className='leading-8'>
                                <tr className=''>
                                    <td className='pb-0.5'>Total Cost</td>
                                    <td></td>
                                   <td style={{ textAlign: 'end' }}>₹{Math.round(totalProductCost).toLocaleString()}
                                    </td>
                                </tr>
                                <tr className='border-b-2'>
                                    <td>
                                        <div>
                                            <p className='pb-0.5'>Total Discount</p>
                                            <p className='text-gray-400 pl-6 pb-0.5'>Pay type</p>
                                            <p className='text-gray-400 pl-6 pb-2'>Coupon </p>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p>{(totalDiscountPercentage).toFixed(2) || "0.00"}%
                                            </p>
                                            <p className="text-gray-400">
                                                {paymentDiscountMap[selectedPayment] !== undefined
                                                    ? `${paymentDiscountMap[selectedPayment]}%`
                                                    : '0.00%'}
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
                                    <td className='d-flex justify-end mt-3'>
                                        <div>
                                            <p className='text-end text-green-500'>
                                             <span className="mr-1 font-semibold">-</span> ₹{totalDiscount.toFixed(0)}</p>
                                            {/* <p className='text-gray-400 text-end'>₹{discountByPayment.toFixed(0)}</p> */}
                                            {/* <p className='text-gray-400 text-end'>₹{discountByCoupon.toFixed(0)}</p> */}
                                        </div>
                                    </td>
                                </tr>
                                
                                <tr className=''>
                                    <td className='pt-2 pb-0.5'>Final Cost</td>
                                    <td className='pt-2 pb-0.5'></td>
                                    <td className='text-end pt-2 pb-0.5'>₹{finalTotal.toFixed(0)}</td>
                                </tr>

                                
                                {
                            isOdisha ? (
                                <>

                                        <tr className=''>
                                            <td className='pb-0.5'>CGST</td>
                                            <td className='pb-0.5'></td>
                                            <td className='text-end pb-0.5'>₹{(gstAmount/2).toFixed(0)}</td>
                                        </tr>

                                        <tr className=''>
                                            <td className='pb-0.5'>SGST</td>
                                            <td className='pb-0.5'></td>
                                            <td className='text-end pb-0.5'>₹{(gstAmount/2).toFixed(0)}</td>
                                        </tr>

                                        </>
                                    ) : (
                                    <tr>
                                    <td className='pb-0.5'>SGST</td>
                                    <td className='pb-0.5'></td>
                                    <td className='text-end pb-0.5'>₹{(gstAmount).toFixed(0)}</td>
                                    </tr>
                                )
                                }
                                

                                <tr className=''>
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
                                    <td className='text-end pt-2 pb-0.5'>
                                        ₹{Math.round(netPayable).toLocaleString()}
                                    </td>
                                </tr>
                                <tr className='border-b-2'>
                                    <td className='pb-2'>Wallet</td>
                                    <td className='pb-2'>₹{walletBalance.toFixed(0)}</td>
                                    <td style={{ textAlign: 'end' }} className='pb-2'>
                                        <div className="text-right">
                                          <span className="mr-1 font-semibold">-</span>
                                            <input
                                                type="text"
                                                placeholder="Amount"
                                                className={`w-20 border rounded-md text-green-500 text-right px-1 ${walletError ? 'border-red-500' : 'border-gray-300'}`}
                                                value={walletUsed === 0 ? '' : walletUsed}
                                                onChange={handleWalletChange}
                                                />
                                                {walletError && (
                                                <p className="text-red-500 text-xs mt-1">{walletError}</p>
                                                )}
                                        </div>
                                    </td>
                                </tr>
                                <tr className='border-b-2'>
                                     <td className='pt-2 pb-2'>To pay</td>
                                    <td className='pt-2'></td>
                                    <td className='text-end pt-2 pb-2'>
                                        ₹{Math.round(adjustedNetPay).toLocaleString()}
                                    </td>
                                </tr>
                               
                                <tr>
                                    <td className='pt-2 pb-0.5 '>Advance Paid</td>
                                    <td className='pt-2 pb-0.5'>{online}%</td>
                                    <td className='text-end pt-2 pb-0.5'>₹{onlinePay.toFixed(0)}
                                    </td>
                                </tr>

                                <tr className=''>
                                    <td className='pb-2'>Balance Due</td>
                                    <td className='pb-2'>{cod}%</td>
                                    <td className='text-end pb-2'>₹{codPay.toFixed(0)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <div className='mt-6 md:px-24'>
                        {selectedPayment === "0% Online and 100% COD" ? (
                            <button className='bg-orange-500 text-white p-3 rounded-md w-full'
                            onClick={handleCreateOrder}>CREATE ORDER</button>
                        ) : (
                            <button className='bg-purple-900 text-white p-3 rounded-md w-full'
                            onClick={handleOnlinePaymentFlow}>PAY NOW</button>
                        )}
                    </div>
                    <div className='mt-6 md:px-24'>
                        <h4 className='font-semibold flex gap-2'><span className='text-purple-800'><RiLock2Line size={20} /></span>Ensure Checkout- SSL Encrypted</h4>
                        <p className='text-slate-400 mt-2'>Ensuring your financial and personal details are secure during every transaction</p>
                    </div>
                </div>
            </div>
            <div className='px-6 lg:px-14 py-3 mt-10'><Cta></Cta></div>
            <div className='px-6 lg:px-14 py-3'> <Footer></Footer></div>
            <BottomNav></BottomNav>

            <ModalSuccess
            isOpen={isOrderSuccessOpen}
            onClose={() => setIsOrderSuccessOpen(false)}
            />

            <ModalCoupon 
                isOpen={showModal} 
                onClose={() => setShowModal(false)} 
                discount={discountByCoupon}
                discountCode={appliedCoupon?.discountCode}
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
        
    )
}

export default CheckoutPage