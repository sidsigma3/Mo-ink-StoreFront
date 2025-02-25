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

function App() {
  return (
    <BrowserRouter>
        <Routes>

            <Route path='/' element={<LandingPage></LandingPage>}></Route>

            <Route path='/category' element={<Category></Category>}></Route>

            <Route path='/wishlist' element={<WishlistPage></WishlistPage>}></Route>

            <Route path='/shoppingCart' element={<ShopingCartPage></ShopingCartPage>}></Route>

            <Route path='/productDetails' element={<ProductDetailPage></ProductDetailPage>}></Route>

            <Route path='/checkOut' element={<CheckoutPage></CheckoutPage>}></Route>

            <Route path='/account' element={<AccountPage></AccountPage>}></Route>

            <Route path='/setting' element={<SettingPage></SettingPage>}></Route>

            <Route path='/wallet' element={<WalletPage></WalletPage>}></Route>

            <Route path='/orders' element={<OrderPage></OrderPage>}></Route>

            <Route path='/contact' element={<ContactPage></ContactPage>}></Route>

            <Route path='/address' element={<AddressPage></AddressPage>}></Route>

            <Route path='/orderDetails' element={<OrderDetails></OrderDetails>}></Route>




            <Route path="/login" element={<LoginPage></LoginPage>} />
            <Route path='/signup' element={<SignupPage></SignupPage>}></Route>
            <Route path='/forgotPassword' element={<ForgotPassword></ForgotPassword>}></Route>
            <Route path='/verifyCode' element={<VerifyCode></VerifyCode>}></Route>
            <Route path='/resetPassword' element={<ResetPassword></ResetPassword>}></Route>
            <Route path='/Authenticate' element={<AuthPage></AuthPage>}></Route>

        </Routes>

    </BrowserRouter>
  );
}

export default App;
