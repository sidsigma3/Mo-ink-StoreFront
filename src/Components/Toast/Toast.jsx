import { FaCheckCircle, FaMinusCircle } from "react-icons/fa";
import { useEffect } from 'react';

const Toast = ({ message, onClose, type = "success" }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
 <div
  className={`${
    isSuccess
      ? 'text-[#0DA40D] border-2 border-[#0DA40D] bg-[#0DA40D]/10'
      : 'text-[#DB3232] border-2 border-[#DB3232] bg-[#DB3232]/10'
  } backdrop-blur-xl px-4 py-3 rounded-lg flex items-center shadow-lg mb-2 w-fit min-w-[350px]`}
>
      {isSuccess ? (
        <FaCheckCircle className="w-6 h-6 mr-2" />
      ) : (
        <FaMinusCircle className="w-6 h-6 mr-2" />
      )}
      <span className="text-lg font-medium">{message}</span>
    </div>
  );
};

export default Toast;
