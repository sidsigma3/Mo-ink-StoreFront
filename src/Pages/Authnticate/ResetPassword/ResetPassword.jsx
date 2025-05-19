import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CreditCard } from 'lucide-react';
import axios from "axios"; 
import { resetPassword } from "../../../Services/CustomerService";


const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const accountType = "CUSTOMER"; 

 useEffect(() => {
    console.log("Token:", token);
    console.log("UserType:", accountType);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log("hello")


    if (!password || !confirmPassword) {
      alert("Please fill out both fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!token || !accountType) {
      alert("Invalid or expired reset link.");
      return;
    }

    try {
      const payload = {
        token,
        password,
        accountType,
      };

      const data = await resetPassword(payload);

      console.log("Response from resetPassword:", data); 

      if (data?.success) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate("/login");
        }, 3000);
      } else {
        alert(data?.message || "Something went wrong.");
      }
    } catch (error) {
      alert("Failed to reset password. Please try again.");
      console.error(error);
    }
  };



    return (
        <div
        className="w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 relative">
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

            {/* Toast Notification */}
            {showToast && (
                <div className=" flex items-center justify-center gap-2 absolute top-6 right-6 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-50 text-l font-semibold">
                <img
            src="/images/tick-circle.svg"
            alt="Success"
            className="w-8 h-8"
        />
                 Password reset successful.
                    
                </div>
            )}

            {/* Reset Password Box */}
            <div className="bg-blur bg-opacity-40 p-6 sm:p-8 rounded-3xl border-3 w-full max-w-md sm:max-w-lg text-white backdrop-blur-md">
                <button
                    className="text-sm text-white mb-4 hover:underline"
                    onClick={() => navigate("/login")}
                >
                    &larr; Back to login
                </button>

                <h2 className="text-2xl font-bold mb-2">Set a password</h2>
                <p className="text-l text-gray-200 mb-6">
                    Your previous password has been reset. Please set a new password for your account.
                </p>

                <form onSubmit={handleSubmit}>
                    <label className="block text-l mb-1">New password</label>
                    <input
                        type="password"
                        placeholder="Create a strong password"
                        className="w-full px-4 py-1 rounded-full mb-2 text-black focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label className="block text-l mb-1">Confirm password</label>
                    <input
                        type="password"
                        placeholder="Re-enter the password"
                        className="w-full px-4 py-1 rounded-full mb-2 text-black focus:outline-none"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full bg-purple-700 mt-4 text-white rounded-full py-1 font-medium"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
