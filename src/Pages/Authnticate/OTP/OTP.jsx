import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../../Components/Toast/Toast";
import { otpVerify, otpSend } from "../../../Services/CustomerService";
import { useLocation } from "react-router-dom";
import { createCustomer } from "../../../Services/CustomerService";
import ModalOTPVerified from "../../../Components/Modal/ModalOTPVerified";
import { GoogleLogin } from "@react-oauth/google";

const OTP = () => {
  const location = useLocation();
  const customerData = location.state?.customerData;
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [emailCode, setEmailCode] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [error, setError] = useState("");
  const [toasts, setToasts] = useState([]);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  
  // Individual verification states
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  
  // Timer states
  const [emailTimer, setEmailTimer] = useState(120);
  const [phoneTimer, setPhoneTimer] = useState(120);
  const [emailTimerActive, setEmailTimerActive] = useState(true);
  const [phoneTimerActive, setPhoneTimerActive] = useState(true);

  const showToast = (message, type = "error") => {
    setToasts([{ message, type }]);
    setTimeout(() => setToasts([]), 3000);
  };

  // Format timer display (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Email timer effect
  useEffect(() => {
    let interval = null;
    if (emailTimerActive && emailTimer > 0) {
      interval = setInterval(() => {
        setEmailTimer(timer => timer - 1);
      }, 1000);
    } else if (emailTimer === 0) {
      setEmailTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [emailTimer, emailTimerActive]);

  // Phone timer effect
  useEffect(() => {
    let interval = null;
    if (phoneTimerActive && phoneTimer > 0) {
      interval = setInterval(() => {
        setPhoneTimer(timer => timer - 1);
      }, 1000);
    } else if (phoneTimer === 0) {
      setPhoneTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [phoneTimer, phoneTimerActive]);

  // Auto-submit when both OTPs are verified
  useEffect(() => {
    if (isEmailVerified && isPhoneVerified && !isOtpVerified) {
      handleFinalSubmit();
    }
  }, [isEmailVerified, isPhoneVerified]);

  const handleNumericInput = (e, setter, otpType) => {
    // Don't allow input if already verified
    if ((otpType === 'email' && isEmailVerified) || (otpType === 'phone' && isPhoneVerified)) {
      return;
    }

    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 6) {
      showToast("Only 6 digits are allowed", "error");
      value = value.slice(0, 6);
    }
    setter(value);

    // Auto-verify when 6 digits are entered
    if (value.length === 6) {
      if (otpType === 'email') {
        verifyEmailOTP(value);
      } else if (otpType === 'phone') {
        verifyPhoneOTP(value);
      }
    }
  };

  const verifyEmailOTP = async (otp) => {
    if (!customerData) {
      showToast("Missing customer data. Please register again.", "error");
      return;
    }

    try {
      await otpVerify({
        emailOrPhone: customerData.email,
        otp: otp,
        accountType: "CUSTOMER",
        otpType: "EMAIL",
      });
      
      setIsEmailVerified(true);
      showToast("Email OTP verified successfully!", "success");
      
      // Focus on phone input if not verified yet
      if (!isPhoneVerified) {
        setTimeout(() => {
          const phoneInput = document.getElementById('phone-otp-input');
          if (phoneInput) phoneInput.focus();
        }, 500);
      }
    } catch (error) {
      console.error("Email OTP verification error:", error);
      showToast("Invalid Email OTP. Please try again.", "error");
    }
  };

  const verifyPhoneOTP = async (otp) => {
    if (!customerData) {
      showToast("Missing customer data. Please register again.", "error");
      return;
    }

    try {
      await otpVerify({
        emailOrPhone: customerData.phoneNumber,
        otp: otp,
        accountType: "CUSTOMER",
        otpType: "PHONE",
      });
      
      setIsPhoneVerified(true);
      showToast("Phone OTP verified successfully!", "success");
      
      // Focus on email input if not verified yet
      if (!isEmailVerified) {
        setTimeout(() => {
          const emailInput = document.getElementById('email-otp-input');
          if (emailInput) emailInput.focus();
        }, 500);
      }
    } catch (error) {
      console.error("Phone OTP verification error:", error);
      showToast("Invalid Phone OTP. Please try again.", "error");
    }
  };

  const handleFinalSubmit = async () => {
    if (!customerData) {
      showToast("Missing customer data. Please register again.", "error");
      return;
    }

    try {
      await createCustomer(customerData);
      setIsOtpVerified(true);
    } catch (error) {
      console.error("Customer creation error:", error);
      showToast("Account creation failed. Please try again.", "error");
    }
  };

  const resendEmailOTP = async (e) => {
    e.preventDefault();
    if (emailTimerActive || isEmailVerified) return;
    
    try {
      if (customerData.email) {
        await otpSend({
          emailOrPhone: customerData.email,
          accountType: "CUSTOMER",
          otpType: "EMAIL",
        });
        showToast("Email OTP resent successfully!", "success");
        setEmailTimer(120);
        setEmailTimerActive(true);
        setEmailCode("");
        setIsEmailVerified(false);
      } else {
        showToast("Missing email address.", "error");
      }
    } catch (error) {
      console.error("Resend email OTP error:", error);
      showToast("Failed to resend Email OTP.", "error");
    }
  };

  const resendPhoneOTP = async (e) => {
    e.preventDefault();
    if (phoneTimerActive || isPhoneVerified) return;
    
    try {
      if (customerData.phoneNumber) {
        await otpSend({
          emailOrPhone: customerData.phoneNumber,
          accountType: "CUSTOMER",
          otpType: "PHONE",
        });
        showToast("Phone OTP resent successfully!", "success");
        setPhoneTimer(120);
        setPhoneTimerActive(true);
        setPhoneCode("");
        setIsPhoneVerified(false);
      } else {
        showToast("Missing phone number.", "error");
      }
    } catch (error) {
      console.error("Resend phone OTP error:", error);
      showToast("Failed to resend Phone OTP.", "error");
    }
  };

  useEffect(() => {
    if (isOtpVerified) {
      showToast("Congratulation, Your account is created", "success");
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOtpVerified, navigate]);

  return (
    <div className="w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-center opacity-40 bg-cover filter blur-sm z-0"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/dddepth-198.jpg?updatedAt=1751281331520')",
        }}
      ></div>

      {/* Logo */}
      <div className="absolute top-4 left-4 lg:left-8 lg:top-8 flex justify-center lg:justify-start w-full lg:w-auto pr-4">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-28 sm:w-24 mx-auto lg:mx-0"
        />
      </div>

      {/* Toast messages */}
      <div className="absolute top-4 right-4 z-50">
        {toasts.map((toast, index) => (
          <Toast key={index} message={toast.message} type={toast.type} />
        ))}
      </div>

      {/* Verify Code Box */}
      <div className="verify-box bg-blur bg-opacity-40 p-6 sm:p-8 rounded-3xl border-3 border-white w-full max-w-md sm:max-w-lg text-white backdrop-blur-md z-10">
        <button
          className="text-sm text-dark font-medium mb-3 hover:underline"
          onClick={() => navigate("/signup")}
        >
          &larr; Back to Registration
        </button>

        <h2 className="text-2xl text-dark font-bold mb-2">Verify Your OTP</h2>
        <p className="text-l text-gray-600 mb-6">
          An OTP has been sent to your email & Phone number
        </p>

        {/* Email OTP Section */}
        <div className="relative mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-dark text-l font-semibold">Email OTP</span>
            <button
              type="button"
              className={`text-sm cursor-pointer ${
                emailTimerActive || isEmailVerified
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-dark font-medium hover:underline'
              }`}
              onClick={resendEmailOTP}
              disabled={emailTimerActive || isEmailVerified}
            >
              {isEmailVerified 
                ? '' 
                : emailTimerActive 
                  ? `Resend (${formatTime(emailTimer)})` 
                  : 'Resend'
              }
            </button>
          </div>
          <div className="relative">
            <input
              id="email-otp-input"
              type="text"
              placeholder="Enter Email OTP"
              className={`w-full px-4 py-1 mb-1 text-left align-center rounded-full text-black placeholder-gray-500 border-1 focus:outline-none focus:ring-2 ${
                isEmailVerified 
                  ? 'border-gray-400 bg-gray-200 cursor-not-allowed pr-10' 
                  : 'border-purple-800 focus:ring-purple-500'
              }`}
              value={emailCode}
              onChange={(e) => handleNumericInput(e, setEmailCode, 'email')}
              disabled={isEmailVerified}
              maxLength={6}
            />
            {isEmailVerified && (
              <div className="absolute right-3 top-[46%]   transform -translate-y-1/2 text-green-500 text-lg">
               <img 
              src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/check.png?updatedAt=1753792558024" 
              alt="Verified" 
              className="w-4 h-4" 
            />
              </div>
            )}
          </div>
        </div>

        {/* Phone OTP Section */}
        <div className="relative mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-dark text-l font-semibold">Phone OTP</span>
            <button
              type="button"
              className={`text-sm cursor-pointer ${
                phoneTimerActive || isPhoneVerified
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-dark font-medium hover:underline'
              }`}
              onClick={resendPhoneOTP}
              disabled={phoneTimerActive || isPhoneVerified}
            >
              {isPhoneVerified 
                ? '' 
                : phoneTimerActive 
                  ? `Resend (${formatTime(phoneTimer)})` 
                  : 'Resend'
              }
            </button>
          </div>
          <div className="relative">
            <input
              id="phone-otp-input"
              type="text"
              placeholder="Enter Phone OTP"
              className={`w-full px-4 py-1 text-left align-center rounded-full text-black placeholder-gray-500 border-1 focus:outline-none focus:ring-2 ${
                isPhoneVerified 
                  ? 'border-gray-400 bg-gray-200  cursor-not-allowed pr-10' 
                  : 'border-purple-800 focus:ring-purple-500'
              }`}
              value={phoneCode}
              onChange={(e) => handleNumericInput(e, setPhoneCode, 'phone')}
              disabled={isPhoneVerified}
              maxLength={6}
            />
            {isPhoneVerified && (
          <div className="absolute right-3 top-[46%]   transform -translate-y-1/2 text-green-500 text-lg">
               <img 
              src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/check.png?updatedAt=1753792558024" 
              alt="Verified" 
              className="w-4 h-4" 
            />
              </div>
            )}
          </div>
        </div>

        {/* Status message */}
        {isEmailVerified && isPhoneVerified && (
          <div className="text-center text-green-500 text-sm font-medium mt-4">
            Creating your account...
          </div>
        )}

        {message && (
          <p className="text-green-400 text-sm mt-4">{message}</p>
        )}

        {/* <div className="text-center text-xs my-4 text-gray-600">Or signin with</div>
        <div className="flex flex-row justify-center items-center gap-2 lg:gap-4">
          <div className="w-3/5 rounded-xl">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse.credential);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        </div> */}
      </div>

      {/* OTP Verified Modal */}
      {isOtpVerified && <ModalOTPVerified />}
    </div>
  );
};

export default OTP;