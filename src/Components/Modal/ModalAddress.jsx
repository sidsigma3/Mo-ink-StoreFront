import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap'
import { BiHomeAlt } from "react-icons/bi";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { BiBuildingHouse } from "react-icons/bi";
import { updateCustomerDetails, getCustomerDetails } from '../../Services/CustomerService';


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
            setFormData({
                customerAddress: selectedAddress.customerAddress || "",
                street: selectedAddress.street || "",
                city: selectedAddress.city || "",
                state: selectedAddress.state || "",
                country: selectedAddress.country || "",
                zipcode: selectedAddress.zipcode || "",
                addressType: selectedAddress.addressType || "HOME",
            });
        } else {
            setFormData({
                customerAddress: "",
                street: "",
                city: "",
                state: "",
                country: "",
                zipcode: "",
                addressType: "HOME",
            });
        }
    }, [selectedAddress]);

    const isDisabled = (type) => usedAddressTypes?.has(type) && !selectedAddress;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleAddressType = (type) => {
        setFormData({ ...formData, addressType: type });
    };

    
    const handleSave = () => {
        if (!formData.addressType) {
            alert("Please select address type");
            return;
        }
    
        const existingAddresses = customer.addresses || [];
    
        // Check if this *exact* address already exists under any label
        const exactMatch = existingAddresses.find((addr) =>
            addr.customerAddress === formData.customerAddress &&
            addr.street === formData.street &&
            addr.city === formData.city &&
            addr.state === formData.state &&
            addr.country === formData.country &&
            addr.zipcode === formData.zipcode &&
            addr.addressType !== formData.addressType // Ensure it's not the same type
        );
    
        if (exactMatch && !selectedAddress) {
            alert(`This address is existing under "${exactMatch.addressType}" label, Please add a different address.`);
            return;
        }
    
        // Check if addressType already exists (only for new addresses)
        const alreadyExists = existingAddresses.some(
            (addr) => addr.addressType === formData.addressType
        );
    
        if (alreadyExists && !selectedAddress) {
            alert(`${formData.addressType} address already exists.`);
            return;
        }
    
        let updatedAddresses;
    
        if (selectedAddress) {
            updatedAddresses = existingAddresses.map((addr) =>
                addr.addressType === selectedAddress.addressType ? formData : addr
            );
        } else {
            updatedAddresses = [...existingAddresses, formData];
        }
    
        const updatedCustomer = {
            ...customer,
            addresses: updatedAddresses,
        };
    
        localStorage.setItem("userData", JSON.stringify(updatedCustomer));
        window.location.reload();
    };
    


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
                            <label className='font-semibold'>Apartment, suite, etc</label>
                            <input className='border-1 rounded p-1' name='street' value={formData.street} onChange={handleChange}></input>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>Country / Region</label>
                            <input className='border-1 rounded p-1' name='country' value={formData.country} onChange={handleChange}></input>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold'>State</label>
                            <input className='border-1 rounded p-1' name='state' value={formData.state} onChange={handleChange}></input>
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
                                                ? "bg-violet-800 text-white border-violet-800"
                                                : shouldDisable
                                                    ? "bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed"
                                                    : "bg-white border-gray-400 text-gray-600 hover:border-violet-800 hover:text-violet-800"
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
                    <button className='bg-violet-800 text-white px-5 py-2' onClick={handleSave}>
                        SAVE
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalAddress