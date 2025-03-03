import React , {useState}from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap'
import { BiHomeAlt } from "react-icons/bi";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { BiBuildingHouse } from "react-icons/bi";
import { updateCustomerDetails,getCustomerDetails } from '../../Services/CustomerService';


const ModalAddress = ({show,handleClose,customer}) => {
    const [formData, setFormData] = useState({
        customerAddress: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zipcode: "",
        addressType: "HOME",
    });

  
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   
    const handleAddressType = (type) => {
        setFormData({ ...formData, addressType: type });
    };

    // Save address and update customer
    const handleSave = async () => {
        if (!customer || !customer.customerId) {
            console.error("Customer data missing");
            return;
        }

        const updatedCustomer = {
            ...customer,
            addresses: [...customer.addresses, formData], 
            segmentIds: customer.segments ? customer.segments.map(segment => segment.segmentId) : [],
        };
        

        try {
            await updateCustomerDetails(customer.customerId,updatedCustomer)

            const refreshedCustomer = await getCustomerDetails(customer.customerId);
          
            localStorage.setItem("userData", JSON.stringify(refreshedCustomer.data));

            handleClose(); 
        } catch (error) {
            console.error("Error updating customer details:", error);
        }
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
                        <input className='border-1 rounded p-1' value={customer.company}  onChange={handleChange}></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>Apartmet, suite, etc</label>
                        <input className='border-1 rounded p-1' name='street' value={formData.street}  onChange={handleChange}></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>Country / Region</label>
                        <input className='border-1 rounded p-1' name='country' value={formData.country}  onChange={handleChange}></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>State</label>
                        <input className='border-1 rounded p-1' name='state' value={formData.state}  onChange={handleChange}></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>City</label>
                        <input className='border-1 rounded p-1' name='city' value={formData.city}  onChange={handleChange}></input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>PIN code</label>
                        <input className='border-1 rounded p-1' name='zipcode' value={formData.zipcode}  onChange={handleChange}></input>
                    </div>


                </div>

                <div>
                    <h4 className='font-semibold mt-8'>Type of Address</h4>
                    <div className='flex gap-2 mt-2'>
                        {[
                            { icon: <BiHomeAlt />, label: "HOME" },
                            { icon: <PiSuitcaseSimpleBold />, label: "WORK" },
                            { icon: <BiBuildingHouse />, label: "OTHERS" },
                        ].map(({ icon, label }) => (
                            <button
                                key={label}
                                onClick={() => handleAddressType(label)}
                                className={`flex gap-2 items-center rounded-full border px-3 font-semibold ${
                                    formData.addressType === label ? "border-violet-800 text-violet-800" : "border-gray-400 text-gray-600"
                                }`}
                            >
                                <span>{icon}</span>
                                <p>{label}</p>
                            </button>
                        ))}
                    </div>
                </div>

            </ModalBody>
            <ModalFooter className='justify-between'>
                <button className='bg-gray-300 text-white px-5 py-2' onClick={handleClose}>
                    CANCEL
                </button>
                <button className='bg-violet-800 text-white px-5 py-2' onClick={handleSave}>
                    SAVE ADDRESS
                </button>
            </ModalFooter>
        </Modal>


    </div>
  )
}

export default ModalAddress