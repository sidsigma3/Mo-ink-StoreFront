import React from 'react';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MainWhyUs = () => {
  const navigate = useNavigate(); 
  const { t } = useTranslation();

  return (
    <section
      id="why-us"
      className="bg-[#21133a] text-white py-28 bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/images/Pattern.png')`,
      }}
    >
      <div className="container mx-auto lg:max-w-screen-xl px-8 md:px-14 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <div className="w-full flex justify-center ">
            <div className="max-w-auto w-full">
              <Image
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/col-bgimage-1.png?updatedAt=1751860378548"
                alt="Image"
                width={600}
                height={800}
                className="w-full h-auto object-contain  rounded-3xl border-4 border-grey-50"
              />
            </div>
          </div>

          {/* Right Column - Text */}
          <div>
            <p className="text-[#FFEE9A] tracking-widest uppercase font-bold mb-2">{t('whyUs.heading')}</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
              {t('whyUs.title')}
            </h2>
            <p className="text-gray-300 mb-4">
              {t('whyUs.desc1')}
            </p>
            <p className="text-gray-400 mb-8">
              {t('whyUs.desc2')}
            </p>
            <p className="text-gray-400 mb-8">
              {t('whyUs.desc3')}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left mb-10">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-[#FFEE9A]">₹ 10 Cr+</p>
                <p className="text-white mt-1">{t('whyUs.metric1')}</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-[#FFEE9A]">₹ 1L+</p>
                <p className="text-white mt-1">{t('whyUs.metric2')}</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-[#FFEE9A]">1.5L+ Kg</p>
                <p className="text-white mt-1">{t('whyUs.metric3')}</p>
              </div>
            </div>

            <button
              className="bg-[#FFEE9A] text-purple-800 font-medium py-3 px-12 rounded-full border hover:bg-transparent transition-all"
              onClick={() => navigate('/KnowMore')}
            >
              {t('whyUs.button')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainWhyUs;
