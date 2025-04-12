import React, { useState } from 'react'
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

const AddressPage = () => {

    const [showModal, setShowModal] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null);
    const customer = JSON.parse(localStorage.getItem("userData") || "{}");
    const [addresses, setAddresses] = useState(customer.addresses || []);
    const addressTypesPresent = new Set(addresses?.map(addr => addr.addressType));

    const handleOpenModal = (address) => {
        setSelectedAddress(address);  
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


    const handleDeleteAddress = (typeToDelete) => {
        const updatedAddresses = customer.addresses.filter(
            (address) => address.addressType !== typeToDelete
        );

        const updatedCustomer = {
            ...customer,
            addresses: updatedAddresses
        };
        localStorage.setItem("userData", JSON.stringify(updatedCustomer));
        window.location.reload(); 
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

            <ModalAddress show={showModal} handleClose={handleClose}
                customer={customer} selectedAddress={selectedAddress}
                usedAddressTypes={addressTypesPresent}>

            </ModalAddress>

            <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
            <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
            <BottomNav></BottomNav>
        </div>
    )
}

export default AddressPage