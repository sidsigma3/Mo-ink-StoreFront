import React, { useState , useEffect } from 'react';
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader';
import Navbar from '../../Components/Navbar/Navbar';
import HeroSection from '../../Components/HeroSection/HeroSection';
import Cta from '../../Components/CTA/Cta';
import Footer from '../../Components/Footer/Footer';
import { RiAddLargeFill } from "react-icons/ri";
import { MdOutlineWrongLocation } from "react-icons/md";
import AddressBox from '../../Components/AddressBox/AddressBox';
import ModalAddress from '../../Components/Modal/ModalAddress';
import BottomNav from '../../Components/BottomNav/BottomNav';
import { getCustomerDetails , deleteCustomerAddress } from '../../Services/CustomerService';
import { FaPlus } from "react-icons/fa6";
import Toast from '../../Components/Toast/Toast';

const AddressPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [toasts, setToasts] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState();

    const fetchCustomerData = async () => {
        const storedCustomer = JSON.parse(localStorage.getItem("userData") || "{}");
        const customerId = storedCustomer.customerId;

        if (!customerId) {
            console.error("Customer ID not found in localStorage");
            setLoading(false);
            return;
        }

        try {
            const customerData = await getCustomerDetails(customerId);
            setAddresses(customerData.data?.addresses || []);
            setCustomer(customerData.data);
            localStorage.setItem("userData", JSON.stringify(customerData.data));
        } catch (error) {
            console.error("Failed to fetch customer data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomerData();
    }, []);

    const addressTypesPresent = new Set(addresses?.map(addr => addr.addressType));

    const handleOpenModal = (address) => {
        if (address) {
            setSelectedAddress(address);
        } else {
            setSelectedAddress(null);
        }
        setShowModal(true);
    };

    // Separate function to handle successful address save
    const handleAddressSaved = async () => {
        try {
            // Refresh the data first
            await fetchCustomerData();
            
            // Show success toast
            const id = Date.now();
            setToasts(prev => [...prev, { 
                id, 
                message: 'Address saved successfully', 
                type: 'success' 
            }]);
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 3000);
        } catch (error) {
            console.error("Failed to refresh data after saving address:", error);
            const id = Date.now();
            setToasts(prev => [...prev, { 
                id, 
                message: 'Address saved but failed to refresh data', 
                type: 'warning' 
            }]);
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 3000);
        }
    };

    // Updated handleClose - just closes modal
    const handleClose = () => {
        setShowModal(false);
        setSelectedAddress(null); 
    };

    const breadcrumbs = [
        { label: "Home", link: "/home" },
        { label: "Account", link: "/account" },
        { label: "Address", link: "/address" },
    ];

    const isAddDisabled = addressTypesPresent.has('HOME') &&
        addressTypesPresent.has('WORK') &&
        addressTypesPresent.has('OTHER');

    const handleDeleteAddress = async (typeToDelete, event) => {
        // Stop event propagation to prevent modal from opening
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        // Close modal if it's open
        setShowModal(false);
        setSelectedAddress(null);

        try {
            const addressToDelete = customer.addresses.find(
                (address) => address.addressType === typeToDelete
            );

            if (!addressToDelete) {
                const id = Date.now();
                setToasts(prev => [...prev, { id, message: "Address not found!", type: "error" }]);
                setTimeout(() => {
                    setToasts(prev => prev.filter(t => t.id !== id));
                }, 3000);
                return;
            }

            await deleteCustomerAddress(customer.customerId, addressToDelete.id);
            await fetchCustomerData();

            const id = Date.now();
            setToasts(prev => [...prev, { id, message: "Address deleted successfully!", type: "success" }]);
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 3000);
        } catch (error) {
            console.error("Failed to delete address:", error);
            const id = Date.now();
            setToasts(prev => [...prev, { id, message: "Something went wrong while deleting the address.", type: "error" }]);
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 3000);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader /></div>
            <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar /></div>
            <div className='px-6 md:px-14 py-3 mt-0 md:mt-10'>  
                <HeroSection productName={"Address"} breadcrumbs={breadcrumbs} />
            </div>

            <div className='px-6 md:px-14 py-4'>
                <div className='flex justify-end'>
                    <div
                        className={`flex font-semibold gap-2 items-center ${
                            isAddDisabled
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-purple-100 text-purple-800 cursor-pointer'
                        } px-2 py-2 rounded`}
                        onClick={() => !isAddDisabled && handleOpenModal(null)}
                    >
                        <h4 className="hidden sm:block">ADD NEW ADDRESS</h4>
                        <FaPlus className='h-5 w-5 sm:hidden' /> 
                    </div>
                </div>

                {addresses.length === 0 ? (
                    <div className='h-60 flex flex-col gap-2 items-center justify-center'>
                        <span className='text-gray-300'><MdOutlineWrongLocation size={70} /></span>
                        <h5 className='text-xl text-gray-500'>There's no saved addresses !</h5>
                    </div>
                ) : (
                    <div className='mt-7'>
                        <ul className='flex flex-col gap-3'>
                            {addresses.map((item, index) => (
                                <li key={index}>
                                    <AddressBox
                                        address={item}
                                        name={customer.customerName}
                                        company={customer.company}
                                        phone={customer.phoneNumber}
                                        onDelete={(event) => handleDeleteAddress(item.addressType, event)}
                                        onEdit={() => handleOpenModal(item)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {customer && (
                <ModalAddress
                    show={showModal}
                    handleClose={handleClose}
                    onAddressSaved={handleAddressSaved} // New prop for handling successful save
                    customer={customer}
                    selectedAddress={selectedAddress}
                    usedAddressTypes={addressTypesPresent}
                />
            )}

            <div className='px-6 md:px-14 py-3 mt-10'><Cta /></div>
            <div className='px-6 md:px-14 py-3'><Footer /></div>
            <BottomNav />

            {/* Toast Notification */}
            <div className="fixed top-4 right-4 z-50 space-y-2">
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

export default AddressPage;