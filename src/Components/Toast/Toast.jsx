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
        isSuccess ? 'bg-[#0DA40D]' : 'bg-[#DB3232]'
      } text-white px-4 py-3 rounded-lg flex items-center shadow-lg mb-2 w-fit min-w-[350px]`}
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
