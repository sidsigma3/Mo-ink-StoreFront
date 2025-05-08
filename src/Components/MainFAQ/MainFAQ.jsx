import React ,{ useState } from "react";
import { Image } from 'react-bootstrap';



const MainFAQ = () => {
    const faqs = [
      {
        question: "What types of yarn do you manufacture?",
        answer:
          "We specialize in high-quality cotton, silk, nylon, polyester, and blended yarns etc, available in various counts and specifications to meet industrial and commercial needs.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept bank transfers, corporate checks, and online payments through secure gateways. All orders must be fully or partially paid before production or dispatch.",
      },
      {
        question: "How long does it take to process and deliver an order?",
        answer: "Processing times depend on the order size and customization requirements. Standard bulk orders take 7-14 business days for production, with additional shipping time depending on your location.",
      },
      {
        question: "What is your return policy?",
        answer: "Due to the nature of our business, we do not accept returns once an order has been processed and delivered. However, if you receive a defective or incorrect item, please notify us within 48 hours of delivery for resolution.",
      },
    ];
  
    const [activeIndex, setActiveIndex] = useState(0);
  
    const toggleFAQ = (index) => {
      setActiveIndex(index === activeIndex ? null : index);
    };
  
    return (
        <section id="faqs" className=" max-w-screen-xl mx-auto grid md:grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Accordion */}
          <div className="flex flex-col px-6 md:px-14 gap-6">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl p-6 transition-colors duration-300 ${
                    isOpen ? "bg-purple-800 text-white" : "bg-purple-50 border-1 border-purple-300 text-black"
                  }`}
                >
                  <div
                    onClick={() => toggleFAQ(index)}
                    className="flex items-center gap-4 cursor-pointer"
                  >
                     <div
                className={`w-8 h-8 min-w-8 min-h-8 flex-shrink-0 flex items-center justify-center rounded-full text-lg font-bold transition-all duration-300 ${
                  isOpen
                    ? "bg-white text-black border border-white"
                    : "bg-black text-white"
                }`}
                    >
                      {isOpen ? "−" : "+"}
                    </div>
                    <h3 className="font-semibold text-lg">{faq.question}</h3>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isOpen ? "max-h-[200px] mt-4" : "max-h-0"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
    
          {/* Right Side - Text + Image */}
          <div className="px-6 md:px-14">
            <p className="text-purple-800 text-lg font-bold tracking-widest uppercase  mb-3">
              Frequently Asked Question
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-5">
              Ultimately, quality work is judged by the extent
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
            There are many varieties of yarn available, but most have undergone changes in texture, color, or twist, with added blends or patterns that don’t always reflect traditional spinning techniques.
            </p>
            <div className="flex flex-col md:flex-row gap-6 mb-6">
  {/* List */}
  <ul className="space-y-3 text-l font-semibold justify-center text-black md:w-1/2">
    <li className="flex items-start gap-2">
      <span className="text-purple-800">✔</span> We’re Professional
    </li>
    <li className="flex items-start gap-2">
      <span className="text-purple-800">✔</span> We Use Quality Material
    </li>
    <li className="flex items-start gap-2">
      <span className="text-purple-800">✔</span> 100% Customers Satisfaction
    </li>
  </ul>

  {/* Image */}
  <div className="rounded-full overflow-hidden w-full h-1/2 md:w-1/2 max-w-md">
    <Image
      src="/images/FAQYarn.jpg"
      alt="Wallpaper Installation"
      className="w-full h-1/2 object-cover"
    />
  </div>
</div>

          </div>
        </section>
      );
  };
  
  export default MainFAQ;