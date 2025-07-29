import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../Services/CustomerService";
import Toast from "../../../Components/Toast/Toast";
import { GoogleLogin } from "@react-oauth/google";


const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const accountType = "CUSTOMER"; 
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [toasts, setToasts] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
         const showToast = (message, type = "error") => {
            setToasts([{ message, type }]);
            setTimeout(() => setToasts([]), 3000);
          };

        // setMessage("");
        // setError("");

        try {
            await forgotPassword({ email, accountType });
            showToast("Password reset link sent to your email.", "success");
        } catch (err) {
            showToast("Email doesn't exist, Try another.", "error");
            console.error(err);
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

            {/* Forgot Password Box */}
            <div className="bg-blur bg-opacity-40 p-6 sm:p-8 rounded-3xl border-3 border-white w-full max-w-md sm:max-w-lg text-white backdrop-blur-md">
                <button
                    className="text-sm text-dark mb-4 hover:underline"
                    onClick={() => navigate("/login")}
                >
                    &larr; Back to login
                </button>

                <h2 className="text-2xl text-dark font-bold mb-2">Forgot your password?</h2>
                <p className="text-l text-gray-600 mb-6">
                    Don’t worry, happens to all of us. Enter your email below to recover your password
                </p>

                <form onSubmit={handleSubmit}>
                    {/* <label className="block text-l mb-1">Email Address</label> */}
                    <input
                        type="email"
                        placeholder="Enter your Email Address"
                        className="w-full px-4 py-1 mb-4 text-left align-center rounded-full text-black placeholder-gray-500 border-1 border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required  
                    />

                    <button
                        type="submit"
                        className="w-full bg-purple-700 text-white rounded-full py-2 font-medium"
                    >
                        Submit
                    </button>

                    {message && <p className="text-green-400 text-sm mt-4">{message}</p>}
                    {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
                </form>

                {/* <div className="text-center text-xs my-2 text-gray-600">Or signin with</div>
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

export default ForgotPasswordPage;
