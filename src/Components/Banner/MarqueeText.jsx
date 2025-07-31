import React from "react";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const MarqueeText = () => {
  const { t } = useTranslation();

  const textKeys = [
    "marquee.engineered",
    "marquee.precision",
    "marquee.softTouch",
    "marquee.builtToWeave"
  ];

  const colors = ["text-purple-600", "text-yellow-400", "text-red-500", "text-green-500"];

  return (
    <div className="relative w-full overflow-hidden bg-white py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {Array(2).fill(0).map((_, loopIndex) =>
          textKeys.map((textKey, index) => (
            <div
              key={`${loopIndex}-${index}`}
              className="flex items-center text-xl font-semibold text-gray-900 mx-8"
            >
              <FaStar className={`mx-2 ${colors[index % colors.length]}`} />
              <span>{t(textKey)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MarqueeText;