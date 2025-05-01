import React, { useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import confetti from 'canvas-confetti';

const ModalCoupon = ({ isOpen, onClose, amountSaved, couponCode }) => {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (isOpen && canvasRef.current && wrapperRef.current) {
      const canvas = canvasRef.current;

      // Adjust canvas to modal size
      canvas.width = wrapperRef.current.offsetWidth;
      canvas.height = wrapperRef.current.offsetHeight;

      const myConfetti = confetti.create(canvas, {
        resize: false,
        useWorker: true,
      });

      myConfetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
      });

      const timer = setTimeout(onClose, 6000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center overflow-hidden"
        ref={wrapperRef}
      >
        {/* Confetti Canvas Inside Modal */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
        />

        {/* Lottie Animation */}
        <div className="w-full flex justify-center relative z-20">
          <DotLottieReact
            src="https://lottie.host/868daba7-c7ae-4ef0-932d-f36d179162f7/USWDvgsBCd.json"
            loop
            autoplay
            style={{ width: '240px', height: '240px' }}
          />
        </div>

        {/* Coupon Info */}
        <h2 className="text-4xl font-bold text-gray-800 mb-4 relative z-20">
        ₹5,996{amountSaved}
        </h2>
        <p className="text-md text-gray-500 mb-2 relative z-20">
          Saved with this coupon
        </p>
        <p className="text-xl text-gray-500 relative mb-4  z-20">
          <strong>‘{couponCode}WELCOME15’</strong> applied!
        </p>
      </div>
    </div>
  );
};

export default ModalCoupon;
