import { FiHome } from "react-icons/fi";
import { IoSearchSharp } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { FiHeart } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { useNavigate , useLocation } from "react-router-dom";
import { useState , useEffect} from "react";
import { RiHome9Fill } from "react-icons/ri";
import { RiSearch2Fill } from "react-icons/ri";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi2";
import "./BottomNav.css"

const BottomNav = () => {
  const navigate = useNavigate();

  const location = useLocation();

  // Set default selected state based on URL
  const [selected, setSelected] = useState("");

  useEffect(() => {
    // Set selected tab based on current route
    if (location.pathname === "/") setSelected("home");
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
    <div className="bottom-nav bg-violet-700 fixed bottom-0 left-0 w-full shadow-lg border-t flex justify-around items-center py-2 md:hidden block z-40">
      {/* Home */}
      <button 
        onClick={() => handleClick("home", "/")}
        className={`flex flex-col items-center ${
          selected === "home" ? "text-yellow-300" : "text-white hover:text-purple-700"
        }`}
      >
        <RiHome9Fill size={18} />
        <span className="text-sm font-semibold">Home</span>
      </button>

      {/* Search */}
      <button
        onClick={() => handleClick("search", "/search")}
        className={`flex flex-col items-center ${
          selected === "search" ? "text-yellow-300" : "text-white hover:text-purple-700"
        }`}
      >
        <RiSearch2Fill size={18} />
        <span className="text-sm font-semibold">Search</span>
      </button>

      {/* Profile */}
      <button
        onClick={() => handleClick("profile", "/account")}
        className={`flex flex-col items-center ${
          selected === "profile" ? "text-yellow-300" : "text-white hover:text-purple-700"
        }`}
      >
        <GiPlagueDoctorProfile size={18} />
        <span className="text-sm font-semibold">Profile</span>
      </button>

      {/* Wishlist */}
      <button
        onClick={() => handleClick("wishlist", "/wishlist")}
        className={`flex flex-col items-center ${
          selected === "wishlist" ? "text-yellow-300" : "text-white hover:text-purple-700"
        }`}
      >
        <FaHeart size={18} />
        <span className="text-sm font-semibold">Wishlist</span>
      </button>

      {/* Cart */}
      <button
        onClick={() => handleClick("cart", "/shoppingCart")}
        className={`flex flex-col items-center ${
          selected === "cart" ? "text-yellow-300" : "text-white hover:text-purple-700"
        }`}
      >
        <HiShoppingCart size={18} />
        <span className="text-sm font-semibold">Cart</span>
      </button>
    </div>
  );
};

export default BottomNav;
