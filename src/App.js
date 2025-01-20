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

        </Routes>
    
    </BrowserRouter>
  );
}

export default App;
