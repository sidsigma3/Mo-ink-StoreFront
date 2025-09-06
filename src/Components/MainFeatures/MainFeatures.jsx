import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-bootstrap';

const MainFeatures = () => {
  const { t } = useTranslation();

  return (
    <section id="features">
      <div className="container bg-grey-100 mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4" id="about-section">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-purple-800 text-lg font-bold mb-3 tracking-widest uppercase">
            {t('features')}
          </p>
          <h2 className="text-3xl lg:text-5xl font-semibold text-black max-w-3xl mx-auto">
            {t('featuresHeading')}
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-5 mt-32">
          {[
            {
              img: "services.png",
              title: t('featuresCard1Title'),
              text: t('featuresCard1Text')
            },
            {
              img: "save-the-world.png",
              title: t('featuresCard2Title'),
              text: t('featuresCard2Text')
            },
            {
              img: "charity.png",
              title: t('featuresCard3Title'),
              text: t('featuresCard3Text')
            },
            {
              img: "delivery-service.png",
              title: t('featuresCard4Title'),
              text: t('featuresCard4Text')
            },
            {
              img: "risk-management.png",
              title: t('featuresCard5Title'),
              text: t('featuresCard5Text')
            },
            {
              img: "receiving (1).png",
              title: t('featuresCard6Title'),
              text: t('featuresCard6Text')
            }
          ].map((card, idx) => (
            <div key={idx} className="p-8 relative rounded-3xl border-1 border-grey-50 bg-gradient-to-b from-white/5 to-purple-100">
              <div className="rounded-full border-2 border-purple-800 bg-gray-50 p-4 w-[100px] h-[100px] flex items-center justify-center absolute -top-14 left-1/2 transform -translate-x-1/2 shadow-lg">
                <Image
                  src={`https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/${card.img}`}
                  alt="feature-icon"
                  width={100}
                  height={100}
                />
              </div>
              <h3 className="text-md md:text-2xl text-black font-semibold text-center mt-10">
                {card.title}
              </h3>
              <p className="hidden sm:block text-md font-normal text-black/60 text-center mt-2 mb-2">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainFeatures;
