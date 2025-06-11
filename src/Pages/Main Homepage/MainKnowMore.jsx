import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MainHeader from "../../Components/MainHeader/MainHeader";
import MainKMHero from "../../Components/MainKMHero/MainKMHero";
import Cta from "../../Components/CTA/Cta";
import Footer from "../../Components/Footer/Footer";
import { FiMail, FiPhone, FiMapPin, FiCheck, FiGlobe, FiAward } from 'react-icons/fi';

const MainKnowMore = () => {
    
     useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();


  return (
    <div className=" bg-white text-gray-800">
      <div className='px-6 md:px-14 py-1 md:py-3'> <MainHeader></MainHeader></div>
        <div className=''> <MainKMHero></MainKMHero> </div>

      {/* 2. Company Overview */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="rounded-3xl lg:w-1/2">
            <video
            autoPlay
            muted
            loop  
            playsInline
            preload="none" 
            poster="" 
            loading="lazy"
            className="rounded-lg  w-full h-auto"
          >
            <source src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/13458442_3840_2160_50fps%20(1).mp4?updatedAt=1749632767404" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">Who We Are</h2>
            <p className="text-lg mb-6">
              We are a trusted manufacturer and global supplier of high-quality yarns, serving textile businesses across industries and continents. From cotton to polyester, our yarns are crafted to meet the most demanding production standards.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                  <FiCheck className="text-purple-800" />
                </div>
                <p className="text-lg">Precision manufacturing</p>
              </div>
              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                  <FiCheck className="text-purple-800" />
                </div>
                <p className="text-lg">Global logistics</p>
              </div>
              <div className="flex items-start">
                <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                  <FiCheck className="text-purple-800" />
                </div>
                <p className="text-lg">Exceptional customer relationships</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Mission */}
      <section className="py-20 px-6 bg-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">Our Mission</h2>
          <p className="text-xl max-w-4xl mx-auto mb-12">
            Our mission is to provide durable, customizable, and ethically produced yarns that empower innovation in textile manufacturing.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border-1 border-grey-400">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiGlobe className="text-purple-800 text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Global Supply</h3>
              <p>Supporting businesses with reliable bulk yarn supply across continents</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border-1 border-grey-400">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Sustainable Practices</h3>
              <p>Promoting eco-friendly production and ethical sourcing</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border-1 border-grey-400">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="text-purple-800 text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Long-term Partnerships</h3>
              <p>Building trust through quality and consistent service</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Problem We Solve */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
          <div className="lg:w-1/2">
            <img 
              src="https://images.pexels.com/photos/2767653/pexels-photo-2767653.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Textile quality control" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800">Solving Industry Challenges</h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mt-3 mb-3">The Challenge:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">!</div>
                  <p>Inconsistent yarn quality across suppliers</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">!</div>
                  <p>Delays in supply chain affecting production</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">!</div>
                  <p>Limited access to customization at scale</p>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Our Solution:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</div>
                  <p>Strict quality controls across all batches</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</div>
                  <p>Scalable and timely global deliveries</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</div>
                  <p>Tailored yarns to fit exact client needs</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us? */}
      <section className="py-20 px-6 bg-purple-800 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose Us?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white/10 p-6 rounded-xl border-2 border-white backdrop-blur-lg">
              <div className="text-4xl mb-4">🧵</div>
              <h3 className="text-xl font-semibold mb-2">Superior Raw Materials</h3>
              <p className="text-white/90">Only the best cotton, silk, nylon, and blended fibers</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl border-2 border-white backdrop-blur-lg">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold mb-2">Advanced Technology</h3>
              <p className="text-white/90">Modern spinning and dyeing facilities</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl border-2 border-white backdrop-blur-lg">
              <div className="text-4xl mb-4">🔎</div>
              <h3 className="text-xl font-semibold mb-2">Strict Quality Checks</h3>
              <p className="text-white/90">Every spool tested for strength, evenness & fastness</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl border-2 border-white backdrop-blur-lg">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Practice</h3>
              <p className="text-white/90">Ethical sourcing, minimal waste, fair labor</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl border-2 border-white backdrop-blur-lg">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">Nationwide Reach</h3>
              <p className="text-white/90">Clients in 25+ states, 99% retention</p>
            </div>
          </div>
        </div>
      </section>



      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* Left */}
          <div className="w-full lg:w-2/5 items-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">Meet Our Team<br />Expertise Behind the Yarn</h2>
            <p className="text-gray-600 text-base">A collective of seasoned professionals in textile engineering, sustainable manufacturing, and global trade—all united by a passion for excellence.</p>
            <button className="mt-4 bg-[#5B21B6] text-white text-md px-6 py-3 rounded-full hover:bg-[#4C1D95] transition-all"
              onClick={() => navigate('/login')}
              >
              Join the Journey
            </button>
          </div>

          {/* Right */}
          <div className="w-full lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Expertise 1 - Active */}
            <div className="p-6 rounded-xl bg-[#6B21A8] text-white shadow-lg transition-all">
              <div className="text-5xl font-bold mb-4 bg-gradient-to-br from-white to-purple-200 text-transparent bg-clip-text">1</div>
              <h3 className="text-2xl font-semibold mb-2">Textile Engineering</h3>
              <p className="text-md leading-relaxed text-white/90">
                Our core team brings decades of hands-on experience in yarn science and textile development.
              </p>
            </div>

            {/* Expertise 2 */}
            <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition-all">
              <div className="text-5xl font-bold mb-4 bg-gradient-to-br from-[#6B21A8] to-[#A78BFA] text-transparent bg-clip-text opacity-30">2</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Sustainable Manufacturing</h3>
              <p className="text-md leading-relaxed text-gray-600">
                Our operations are guided by eco-conscious principles and global sustainability standards.
              </p>
            </div>

            {/* Expertise 3 */}
            <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition-all">
              <div className="text-5xl font-bold mb-4 bg-gradient-to-br from-[#6B21A8] to-[#A78BFA] text-transparent bg-clip-text opacity-30">3</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Logistics & Supply Chain</h3>
              <p className="text-md leading-relaxed text-gray-600">
                Our experts ensure reliable, fast, and traceable delivery solutions across continents.
              </p>
            </div>

            {/* Expertise 4 */}
            <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition-all">
              <div className="text-5xl font-bold mb-4 bg-gradient-to-br from-[#6B21A8] to-[#A78BFA] text-transparent bg-clip-text opacity-30">4</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Client Relations</h3>
              <p className="text-md leading-relaxed text-gray-600">
                We prioritize relationships and offer tailored support to meet each client’s specific needs.
              </p>
            </div>
          </div>
        </div>
      </section>


    {/* 7. Key Metrics / Social Proof */}
      <section className="py-6 px-6 bg-amber-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-12 text-center">Our Global Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8  mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-800 mb-2">100K+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-800 mb-2">25+</div>
                  <div className="text-gray-600">States We Cover</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-800 mb-2">98%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
        </div>
      </section>


      {/* 6. Meet the Founder */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3">
            <img 
              src="/images/avi.jpeg" 
              alt="Founder" 
              className="rounded-full w-64 h-64 object-cover mx-auto border-4 border-purple-200 shadow-lg"
            />
          </div>
          <div className="lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">Meet Our Founder</h2>
            <blockquote className="text-xl italic mb-6 text-gray-700">
             "I founded this company with a vision to supply the finest quality yarns to industries worldwide. Our journey began as a small-scale operation, and today, we proudly serve manufacturers and businesses across multiple countries. What drives us is not just the yarns we produce but the trust we build with every client. Every decision we make is centered around delivering excellence, consistency, and value to our customers."
            </blockquote>
            <div>
              <p className="text-lg font-semibold">Avinash Mohanty</p>
              <p className="text-purple-800">CEO & Founder</p>
            </div>
          </div>
        </div>
      </section>

  

    <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
        
    </div>
  );
};


export default MainKnowMore

