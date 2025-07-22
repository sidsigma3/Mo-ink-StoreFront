import React from 'react';
import { useTranslation } from 'react-i18next';

export default function TextileSplitSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#FFFBED] py-20 px-6 md:px-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* Left Column: Yarn in Cone */}
        <div className="flex flex-col lg:flex-col-reverse items-center text-left">
          <div className="mb-6 lg:mb-0">
            <p className="text-purple-800 text-lg font-bold lg:mt-3 mb-3 tracking-widest uppercase">
              {t('textile.cone.subtitle')}
            </p>
            <h2 className="text-3xl lg:text-5xl font-semibold text-black mb-3 leading-tight">
              {t('textile.cone.title')}
            </h2>
            <p className="text-gray-600 text-base">
              {t('textile.cone.description')}
            </p>
          </div>
          <img
            src="/images/Yarn_Cone.png"
            alt="Yarn Cone"
            className="w-full rounded-2xl"
          />
        </div>

        {/* Right Column: Yarn in Hank */}
        <div className="flex flex-col text-left">
          <div className="mb-6">
            <p className="text-purple-800 text-lg font-bold mb-3 tracking-widest uppercase">
              {t('textile.hank.subtitle')}
            </p>
            <h2 className="text-3xl lg:text-5xl font-semibold text-black mb-3 leading-tight">
              {t('textile.hank.title')}
            </h2>
            <p className="text-gray-600 text-base">
              {t('textile.hank.description')}
            </p>
          </div>
          <img
            src="/images/Yarn_Hank.png"
            alt="Yarn Hank"
            className="w-full rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
