import React, { useState } from "react";

const Accordion = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const accordionData = [
    {
      title: "Product Description",
      content: (
        <p className="text-md text-gray-600 mt-4">
          {product.productDescription || "No description available."}
        </p>
      ),
    },
    {
      title: "Packaging & Delivery",
      content: (
        <ul className="text-md text-gray-600 mt-4 list-disc ml-5">
          <li>Carton Box with moisture resistant gunny bag packing.</li>
          <li>Orders are dispatched within 7 business days of the Purchase Order.</li>
          <li>Timely delivery to the doorstep / nearest transport godown.</li>
        </ul>
      ),
    },
    {
      title: "Suggested Use",
      content: (
        <ul className="text-md text-gray-600 mt-4 list-disc ml-5">
          <li>Suitable for handloom and power loom weaving for warp & weft application.</li>
          <li>Customized processing available on pre-order basis</li>
        </ul>
      ),
    },
    {
      title: "Precautions",
      content: (
        <ul className="text-md text-gray-600 mt-4 list-disc ml-5">
          <li>Store yarns in a dry, cool place away from direct sunlight</li>
          <li>Keep packaging sealed to avoid dust accumulation.</li>
          <li>Storage area to be rodent-free & regular pest control should be done.</li>
        </ul>
      ),
    },
  ];

  return (
    <div className="divide-y-2 divide-purple-100 mt-4 rounded-lg">
      {accordionData.map((section, index) => (
        <div key={index} className="py-4">
          <button
            onClick={() => toggleAccordion(index)}
            className="flex justify-between items-center w-full text-left text-md md:text-lg font-semibold text-gray-800"
          >
            <span>{section.title}</span>
            <svg
              className={`w-5 h-5 transition-transform ${
                activeIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {activeIndex === index && (
            <div className="mt-3 animate-fadeIn">{section.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
