import { useEffect } from "react";
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import HeroSection from '../../Components/HeroSection/HeroSection'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { MdOutlineShield } from "react-icons/md";


const RefundPolicy = () => {

  
    const breadcrumbs = [
      { label: "Home", link: "/home" },
      { label: "Refund Policy", link: "/refundpolicy" },
    ];

    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    return (
      <div>

        <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>

        <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
            <HeroSection productName={"Refund Policy"} breadcrumbs={breadcrumbs}></HeroSection>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Refund Policies</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We stand behind our products and your satisfaction is our top priority. 
              If you're not happy with your purchase, we're here to help.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Bulk Orders & Custom Orders</h3>
              <p className="text-gray-600">
              As a store specializing in bulk yarn manufacturing, we process and fulfill large orders tailored to your specific requirements. All orders are custom-made to meet the particular needs of our clients, including color, material, and quantity specifications. Because of the custom nature of these bulk orders, we do not accept returns or offer refunds on orders once they have been processed and shipped.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Non-Returnable Items</h3>
              <div className="space-y-4">
                <p className="text-gray-600">
                Due to the specialized nature of our products, all yarn products, including cotton, silk, nylon, polyester, and blends, are considered non-returnable. If you have ordered yarn in bulk, please ensure the specifications of the order (including color, material, quantity, and quality) are carefully reviewed before finalizing your purchase.
                </p>
                <p className="text-gray-600">
                  If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-10 business days.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Order Accuracy</h3>
              <p className="text-gray-600">
              We strongly encourage customers to double-check their order details (such as quantity, yarn type, color, and other specifications) before submitting it. Once the order is processed, we begin preparation, and changes or cancellations cannot be accommodated. </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Damaged or Defective Goods</h3>
              <p className="text-gray-600">
              We strive to maintain the highest quality in our products. However, if you receive a damaged or defective product, please contact us immediately within 7 days of receipt. We will investigate the issue and, if found to be at fault, offer a replacement of the defective item. Please note that we may request photographic evidence of the damage or defect for verification purposes.              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Order Cancellation</h3>
              <p className="text-gray-600">
              Once an order is placed and processed, cancellation requests are not accepted due to the custom and bulk nature of our manufacturing process. Please ensure all details are correct at the time of order placement.              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Refund Process for Accepted Returns</h3>
              <p className="text-gray-600">
              In exceptional cases where a return is authorized (e.g., defective or incorrect goods), refunds will be processed once the returned items are received and inspected. If a refund is applicable, it will be credited to your original method of payment within 10-15 business days, depending on the payment provider's policies. </p>           </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">7. Shipping Fees</h3>
              <p className="text-gray-600">
              Shipping costs are non-refundable. If a refund is issued due to a defective or incorrect product, the customer may be responsible for the cost of return shipping, unless otherwise specified.     </p>        </section>



            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">8. Contact Us</h3>
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
  
  export default RefundPolicy