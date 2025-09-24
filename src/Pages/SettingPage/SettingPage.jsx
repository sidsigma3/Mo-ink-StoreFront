import React, { useState, useEffect, useRef } from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import HeroSection from '../../Components/HeroSection/HeroSection'
import { RxExit } from "react-icons/rx";
import { FiUpload, FiX, FiImage } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { getCustomerDetails, updateCustomerDetails } from '../../Services/CustomerService'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { useNavigate } from 'react-router-dom'
import Toast from '../../Components/Toast/Toast'
import SelectState from '../../Components/SelectState/SelectState'
import { useTranslation } from 'react-i18next';


const SettingPage = () => {

  const navigate = useNavigate()
  const [customerDetails, setCustomerDetails] = useState({});
  const [customer, setCustomer] = useState({});
  const customerData = JSON.parse(localStorage.getItem('userData') || '{}');
  const [originalCustomer, setOriginalCustomer] = useState({});
  const [isModified, setIsModified] = useState(false); 
  const [toasts, setToasts] = useState([]);
      const { t } = useTranslation();
  
  // Aadhaar card image states
  const [aadhaarImages, setAadhaarImages] = useState({
    front: null,
    back: null
  });
  const [aadhaarPreviews, setAadhaarPreviews] = useState({
    front: null,
    back: null
  });
  const frontFileRef = useRef(null);
  const backFileRef = useRef(null);

  const userData = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const data = await getCustomerDetails(customerData.customerId);
        setCustomerDetails(data.data); // Populate form fields
      } catch (error) {
        console.error("Failed to load customer data", error);
      }
    };
    fetchCustomerData();
  }, []);

  useEffect(() => {
    if (!customerDetails || Object.keys(customerDetails).length === 0) return;

    const workAddressIndex = customerDetails.addresses.findIndex(addr => addr.addressType === "HOME");
    const firstAddress = customerDetails.addresses[workAddressIndex];

    const formattedCustomer = {
      fullName: customerDetails.customerName || "",
      password: customerDetails.password || "",
      gender: customerDetails.gender || "",
      country: firstAddress.country || "",
      email: customerDetails.email || "",
      language: customerDetails.language || "",
      mobile: customerDetails.phoneNumber || "",
      whatsapp: customerDetails.whatsappNumber || "",
      pincode: firstAddress.zipcode || "",
      state: firstAddress.state || "",
      city: firstAddress.city || "",
      landmark: firstAddress.street || "",
      gstNumber: customerDetails.gstNumber ||  "",
      customerStatus:customerDetails.customerStatus,
    };

    setCustomer(formattedCustomer);
    setOriginalCustomer(formattedCustomer);
    
    // Load existing Aadhaar images if available
    if (customerDetails.aadhaarFront) {
      setAadhaarPreviews(prev => ({ ...prev, front: customerDetails.aadhaarFront }));
    }
    if (customerDetails.aadhaarBack) {
      setAadhaarPreviews(prev => ({ ...prev, back: customerDetails.aadhaarBack }));
    }
  }, [customerDetails]);

  useEffect(() => {
    setIsModified(JSON.stringify(customer) !== JSON.stringify(originalCustomer) || 
                  aadhaarImages.front !== null || aadhaarImages.back !== null);
  }, [customer, originalCustomer, aadhaarImages]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleFileUpload = (event, side) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setToasts([{ message: "Please upload only JPEG, PNG, or JPG images", type: "error" }]);
        setTimeout(() => setToasts([]), 3000);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setToasts([{ message: "File size should be less than 5MB", type: "error" }]);
        setTimeout(() => setToasts([]), 3000);
        return;
      }

      console.log('File selected:', file.name, file.size, file.type);
      setAadhaarImages(prev => ({ ...prev, [side]: file }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('FileReader result:', e.target.result ? 'Success' : 'Failed');
        setAadhaarPreviews(prev => ({ ...prev, [side]: e.target.result }));
      };
      reader.onerror = (e) => {
        console.error('FileReader error:', e);
        setToasts([{ message: "Failed to read the image file", type: "error" }]);
        setTimeout(() => setToasts([]), 3000);
      };
      reader.readAsDataURL(file);
    }
    
    // Clear the input value to allow re-selecting the same file
    event.target.value = '';
  };

  // Remove uploaded image
  const removeImage = (side) => {
    setAadhaarImages(prev => ({ ...prev, [side]: null }));
    setAadhaarPreviews(prev => ({ ...prev, [side]: null }));
    
    // Clear the file input
    if (side === 'front' && frontFileRef.current) {
      frontFileRef.current.value = '';
    } else if (side === 'back' && backFileRef.current) {
      backFileRef.current.value = '';
    }
    
    console.log(`${side} image removed`);
    setToasts([{ message: `${side.charAt(0).toUpperCase() + side.slice(1)} image removed`, type: "success" }]);
    setTimeout(() => setToasts([]), 2000);
  };

  // Save changes
  const handleSaveChanges = async () => {
    const showToast = (message, type = "error") => {
      setToasts([{ message, type }]);
      setTimeout(() => setToasts([]), 3000);
    };

    if (!customerDetails) {
      showToast("Customer details not loaded.");
      return;
    }

    // Extract first address or create new
    const existingAddresses = [...(customerDetails.addresses || [])];
    const workAddressIndex = existingAddresses.findIndex(addr => addr.addressType === "HOME");
    const existingAddress = existingAddresses[workAddressIndex];

    const updatedAddress = {
      ...(existingAddress?.id ? { id: existingAddress.id } : {}),
      customerAddress: customer.landmark,
      street: customer.landmark,
      city: customer.city,
      state: customer.state,
      country: customer.country,
      zipcode: customer.pincode,
      addressType: "HOME",
    };

    if (workAddressIndex !== -1) {
      existingAddresses[workAddressIndex] = updatedAddress;
    } else {
      existingAddresses.push(updatedAddress);
    }

    const updatedCustomerData = {
      customerName: customer.fullName,
      phoneNumber: customer.mobile,
      whatsappNumber: customer.whatsapp,
      email: customer.email,
      gstNumber: customer.gstNumber || "",
      customerAddress: customer.landmark,
      zipcode: customer.pincode,
      addresses: existingAddresses.slice(0, 3),
      customerStatus: customerDetails.customerStatus,
      company: userData.company,
    };

    // Add Aadhaar images to the data if uploaded
    if (aadhaarImages.front) {
      updatedCustomerData.aadhaarFront = aadhaarImages.front;
    }
    if (aadhaarImages.back) {
      updatedCustomerData.aadhaarBack = aadhaarImages.back;
    }

    try {
      console.log(updatedCustomerData);
      await updateCustomerDetails(customerDetails.customerId, updatedCustomerData);
      showToast("Changes saved successfully!", "success");
      setOriginalCustomer(customer);
      // Reset Aadhaar images state after successful save
      setAadhaarImages({ front: null, back: null });
    } catch (error) {
      console.error("❌ Failed to save changes:", error);
      showToast("Failed to save changes.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
    navigate("/");
  }

  const breadcrumbs = [
    { label: t('breadcrumb.home'), link: "/home" },
    { label: t('breadcrumb.account'), link: "/account" },
    { label: t('breadcrumb.Profile'), link: "/setting" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>
      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10'>
        <HeroSection productName={t('profile.title')} breadcrumbs={breadcrumbs}></HeroSection>
      </div>

      <div className='px-6 md:px-14 py-4 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4'>

        <div className="flex flex-col">
          <label className="font-medium">{t('profile.fullName')}</label>
          <input className="border-1 p-1 rounded mt-2" name="fullName" value={customer.fullName} onChange={handleInputChange} />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t('profile.password')}</label>
          <input className="border-1 p-1 rounded mt-2" type="password" name="password" value={customer.password} onChange={handleInputChange} />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t('profile.country')}</label>
          <input className="border-1 p-1 rounded mt-2" name="country" value={customer.country} onChange={handleInputChange} />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t('profile.email')}</label>
          <input className="border-1 p-1 rounded mt-2" name="email" value={customer.email} onChange={handleInputChange} />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t('profile.mobileNumber')}</label>
          <input className="border-1 p-1 rounded mt-2" name="mobile" value={customer.mobile} onChange={handleInputChange} />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t('profile.whatsappNumber')}</label>
          <input className="border-1 p-1 rounded mt-2" name="whatsapp" value={customer.whatsapp} onChange={handleInputChange} />
        </div>

        {/* Aadhaar Card Upload Section */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-medium mb-3">{t('profile.aadhaarImages')}</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-16">
            
            {/* Front Side Upload */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-600">{t('profile.frontSide')}</h4>
              <div className="relative">
                {!aadhaarPreviews.front ? (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                    onClick={() => frontFileRef.current?.click()}
                  >
                    <FiUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-1">{t('profile.clickUploadFront')}</p>
                    <p className="text-xs text-gray-400">{t('profile.fileFormat')}</p>
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-white">
                    <img 
                      src={aadhaarPreviews.front} 
                      alt="Aadhaar Front" 
                      className="w-full h-40 object-contain bg-gray-50"
                      onError={(e) => {
                        console.error('Image failed to load:', e);
                        e.target.style.display = 'none';
                      }}
                      onLoad={() => console.log('Image loaded successfully')}
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      {t('profile.uploaded')}
                    </div>
                    
                    {/* Action buttons */}
                    <div className="absolute w-full bottom-3 px-2 flex flex-row justify-between gap-1.5">
                        <button
                          type="button"
                          onClick={() => removeImage('front')}
                          className="w-8 h-8 flex items-center justify-center bg-white hover:bg-red-400 border-1 border-red-600 backdrop-blur-sm text-white !p-2 rounded-full transition-all duration-200  hover:shadow-xl hover:scale-105"
                          title={t('profile.deleteImage')}
                        >
                          <MdDeleteOutline size={16} 
                            className='text-red-600'
                          />
                        </button>

                         <button
                          type="button"
                          onClick={() => frontFileRef.current?.click()}
                          className="w-8 h-8 flex items-center justify-center  bg-purple-800 hover:bg-purple-600 backdrop-blur-sm text-white !p-2 rounded-full transition-all duration-200  hover:shadow-xl hover:scale-105"
                          title={t('profile.changeImage')}
                        >
                          <FiUpload size={16} />
                        </button>
                      </div>
                  </div>
                )}
                <input
                  ref={frontFileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={(e) => handleFileUpload(e, 'front')}
                  className="hidden"
                />
              </div>
            </div>

            {/* Back Side Upload */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-600">{t('profile.backSide')}</h4>
              <div className="relative">
                {!aadhaarPreviews.back ? (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                    onClick={() => backFileRef.current?.click()}
                  >
                    <FiUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-1">{t('profile.clickUploadBack')}</p>
                    <p className="text-xs text-gray-400">{t('profile.fileFormat')}</p>
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-white">
                    <img 
                      src={aadhaarPreviews.back} 
                      alt="Aadhaar Back" 
                      className="w-full h-40 object-contain bg-gray-50"
                      onError={(e) => {
                        console.error('Image failed to load:', e);
                        e.target.style.display = 'none';
                      }}
                      onLoad={() => console.log('Image loaded successfully')}
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      {t('profile.uploaded')}
                    </div>
                    
                    {/* Action buttons */}
                    <div className="absolute w-full bottom-3 px-2 flex flex-row justify-between gap-1.5">
                         <button
                          type="button"
                          onClick={() => removeImage('back')}
                          className="w-8 h-8 flex items-center justify-center bg-white hover:bg-red-400 border-1 border-red-600 backdrop-blur-sm text-white !p-2 rounded-full transition-all duration-200  hover:shadow-xl hover:scale-105"
                          title={t('profile.deleteImage')}
                        >
                          <MdDeleteOutline size={16} 
                            className='text-red-600'
                          />
                        </button>

                       <button
                          type="button"
                          onClick={() => backFileRef.current?.click()}
                          className="w-8 h-8 flex items-center justify-center bg-purple-800 hover:bg-purple-600 backdrop-blur-sm text-white !p-2 rounded-full transition-all duration-200  hover:shadow-xl hover:scale-105"
                          title={t('profile.changeImage')}
                        >
                          <FiUpload size={16} />
                        </button>
                    </div>
                  </div>
                )}
                <input
                  ref={backFileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={(e) => handleFileUpload(e, 'back')}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t('profile.gstNumber')}</label>
          <input className="border-1 p-1 rounded mt-2" name="gstNumber" value={customer.gstNumber} onChange={handleInputChange} />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t('profile.pincode')}</label>
          <input className="border-1 p-1 rounded mt-2" name="pincode" value={customer.pincode} onChange={handleInputChange} />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t('profile.state')}</label>
          <SelectState value={customer.state} onChange={handleInputChange}></SelectState>
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t('profile.city')}</label>
          <input className="border-1 p-1 rounded mt-2" name="city" value={customer.city} onChange={handleInputChange} />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">{t('profile.landmark')}</label>
          <input className="border-1 p-1 rounded mt-2" name="landmark" value={customer.landmark} onChange={handleInputChange} />
        </div>

      </div>

      <div className='px-6 md:px-14 py-3 flex justify-between'>
        <button onClick={handleLogout} className='bg-red-100 text-red-500 rounded p-1 w-40 font-bold flex items-center justify-center gap-2'><span><RxExit size={20} /></span>{t('profile.logout')}</button>

        <button
          onClick={handleSaveChanges}
          disabled={!isModified}
          className={`rounded p-1 w-40 font-bold transition-all ${isModified
              ? 'bg-purple-100 text-purple-700 cursor-pointer hover:bg-purple-200'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
        >
          {t('profile.saveChanges')}
        </button>
      </div>

      <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
      <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
      <BottomNav></BottomNav>

      {/* Toast Notification */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast, index) => (
          <Toast
            key={index}
            message={toast.message}
            type={toast.type}
            onClose={() =>
              setToasts((prev) => prev.filter((_, i) => i !== index))
            }
          />
        ))}
      </div>
    </div>
  )
}

export default SettingPage