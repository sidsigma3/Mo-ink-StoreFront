import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap'
import { BiHomeAlt } from "react-icons/bi";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { BiBuildingHouse } from "react-icons/bi";
import { updateCustomerDetails, getCustomerDetails } from '../../Services/CustomerService';
import SelectState from '../SelectState/SelectState';
import Toast from '../../Components/Toast/Toast';

const ModalAddress = ({
    show, 
    handleClose, 
    onAddressSaved, // New prop from parent
    customer, 
    selectedAddress, 
    usedAddressTypes
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

    const [toasts, setToasts] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const showToast = (message, type = "error") => {
        const id = Date.now();
        setToasts(prev => [...prev, { message, type, id }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddressType = (type) => {
        setFormData({ ...formData, addressType: type });
    };

    const handleSave = async () => {
        setIsSubmitting(true);

        // Validation
        const requiredFields = ['customerAddress', 'street', 'city', 'state', 'country', 'zipcode', 'addressType'];
        const emptyFields = requiredFields.filter(field => !formData[field] || formData[field].trim() === '');
        
        if (emptyFields.length > 0) {
            showToast("Please fill all required fields.", "error");
            setIsSubmitting(false);
            return;
        }

        if (!formData.addressType) {
            showToast("Please select address type", "error");
            setIsSubmitting(false);
            return;
        }

        const existingAddresses = customer.addresses || [];

        // Check for exact match with different address type
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
            showToast(`Same address already exists as "${exactMatch.addressType}". Please add a different address.`, "error");
            setIsSubmitting(false);
            return;
        }

        // Check if address type already exists (only for new addresses)
        const alreadyExists = existingAddresses.some(
            (addr) => addr.addressType === formData.addressType
        );

        if (alreadyExists && !selectedAddress) {
            showToast(`${formData.addressType} address already exists.`, "error");
            setIsSubmitting(false);
            return;
        }

        try {
            let updatedAddresses;

            if (selectedAddress) {
                // Update existing address
                updatedAddresses = existingAddresses.map((addr) =>
                    addr.addressType === selectedAddress.addressType ? { ...addr, ...formData } : addr
                );
            } else {
                // Add new address
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

            // Save the address
            await updateCustomerDetails(customer.customerId, payload);

            // Close modal first
            handleClose();

            // Then call the parent's success handler (refresh data + show toast)
            if (onAddressSaved) {
                await onAddressSaved();
            }

        } catch (error) {
            console.error("Failed to update customer address:", error);
            showToast("Something went wrong while saving address.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Clear toasts when modal closes
    const handleModalClose = () => {
        setToasts([]);
        handleClose();
    };
    
    return (
        <div>
            <Modal show={show} onHide={handleModalClose} centered>
                <ModalHeader>
                    <ModalTitle>
                        {selectedAddress ? 'Edit Address' : 'Add New Address'}
                    </ModalTitle>
                </ModalHeader>

                <ModalBody>
                    <div className='grid grid-cols-2 gap-3'>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>Company name</label>
                            <input 
                                className='border-1 rounded p-1' 
                                value={customer.company} 
                                onChange={handleChange}
                                readOnly
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>Address *</label>
                            <input
                                className='border-1 rounded p-1'
                                name="customerAddress"
                                value={formData.customerAddress}
                                onChange={handleChange}
                                placeholder="Enter address"
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>Apartment, suite, etc *</label>
                            <input 
                                className='border-1 rounded p-1' 
                                name='street' 
                                value={formData.street} 
                                onChange={handleChange}
                                placeholder="Enter apartment, suite, etc"
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>Country / Region *</label>
                            <input 
                                className='border-1 rounded p-1' 
                                name='country' 
                                value={formData.country} 
                                onChange={handleChange}
                                placeholder="Enter country"
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>State *</label> 
                            <SelectState value={formData.state} onChange={handleChange} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>City *</label>
                            <input 
                                className='border-1 rounded p-1' 
                                name='city' 
                                value={formData.city} 
                                onChange={handleChange}
                                placeholder="Enter city"
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>PIN code *</label>
                            <input 
                                className='border-1 rounded p-1' 
                                name='zipcode' 
                                value={formData.zipcode} 
                                onChange={handleChange}
                                placeholder="Enter PIN code"
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className='font-semibold mt-8'>Type of Address *</h4>
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
                                        type="button"
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
                        type="button"
                        className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded"
                        onClick={handleModalClose}
                        disabled={isSubmitting}
                    >
                        CANCEL
                    </button>
                    <button 
                        type="button"
                        className='bg-purple-800 hover:bg-purple-900 text-white px-5 py-2 rounded disabled:bg-purple-400' 
                        onClick={handleSave}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'SAVING...' : 'SAVE'}
                    </button>
                </ModalFooter>
            </Modal>

            {/* Toast Notification - Only for validation errors */}
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