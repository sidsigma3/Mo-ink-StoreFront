import React from "react";
import { FaStar } from "react-icons/fa";

const MarqueeText = () => {
const texts = [
  "Engineered for Strength, Crafted for Comfort",
  "Precision-Dyed Yarns with Lasting Brilliance",
  "Soft Touch. Industrial Toughness. Always Reliable.",
  "Built to Weave Stories, Spun to Last Long",
];

  const colors = ["text-purple-600", "text-yellow-400", "text-red-500", "text-green-500"];

  return (
    <div className="relative w-full overflow-hidden bg-white py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {Array(2).fill(0).map((_, loopIndex) =>
          texts.map((text, index) => (
            <div
              key={`${loopIndex}-${index}`}
              className="flex items-center text-xl font-semibold text-gray-900 mx-8"
            >
              <FaStar className={`mx-2 ${colors[index % colors.length]}`} />
              <span>{text}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MarqueeText;
