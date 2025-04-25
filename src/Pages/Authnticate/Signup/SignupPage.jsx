import React, { useState } from 'react';
import './SignupPage.css';
import { useNavigate } from "react-router-dom";
import ToggleBtn from '../../../Components/Buttons/ToggleButton/ToggleBtn';
import { createCustomer } from '../../../Services/CustomerService';

const SignupPage = ({ togglePage, isLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    whatsappNumber: '',
    email: '',
    password: '',
    company: '',
    gstNumber: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      const response = await createCustomer(customerData);
      alert('Account created successfully!');
      console.log('Customer Created:', response);
      e.target.reset();
      navigate("/otp")
    } catch (error) {
      alert('Failed to create account!');
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
        <h3 className="text-center text-2xl font-bold mb-4">Welcome to Mo Ink N Dyes!</h3>

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

            <div className="flex flex-col w-full">
              <label className="">GST Number</label>
              <input
                className="login-input rounded-full text-black px-4 py-1"
                placeholder="GST number"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
              />
            </div>
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
