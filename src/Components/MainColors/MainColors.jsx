import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const basePalette = [
  "#f0e2cf", "#6c4a3c", "#c48a84", "#8b456f", "#d287a6", "#7e3743",
  "#b6716f", "#a5525d", "#e4b5a5", "#50363c"
];

const generateRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

const palette = [
  ...basePalette,
  ...Array.from({ length: 50 }, generateRandomColor)
];

const MainColors = () => {
  const sliderRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const slider = sliderRef.current;
    let direction = -1;

    const interval = setInterval(() => {
      if (slider) {
        if (slider.scrollLeft <= 0 || slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
          direction *= -1;
        }
        slider.scrollLeft += 1 * direction;
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="overflow-hidden">
      <div className="container mx-auto lg:max-w-screen-xl">
        <div className="text-center mb-10">
          <p className="text-purple-800 text-lg uppercase tracking-widest font-bold mb-2">
            {t('mainColors.subtitle')}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-3">
            {t('mainColors.title')}
            <span className="bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-500 text-transparent bg-clip-text">
              {t('mainColors.highlight')}
            </span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {t('mainColors.description')}
          </p>
        </div>

        <div
          ref={sliderRef}
          className="grid grid-flow-col grid-rows-3 auto-cols-max gap-4 overflow-x-auto hide-scrollbar"
        >
          {palette.map((hex, index) => (
            <div
              key={index}
              className="relative w-[60px] aspect-square rounded-lg overflow-visible group transition-all duration-300"
            >
              <div
                className="w-full h-full rounded-lg transition-all duration-300 group-hover:scale-90 group-hover:bg-white flex items-center justify-center"
                style={{ backgroundColor: hex }}
              >
                <div className="w-[70%] h-[70%] border border-white rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center mt-16 gap-4">
          <Link
            to="/colorpalette"
            className="text-base sm:text-lg font-medium rounded-full text-white py-2 px-10 bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-500 hover:bg-black/5 transition"
          >
            {t('mainColors.button')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainColors;


