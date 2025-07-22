import React from 'react';
import { useTranslation } from 'react-i18next';

const steps = [
  {
    titleKey: 'mainProcess.step1.title',
    descriptionKey: 'mainProcess.step1.description',
    image: '/images/step1.png',
  },
  {
    titleKey: 'mainProcess.step2.title',
    descriptionKey: 'mainProcess.step2.description',
    image: '/images/Step2.png',
  },
  {
    titleKey: 'mainProcess.step3.title',
    descriptionKey: 'mainProcess.step3.description',
    image: '/images/Step3.png',
  },
  {
    titleKey: 'mainProcess.step4.title',
    descriptionKey: 'mainProcess.step4.description',
    image: '/images/Step4.png',
  },
  {
    titleKey: 'mainProcess.step5.title',
    descriptionKey: 'mainProcess.step5.description',
    image: '/images/step5.png',
  },
  {
    titleKey: 'mainProcess.step6.title',
    descriptionKey: 'mainProcess.step6.description',
    image: '/images/step6.png',
  },
];

export default function MainProcess() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto py-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <p className="text-purple-800 text-lg font-bold mb-3 tracking-widest uppercase">
          {t('mainProcess.subtitle')}
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold text-gray-900">
          {t('mainProcess.title')}
        </h2>
        <p className="mt-4 text-md text-gray-500 max-w-2xl mx-auto">
          {t('mainProcess.description')}
        </p>
      </div>

      {/* Step Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 md:p-6 border border-gray-200 rounded-xl bg-white"
          >
            <img src={step.image} alt={t(step.titleKey)} className="h-20 md:h-40 mb-4" />
            <h3 className="text-md md:text-2xl text-black font-semibold text-center mb-2">
              {t(step.titleKey)}
            </h3>
            <p className="hidden sm:block text-sm md:text-md text-gray-500 leading-relaxed">
              {t(step.descriptionKey)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
