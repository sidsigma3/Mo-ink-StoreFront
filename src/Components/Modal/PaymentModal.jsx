import React, { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  orderDetails, 
  balanceDue, 
  onPaymentInitiate 
}) => {
  const [formData, setFormData] = useState({
    paymentAmount: balanceDue || 0,
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Update payment amount when balanceDue changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      paymentAmount: balanceDue || 0
    }));
  }, [balanceDue]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Payment amount validation
    if (!formData.paymentAmount || formData.paymentAmount <= 0) {
      newErrors.paymentAmount = 'Please enter a valid payment amount';
    } else if (formData.paymentAmount > balanceDue) {
      newErrors.paymentAmount = `Amount cannot exceed balance due of ₹${balanceDue}`;
    } else if (formData.paymentAmount < 1) {
      newErrors.paymentAmount = 'Minimum payment amount is ₹1';
    }

    // Terms validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Please agree to terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Get customer details from localStorage
      const customer = JSON.parse(localStorage.getItem('userData') || '{}');
      
      // Prepare payment data for Razorpay
      const paymentData = {
        orderId: orderDetails?.orderId,
        amount: formData.paymentAmount,
        currency: 'INR',
        customerDetails: {
          name: customer.firstName ? `${customer.firstName} ${customer.lastName || ''}`.trim() : 'Customer',
          email: customer.email || '',
          phone: customer.phone || customer.mobileNumber || ''
        },
        orderData: orderDetails
      };

      // Call the payment initiation function
      await onPaymentInitiate(paymentData);
      
    } catch (error) {
      console.error('Payment initiation failed:', error);
      setErrors({ submit: 'Payment initiation failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const quickAmounts = [
    Math.round(balanceDue * 0.25),
    Math.round(balanceDue * 0.5),
    Math.round(balanceDue * 0.75),
    balanceDue
  ].filter((amount, index, arr) => arr.indexOf(amount) === index && amount > 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-2 border-b border-gray-200">
          <div className="pr-8">
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Complete Payment</h2>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              Order #{orderDetails?.orderId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/80 rounded-xl transition-all duration-200 group"
            disabled={isProcessing}
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Payment Amount Section */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Payment Amount
            </label>
            
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">₹</div>
              <input
                type="number"
                value={formData.paymentAmount}
                onChange={(e) => handleInputChange('paymentAmount', parseFloat(e.target.value) || 0)}
                className={`w-full pl-10 pr-4 py-2 text-lg font-semibold border-2 rounded-xl bg-gray-50/50 transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-300 ${
                  errors.paymentAmount ? 'border-red-300 focus:ring-red-100 focus:border-red-400' : 'border-gray-200'
                }`}
                placeholder="0.00"
                min="1"
                max={balanceDue}
                step="0.01"
              />
            </div>
            
            {/* Quick Amount Buttons */}
            {quickAmounts.length > 1 && (
              <div className="space-y-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Quick Select</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleInputChange('paymentAmount', amount)}
                      className="px-4 py-2.5 text-sm font-medium border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-blue-100"
                    >
                      {formatAmount(amount)}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* <div className="flex justify-between items-center text-sm bg-gray-50 rounded-xl p-4">
              <span className="text-gray-600 font-medium">Balance Due</span>
              <span className="font-bold text-lg text-purple-600">{formatAmount(balanceDue)}</span>
            </div> */}

            {errors.paymentAmount && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-xl">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errors.paymentAmount}</span>
              </div>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 pl-4">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={formData.agreeTerms}
                onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                className={`w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-100 mt-0.5 transition-all duration-200 ${
                  errors.agreeTerms ? 'border-red-300' : ''
                }`}
              />
              <label htmlFor="agreeTerms" className="text-sm text-gray-700 leading-relaxed">
                I agree to the{' '}
                <a href="/terms" className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors" target="_blank">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors" target="_blank">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agreeTerms && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-xl ml-8">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errors.agreeTerms}</span>
              </div>
            )}
          </div>

          {/* Error Display */}
          {errors.submit && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700 font-medium">{errors.submit}</p>
            </div>
          )}

          {/* Payment Summary */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-3 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Payment Summary
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Payment Amount</span>
                <span className="font-semibold text-gray-900">{formatAmount(formData.paymentAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Gateway Charges</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="h-px bg-gray-200 my-3"></div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total Amount</span>
                <span className="font-bold text-xl text-gray-900">{formatAmount(formData.paymentAmount)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-2 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:ring-2 focus:ring-gray-100"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing || !formData.agreeTerms}
              className="flex-1 px-5 py-2 bg-purple-800 text-white font-semibold rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-purple-200"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <span>Pay {formatAmount(formData.paymentAmount)}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;