import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiPhoneCall } from "react-icons/fi";
import { ImWhatsapp } from "react-icons/im";
import { MdOutlineMailOutline } from "react-icons/md";
import BottomNav from '../BottomNav/BottomNav';
import emailjs from "emailjs-com";



const Inqueries = ({ show }) => {
  const [location, setLocation] = useState([20.296059, 85.824539]); // Default coordinates
const [zoom, setZoom] = useState(13);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    callNumber: "",
    whatsapp: "",
    email: "",
   message: ""
  });
  const sendEmail = () => {
    //setIsSending(true); // optional loading state
  
    const templateParams = {
      from_name: formData.name,
      company: formData.company,
      call_number: formData.callNumber,
      whatsapp_number: formData.whatsapp,
      email: formData.email,
      message: formData.message,
      to_email: "moink.contact@gmail.com"
    };
  
    emailjs.send('service_v9by9gj', 'template_pdedrha', templateParams, 'F88VuipkesL19tUp4')
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Message is sent to Ink & Dye. Team will soon reach out to you.");
        setFormData({
          name: '',
          company: '',
          callNumber: '',
          whatsapp: '',
          email: '',
          message: ''
        }); // reset form
      }, (err) => {
        console.error("FAILED...", err);
        alert("Something went wrong! Please try again later.");
      })
      //.finally(() => setIsSending(false));
  };

//   useEffect(() => {
//     // Get current location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation([latitude, longitude]);
//         },
//         (error) => {
//           console.error("Error fetching location: ", error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   }, []);



return (
  <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
    <div>

      {show && (
        <>
          <h4 className='font-semibold text-2xl'>Any Enquiries</h4>

          <p className='text-lg font-medium mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque delectus ipsum qui molestiae neque alias error quis praesentium quidem, totam exercitationem recusandae unde.</p>
        </>
      )}

      {show === false && (
        <>
          <h4 className='font-bold text-4xl'>Get in <span className='text-violet-800 font-bold'>Touch</span></h4>

          <p className='text-lg font-medium mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque delectus ipsum qui molestiae neque alias error quis praesentium quidem, totam exercitationem recusandae unde.</p>
        </>
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
          placeholder="Company Name *"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />

        <input
          className="p-2 rounded border-1"
          placeholder="Calling Number *"
          value={formData.callNumber}
          onChange={(e) => setFormData({ ...formData, callNumber: e.target.value })}
        />

        <input
          className="p-2 rounded border-1"
          placeholder="Whatsapp Number *"
          value={formData.whatsapp}
          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
        />
        <input
          className="p-2 rounded border-1"
          placeholder="Email *"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          <div className='d-flex col-span-2 lg:col-span-1 align-items-center gap-2 justify-content-center'>
            <span><FiPhoneCall size={30} /></span>
            <div>
              <h4 className='text-lg font-medium'>PHONE</h4>
              <p className='purple-text font-medium'>12347 65879</p>
            </div>
          </div>

          <div className='d-flex col-span-2 lg:col-span-1 align-items-center gap-2 justify-content-center'>
            <span><ImWhatsapp size={30} /></span>
            <div>
              <h4 className='text-lg font-medium'>WhatsApp</h4>
              <p className='purple-text font-medium'>12347 65879</p>
            </div>
          </div>

          <div className='d-flex col-span-2 lg:col-span-1 align-items-center gap-2 justify-content-center'>
            <span><MdOutlineMailOutline size={33} /></span>
            <div>
              <h4 className='text-lg font-medium'>EMAIL</h4>
              <p className='purple-text font-medium'>info@gmail.com</p>
            </div>
          </div>
        </div>

      </div>

    </div>

    <div style={{ height: "40rem", width: "100%" }}>
      <MapContainer center={location} zoom={zoom} style={{ height: "100%", width: "100%" }}>
        {/* Add map tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Add marker at current location */}
        <Marker position={location}>
          <Popup>You are here</Popup>
        </Marker>
      </MapContainer>
    </div>

    <BottomNav></BottomNav>
  </div>
)
}

export default Inqueries