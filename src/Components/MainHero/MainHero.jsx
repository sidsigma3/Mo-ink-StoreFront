import React from 'react';
import { useTranslation } from 'react-i18next';

const MainHero = () => {
  const { t } = useTranslation();

  return (
    <section id="home-section" className="relative w-full overflow-hidden">

      {/* Mobile View */}
      <div className="block sm:hidden relative w-full h-[87vh] overflow-hidden ">
        <img
          src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/MainHero_Mobile_Banner.png?updatedAt=1749534746101"
          alt="Mobile Hero"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,245,234,0.9)_0%,_rgba(0,0,0,0)_80%)] pointer-events-none select-none"></div>

        <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
          <div className="max-w-3xl text-left">
            <h1 className="text-3xl font-bold text-black mb-6 text-center leading-snug">
              {t('heroHeading')}
            </h1>
            <p className="text-gray-800 text-base mb-8 text-center">
              {t('heroSubtext1')}
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="/login"
                className="text-base font-medium rounded-full text-white py-2 px-10 bg-purple-800 border border-purple-600 hover:text-purple-600 hover:bg-transparent transition"
              >
                {t('exploreYarns')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div
        className="hidden sm:block w-full h-[85vh] bg-cover bg-[position:center] bg-no-repeat z-0"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/MainHero_Banner.png?updatedAt=1745685185559')",
        }}
      >
        <div className="w-full h-full flex items-center px-12">
          <div className="max-w-3xl">
            <h1 className="text-center text-5xl lg:text-6xl font-bold text-black mb-6">
              {t('heroHeading1')} <br />{t('heroHeading2')}
            </h1>
            <p className="text-center text-gray-800 text-lg mb-8">
              {t('heroSubtext1')} <br />
              {t('heroSubtext2')}
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="/login"
                className="text-base text-center font-medium rounded-full text-white py-2 px-10 bg-purple-800 border border-purple-600 hover:text-purple-600 hover:bg-transparent transition"
              >
                {t('exploreYarns')}
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default MainHero;
