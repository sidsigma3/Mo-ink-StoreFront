import { useEffect } from "react";
import TopNavigation from '../../Components/TopNavigation/TopNavigation';
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader';
import Navbar from '../../Components/Navbar/Navbar';
import Cta from '../../Components/CTA/Cta';
import Footer from '../../Components/Footer/Footer';
import HeroSection from '../../Components/HeroSection/HeroSection';
import BottomNav from '../../Components/BottomNav/BottomNav';
import { MdOutlineShield } from "react-icons/md";
import { useTranslation } from "react-i18next";

const ReturnPolicy = () => {
  const { t } = useTranslation();
  
  const breadcrumbs = [
    { label: t("returnPolicy.breadcrumb.home"), link: "/home" },
    { label: t("returnPolicy.breadcrumb.returnPolicy"), link: "/returnpolicy" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'><NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'><Navbar /></div>

      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
        <HeroSection productName={t("returnPolicy.heroTitle")} breadcrumbs={breadcrumbs} />
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white border-2 border-zinc-100 rounded-5 p-6 sm:p-6 md:p-8 lg:p-10 xl:p-10">
          {/* Hero Section */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-neutral-100 p-4 rounded-full">
              <MdOutlineShield size={45} color='#6B21A8'/>
            </div>
          </div>

          {/* Introduction */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("returnPolicy.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("returnPolicy.introduction")}
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("returnPolicy.section1.title")}
              </h3>
              <p className="text-gray-600">
                {t("returnPolicy.section1.content")}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("returnPolicy.section2.title")}
              </h3>
              <div className="space-y-4">
                <p className="text-gray-600">
                  {t("returnPolicy.section2.content")}
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>{t("returnPolicy.section2.point1")}</li>
                  <li>{t("returnPolicy.section2.point2")}</li>
                  <li>{t("returnPolicy.section2.point3")}</li>
                  <li>{t("returnPolicy.section2.point4")}</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("returnPolicy.section3.title")}
              </h3>
              <p className="text-gray-600">
                {t("returnPolicy.section3.content")}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("returnPolicy.section4.title")}
              </h3>
              <p className="text-gray-600">
                {t("returnPolicy.section4.content")}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>{t("returnPolicy.section4.point1")}</li>
                <li>{t("returnPolicy.section4.point2")}</li>
                <li>{t("returnPolicy.section4.point3")}</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("returnPolicy.section5.title")}
              </h3>
              <p className="text-gray-600">
                {t("returnPolicy.section5.content")}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("returnPolicy.section6.title")}
              </h3>
              <p className="text-gray-600">
                {t("returnPolicy.section6.content")}
              </p>
              <div className="mt-4">
                <a href="mailto:support@inkndyes.com" className="text-blue-600 hover:text-blue-700 font-medium">
                  {t("returnPolicy.section6.email")}
                </a>
              </div>
            </section>
          </div>

          {/* Last Updated */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              {t("returnPolicy.lastUpdated")}
            </p>
          </div>
        </div>
      </main>
      
      <div className='px-6 md:px-14 py-3 mt-10'><Cta /></div>
      <div className='px-6 md:px-14 py-3'><Footer /></div>
      <BottomNav />
    </div>
  );
}

export default ReturnPolicy;