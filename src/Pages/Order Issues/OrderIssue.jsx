import { useEffect } from "react";
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import HeroSection from '../../Components/HeroSection/HeroSection'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { MdOutlineShield } from "react-icons/md";


const OrderIssues = () => {

  
    const breadcrumbs = [
      { label: "Home", link: "/home" },
      { label: "Order Issues", link: "/OrderIssues" },
    ];

    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    return (
      <div>

        <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>

        <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
            <HeroSection productName={"Order Issues"} breadcrumbs={breadcrumbs}></HeroSection>
        </div>
         
  
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white border-2 border-zinc-100 rounded-5 p-6 sm:p-6 md:p-8 lg:p-10 xl:p-10">
          {/* Hero Section */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-neutral-100 p-4 rounded-full">
            <MdOutlineShield size={45} color='#6B21A8'/>

            </div>
          </div>

          {/* Introduction */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Issues</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Ink n Dyes, we prioritize delivering a smooth and reliable experience for all our customers. However, we understand that occasional issues may arise with your order. Rest assured, we are here to help you resolve them as quickly as possible.
            </p>
          </div>

          {/* Order Issues Section */}
<div className="space-y-6">
  <section>
    
    <h4 className="text-xl font-semibold text-gray-800 mb-2">Common Order Issues We Address:</h4>
    <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
      <li>Delayed or missing deliveries</li>
      <li>Incorrect product or quantity received</li>
      <li>Damaged or defective yarn</li>
      <li>Inconsistencies in dyeing quality</li>
      <li>Tracking information not updating</li>
    </ul>

    <h4 className="text-xl font-semibold text-gray-800 mb-2">How to Report an Issue:</h4>
    <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-6">
      <li>Log in to your Ink n Dyes account.</li>
      <li>Navigate to "My Orders" and select the relevant order.</li>
      <li>Click on "Report an Issue" and select the issue type.</li>
      <li>Provide a brief description and upload any relevant documents or photos.</li>
      <li>Our support team will get back to you within 24 to 48 hours.</li>
    </ol>

    <h4 className="text-xl font-semibold text-gray-800 mb-2">For Urgent Assistance:</h4>
    <p className="text-gray-600 mb-4">
      You can also contact our support team directly:
    </p>
    <div className="space-y-2">
      <p className="text-gray-600">
        <span className="font-medium text-gray-900">Phone/WhatsApp:</span> [Your Support Number]
      </p>
      <p className="text-gray-600">
        <span className="font-medium text-gray-900">Email:</span> <a href="mailto:support@inkndyes.com" className="text-blue-600 hover:text-blue-700">support@inkndyes.com</a>
      </p>
      <p className="text-gray-600">
        <span className="font-medium text-gray-900">Live Chat:</span> Available on our website and mobile app
      </p>
    </div>

    <p className="text-gray-600 mt-6">
      We are committed to resolving your concerns swiftly and ensuring your continued satisfaction with our services. Thank you for choosing Ink n Dyes.
    </p>
  </section>
</div>


          {/* Last Updated */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              Last updated: April 2025
            </p>
          </div>
        </div>
      </main>
      
        <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
        <BottomNav></BottomNav>
    </div>
  );
}
  
  export default OrderIssues