import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image } from "react-bootstrap";

const MainFAQ = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("mainFAQ.q1"),
      answer: t("mainFAQ.a1"),
    },
    {
      question: t("mainFAQ.q2"),
      answer: t("mainFAQ.a2"),
    },
    {
      question: t("mainFAQ.q3"),
      answer: t("mainFAQ.a3"),
    },
    {
      question: t("mainFAQ.q4"),
      answer: t("mainFAQ.a4"),
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section id="faqs" className="max-w-screen-xl mx-auto grid md:grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Left Side - Accordion */}
      <div className="flex flex-col px-6 md:px-14 gap-6">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl p-6 transition-colors duration-300 ${
                isOpen ? "bg-purple-800 text-white" : "bg-purple-50 border border-purple-300 text-black"
              }`}
            >
              <div onClick={() => toggleFAQ(index)} className="flex items-center gap-4 cursor-pointer">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold transition-all duration-300 ${
                    isOpen ? "bg-white text-black border border-white" : "bg-black text-white"
                  }`}
                >
                  {isOpen ? "−" : "+"}
                </div>
                <h3 className="font-semibold text-lg">{faq.question}</h3>
              </div>
              <div className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-[200px] mt-4" : "max-h-0"}`}>
                <p className="text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Side - Text + Image */}
      <div className="px-6 md:px-14">
        <p className="text-purple-800 text-lg font-bold tracking-widest uppercase mb-3">
          {t("mainFAQ.subtitle")}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-5">
          {t("mainFAQ.title")}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          {t("mainFAQ.description")}
        </p>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* List */}
          <ul className="space-y-3 text-l font-semibold text-black md:w-1/2">
            <li className="flex items-start gap-2">
              <span className="text-purple-800">✔</span> {t("mainFAQ.point1")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-800">✔</span> {t("mainFAQ.point2")}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-800">✔</span> {t("mainFAQ.point3")}
            </li>
          </ul>

          {/* Image */}
          <div className="rounded-full overflow-hidden w-full h-1/2 md:w-1/2 max-w-md">
            <Image src="/images/FAQYarn.jpg" alt="FAQ Section" className="w-full h-1/2 object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainFAQ;
