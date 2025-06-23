import { FiHome } from "react-icons/fi";
import { IoSearchSharp } from "react-icons/io5";
import { RiUser3Line  , RiUser3Fill  } from "react-icons/ri";
import { FiHeart } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { useNavigate , useLocation } from "react-router-dom";
import { useState , useEffect} from "react";
import { RiHome9Fill } from "react-icons/ri";
import { RiSearch2Fill } from "react-icons/ri";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi2";
import { useAppContext } from '../../Utils/commoncontext';
import { PiShoppingCart, PiShoppingCartFill } from "react-icons/pi";
import { deepPurple } from '@mui/material/colors';
import { FaRegHeart } from "react-icons/fa";



// import "./BottomNav.css"
import Badge from '@mui/material/Badge';



const BottomNav = () => {
  const navigate = useNavigate();
   const { cartCount , wishlistCount, updateCartAndWishlistCounts} = useAppContext();
   const purpuleColor = deepPurple[500]

  const location = useLocation();

  // Set default selected state based on URL
  const [selected, setSelected] = useState("");

  useEffect(() => {
    // Set selected tab based on current route
    if (location.pathname === "/home") setSelected("home");
    else if (location.pathname === "/search") setSelected("search");
    else if (location.pathname === "/account") setSelected("profile");
    else if (location.pathname === "/wishlist") setSelected("wishlist");
    else if (location.pathname === "/shoppingCart") setSelected("cart");
  }, [location.pathname]);

  const handleClick = (value, path) => {
    setSelected(value);
    navigate(path);
  };

  return (
    <div className="bottom-nav bg-white fixed bottom-0 left-0 w-full shadow-lg border-t flex justify-around items-center py-2 md:hidden block z-40">
      {/* Home */}
      <button 
        onClick={() => handleClick("home", "/home")}
        className={`flex flex-col items-center w-1/5 pt-2 ${
          selected === "home" ? "text-purple-800 border-t-4 border-purple-800 bg-gradient-to-b from-purple-200 to-white rounded-md" : ""
        }`}
      >
        <img src="/images/NavLogo.png" width="30" height="30" alt="Logo" />       
         <span className="text-sm font-semibold">Home</span>
      </button>

      {/* Search */}
      {/* <button
        onClick={() => handleClick("search", "/search")}
        className={`flex flex-col items-center w-1/5 pt-2 ${
          selected === "search" ? "text-purple-800 border-t-4 bg-gradient-to-b from-purple-200 to-white border-purple-800  rounded-md" : " hover:text-purple-700"
        }`}
      >
        <RiSearch2Fill size={20} />
        <span className="text-sm font-semibold">Search</span>
      </button> */}   

      {/* Wishlist */}
      <button
        onClick={() => handleClick("wishlist", "/wishlist")}
        className={`flex flex-col items-center w-1/5 pt-2 ${
          selected === "wishlist" ? "text-purple-800 border-t-4 bg-gradient-to-b from-purple-200 to-white border-purple-800  rounded-md" : ""
        }`}
      >
        {/* <FaHeart size={20} /> */}
         <Badge badgeContent={wishlistCount} sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: purpuleColor,
                  color: '#fff',
                  top: '-6px',
                  right: '-6px',
                }
              }}>
                 {selected === "wishlist" ? (
                <FaHeart size={20} className="text-purple-800" />
              ) : (
                <FaRegHeart size={20} />
              )}
              </Badge>
               <span className="text-sm font-semibold">Wishlist</span>
      </button>

      {/* Cart */}
      <button
        onClick={() => handleClick("cart", "/shoppingCart")}
        className={`flex flex-col items-center w-1/5 pt-2 ${
          selected === "cart" ? "text-purple-800 border-t-4 bg-gradient-to-b from-purple-200 to-white border-purple-800  rounded-md" : ""
        }`}
      >
        {/* <HiShoppingCart size={20} /> */}
         <Badge badgeContent={cartCount} sx={{
        '& .MuiBadge-badge': {
          backgroundColor: purpuleColor,
          color: '#fff',
          top: '-4px',
          right: '-4px',
        }
      }}>
          
           {selected === "cart" ? (
          <PiShoppingCartFill size={22} className="text-purple-800" />
        ) : (
          <PiShoppingCart size={22} />
        )}
      </Badge>
        <span className="text-sm font-semibold">Cart</span>
      </button>


      <button
        onClick={() => handleClick("profile", "/account")}
        className={`flex flex-col items-center w-1/5 pt-2 ${
          selected === "profile" ? "text-purple-800 border-t-4 bg-gradient-to-b from-purple-200 to-white border-purple-800  rounded-md" : " hover:text-purple-700"
        }`}
      >
      {selected === "profile" ? (
  <RiUser3Fill size={22} className="text-purple-800 fill-purple-800" />
) : (
  <RiUser3Line  size={22} />
)}

        <span className="text-sm font-semibold">Account</span>
      </button>
    </div>
  );
};

export default BottomNav;


