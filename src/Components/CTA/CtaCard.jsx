import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { FaArrowRightLong } from "react-icons/fa6";
import { FcCheckmark } from "react-icons/fc";

const CtaCard = () => {
  const { t } = useTranslation();
  const navigate=useNavigate();

  return (

    <div className='md:grid md:grid-cols-3 gap-4 lg:w-full md:w-[78rem] sm:w-full flex-column flex '>

    <div className='p-4 lg:w-full bg-green-100 rounded-lg position-relative h-[300px] md:h-full'>
      <h4 className='font-semibold text-xl md:text-2xl'>{t("cta.card1.title")}</h4>
      <ul className='mt-3'>
          <li className='d-flex gap-2 font-medium text-lg'><span><FcCheckmark  size={20}/></span>{t("cta.card1.point1")}</li>
          <li className='d-flex gap-2 font-medium text-lg'><span><FcCheckmark  size={20}/></span>{t("cta.card1.point2")}</li>
          <li className='d-flex gap-2 font-medium text-lg'><span><FcCheckmark  size={20}/></span>{t("cta.card1.point3")}</li>
          <li className='d-flex gap-2 font-medium text-lg'><span><FcCheckmark  size={20}/></span>{t("cta.card1.point4")}</li>
          <li className='d-flex gap-2 font-medium text-lg'><span><FcCheckmark  size={20}/></span>{t("cta.card1.point5")}</li>
          <li className='d-flex gap-2 font-medium text-lg'><span><FcCheckmark  size={20}/></span>{t("cta.card1.point6")}</li>
      </ul>
      <img src='/images/cta-wool-2.png' className='position-absolute w-1/3' style={{bottom:0 , right:0}}></img>

    </div>


    <div className='bg-purple-100 position-relative p-4 rounded-2 lg:w-full  h-[300px] md:h-full' >
        <h4 className='font-semibold text-xl md:text-2xl'>{t("cta.card2.title")}</h4>

        <button className='font-medium d-flex align-items-center gap-2 position-absolute bottom-0 mb-5' onClick={() => navigate("/KnowMore")}>{t("cta.learnMore")} <span><FaArrowRightLong /></span></button>

        <img src='/images/cta-wool.png' className='position-absolute w-1/3' style={{bottom:0 , right:0}}></img>


    </div>


    <div className='bg-yellow-50 position-relative p-4 rounded-2 lg:w-full  h-[300px] md:h-full' >
      <h4 className='font-semibold text-xl md:text-2xl'>{t("cta.card3.title")}</h4>

      <button className='font-medium d-flex align-items-center gap-2 position-absolute bottom-0 mb-5' onClick={() => navigate("/KnowMore")}>{t("cta.learnMore")} <span><FaArrowRightLong /></span></button>

      <img src='/images/cta-wool-2.png' className='position-absolute w-1/3' style={{bottom:0 , right:0}}></img>

    </div>

    </div>
  )
}

export default CtaCard