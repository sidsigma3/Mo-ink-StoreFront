import React, { useState, useEffect } from 'react';
import './SignupPage.css';
import { useNavigate } from "react-router-dom";
import ToggleBtn from '../../../Components/Buttons/ToggleButton/ToggleBtn';
import { createCustomer , otpSend } from '../../../Services/CustomerService';


const SignupPage = ({ togglePage, isLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    whatsappNumber: '',
    email: '',
    password: '',
    gstNumber: '',
    company: '',
    gstVerified: null,
    hasGst: true,
    panNumber: '',
    cancelledCheque: '',
    customerAddress: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    addressType: 'WORK',
    customerStatus: 'ACTIVE',
    customerTypes: 'WEAVER',
  });

  const [loading, setLoading] = useState(false);

   const [isVerifying, setIsVerifying] = useState(false);

  // Watch GST field and trigger API when 15 characters are entered
  useEffect(() => {
    const validateGST = async () => {
      setIsVerifying(true);
      try {
        const response = await fetch("https://api.bulkpe.in/client/verifyGstin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gstin: formData.gstNumber,
            reference: `REF-${Date.now()}`, // unique
          }),
        });

        const data = await response.json();

        if (data.success) {
          setFormData((prev) => ({
            ...prev,
            gstVerified: true,
            company: data.data?.lgnm || "",
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            gstVerified: false,
          }));
        }
      } catch (err) {
        console.error("GST validation failed:", err);
        setFormData((prev) => ({
          ...prev,
          gstVerified: false,
        }));
      } finally {
        setIsVerifying(false);
      }
    };

    if (formData.gstNumber.length === 15) {
      validateGST();
    } else if (formData.gstNumber.length < 15) {
      setFormData((prev) => ({
        ...prev,
        gstVerified: null,
        company: "",
      }));
    }
  }, [formData.gstNumber]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleGstCheckbox = () => {
    setFormData((prev) => ({
      ...prev,
      hasGst: !prev.hasGst,
      gstNumber: !prev.hasGst ? "" : prev.gstNumber, // optional: clear GST input if unchecked
    }));
  };

  const verifyGstNumber = async (gstNumber) => {
  try {
    const response = await fetch("https://api.bulkpe.in/client/verifyGstin", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer aWSVQNyt+z3IiJHV+YX9UgyVVGvsw7WKbYHBMvfjwQu8B4ZH0TDo5/foe26Zf/Qj4idKNyezUG3ux15YcAHqaKyAIyGvXVP5Wap/YcqusaqUvpabVex0BKwk+CTPqH9tka9xfjHYM2wHwPSWUCXZOw==",
  },
  body: JSON.stringify({
    gstin: formData.gstNumber.trim(),
    reference: `REF-${Math.floor(Math.random() * 1000000)}`
  }),
});


    const data = await response.json();

    if (data.success) {
    setFormData((prev) => ({
      ...prev,
    gstVerified: true,
    company: data.data?.lgnm || "",
  }));
    } else {
      setFormData(prev => ({
        ...prev,
        gstVerified: false,
      }));
      alert("Invalid GST number");
    }
  } catch (error) {
    console.error("Error verifying GST:", error);
    alert("Failed to verify GST number. Try again.");
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const customerData = {
      customerName: `${formData.firstName} ${formData.lastName}`.trim(),
      phoneNumber: formData.phoneNumber || null,
      whatsappNumber: formData.whatsappNumber || null,
      email: formData.email,
      password: formData.password,
      company: formData.company || null,
      gstNumber: formData.gstNumber || null,
      customerAddress: '',
      addresses: [
        {
          customerAddress: '',
          street: '',
          city: '',
          state: '',
          country: '',
          zipcode: '',
          addressType: 'HOME',
        },
      ],
      customerStatus: 'ACTIVE',
    };
  
    try {
      // Send OTPs
      if (formData.phoneNumber) {
        await otpSend({
          emailOrPhone: formData.phoneNumber,
          accountType: "CUSTOMER",
          otpType: "PHONE",
        });
      }
  
      if (formData.email) {
        await otpSend({
          emailOrPhone: formData.email,
          accountType: "CUSTOMER",
          otpType: "EMAIL",
        });
      }
  
      // Navigate to OTP page with full customer data
      navigate("/otp", {
        state: {
          customerData,  // whole object passed to OTP page
        },
      });
    } catch (error) {
      alert("Failed to send OTP!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div
            className="w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 relative overflow-hidden">
            <div
        className="absolute inset-0 bg-center bg-cover filter blur-sm z-0"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/9940790/pexels-photo-9940790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
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

      {/* Auth Box */}
      <div className="bg-blur bg-opacity-40 p-6 sm:p-8 rounded-3xl border-3 w-full max-w-md sm:max-w-lg md:max-w-xl text-white backdrop-blur-md overflow-y-auto max-h-[90vh]">
        <h3 className="text-center text-2xl font-bold mb-4">Welcome to Ink N Dyes!</h3>

        <div className="flex justify-center mb-4 bg-white rounded-full overflow-hidden w-full max-w-xs mx-auto">
          <button
            className="w-1/2 py-2 text-purple-700 font-medium text-l"
            onClick={togglePage}
          >
            Login
          </button>
          <button className="w-1/2 py-2 bg-purple-800 text-white font-medium text-l rounded-full">
            Register
          </button>
        </div>

        <p className="text-center text-gray-300 text-l sm:text-l mb-6 px-2">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-col w-full">
              <label className="">First Name</label>
              <input
                className="login-input rounded-full text-black px-4 py-1"
                placeholder="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="">Last Name</label>
              <input
                className="login-input rounded-full text-black px-4 py-1"
                placeholder="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-col w-full">
              <label className="">Email</label>
              <input
                className="login-input rounded-full text-black px-4 py-1"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="">Password</label>
              <input
                type="password"
                className="login-input rounded-full text-black px-4 py-1"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex flex-col w-full">
              <label className="">Phone</label>
              <input
                className="login-input rounded-full text-black px-4 py-1"
                placeholder="Phone number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="">WhatsApp</label>
              <input
                className="login-input rounded-full text-black px-4 py-1"
                placeholder="WhatsApp number"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
          
            {/* GST Number Field */}
      <div className="flex flex-col w-full relative">
        <label>GST Number</label>
        <input
          className="login-input rounded-full text-black px-4 py-1"
          placeholder="GST number"
          name="gstNumber"
          value={formData.gstNumber}
          onChange={handleChange}
          disabled={!formData.hasGst}
          maxLength={15}
        />
        {formData.gstNumber.length === 15 && (
          <span className="absolute right-3 top-7 text-lg">
            {isVerifying ? (
              <span className=" text-center text-yellow-500">⏳</span> 
            ) : formData.gstVerified ? (
              <span className=" text-center text-green-600">✔️</span>
            ) : (
              <span className=" text-center text-red-500">❌</span>
            )}
          </span>
        )}
      </div>

        {/* Company Field */}
        <div className="flex flex-col w-full">
          <label className="">Company</label>
          <input
            className="login-input rounded-full text-black px-4 py-1"
            placeholder="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
      </div>


              <div className="flex flex-row justify-between items-center text-sm text-gray-300 mb-4">
                    <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={!formData.hasGst}
                      onChange={handleGstCheckbox}
                    />
                    I don’t have a GST Number
                  </label>
                    
            </div>
          
          <button
                        type="submit"

                        className="w-full bg-purple-700 text-white rounded-full py-2 font-medium"
                        onClick={() => handleSubmit }

                    >
                        Get OTP
                    </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
