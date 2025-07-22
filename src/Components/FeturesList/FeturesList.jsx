import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaStar,
  FaTags,
  FaTruck,
  FaYarn,
  FaCreditCard,
  FaAssistiveListeningSystems,
} from "react-icons/fa";

const FeaturesList = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FaStar className="text-purple-500 text-2xl" />,
      title: t("features.quality.title"),
      description: t("features.quality.description"),
    },
    {
      icon: <FaTags className="text-purple-500 text-2xl" />,
      title: t("features.pricing.title"),
      description: t("features.pricing.description"),
    },
    {
      icon: <FaTruck className="text-purple-500 text-2xl" />,
      title: t("features.logistics.title"),
      description: t("features.logistics.description"),
    },
    {
      icon: <FaYarn className="text-purple-500 text-2xl" />,
      title: t("features.yarn.title"),
      description: t("features.yarn.description"),
    },
    {
      icon: <FaCreditCard className="text-purple-500 text-2xl" />,
      title: t("features.credit.title"),
      description: t("features.credit.description"),
    },
    {
      icon: <FaAssistiveListeningSystems className="text-purple-500 text-2xl" />,
      title: t("features.assist.title"),
      description: t("features.assist.description"),
    },
  ];

  return (
    <section className="bg-white">
      <div>
        <h2 className="text-2xl font-semibold md:text-5xl text-center text-gray-900 mb-12">
          {t("features.heading")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 border border-purple-200 rounded-xl bg-gradient-to-b from-amber-50 via-transparent to-transparent"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md mb-6">
                {feature.icon}
              </div>
              <h3 className="text-md md:text-2xl text-black font-semibold text-center md:mb-4">
                {feature.title}
              </h3>
              <p className="hidden sm:block text-md text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesList;
