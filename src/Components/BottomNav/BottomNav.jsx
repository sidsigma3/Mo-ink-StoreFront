import { FiHome } from "react-icons/fi";
import { IoSearchSharp } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { FiHeart } from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t flex justify-around items-center py-3 md:hidden block z-40">
      {/* Home */}
      <button onClick={() => navigate("/")} className="flex flex-col items-center text-gray-600 hover:text-purple-700">
      <FiHome size={25}/>
        <span className="text-md font-semibold">Home</span>
      </button>

      {/* Search */}
      <button onClick={() => navigate("/search")} className="flex flex-col items-center text-gray-600 hover:text-purple-700">
         <IoSearchSharp size={25}/>
        <span className="text-md font-semibold">Search</span>
      </button>

      {/* Wishlist */}
      <button onClick={() => navigate("/account")} className="flex flex-col items-center text-gray-600 hover:text-purple-700">
      <GoPerson size={27}/>
        <span className="text-md font-semibold">Profile</span>
      </button>

      {/* Cart */}
      <button onClick={() => navigate("/wishlist")} className="flex flex-col items-center text-gray-600 hover:text-purple-700">
      <FiHeart size={25}/>
        <span className="text-md font-semibold">Wishlist</span>
      </button>

      {/* Profile */}
      <button onClick={() => navigate("/shoppingCart")} className="flex flex-col items-center text-gray-600 hover:text-purple-700">
      <BsCart3 size={25}/>
        <span className="text-md font-semibold">Cart</span>
      </button>
    </div>
  );
};

export default BottomNav;
