import { useEffect } from "react";
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader'
import Navbar from '../../Components/Navbar/Navbar'
import HeroSection from '../../Components/HeroSection/HeroSection'
import Cta from '../../Components/CTA/Cta'
import Footer from '../../Components/Footer/Footer'
import Inqueries from '../../Components/Inqueries/Inqueries'
import BottomNav from '../../Components/BottomNav/BottomNav'
import { useTranslation } from "react-i18next"


const ContactPage = () => {
    const { t } = useTranslation();
    
    const breadcrumbs = [
      { label: t("breadcrumb.home"), link: "/home" },
      { label: t("breadcrumb.contactus"), link: "/contact" },
    ];


      useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div>
        <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader></NavbarHeader></div>
        <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar></Navbar></div>

        <div className='px-6 md:px-14 py-3 mt-0 md:mt-10'>  <HeroSection productName={t("contactus")} breadcrumbs={breadcrumbs} /></div>


        <div className='px-6 md:px-14 py-3 mt-10'>
            <Inqueries show={false}></Inqueries>
        </div>

        <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
        <BottomNav></BottomNav>
    </div>
  )
}

export default ContactPage