import React from "react";
import { useTranslation } from "react-i18next";
import { FaShoppingCart, FaGlobe, FaStar, FaTags, FaTruck, FaYarn, FaCreditCard, FaAssistiveListeningSystems } from "react-icons/fa";

const FeturesList_LandingPage = () => {
  const { t } = useTranslation();
  
  const features = [
    // {
    //   icon: <FaShoppingCart className="text-purple-500 text-2xl" />,
    //   titleKey: "features.userFriendly.title",
    //   descriptionKey: "features.userFriendly.desc",
    // },
    // {
    //   icon: <FaGlobe className="text-purple-500 text-2xl" />,
    //   titleKey: "features.digitalEcosystem.title",
    //   descriptionKey: "features.digitalEcosystem.desc",
    // },
    {
      icon: <FaStar className="text-purple-500 text-2xl" />,
      titleKey: "features.qualitySelection.title",
      descriptionKey: "features.qualitySelection.desc",
    },
    {
      icon: <FaTags className="text-purple-500  text-2xl" />,
      titleKey: "features.transparentPricing.title",
      descriptionKey: "features.transparentPricing.desc",
    },
    {
      icon: <FaTruck className="text-purple-500 text-2xl" />,
      titleKey: "features.efficientLogistics.title",
      descriptionKey: "features.efficientLogistics.desc",
    },
    {
      icon: <FaYarn className="text-purple-500 text-2xl" />,
      titleKey: "features.uniqueYarn.title",
      descriptionKey: "features.uniqueYarn.desc",
    },
    {
      icon: <FaCreditCard className="text-purple-500 text-2xl" />,
      titleKey: "features.lowInterestCredit.title",
      descriptionKey: "features.lowInterestCredit.desc",
    },
    {
      icon: <FaAssistiveListeningSystems className="text-purple-500 text-2xl" />,
      titleKey: "features.buyAssist.title",
      descriptionKey: "features.buyAssist.desc",
    },
  ];

  return (
    <section className=" bg-white">
      <div>
        <h2 className="text-2xl font-semibold md:text-5xl text-center text-gray-900 mb-12">{t("features.section.title")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 border border-bottom border-purple-200 rounded-xl  bg-gradient-to-b from-amber-50 via-transparent to-transparent"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md mb-6">
                {feature.icon}
              </div>
              <h3 className="text-md md:text-2xl  text-black font-semibold text-center md:mb-4 ">{t(feature.titleKey)}</h3>
              <p className="hidden sm:block text-md text-gray-500 text-md">{t(feature.descriptionKey)}</p>
            </div>
          ))}
        </div>
       </div>
    </section>
  );
};

export default FeturesList_LandingPage;