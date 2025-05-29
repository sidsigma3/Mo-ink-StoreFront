import React from "react";
import { FaShoppingCart, FaGlobe, FaStar, FaTags, FaTruck, FaYarn, FaCreditCard, FaAssistiveListeningSystems } from "react-icons/fa";

const FeturesList_LandingPage = () => {
  const features = [
    {
      icon: <FaShoppingCart className="text-purple-500 text-4xl" />,
      title: "User-Friendly Platform",
      description: "Easily navigate and shop with our intuitive platform designed for a seamless experience.",
    },
    {
      icon: <FaGlobe className="text-purple-500 text-4xl" />,
      title: "Digital Ecosystem",
      description: "Connect across the entire supply chain with our advanced digital infrastructure.",
    },
    {
      icon: <FaStar className="text-purple-500 text-4xl" />,
      title: "Quality Selection",
      description: "Access a wide range of premium products carefully curated for your needs.",
    },
    {
      icon: <FaTags className="text-purple-500  text-4xl" />,
      title: "Transparent Pricing",
      description: "Benefit from clear and competitive pricing with no hidden costs.",
    },
    {
      icon: <FaTruck className="text-purple-500 text-4xl" />,
      title: "Efficient Logistics",
      description: "Enjoy fast, reliable, and efficient delivery services.",
    },
    {
      icon: <FaYarn className="text-purple-500 text-4xl" />,
      title: "Unique Yarn Offerings",
      description: "Discover exclusive yarn varieties to meet your unique project requirements.",
    },
    {
      icon: <FaCreditCard className="text-purple-500 text-4xl" />,
      title: "Low-Interest Credit",
      description: "Take advantage of flexible payment options with low-interest credit facilities.",
    },
    {
      icon: <FaAssistiveListeningSystems className="text-purple-500 text-4xl" />,
      title: "Buy Assist Program",
      description: "Get personalized assistance and guidance throughout your buying journey.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div>
        <h2 className="text-2xl font-semibold md:text-3xl text-center text-gray-900 mb-12">Value Additions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 border border-bottom border-purple-200 rounded-lg"
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800  mb-4">{feature.title}</h3>
              <p className="text-gray-500 text-md">{feature.description}</p>
            </div>
          ))}
        </div>
       </div>
    </section>
  );
};

export default FeturesList_LandingPage;
