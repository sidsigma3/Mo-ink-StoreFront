import React from 'react';
import { Image } from 'react-bootstrap';


const MainFeatures = () => {
    return (
        <section>
          <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4" id="about-section">
            {/* Section Header */}
            <div className="text-center mb-14">
              <p className="text-purple-600 text-lg font-normal mb-3 tracking-widest uppercase">Features</p>
              <h2 className="text-3xl lg:text-5xl font-semibold text-black max-w-3xl mx-auto">
                Lorem ipsum dolor sit amet.
              </h2>
            </div>
    
            {/* Feature Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-5 mt-32">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="p-8 relative rounded-3xl bg-gradient-to-b from-black/5 to-purple-100">
                  {/* Feature Icon/Image */}
                  <div className="work-img-bg rounded-full bg-grey-50 flex justify-center absolute -top-14 left-1/2 transform -translate-x-1/2">
                    <Image src="/images/Main_tick_Icon.png" alt="feature-icon" width={100} height={100} />
                  </div>
    
                  {/* Heading */}
                  <h3 className="text-2xl text-black font-semibold text-center mt-10">
                    Feature Heading
                  </h3>
    
                  {/* Subheading */}
                  <p className="text-lg font-normal text-black/60 text-center mt-2 mb-20">
                    Short description of the feature goes here.
                  </p>
    
                  {/* Learn More Link
                  <div className="flex items-center justify-center mt-3">
                    <Link
                      href="/"
                      className="text-lg group font-medium text-purple-600 flex items-center relative overflow-hidden after:absolute after:w-full after:h-px after:bg-purple-600 after:bottom-0 after:right-0 after:translate-x-full hover:after:translate-x-0 transition-all"
                    >
                      Learn More
                      <Icon icon="tabler:chevron-right" width="24" height="24" className="ml-1 text-purple-600" />
                    </Link>
                  </div> */}




                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

export default MainFeatures;
