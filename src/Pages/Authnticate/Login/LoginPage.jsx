import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./LoginPage.css";
import ToggleBtn from "../../../Components/Buttons/ToggleButton/ToggleBtn";
import { useNavigate } from "react-router-dom";
import { loginCustomer } from "../../../Services/CustomerService";
import { useAppContext } from "../../../Utils/commoncontext";

const LoginPage = ({ togglePage, setAuthStatus }) => {
    const { updateCartAndWishlistCounts} = useAppContext();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await loginCustomer(username, password);
        if (response.success) {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("userData", JSON.stringify(response.data));
            updateCartAndWishlistCounts();
            localStorage.setItem("justLoggedIn", "true"); 
            navigate("/home");
        } else {
            setError(response.message);
        }
    };

    return (
        <div
            className="w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 relative">
            <div
                className="absolute inset-0 bg-center bg-cover  filter blur-sm z-0"
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
            <div className="bg-blur bg-opacity-40 p-6 sm:p-8 rounded-3xl border-3 w-full max-w-md sm:max-w-lg md:max-w-xl text-white backdrop-blur-md">
                <button
                    className="text-sm text-white mb-4 hover:underline"
                    onClick={() => navigate("/")}
                >
                    &larr; Back to HomePage
                </button>
                <h3 className="text-center text-2xl font-bold mb-4">Welcome to Mo Ink N Dyes!</h3>

                <div className="flex justify-center mb-4 bg-white rounded-full overflow-hidden w-full max-w-xs mx-auto">
                    <button className="w-1/2 py-2 bg-purple-800 text-white font-medium text-l rounded-full">
                        Login
                    </button>
                    <button
                        className="w-1/2 py-2 text-purple-700 font-medium text-l"
                        onClick={togglePage}
                    >
                        Register
                    </button>
                </div>

                <p className="text-center text-gray-300 text-l sm:text-l mb-6 px-2">
                Log in to continue your yarn journey, explore colors & continue shopping.
                </p>

                <form onSubmit={handleLogin}>
                    <label className="block text-l mb-1">Email id or Phone no</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        className="w-full px-4 py-1 mb-2 text-left align-center rounded-full text-black focus:outline-none"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label className="block text-l mb-1">Password</label>
                    <div className="relative">
                    <input
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    className="w-full px-4 py-1 rounded-full mb-2 text-left text-black focus:outline-none pr-10"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button
    type="button"
    className="absolute right-3 top-[45%] -translate-y-1/2 text-gray-500"
    onClick={() => setShowPassword(!showPassword)}
  >
    <div className="flex items-center justify-center h-5 w-5">
      {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
    </div>
  </button>
                    </div>

                    {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

                    <div className="flex flex-row justify-between items-center text-sm text-gray-300 mb-4">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Remember me
                        </label>
                        <a href="/forgotPassword" className="hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-800 text-white rounded-full py-1 font-medium"
                    >
                        Login
                    </button>

                    <div className="text-center text-xs my-2 text-gray-300">Or login with</div>

                    <div className="flex flex-row justify-center items-center gap-2 lg:gap-4">
                        <button className="flex items-center gap-2 bg-white text-black px-2 lg:px-4 py-2 rounded-full text-sm w-3/5 justify-center">
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
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
