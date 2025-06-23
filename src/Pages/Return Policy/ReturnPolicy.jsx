import { useEffect } from "react";
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import HeroSection from '../../Components/HeroSection/HeroSection'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { MdOutlineShield } from "react-icons/md";


const ReturnPolicy = () => {

  
    const breadcrumbs = [
      { label: "Home", link: "/home" },
      { label: "Return Policy", link: "/returnpolicy" },
    ];

    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    return (
      <div>

        <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>

        <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
            <HeroSection productName={"Return Policy"} breadcrumbs={breadcrumbs}></HeroSection>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Return Policy</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We stand behind our products and your satisfaction is our top priority. 
              If you're not happy with your purchase, we're here to help.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. General Return Policy</h3>
              <p className="text-gray-600">
              we take great care to ensure that our yarn products meet the highest quality standards. As we specialize in bulk manufacturing and customized orders, we generally do not accept returns once an order has been processed and shipped.              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Non-Returnable Items</h3>
              <div className="space-y-4">
                <p className="text-gray-600">
                Due to the nature of our business and products, all yarn sales are final. The following items are not eligible for returns:                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Bulk yarn orders, including cotton, silk, nylon, polyester, and blended yarns.</li>
                <li>Custom-dyed, custom-spun, or made-to-order yarns.</li>
                <li>Opened or used yarn products.</li>
                <li>Products damaged due to improper handling or storage after delivery.</li>
              </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Exceptions – Damaged or Incorrect Orders</h3>
              <p className="text-gray-600">
              We strongly encourage customers to double-check their order details (such as quantity, yarn type, color, and other specifications) before submitting it. Once the order is processed, we begin preparation, and changes or cancellations cannot be accommodated. </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Return Process (If Approved)</h3>
              <p className="text-gray-600">
              If your return request is approved under the above exceptions, follow these steps: </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Packaging: Securely pack the items in their original packaging to prevent further damage during transit.</li>
                <li>Shipping: You will receive return instructions, including the shipping address. Return shipping costs may be covered at our discretion.</li>
                <li>Inspection & Resolution: Once we receive and inspect the returned item, we will process the replacement or refund within 10-15 business days.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">5.  Cancellations & Order Modifications</h3>
              <p className="text-gray-600">
              Since we process bulk orders, cancellations or modifications are not allowed once production has started. Please double-check your order details before confirming your purchase.  </p>
            </section>


            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Contact Us</h3>
              <p className="text-gray-600">
                If you have any questions about our refund policy, please contact our customer service team:
              </p>
              <div className="mt-4">
                <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-700 font-medium">
                support@inkndyes.com
                </a>
              </div>
            </section>
          </div>

          {/* Last Updated */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              Last updated: March 2025
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
  
  export default ReturnPolicy