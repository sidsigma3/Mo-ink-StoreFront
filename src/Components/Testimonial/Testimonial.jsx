import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const testimonials = [
  {
    quote: "testimonial.1",
    name: "Ramesh Varma",
    role: "Procurement Head, Bharat Textiles Pvt. Ltd.",
    date: "2024-07-20",
    avatar: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Ellipse%202592.png?updatedAt=1751099105221",
  },
  {
    quote: "testimonial.2",
    name: "Sneha Shah",
    role: "Technical Lead, Triveni Fabrics",
    date: "2024-07-28",
    avatar: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Ellipse%202593.png?updatedAt=1751099105356",
  },
  {
    quote: "testimonial.3",
    name: "Vikram Patel",
    role: "Director, Indigo Yarn Industries",
    date: "2024-06-15",
    avatar: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Ellipse%202591.png?updatedAt=1751099105224",
  },
  {
    quote: "testimonial.4",
    name: "Priya Menon",
    role: "Sourcing Manager, Lakshmi Cotton Mills",
    date: "2024-08-01",
    avatar: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Ellipse%202597.png?updatedAt=1751099105323",
  },
  {
    quote: "testimonial.5",
    name: "Rahul Deshmukh",
    role: "Owner, Deshmukh Weaving Works",
    date: "2024-07-10",
    avatar: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Ellipse%202594.png?updatedAt=1751099104830",
  },
  {
    quote: "testimonial.6",
    name: "Meera Iyer",
    role: "Co-Founder, EcoTex Solutions",
    date: "2024-08-12",
    avatar: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Ellipse%202596.png?updatedAt=1751099105304",
  },
];

const Testimonial = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-slide functionality for mobile
  useEffect(() => {
    const timer = setInterval(() => {
      if (window.innerWidth < 768) { // Only auto-slide on mobile
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    } else if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="bg-gradient-to-b from-white via-gray-200 to-white md:py-20 px-4">
      <div>
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto justify-between items-center mb-12 gap-8">
          <div>
            <h2 className="text-[40px] sm:text-[48px] text-center font-extrabold text-purple-800 leading-tight">
              550+
            </h2>
            <p className="text-[22px] font-semibold text-dark">
              {t('testimonial.reviewsTitle')}
            </p>
          </div>

          <div className="text-center lg:text-right">
            <div className="flex justify-center lg:justify-start mb-2">
              <div className="flex -space-x-3">
                {testimonials.map((t, index) => (
                  <img
                    key={index}
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full border-2 border-white"
                  />
                ))}
              </div>
            </div>
            <p className="text-md font-semibold text-left text-gray-900 mb-4">
              {t('testimonial.totalUsers')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                className="bg-purple-800 hover:bg-purple-500 text-white font-medium px-6 py-2 rounded-md transition duration-200"
                onClick={() => navigate("/category")}
              >
                {t('testimonial.button')}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slider View */}
        <div className="md:hidden">
          <div className="relative">
            <div
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`,
                }}
              >
                {testimonials.map((te, i) => (
                  <div
                    key={i}
                    className="w-full flex-shrink-0 px-2"
                  >
                    <div className="bg-white rounded-xl text-gray-700 border border-gray-200 p-6 flex flex-col justify-between h-full">
                      <div className="flex items-center mb-4">
                        <div className="flex text-[#F59C0E] mr-2">
                          {[...Array(5)].map((_, index) => (
                            <FaStar key={index} className="w-4 h-4" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">(5/5)</span>
                        <span className="ml-auto text-xs text-gray-400">{te.date}</span>
                      </div>

                      <blockquote className="text-md text-gray-700 mb-6 leading-relaxed">
                        "{t(te.quote)}"
                      </blockquote>

                      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                        <img
                          src={te.avatar}
                          alt={te.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{te.name}</p>
                          <p className="text-sm text-gray-500">{te.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentSlide
                      ? 'bg-purple-800'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop/Tablet Grid View */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:px-10 gap-6">
          {testimonials.map((te, i) => (
            <div
              key={i}
              className={`bg-white rounded-xl text-gray-700 border border-gray-200 p-6 flex flex-col justify-between h-full ${
                i === 0 || i === 1 ? "md:row-span-2" : ""
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="flex text-[#F59C0E] mr-2">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className="w-4 h-4" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">(5/5)</span>
                <span className="ml-auto text-xs text-gray-400">{te.date}</span>
              </div>

              <blockquote className="text-md text-gray-700 mb-6 leading-relaxed">
                "{t(te.quote)}"
              </blockquote>

              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                <img
                  src={te.avatar}
                  alt={te.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{te.name}</p>
                  <p className="text-sm text-gray-500">{te.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;