import React, { useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import confetti from 'canvas-confetti';

const ModalOTPVerified = ({ isOpen, onClose }) => {
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
       }
     }, [isOpen]);
   
     useEffect(() => {
       const handleClickOutside = (event) => {
         if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
           onClose();
         }
       };
   
       if (isOpen) {
         document.addEventListener('mousedown', handleClickOutside);
       }
   
       return () => {
         document.removeEventListener('mousedown', handleClickOutside);
       };
     }, [isOpen, onClose]);
   
     if (!isOpen) return null;
   
     return (
       <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 px-12">
         <div
           ref={wrapperRef}
           className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center overflow-hidden"
         >
           {/* Confetti Canvas Inside Modal */}
           <canvas
             ref={canvasRef}
             className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
           />
   
           <div className="w-full flex justify-center relative z-20">
             <DotLottieReact
               src="https://lottie.host/b14797b6-062a-4c62-a04e-20562ebe1484/dO3R6czmIU.json"
               loop
               autoplay
               speed={2}
               style={{ width: '240px', height: '240px' }}
             />
           </div>
   
           <h2 className="text-2xl font-semibold text-gray-800 mb-2 relative z-20">
             OTP Verified Successfully
           </h2>
   
           <p className="text-md mb-4 text-gray-500 relative z-20">
             Your account is ready! Login credentials have been sent to your email.
           </p>
         </div>
       </div>
     );
   };
   
export default ModalOTPVerified;