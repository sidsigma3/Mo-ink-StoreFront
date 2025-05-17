import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OTP = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [emailCode, setEmailCode] = useState("");
    const [phoneCode, setPhoneCode] = useState("");
    const [error, setError] = useState(""); 

    const handleNumericInput = (e, setter) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length > 6) {
      setError("Only 6 digits are allowed"); // Set error if more than 6 digits
      value = value.slice(0, 6); // Limit to 6 digits
    } else {
      setError(""); // Clear error when input is valid
    }
    setter(value);
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email OTP:", emailCode);
        console.log("Phone OTP:", phoneCode);
        // Add actual verification logic here
        // setMessage("Code verified successfully!");
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

            {/* Verify Code Box */}
            <div className="verify-box bg-blur bg-opacity-40 p-6 sm:p-8 rounded-3xl border-3 w-full max-w-md sm:max-w-lg text-white backdrop-blur-md">
                <button
                    className="text-sm text-white mb-4 hover:underline"
                    onClick={() => navigate("/signup")}
                >
                    &larr; Back to registration
                </button>

                <h2 className="text-2xl font-bold mb-2">Verify Your OTP</h2>
                <p className="text-l text-gray-200 mb-6">
                    An OTP has been sent to your email & Phone number
                </p>

                <form onSubmit={handleSubmit}>

                <div className="flex justify-between items-center mb-1">
                <label className="text-l">Email OTP</label>
                <button
                className="text-sm text-white cursor-pointer"
                onClick={''}
                >
                Resend
                </button>
            </div>
                <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="w-full px-4 py-1 mb-2 text-left align-center rounded-full text-black focus:outline-none"
                    value={emailCode}
                    onChange={(e) => handleNumericInput(e, setEmailCode)}
                />


                {/* <label className="block text-l mb-1">Phone OTP</label> */}
                <div className="flex justify-between items-center mb-1">
                <label className="text-l">Phone OTP</label>
                <button
                className="text-sm text-white cursor-pointer"
                onClick={''}
                >
                Resend
                </button>
            </div>
                <input
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="w-full px-4 py-1 mb-2 text-left align-center rounded-full text-black focus:outline-none"
                    value={phoneCode}
                    onChange={(e) =>  handleNumericInput(e, setPhoneCode)}
                />

                    {/* <p className="text-sm text-gray-300 mb-4">
                        Didn’t receive a code? <span className="text-white underline cursor-pointer">Resend</span>
                    </p> */}

                    <button
                        type="submit"
                        className="w-full mt-4 bg-purple-800 text-white rounded-full py-1 font-medium"
                        onClick={() => navigate("/")}
                    >
                        Verify
                    </button>

                    {message && <p className="text-green-400 text-sm mt-4">{message}</p>}
                </form>

                <div className="text-center text-xs my-3 text-gray-300">Or login with</div>

                <div className="flex flex-row justify-center items-center gap-2">
                    <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm">
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-4 h-4"
                        />
                        Sign in with Google
                    </button>
                    <button className="bg-white p-2 rounded-full">
                        <img
                            src="https://www.svgrepo.com/show/448224/facebook.svg"
                            alt="Facebook"
                            className="w-5 h-5"
                        />
                    </button>
                    <button className="bg-white p-2 rounded-full">
                        <img
                            src="https://www.svgrepo.com/show/511330/apple-173.svg"
                            alt="Apple"
                            className="w-5 h-5"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OTP;
