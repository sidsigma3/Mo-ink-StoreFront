import { useState,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "leaflet/dist/leaflet.css";
import LandingPage from './Pages/LandingPage/LandingPage';
import Category from './Pages/Category/Category';
import WishlistPage from './Pages/WishListPage/WishlistPage';
import ShopingCartPage from './Pages/ShoppingCartPage/ShopingCartPage';
import ProductDetailPage from './Pages/ProductDetailPage/ProductDetailPage';
import CheckoutPage from './Pages/Checkout/CheckoutPage';
import AccountPage from './Pages/Account/AccountPage';
import SettingPage from './Pages/SettingPage/SettingPage';
import WalletPage from './Pages/Wallet/WalletPage';
import OrderPage from './Pages/Order/OrderPage';
import ContactPage from './Pages/ContactUs/ContactPage';
import AddressPage from './Pages/Address/AddressPage';
import OrderDetails from './Pages/Order/OrderDetails';
import LoginPage from './Pages/Authnticate/Login/LoginPage';
import SignupPage from './Pages/Authnticate/Signup/SignupPage';
import ForgotPassword from './Pages/Authnticate/ForgotPassword/ForgotPassword';
import ResetPassword from './Pages/Authnticate/ResetPassword/ResetPassword';
import AuthPage from './Pages/Authnticate/AuthPage';
import VerifyCode from './Pages/Authnticate/Verify/VerifyCode';
import AboutPage from "./Pages/About/About";
import FAQs from './Pages/FAQs/FAQs';
import ReturnPolicy from "./Pages/Return Policy/ReturnPolicy";
import RefundPolicy from "./Pages/Refund Policy/RefundPolicy";
import ErrorPage from './Pages/Error Page/ErrorPage';
import MainHomepage from './Pages/Main Homepage/MainHomepage';
import BlogList from './Components/BlogList/BlogList';
import Blogs from './Pages/Blogs/Blogs';
import BlogBox from './Components/BlogList/BlogBox';
import OTP from './Pages/Authnticate/OTP/OTP';
import MainFeatures from './Components/MainFeatures/MainFeatures';
import MainWhyUs from './Components/MainWhyUs/MainWhyUs';
import ProductList from './Components/ProductList/ProductList';
import MainFAQ from './Components/MainFAQ/MainFAQ';
import MainProcess from './Components/MainProcess/MainProcess';
import Blog1 from './Pages/Blogs/Blog1';
import PrivacyPolicy from './Pages/Privacy Policy/PrivacyPolicy';
import TermOfUse from './Pages/Term Of Use/TermOfUse';
import ShippingPolicy from './Pages/Shipping Policy/ShippingPolicy';
import PaymentSuccess from './Pages/Payment Success/PaymentSuccess';
import PaymentFailure from './Pages/Payment Failure/PaymentFailure';
import OrderIssues from './Pages/Order Issues/OrderIssue';
import DeliveryInfo from './Pages/DeliveryInfo/DeliveryInfo';
import ReturnInfo from './Pages/ReturnInfo/ReturnInfo';


function App() {


  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

 const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    return isAuthenticated ? children : <Navigate to="/" />;
};


  return (
    <BrowserRouter>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<AuthPage setAuthStatus={setIsAuthenticated} />} />
      <Route path="/signup" element={<AuthPage setAuthStatus={setIsAuthenticated} />} />
      <Route path="/OTP" element={<OTP />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/verifyCode" element={<VerifyCode />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/" element={<MainHomepage/>} />

      {/* Protected Routes */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
              <div className="content w-100 py-3">
                <Routes>
                  <Route path="/home" element={<LandingPage></LandingPage>} /> 
                  <Route path="/about" element={<AboutPage></AboutPage>} />
                  <Route path="/category" element={<Category />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/shoppingCart" element={<CheckoutPage />} />
                  <Route path="/productDetails" element={<ProductDetailPage />} />
                  <Route path="/checkOut" element={<CheckoutPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/setting" element={<SettingPage />} />
                  <Route path="/wallet" element={<WalletPage />} />
                  <Route path="/orders" element={<OrderPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/FAQs" element={<FAQs/>}/>
                  <Route path="/address" element={<AddressPage />} />
                  <Route path="/blogbox" element={<BlogBox />} />
                  <Route path="/orderDetails" element={<OrderDetails />} />
                  <Route path="/returnPolicy" element={<ReturnPolicy/>}/>
                  <Route path="/refundPolicy" element={<RefundPolicy/>}/>
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/blogs" element={<Blog1/>}/>
                  <Route path="*" element={<ErrorPage />} />
                  <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                  <Route path="/termsofuse" element={<TermOfUse />} />
                  <Route path="/shippingpolicy" element={<ShippingPolicy />} />
                  <Route path="/paymentSuccess" element={<PaymentSuccess/>} />
                  <Route path="/paymentFail" element={<PaymentFailure/>} />
                  <Route path="/orderIssues" element={<OrderIssues/>} />
                  <Route path="/deliveryInfo" element={<DeliveryInfo/>} />
                  <Route path="/returnInfo" element={<ReturnInfo/>} />

                  
                  
                </Routes>
              </div>
            
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
