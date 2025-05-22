import { FaCheckCircle, FaMinusCircle } from "react-icons/fa";
import { useEffect, useState } from 'react'; // 🔥 added

const Toast = ({ message, onClose, type = "success" }) => {
  const [visible, setVisible] = useState(false); // 🔥 added

  useEffect(() => {
    setVisible(true); // 🔥 added
    const timer = setTimeout(() => {
      setVisible(false); // 🔥 added
      setTimeout(onClose, 300); // allow animation to finish // 🔥 added
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div
      className={`transition-all duration-300 transform ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0' // 🔥 added
      } ${
        isSuccess
          ? 'text-[#0DA40D] border-2 border-[#0DA40D] bg-[#FFFFFF]/80'
          : 'text-[#DB3232] border-2 border-[#DB3232] bg-[#FFFFFF]/80'
      } backdrop-blur-xl px-4 py-3 rounded-lg flex items-center shadow-lg mb-2 w-fit min-w-[350px]`}
    >
      {isSuccess ? (
        <FaCheckCircle className="w-6 h-6 mr-2" />
      ) : (
        <FaMinusCircle className="w-6 h-6 mr-2" />
      )}
      <span className="text-lg font-medium">{message}</span>
      {/* 🔥 added progress bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-current animate-progressBar w-full rounded-b-lg" />
    </div>
  );
};

export default Toast;
