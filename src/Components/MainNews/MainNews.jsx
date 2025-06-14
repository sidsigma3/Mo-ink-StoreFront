import React from 'react';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



const MainNews = () => {
  const navigate = useNavigate(); 
    return (
      <section id="news" className="bg-[#FFFBED] py-28 bg-cover bg-center relative"
      style={{
    backgroundImage: `url('/images/Rectangle 3462389 (1).png')`,
  }}
      >
        <div className="container mx-auto lg:max-w-screen-xl px-8 md:px-14 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Image */}
            <div className="w-full flex justify-center ">
              <div className="max-w-auto w-full">
                <Image
                  src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Screenshot%202025-06-14%20115658.png?updatedAt=1749882502369"
                  alt="Chef"
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain  rounded-3xl border-4 border-[#ffe382]"
                />
              </div>
            </div>
  
            {/* Right Column - Text */}
            <div>
              <p className="text-purple-800 text-lg font-bold tracking-widest uppercase  mb-3">News & Updates</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
              Stay Spun In. Stay Informed
              </h2>
              <p className=" mb-8">
              From innovations in yarn technology to sustainability breakthroughs and market insights—get the latest updates that matter to manufacturers, suppliers, and designers alike.
              </p>

             <ul className="text-left text-gray-700 text-base space-y-4 max-w-2xl mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-purple-800 text-xl">✔</span>
                <span><strong>Industry Trends:</strong> Real-time updates on textile & yarn markets.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-800 text-xl">✔</span>
                <span><strong>New Launches:</strong> Be the first to know about our products upgrades.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-800 text-xl">✔</span>
                <span><strong>Success Stories:</strong> How our partners are scaling with us.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-800 text-xl">✔</span>
                <span><strong>Expert Tips:</strong> Best practices on sourcing, trading, and production.</span>
              </li>
            </ul>


              <button className="bg-purple-800 text-[#FFEE9A] font-medium mt-10 py-3 px-12 rounded-full border hover:bg-purple-400 transition-all"
              onClick={() => navigate('/news')}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default MainNews;