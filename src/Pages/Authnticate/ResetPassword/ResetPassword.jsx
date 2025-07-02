import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CreditCard } from 'lucide-react';
import axios from "axios"; 
import { resetPassword } from "../../../Services/CustomerService";
import { Eye, EyeOff } from "lucide-react";
import Toast from "../../../Components/Toast/Toast";
import { GoogleLogin } from "@react-oauth/google";



const ResetPassword = () => {
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toasts, setToasts] = useState([]); 
  const navigate = useNavigate();
  const location = useLocation(); 

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const accountType = "CUSTOMER"; 

  const [showNewPassword, setShowNewPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 


const handleSubmit = async (e) => {
  e.preventDefault();
   const showToast = (message, type = "error") => {
            setToasts([{ message, type }]);
            setTimeout(() => setToasts([]), 3000);
          };
  console.log("hello");

  if (!newPassword || !confirmPassword) {
    showToast("Please fill out both fields.", "error");
    return;
  }

  if (newPassword !== confirmPassword) {
    showToast("Passwords do not match.", "error");
    return;
  }

  if (!token || !accountType) {
    showToast("Invalid or expired reset link.", "error");
    return;
  }

try {
  const payload = { token, newPassword, accountType };
  const response = await resetPassword(payload);
  const data = response.data;

  console.log("Response from resetPassword:", data);
  showToast(data?.message || "Password successfully reset!", "success");
  setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to reset password. Please try again.",
        "error"
      );
      console.error("Error in resetPassword:", error);
    }

};

    return (
        <div
        className="w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 relative">
        <div
    className="absolute inset-0 opacity-40 bg-center bg-cover filter blur-sm z-0"
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

          

            {/* Reset Password Box */}
            <div className="bg-blur bg-opacity-40 p-6 sm:p-8 rounded-3xl border-3 border-white  w-full max-w-md sm:max-w-lg text-white backdrop-blur-md">
                <button
                    className="text-sm text-dark mb-4 hover:underline"
                    onClick={() => navigate("/login")}
                >
                    &larr; Back to login
                </button>

                <h2 className="text-2xl text-dark font-bold mb-2">Set a password</h2>
                <p className="text-l text-gray-600 mb-6">
                    Your previous password has been reset. Please set a new password for your account.
                </p>

                <form onSubmit={handleSubmit}>
                    {/* <label className="block text-l mb-1">New password</label> */}
                      <div className="relative mb-3"> 
                        <input
                          type={showNewPassword ? "text" : "password"} 
                          placeholder="Create a strong password"
                          className="w-full px-4 py-1 mb-2 text-left align-center rounded-full text-black placeholder-gray-500 border-1 border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          value={newPassword}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                          className="absolute right-3 top-[19%] cursor-pointer text-gray-600" 
                          onClick={() => setShowNewPassword((prev) => !prev)} 
                        >
                          {showNewPassword ?<EyeOff size={22} /> : <Eye size={22} />}
                        </span>
                      </div>

                    {/* <label className="block text-l mb-1">Confirm password</label> */}
                    <div className="relative mb-4"> 
                      <input
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="Re-enter the password"
                        className="w-full px-4 py-1 text-left align-center rounded-full text-black placeholder-gray-500 border-1 border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <span
                          className="absolute right-3 top-[19%] cursor-pointer text-gray-600" 
                        onClick={() => setShowConfirmPassword((prev) => !prev)} 
                      >
                        {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />   }    
                      </span>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-700 text-white rounded-full py-2 font-medium"
                    >
                        Save
                    </button>
                </form>
            </div>

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
    );
};

export default ResetPassword;
