import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiPhoneCall } from "react-icons/fi";
import { ImWhatsapp } from "react-icons/im";
import { MdOutlineMailOutline } from "react-icons/md";
import BottomNav from '../BottomNav/BottomNav';
import { sendInquiryEmail } from '../../Services/CustomerService';
import Toast from '../Toast/Toast';

const Inqueries = ({ show }) => {
  const [location, setLocation] = useState([20.296059, 85.824539]); // Default coordinates
  const [zoom, setZoom] = useState(13);
  const [toasts, setToasts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "", 
    message: ""
  });

  const sendEmail = async () => {
    const { name, email, phoneNumber, message } = formData;

    const showToast = (message, type ) => {
      const toastId = Date.now(); 
      setToasts([{ id: toastId, message, type }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== toastId)), 3000); 
    };

    if (!name || !email || !phoneNumber || !message) {
      showToast("Please fill out all required fields.", "error");
      return;
    }

    const payload = {
      name,
      email,
      phoneNumber,
      message
    };

    try {
      const response = await sendInquiryEmail(payload);

      const data = response.data;

      console.log("Response from sendEmail:", data);

    showToast(
      data?.data || data?.message || "Message sent successfully.",
      "success"
    );
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      message: ""
    });
    
    } catch (error) {
      showToast(error.response.data?.message || "Failed to send message. Please try again.", "error");
      console.error("Error in sendEmail:", error);
    }
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
      <div>
        {show && (
          <h4 className='font-semibold text-2xl'>Any Enquiries</h4>
        )}

        {show === false && (
          <h4 className='font-bold text-4xl'>Get in <span className='text-violet-800 font-bold'>Touch</span></h4>
        )}

        <div className='d-flex flex-column gap-3 mt-3'>
          <input
            className="p-2 rounded border-1"
            placeholder="Name *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            className="p-2 rounded border-1"
            placeholder="Email *"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <input
            className="p-2 rounded border-1"
            placeholder="Calling Number *"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} 
          />

          <textarea
            className="p-2 rounded border border-gray-300 w-full h-32 resize-none"
            placeholder="Message *"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />

          <button
            className="p-2 bg-violet-800 text-white rounded"
            onClick={sendEmail}
          >
            SEND
          </button>

          <div className='grid grid-cols-4 lg:grid-cols-3 gap-y-6'>
            {/* PHONE */}
            <div className='flex col-span-2 lg:col-span-1 items-center gap-2 justify-start text-center'>
              <span><FiPhoneCall size={30} /></span>
              <div>
                <h4 className='text-lg text-left font-medium'>PHONE</h4>
                <p className='purple-text font-medium'>74069 44477</p>
              </div>
            </div>

            {/* WHATSAPP */}
            <div className='flex col-span-2 lg:col-span-1 items-center gap-2 justify-start text-center'>
              <span><ImWhatsapp size={30} /></span>
              <div>
                <h4 className='text-lg text-left font-medium'>WhatsApp</h4>
                <p className='purple-text font-medium'>74069 44477</p>
              </div>
            </div>

            {/* EMAIL */}
            <div className='flex col-span-4 lg:col-span-1 items-center gap-2 justify-start text-center'>
              <span><MdOutlineMailOutline size={33} /></span>
              <div>
                <h4 className='text-lg text-left font-medium'>EMAIL</h4>
                <p className='purple-text font-medium'>support@inkndyes.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "40rem", width: "100%" }}>
        <MapContainer center={location} zoom={zoom} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={location}>
            <Popup>You are here</Popup>
          </Marker>
        </MapContainer>
      </div>

      <BottomNav />

      {/* Toast Notification */}
      <div className="fixed top-4 right-4 z-9999 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() =>
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Inqueries;
