import React, { useEffect, useState } from 'react';
import { SlLocationPin } from "react-icons/sl";

const YourLocation = () => {
  const [pincode, setPincode] = useState('Fetching...');

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const data = await res.json();
            const pin = data?.address?.postcode || 'Not found';
            setPincode(pin);
          } catch (error) {
            setPincode('Error');
            console.error('Reverse geocoding failed:', error);
          }
        },
        error => {
          console.error('Geolocation error:', error);
          setPincode('Denied');
        }
      );
    } else {
      setPincode('Not supported');
    }
  }, []);

  return (
    <div className='d-flex align-items-center justify-content-between shadow-sm bg-white p-2 rounded' style={{ width: '7rem' }}>
      <span className=''><SlLocationPin size={20}/></span>
      <div className="flex">
        <h4 className='text-muted font-bold'> {pincode}</h4>
      </div>
    </div>
  );
};

export default YourLocation;
