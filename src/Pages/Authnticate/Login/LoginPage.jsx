import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./LoginPage.css";
import ToggleBtn from "../../../Components/Buttons/ToggleButton/ToggleBtn";
import { useNavigate } from "react-router-dom";
import { loginCustomer } from "../../../Services/CustomerService";
import { useAppContext } from "../../../Utils/commoncontext";
import { GoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../../Components/LanguageSwitcher/LanguageSwitcher";

const LoginPage = ({ togglePage, setAuthStatus }) => {
  const { t } = useTranslation();
  const { updateCartAndWishlistCounts } = useAppContext();

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
    <div className="w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 relative">
      <div
        className="absolute inset-0 bg-center bg-cover opacity-40 bg-no-repeat filter blur-sm z-0"
        style={{
          backgroundImage:
            "url('https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/dddepth-198.jpg?updatedAt=1751281331520')",
        }}
      ></div>
      

      {/* Logo */}
      <div className="absolute top-4 left-4 lg:left-8 lg:top-8 flex justify-center lg:justify-start w-full lg:w-auto pr-4">
        <img src="/images/logo.png" alt="Logo" className="w-16 sm:w-12 mx-auto lg:mx-0" />
      </div>

       {/* <div className="mt-3 d-flex justify-center position-absolute top-2 right-5">
                <div>
              <LanguageSwitcher className="w-full" />
                </div>
        </div> */}

      {/* Auth Box */}
      <div className="bg-blur bg-opacity-40 p-6 sm:p-8 rounded-3xl border-3 border-white w-full max-w-md sm:max-w-lg md:max-w-lg text-dark backdrop-blur-md">
        <button
          className="text-sm font-medium text-dark mb-4 hover:underline"
          onClick={() => navigate("/")}
        >
          &larr; {t("login.backToHome")}
        </button>

        <h3 className="text-center text-2xl font-bold mb-4">{t("login.welcomeTitle")}</h3>

        <div className="flex justify-center mb-12 bg-white rounded-full overflow-hidden w-full max-w-xs mx-auto">
          <button className="w-1/2 py-2 bg-purple-800 text-white font-medium text-l rounded-full">
            {t("login.login")}
          </button>
          <button
            className="w-1/2 py-2 text-purple-700 bg-white font-medium text-l"
            onClick={togglePage}
          >
            {t("login.register")}
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder={t("login.emailOrPhone")}
            className="w-full px-4 py-1 mb-3 rounded-full bg-white text-black placeholder-gray-500 border-1 border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("login.password")}
              className="w-full px-4 py-1 mb-3 rounded-full bg-white text-black placeholder-gray-500 border-1 border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-[36%] -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

          <div className="flex flex-row justify-between items-center text-sm text-gray-600 mb-3">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              {t("login.rememberMe")}
            </label>
            <a href="/forgotPassword" className="hover:underline">
              {t("login.forgotPassword")}
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-800 text-white rounded-full py-2 font-medium"
          >
            {t("login.login")}
          </button>

          {/* <div className="text-center text-xs my-2 text-gray-600">{t("login.orSignInWith")}</div>
          <div className="flex flex-row justify-center items-center gap-2 lg:gap-4">
            <div className="w-3/5 rounded-xl">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse.credential);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </div> */}
          
        </form>
        
      </div>
      
    </div>
  );
};

export default LoginPage;
