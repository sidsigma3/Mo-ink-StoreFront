import React , {useState,useEffect} from 'react'
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import HeroSection from '../../Components/HeroSection/HeroSection'
import { RxExit } from "react-icons/rx";
import { getCustomerDetails , updateCustomerDetails } from '../../Services/CustomerService'
import BottomNav from '../../Components/BottomNav/BottomNav'

const SettingPage = () => {

  const [customerDetails, setCustomerDetails] = useState({});
  const [customer, setCustomer] = useState({});
  const customerData = JSON.parse(localStorage.getItem('userData') || '{}'); 


  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const data = await getCustomerDetails(customerData.customerId);
        setCustomerDetails(data.data); // Populate form fields
      } catch (error) {
        console.error("Failed to load customer data");
      }
    };
    fetchCustomerData();
  }, []);

  // When customerDetails is updated, sync it with customer state
  useEffect(() => {
    setCustomer({
      fullName: customerDetails.customerName || "",
      password: customerDetails.password || "",
      gender: customerDetails.gender || "",
      country: customerDetails.country || "",
      email: customerDetails.email || "",
      language: customerDetails.language || "",
      mobile: customerDetails.phoneNumber || "",
      whatsapp: customerDetails.whatsappNumber || "",
      pincode: customerDetails.zipcode || "",
      state: customerDetails.state || "",
      district: customerDetails.city || "",
      landmark: customerDetails.street || "",
    });
  }, [customerDetails]); // Runs whenever `customerDetails` updates

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes
  const handleSaveChanges = async () => {
    const updatedCustomerData = {
      customerName: customer.fullName,
      phoneNumber: customer.mobile,
      whatsappNumber: customer.whatsapp,
      email: customer.email,
      company: customer.company || "", // Add this if company is needed
      gstNumber: customer.gstNumber || "",
      panNumber: customer.panNumber || "",
      cancelledCheque: customer.cancelledCheque || "",
      customerAddress: customer.address || "",
      street: customer.landmark, // Mapping to street
      city: customer.district, // Mapping to city
      state: customer.state,
      country: customer.country,
      zipcode: customer.pincode,
    //   addressType: "WORK", // Hardcoded value (Change if dynamic)
    //   customerStatus: "ACTIVE", // Hardcoded value (Change if dynamic)
    //   customerTypes: "WEAVER", // Hardcoded value (Change if dynamic)
    //   segmentIds: [1, 2, 3], // Hardcoded array (Change if dynamic)
    };
  
    try {
      await updateCustomerDetails(customerData.customerId , updatedCustomerData);
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  return (
    <div>
        <div className='px-6 md:px-14 py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3'> <Navbar></Navbar></div>

        <div className='px-6 md:px-14 py-3 mt-10'> 
            <HeroSection productName={"General Settings"}></HeroSection>
        </div>

        <div className='px-6 md:px-14 py-4 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4'>

       
                {/* {Object.keys(customer).map((key) => (
                <div className="flex flex-col" key={key}>
                    <label className="font-medium">{key.replace(/([A-Z])/g, " $1")}</label>
                    <input
                    className="border-1 p-1 rounded mt-2"
                    type={key === "password" ? "password" : "text"}
                    name={key}
                    value={customer[key]}
                    onChange={handleInputChange}
                    />
                </div>
                ))} */}
      

      <div className="flex flex-col">
          <label className="font-medium">Full Name</label>
          <input className="border-1 p-1 rounded mt-2" name="fullName" value={customer.fullName} onChange={handleInputChange} />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Password</label>
          <input className="border-1 p-1 rounded mt-2" type="password" name="password" value={customer.password} onChange={handleInputChange} />
        </div>

        {/* <div className="flex flex-col">
          <label className="font-medium">Gender</label>
          <input className="border-1 p-1 rounded mt-2" name="gender" value={customer.gender} onChange={handleInputChange} />
        </div> */}

        <div className="flex flex-col">
          <label className="font-medium">Country</label>
          <input className="border-1 p-1 rounded mt-2" name="country" value={customer.country} onChange={handleInputChange} />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Email</label>
          <input className="border-1 p-1 rounded mt-2" name="email" value={customer.email} onChange={handleInputChange} />
        </div>

        {/* <div className="flex flex-col">
          <label className="font-medium">Language</label>
          <input className="border-1 p-1 rounded mt-2" name="language" value={customer.language} onChange={handleInputChange} />
        </div> */}

        <div className="flex flex-col">
          <label className="font-medium">Mobile number</label>
          <input className="border-1 p-1 rounded mt-2" name="mobile" value={customer.mobile} onChange={handleInputChange} />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">WhatsApp number</label>
          <input className="border-1 p-1 rounded mt-2" name="whatsapp" value={customer.whatsapp} onChange={handleInputChange} />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Pincode</label>
          <input className="border-1 p-1 rounded mt-2" name="pincode" value={customer.pincode} onChange={handleInputChange} />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">State</label>
          <input className="border-1 p-1 rounded mt-2" name="state" value={customer.state} onChange={handleInputChange} />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">District</label>
          <input className="border-1 p-1 rounded mt-2" name="district" value={customer.district} onChange={handleInputChange} />
        </div>

        <div className="flex flex-col">
          <label className="font-medium">Landmark</label>
          <input className="border-1 p-1 rounded mt-2" name="landmark" value={customer.landmark} onChange={handleInputChange} />
        </div>


        </div>

        <div className='px-6 md:px-14 py-3 flex justify-between'>
            <button className='bg-red-100 text-red-500 rounded p-1 w-40 font-bold flex items-center justify-center gap-2'><span><RxExit size={20}/></span>LOG OUT</button>

            <button onClick={handleSaveChanges} className='bg-violet-100 text-violet-700 rounded p-1 w-40 font-bold'>SAVE CHANGES</button>

        </div>

        
      
        <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
        <BottomNav></BottomNav>

    </div>
  )
}

export default SettingPage