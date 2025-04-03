import React, { useState } from "react";
import LoginPage from "./Login/LoginPage";
import SignupPage from "./Signup/SignupPage";
import "./AuthPage.css";

const AuthPage = ({ setAuthStatus }) => {
    const [isLogin, setIsLogin] = useState(true);

    const togglePage = () => {
        setIsLogin((prev) => !prev); 
    };

    return (
        <div className="auth-page">
            <div className="form-container">

              
                {isLogin ? (
                    <LoginPage togglePage={togglePage} setAuthStatus={setAuthStatus} />
                ) : (
                    <SignupPage togglePage={togglePage} />
                )}
            </div>
        </div>
    );
};

export default AuthPage;
