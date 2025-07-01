import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    quote:
      "Ink n Dyes has been instrumental in elevating our production standards. Their industrial yarns not only meet but exceed quality benchmarks—consistency in tensile strength, minimal breakage during high-speed weaving, and vibrant dye retention are what set them apart.",
    name: "Ramesh Varma",
    role: "Procurement Head, Bharat Textiles Pvt. Ltd.",
    date: "2024-07-20",
    avatar: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Ellipse%202592.png?updatedAt=1751099105221",
  },
  {
    quote:
      "Working with Ink n Dyes has significantly optimized our sourcing operations. Their ability to meet strict quality parameters while offering competitive pricing gives us a major edge. The yarn’s dye absorption and strength have consistently proven superior, especially in export-grade production.",
    name: "Sneha Shah",
    role: "Technical Lead, Triveni Fabrics",
    date: "2024-07-28",
    avatar: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Ellipse%202593.png?updatedAt=1751099105356",
  },
  {
    quote:
      "Vibrant shades and flawless finishes perfect for our export line.",
    name: "Vikram Patel",
    role: "Director, Indigo Yarn Industries",
    date: "2024-06-15",
    avatar: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Ellipse%202591.png?updatedAt=1751099105224",
  },
  {
    quote:
      "Reliable and fast for every bulk custom order we place.",
    name: "Priya Menon",
    role: "Sourcing Manager, Lakshmi Cotton Mills",
    date: "2024-08-01",
    avatar: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Ellipse%202597.png?updatedAt=1751099105323",
  },
  {
    quote:
      "Ink n Dyes simplified our supply chain truly a partner we trust.",
    name: "Rahul Deshmukh",
    role: "Owner, Deshmukh Weaving Works",
    date: "2024-07-10",
    avatar: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Ellipse%202594.png?updatedAt=1751099104830",
  },
  {
    quote:
      "Their flexibility and sustainable options make them stand out.",
    name: "Meera Iyer",
    role: "Co-Founder, EcoTex Solutions",
    date: "2024-08-12",
    avatar: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Ellipse%202596.png?updatedAt=1751099105304",
  },
];



const Testimonial = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-b from-white via-gray-200 to-white py-20 px-4  ">
      <div className="">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto justify-between items-center lg:items-center mb-12 gap-8">
          <div className="">
            <h2 className="text-[40px] sm:text-[48px] text-center font-extrabold text-purple-800 leading-tight">
              550+
            </h2>
            <p className="text-[22px] font-semibold text-dark">
              Reviews from Industry Leaders
            </p>
          </div>

          <div className="text-center lg:text-right">
            {/* Avatar Group */}
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
              10,000+ users already using our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-purple-800 hover:bg-purple-500 text-white font-medium px-6 py-2 rounded-md transition duration-200"
                onClick={() => navigate("/category")}
                >
                Explore Products →
              </button>
              {/* <button className="border border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white font-medium px-6 py-2 rounded-md transition duration-200">
                Read more reviews
              </button> */}
            </div>
          </div>
        </div>

        {/* Testimonial Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:px-10  gap-6">
      {testimonials.map((t, i) => (
        <div
          key={i}
          className={`bg-white rounded-xl text-gray-700  border border-gray-200 p-6 flex flex-col justify-between h-full
            ${i === 0 || i === 1 ? "md:row-span-2" : ""}
          `}
        >
          {/* Stars + Date */}
          <div className="flex items-center mb-4">
            <div className="flex text-[#F59C0E] mr-2">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className="w-4 h-4" />
              ))}
            </div>
            <span className="text-xs text-gray-500">(5/5)</span>
            <span className="ml-auto text-xs text-gray-400">{t.date}</span>
          </div>

      {/* Quote */}
      <blockquote className={`text-md text-gray-700 mb-6 leading-relaxed ${i === 0 ? "text-base md:text-md" : ""}`}>
        “{t.quote}”
      </blockquote>

      {/* Footer */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
        {t.avatar && (
          <img
            src={t.avatar}
            alt={t.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div>
          <p className="text-sm font-semibold text-gray-900">{t.name}</p>
          <p className="text-sm text-gray-500">{t.role}</p>
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
