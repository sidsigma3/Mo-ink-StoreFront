import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiPhoneCall } from "react-icons/fi";
import { ImWhatsapp } from "react-icons/im";
import { MdOutlineMailOutline } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import L from 'leaflet';
import Toast from '../Toast/Toast';
import { sendInquiryEmail } from '../../Services/CustomerService';

const Inqueries = () => {
  const { t } = useTranslation();
  const [location] = useState([20.28791285719732, 85.80958984305737]);
  const [zoom] = useState(16);
  const [formData, setFormData] = useState({
    name: "", company: "", interest: "", email: "",
    designation: "", phoneNumber: "", location: "", message: ""
  });
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const customIcon = L.icon({
    iconUrl: '/images/MapIcon.png',
    iconSize: [42, 56],
  });

  const showToast = (message, type) => {
    const id = Date.now();
    setToasts([{ id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    setLoading(false);
  };

  const sendEmail = async () => {
    const { name, company, interest, email, designation, phoneNumber, location, message } = formData;
    if (!name || !company || !interest || !email || !designation || !phoneNumber || !location || !message) {
      showToast(t('inquiries.validation'), "error");
      return;
    }

    try {
      const response = await sendInquiryEmail({ name, email, phoneNumber, message });
      showToast(response.data?.message || t('inquiries.success'), "success");
      setFormData({
        name: "", company: "", interest: "", email: "",
        designation: "", phoneNumber: "", location: "", message: ""
      });
    } catch (err) {
      showToast(err?.response?.data?.message || t('inquiries.error'), "error");
    }
  };

  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
      <div>
        <h4 className='text-3xl lg:text-5xl text-center font-semibold'>
          {t("inquiries.title")} <span className='text-purple-800'>{t("inquiries.highlight")}</span>
        </h4>

        <div className='d-flex flex-column gap-3 mt-3'>
          <div className="flex gap-3">
            <input className="p-2 rounded border w-full md:w-1/2" placeholder={t("inquiries.name")} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input className="p-2 rounded border w-full md:w-1/2" placeholder={t("inquiries.company")} value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
          </div>

          <Dropdown onSelect={(value) => setFormData({ ...formData, interest: value })}>
            <Dropdown.Toggle variant="light" className="w-full border p-2 rounded">
              {formData.interest || t("inquiries.interest")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Sell Products">{t("inquiries.sell")}</Dropdown.Item>
              <Dropdown.Item eventKey="Buy Products">{t("inquiries.buy")}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <input className="p-2 rounded border w-full" placeholder={t("inquiries.email")} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

          <div className="flex gap-3">
            <input className="p-2 rounded border w-full md:w-1/2" placeholder={t("inquiries.designation")} value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} />
            <input className="p-2 rounded border w-full md:w-1/2" placeholder={t("inquiries.phone")} value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
          </div>

          <input className="p-2 rounded border w-full" placeholder={t("inquiries.location")} value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />

          <textarea className="p-2 rounded border w-full h-32" placeholder={t("inquiries.message")} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />

          <button className="p-2 bg-purple-800 text-white rounded" onClick={sendEmail} disabled={loading}>
            {loading ? t("inquiries.sending") : t("inquiries.send")}
          </button>

          {/* Contact Options */}
          <div className='grid grid-cols-4 lg:grid-cols-3 gap-y-6 mt-4'>
            <div className='flex col-span-2 lg:col-span-1 items-center gap-2'>
              <FiPhoneCall size={30} />
              <div>
                <h4 className='text-lg font-medium'>{t("inquiries.phoneLabel")}</h4>
                <p className='purple-text font-medium'>74069 44477</p>
              </div>
            </div>

            <div className='flex col-span-2 lg:col-span-1 items-center gap-2'>
              <ImWhatsapp size={30} />
              <div>
                <h4 className='text-lg font-medium'>WhatsApp</h4>
                <p className='purple-text font-medium'>74069 44477</p>
              </div>
            </div>

            <div className='flex col-span-4 lg:col-span-1 items-center gap-2'>
              <MdOutlineMailOutline size={30} />
              <div>
                <h4 className='text-lg font-medium'>Email</h4>
                <p className='purple-text font-medium'>support@inkndyes.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAP */}
      <div className="w-full z-0 h-[20rem] md:h-[40rem]">
        <MapContainer center={location} zoom={zoom} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={location} icon={customIcon}>
            <Popup>{t("inquiries.mapPopup")}</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} />
        ))}
      </div>
    </section>
  );
};

export default Inqueries;
