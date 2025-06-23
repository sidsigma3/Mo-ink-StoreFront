import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap'
import { BiHomeAlt } from "react-icons/bi";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { BiBuildingHouse } from "react-icons/bi";
import { updateCustomerDetails, getCustomerDetails } from '../../Services/CustomerService';
import SelectState from '../SelectState/SelectState';
import Toast from '../../Components/Toast/Toast';



const ModalAddress = ({
    show, handleClose, customer, selectedAddress, usedAddressTypes
}) => {

    const [formData, setFormData] = useState({
        customerAddress: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        addressType: "HOME",
    });

    useEffect(() => {
        if (selectedAddress) {
            setFormData(selectedAddress);
        } else {
            // Add mode: initialize new address with available type
            const allTypes = ['HOME', 'WORK', 'OTHER'];
            const usedTypes = new Set(usedAddressTypes || []);
            const availableType = allTypes.find(type => !usedTypes.has(type)) || 'OTHER';
    
            setFormData({
                addressType: availableType,
                street: '',
                city: '',
                state: '',
                zipcode: '',
                country: 'India',
                customerAddress: '',
            });
        }
    }, [selectedAddress, usedAddressTypes]);

    const isDisabled = (type) => usedAddressTypes?.has(type) && !selectedAddress;
    const [toasts, setToasts] = useState([]);
    const [isSaveClicked, setIsSaveClicked] = useState(false); 
    const [showModal, setShowModal] = useState(false);
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleAddressType = (type) => {
        setFormData({ ...formData, addressType: type });
    };


    

            
    const handleSave = async () => {
        setIsSaveClicked(true);         // Mark save clicked
        setShowModal(false);            // Close modal

    const showToast = (message, type = "error") => {
        setToasts([{ message, type, id: Date.now() }]); // 🔥 unique toast
        setTimeout(() => setToasts([]), 3000);
    };

    // 🔥 Required fields validation
    const requiredFields = ['customerAddress', 'street', 'city', 'state', 'country', 'zipcode', 'addressType'];
    const emptyFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
    if (emptyFields.length > 0) {
        showToast("Please fill all required fields.", "error");
        return;
    }

    if (!formData.addressType) {
        showToast("Please select address type", "error");
        return;
    }

    const existingAddresses = customer.addresses || [];

    const exactMatch = existingAddresses.find((addr) =>
        addr.customerAddress === formData.customerAddress &&
        addr.street === formData.street &&
        addr.city === formData.city &&
        addr.state === formData.state &&
        addr.country === formData.country &&
        addr.zipcode === formData.zipcode &&
        addr.addressType !== formData.addressType
    );

    if (exactMatch && !selectedAddress) {
        showToast(`Same address "${exactMatch.addressType}" in use. Add a new one`, "error");
        return;
    }

    const alreadyExists = existingAddresses.some(
        (addr) => addr.addressType === formData.addressType
    );

    if (alreadyExists && !selectedAddress) {
        showToast(`${formData.addressType} address already exists.`, "error");
        return;
    }

    let updatedAddresses;

    if (selectedAddress) {
        updatedAddresses = existingAddresses.map((addr) =>
            addr.addressType === selectedAddress.addressType ? { ...addr, ...formData } : addr
        );
    } else {
        updatedAddresses = [...existingAddresses, { ...formData }];
    }

   const payload = {
            customerId: customer.customerId,
            customerName: customer.customerName,
            phoneNumber: customer.phoneNumber,
            whatsappNumber: customer.whatsappNumber,
            email: customer.email,
            company: customer.company,
            gstNumber: customer.gstNumber,
            cancelledCheque: customer.cancelledCheque,
            customerStatus: customer.customerStatus,
            segmentIds: customer.segments?.map((s) => s.segmentId) || [],
            addresses: updatedAddresses,
            customerAddress: formData.customerAddress,
            zipcode: formData.zipcode,
        };

        try {
            await updateCustomerDetails(customer.customerId, payload);

            setToasts([{ message: "Address saved successfully!", type: "success", id: Date.now() }]);
            setTimeout(() => setToasts([]), 3000);

                    const onClose = () => {
            setToasts([]);
            handleClose(); 
            };

        } catch (error) {
            console.error("Failed to update customer address:", error);
            showToast("Something went wrong while saving address.", "error");
        }
    };


// const handleModalClose = () => {
//         if (isSaveClicked) {
//             handleClose();
//         } else {
//             setToasts([]); 
//             handleClose();
//         }
//     };
    
    
    return (
        <div>
            <Modal show={show} onHide={handleClose} centered>
                <ModalHeader>
                    <ModalTitle>Add new Address</ModalTitle>
                </ModalHeader>

                <ModalBody>
                    <div className='grid grid-cols-2 gap-3'>
                        {/* <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>First name</label>
                        <input className='border-1 rounded p-1' value={customer.customerName}></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>Last name</label>
                        <input className='border-1 rounded p-1'></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>WhatsApp number</label>
                        <input className='border-1 rounded p-1'></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>Calling number</label>
                        <input className='border-1 rounded p-1'></input>
                    </div> */}

                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>Company name</label>
                            <input className='border-1 rounded p-1' value={customer.company} onChange={handleChange}></input>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>Address</label>
                            <input
                                className='border-1 rounded p-1'
                                name="customerAddress"
                                value={formData.customerAddress}
                                onChange={handleChange}
                            
                            />
                        </div>


                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>Apartment, suite, etc</label>
                            <input className='border-1 rounded p-1' name='street' value={formData.street} onChange={handleChange}></input>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>Country / Region</label>
                            <input className='border-1 rounded p-1' name='country' value={formData.country} onChange={handleChange}></input>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>State</label> <SelectState value={formData.state} onChange={handleChange} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>City</label>
                            <input className='border-1 rounded p-1' name='city' value={formData.city} onChange={handleChange}></input>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>PIN code</label>
                            <input className='border-1 rounded p-1' name='zipcode' value={formData.zipcode} onChange={handleChange}></input>
                        </div>


                    </div>

                    <div>
                        <h4 className='font-semibold mt-8'>Type of Address</h4>
                        <div className='flex gap-2 mt-2'>
                            {[
                                { icon: <BiHomeAlt />, label: "HOME" },
                                { icon: <PiSuitcaseSimpleBold />, label: "WORK" },
                                { icon: <BiBuildingHouse />, label: "OTHER" },
                            ].map(({ icon, label }) => {
                                const isUsed = usedAddressTypes?.has(label);
                                const isEditingSameType = selectedAddress?.addressType === label;
                                const shouldDisable = isUsed && !isEditingSameType;

                                return (
                                    <button
                                        key={label}
                                        onClick={() => !shouldDisable && handleAddressType(label)}
                                        disabled={shouldDisable}
                                        className={`flex gap-2 items-center rounded-full border px-3 py-1 font-semibold transition-all duration-200
                                        ${formData.addressType === label
                                                ? "bg-purple-800 text-white border-purple-800"
                                                : shouldDisable
                                                    ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
                                                    : "bg-white border-gray-400 text-gray-600 hover:border-purple-800 hover:text-purple-800"
                                            }`}
                                    >
                                        <span>{icon}</span>
                                        <p>{label}</p>
                                    </button>
                                );
                            })}

                        </div>
                    </div>

                </ModalBody>
                <ModalFooter className='justify-between'>
                    <button
                        className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2"
                        onClick={handleClose}
                    >
                        CANCEL
                    </button>
                    <button className='bg-purple-800 text-white px-5 py-2' onClick={handleSave}>
                        SAVE
                    </button>
                </ModalFooter>
            </Modal>

{/* Toast Notification */}
<div className="fixed top-4 right-4 z-[9999] space-y-2">
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
    )
}

export default ModalAddress