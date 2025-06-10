import { useEffect } from "react";
import TopNavigation from '../../Components/TopNavigation/TopNavigation'
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import HeroSection from '../../Components/HeroSection/HeroSection'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { MdOutlineShield } from "react-icons/md";


const TermOfUse = () => {

  
    const breadcrumbs = [
      { label: "Home", link: "/home" },
      { label: "Terms Of Use", link: "/termsofuse" },
    ];

    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    return (
      <div>

        <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>

        <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
            <HeroSection productName={"Terms Of Use"} breadcrumbs={breadcrumbs}></HeroSection>
        </div>
         
  
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white border-2 border-zinc-100 rounded-5 p-6 sm:p-6 md:p-8 lg:p-10 xl:p-10">
          {/* Hero Section */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-neutral-100 p-4 rounded-full">
            <MdOutlineShield size={45} color='#5B21B6'/>

            </div>
          </div>

          {/* Introduction */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Terms Of Use</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform brings together weavers, suppliers, and textile lovers through exciting events, live demos, and curated collections you can shop directly. We’re committed to clear communication, smooth deliveries, and fair policies. From tracking orders to becoming an influencer, everything is designed to support a vibrant, trusted community. Happy exploring!            </p>
          </div>

          {/* Terms of use */}
          <div className="space-y-6">
  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">1. What is Ink n Dyes Social Carnival?</h3>
    <p className="text-gray-600">
      Ink n Dyes Social Carnival is a special event where weavers, suppliers, and textile artisans come together to showcase innovations, success stories, and product launches on our platform. This virtual fair is a blend of live interactions, knowledge-sharing sessions, special discounts, and product promotions. It’s designed to foster community, drive engagement, and celebrate the vibrant textile ecosystem we support.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">2. What is Ink n Dyes Studio, and how can I shop through it?</h3>
    <p className="text-gray-600">
      Ink n Dyes Studio is our interactive content hub where users can explore curated collections, product recommendations, and behind-the-scenes videos shared by industry experts, weavers, and influencers. You can shop directly from the Studio by clicking on featured yarns or dyeing services in the content. Each product comes with detailed specs, price, and quality certification so you can shop with confidence.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">3. What is Ink n Dyes Live, and how do I shop through it?</h3>
    <p className="text-gray-600">
      Ink n Dyes Live is our live-streaming feature where we showcase live demos of yarns, dyeing techniques, tutorials, and expert interviews. During a live session, you’ll see real-time product highlights that can be purchased on the spot. Just click on the featured items appearing during the stream to place an order instantly, with the same guarantees on price, quality, and delivery.
    </p>
  </section>

  <section>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">4. How can you sign up to be an influencer on Ink n Dyes Studio or Ink n Dyes Live?</h3>
    <p className="text-gray-600">
      To become an influencer on our platform, you must be a verified weaver, supplier, textile expert, or content creator passionate about the handloom and textile industry. Visit our "Partner With Us" page and fill out the Influencer Application Form. Once approved, you’ll gain access to our content dashboard where you can schedule your Studio content or go live on Ink n Dyes Live. Influencers also receive early access to products and exclusive buy-back incentives.
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
  
  export default TermOfUse