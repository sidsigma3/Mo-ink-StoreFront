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
import { getCustomerDetails , updateCustomerDetails } from '../../Services/CustomerService'

const AddressPage = () => {

    const [showModal, setShowModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addresses, setAddresses] = useState([]); // Start with empty addresses
    const [loading, setLoading] = useState(true); // To track loading state
    const [customer,setCustomer] =  useState()

    useEffect(() => {
        // Get customer data from localStorage
        const customer = JSON.parse(localStorage.getItem("userData") || "{}");
        const customerId = customer.customerId;

        if (!customerId) {
            console.error("Customer ID not found in localStorage");
            setLoading(false);
            return;
        }

        // Fetch customer details from API using the customerId
        const fetchCustomerData = async () => {
            try {
                const customerData = await getCustomerDetails(customerId); // Replace with your actual API call
              
                console.log(customerData)
                setAddresses(customerData.data?.addresses || []); // Set addresses from customer data
                setLoading(false); // Finished loading
                setCustomer(customerData.data)
            } catch (error) {
                console.error("Failed to fetch customer data", error);
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, []); // This effect runs once when the component mounts
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
            const updatedAddresses = customer.addresses.filter(
                (address) => address.addressType !== typeToDelete
            );
        
            const payload = {
                customerName: customer.customerName,
                phoneNumber: customer.phoneNumber,
                whatsappNumber: customer.whatsappNumber,
                gstNumber: customer.gstNumber,
                email: customer.email,
                company: customer.company,
                cancelledCheque: customer.cancelledCheque || "",
                customerStatus: customer.customerStatus || "Active",
                segmentIds: customer.segments?.map(seg => seg.segmentId) || [],
                addresses: updatedAddresses,
                customerAddress: updatedAddresses[0]?.customerAddress || "",
                zipcode: updatedAddresses[0]?.zipcode || "",
            };
        
            try {
                await updateCustomerDetails(customer.customerId, payload);
                const updatedCustomer = await getCustomerDetails(customer.customerId);
                setCustomer(updatedCustomer); // refresh UI
            } catch (error) {
                console.error("Failed to delete address:", error);
                alert("Something went wrong while deleting address.");
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