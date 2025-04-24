import React, { useState , useEffect} from 'react'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import { RiAddLargeFill } from "react-icons/ri";
import { MdOutlineWrongLocation } from "react-icons/md";
import AddressBox from '../../Components/AddressBox/AddressBox'
import ModalAddress from '../../Components/Modal/ModalAddress'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { getCustomerDetails , deleteCustomerAddress } from '../../Services/CustomerService'

const AddressPage = () => {

    const [showModal, setShowModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addresses, setAddresses] = useState([]); // Start with empty addresses
    const [loading, setLoading] = useState(true); // To track loading state
    const [customer,setCustomer] =  useState()

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
            // Edit mode
            setSelectedAddress(address);
        } else {
            // Add mode: just clear selectedAddress
            setSelectedAddress(null);
        }
        setShowModal(true);
    };
    
    

    const handleClose = () => {
        setShowModal(false);
        setSelectedAddress(null); 
        fetchCustomerData();
    };


    const breadcrumbs = [
        { label: "Home", link: "/home" },
        { label: "Account", link: "/account" },
        { label: "Address", link: "/address" },
    ];
    
    const isAddDisabled = addressTypesPresent.has('HOME') &&
        addressTypesPresent.has('WORK') &&
        addressTypesPresent.has('OTHER');

    const handleDeleteAddress = async (typeToDelete) => {
        try {
            const addressToDelete = customer.addresses.find(
            (address) => address.addressType === typeToDelete
            );

            if (!addressToDelete) {
            alert("Address not found!");
            return;
            }

            await deleteCustomerAddress(customer.customerId, addressToDelete.id);

            await fetchCustomerData();

            alert("Address deleted successfully!");
        } catch (error) {
            console.error("Failed to delete address:", error);
            alert("Something went wrong while deleting the address.");
        }
        };

        
        
    return (
        <div>
            <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
            <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>
            <div className='px-6 md:px-14 py-3 mt-0 md:mt-10'>  <HeroSection productName={"Address"} breadcrumbs={breadcrumbs}></HeroSection></div>

            <div className='px-6 md:px-14 py-4'>

                <div className='flex justify-center md:justify-end'>
                    <div
                        className={`flex font-semibold gap-2 ${isAddDisabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-violet-100 text-violet-800 cursor-pointer'
                            } px-2 py-2 rounded`}
                        onClick={() => !isAddDisabled && handleOpenModal(null)}
                    >
                        <h4>ADD NEW ADDRESS</h4>
                    </div>
                </div>

                {addresses.length === 0 ? (
                    <div className='h-60 flex flex-col gap-2 items-center justify-center'>
                        <span className='text-gray-300'><MdOutlineWrongLocation size={70} /></span>
                        <h5 className='text-xl text-gray-500'>There's no saved adresses !</h5>
                    </div>
                ) : (

                    <div className='mt-7'>
                        
                        <ul className='flex flex-col gap-3'>
                            {
                                addresses.map((item, index) => (
                                    <li key={index} onClick={() => handleOpenModal(item)} className="cursor-pointer">
                                        <AddressBox
                                            address={item}
                                            name={customer.customerName}
                                            company={customer.company}
                                            phone={customer.phoneNumber}
                                            onDelete={() => handleDeleteAddress(item.addressType)}
                                            
                                        ></AddressBox>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
                }
            </div>

            {customer && (
                <ModalAddress
                    show={showModal}
                    handleClose={handleClose}
                    customer={customer}
                    selectedAddress={selectedAddress}
                    usedAddressTypes={addressTypesPresent}
                />
            )}


            <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
            <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
            <BottomNav></BottomNav>
        </div>
    )
}

export default AddressPage