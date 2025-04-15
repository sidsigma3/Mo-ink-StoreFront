import React from 'react';

const steps = [
  {
    title: '1. Browse & Explore',
    description:
      'Discover our wide range of premium yarns, from cotton to custom blends — tailored for industrial needs.',
    image: '/images/step1.png',
  },
  {
    title: '2.  Customize Your Order',
    description:
      'Choose the yarn counter, your preferred shade from 1000+ colors, and enter the bulk quantity required.',
    image: '/images/step2.png',
  },
  {
    title: '3. Add Delivery Address',
    description:
      'Enter your shipping details so we can calculate logistics and ensure timely delivery.',
    image: '/images/step3.png',
  },
  {
    title: '4. Place Your Order',
    description:
      'Confirm your selection and complete the order with our secure payment process.',
    image: '/images/step4.png',
  },
  {
    title: '5. Yarn in Production',
    description:
      'Your order enters our production line — crafted with precision and care to meet your specifications.',
    image: '/images/step5.png',
  },
  {

    title: '6. Receive Your Order',
    description:
      'Once ready, your yarns are shipped and delivered to your doorstep — ready for your next big project.',
    image: '/images/step6.png',
  },
];

export default function MainProcess() {
  return (
    <div className="max-w-7xl mx-auto  py-20">
    
      <div className="text-center mb-12">
      <p className="text-purple-800 text-lg font-bold mb-3 tracking-widest uppercase">
          The Process
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold text-gray-900">How it works?</h2>
        <p className="mt-4 text-md text-gray-500 max-w-2xl mx-auto">
          We work step by step, focusing on your needs, fostering collaboration, and providing real-time support to
          ensure a seamless experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-xl bg-white "
          >
            <span className="text-3xl font-bold text-green-600 mb-4">{step.number}</span>
            <img src={step.image} alt={step.title} className="h-40 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-md text-gray-500 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}