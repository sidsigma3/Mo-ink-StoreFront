import React, { useState } from "react";
import "./LoginPage.css";
import ToggleBtn from "../../../Components/Buttons/ToggleButton/ToggleBtn";
import { useNavigate } from "react-router-dom";
import { loginCustomer } from "../../../Services/CustomerService";

const LoginPage = ({ togglePage, setAuthStatus }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await loginCustomer(username, password);
        if (response.success) {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("userData", JSON.stringify(response.data));
            setAuthStatus(true)
            navigate("/home");
        } else {
            setError(response.message);
        }
    };
    

    return (
        <div className="login-page">
            <div className="login-page-ctn">
                <div className="logo-ctn p-3">
                    <img src="/images/logo.png" alt="Logo" />
                </div>

                <div className="left-cover-pic">
                    
                    {/* <h4 >Lorem ipsum dolor sit.</h4>
                    <h5 >Lorem ipsum dolor sit.</h5> */}
                </div>
                        
                <div className="right-ctn d-flex justify-center items-center flex-col">
                    <h6 className="welcome font-bold">Welcome to Moink & Dyes</h6>
                    <ToggleBtn click={togglePage} /> 

                    {/* <h6 className="mt-2 text-center font-semibold">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </h6> */}

                    <div className="login-inputs">
                    <div className="mt-4">
                        <label className="font-semibold">Username</label>
                        <input
                            className="rounded-pill login-input"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{fontSize:"14px"}}
                        />
                    </div>

                    <div className="mt-3">
                        <label className="font-semibold">Password</label>
                        <input
                            type="password"
                            className="login-input"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{fontSize:"14px"}}
                        />
                    </div>

                    </div>
                    <div className="d-flex justify-between mt-1 remember">
                        <div className="d-flex gap-1">
                            <input type="checkbox" />
                            <label className="font-semibold">Remember me?</label>
                        </div>
                        <a href="/forgotPassword" className="font-semibold forgot">Forgot password?</a>
                    </div>

                    <button
                        className="btn bg-violet-800 rounded-pill w-100 mt-4 login font-semibold"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    {/* <h6 className="mt-3 text-center text-body-tertiary">Or login with</h6> */}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
