import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import MainHeader from "../../Components/MainHeader/MainHeader";
import MainKMHero from "../../Components/MainKMHero/MainKMHero";
import Cta from "../../Components/CTA/Cta";
import Footer from "../../Components/Footer/Footer";
import { useTranslation } from "react-i18next";
import { FiMail, FiPhone, FiMapPin, FiCheck, FiGlobe, FiAward } from 'react-icons/fi';
import LanguageSwitcher from "../../Components/LanguageSwitcher/LanguageSwitcher";

const MainKnowMore = () => {
    
     useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
    const { t } = useTranslation();


  return (
    <div className=" bg-white text-gray-800">
      <div className='px-6 md:px-14 py-1 md:py-3  bg-[#D2D2CD]'> <MainHeader></MainHeader></div>
        <div className=''> <MainKMHero></MainKMHero> </div>

      {/* 2. Company Overview */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="rounded-3xl lg:w-1/2">
            <video
            autoPlay
            muted
            loop  
            playsInline
            preload="none" 
            poster="" 
            loading="lazy"
            className="rounded-lg  w-full h-auto"
          >
            <source src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/13458442_3840_2160_50fps%20(1).mp4?updatedAt=1749632767404" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">{t("knowmore.whoWeAre")}</h2>
            <p className="text-lg mb-6">
              {t("knowmore.whoWeAreDes")} </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                  <FiCheck className="text-purple-800" />
                </div>
                <p className="text-lg">{t("knowmore.whoWeAreP1")}</p>
              </div>
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                  <FiCheck className="text-purple-800" />
                </div>
                <p className="text-lg">{t("knowmore.whoWeAreP2")}</p>
              </div>
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-full mr-4 mt-1">
                  <FiCheck className="text-purple-800" />
                </div>
                <p className="text-lg">{t("knowmore.whoWeAreP3")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Mission */}
      <section className="py-20 px-6 bg-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">{t("knowmore.misson")}</h2>
          <p className="text-xl max-w-4xl mx-auto mb-12">
            {t("knowmore.missonDes")}</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border-1 border-grey-400">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiGlobe className="text-purple-800 text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{t("knowmore.missonP1")}</h3>
              <p>{t("knowmore.missonPDes1")}</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border-1 border-grey-400">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{t("knowmore.missonP2")}</h3>
              <p>{t("knowmore.missonPDes2")}</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border-1 border-grey-400">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="text-purple-800 text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{t("knowmore.missonP3")}</h3>
              <p>{t("knowmore.missonPDes3")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Problem We Solve */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
          <div className="lg:w-1/2">
            <img 
              src="https://images.pexels.com/photos/2767653/pexels-photo-2767653.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Textile quality control" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800">{t("knowmore.challenge")}</h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mt-3 mb-3">{t("knowmore.challengeHeading")}</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">!</div>
                  <p>{t("knowmore.challenge1")}</p>
                </li>
                <li className="flex items-center">
                  <div className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">!</div>
                  <p>{t("knowmore.challenge2")}</p>
                </li>
                <li className="flex items-center">
                  <div className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">!</div>
                  <p>{t("knowmore.challenge3")}</p>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{t("knowmore.solutionHeading")}</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</div>
                  <p>{t("knowmore.solution1")}</p>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</div>
                  <p>{t("knowmore.solution2")}</p>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">✓</div>
                  <p>{t("knowmore.solution3")}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us? */}
      <section className="py-20 px-6 bg-purple-800 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{t("knowmore.whyChoose")}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white/10 p-6 rounded-xl border-2 border-white backdrop-blur-lg">
              <div className="text-4xl mb-4">🧵</div>
              <h3 className="text-xl font-semibold mb-2">{t("knowmore.superiorRawMaterials")}</h3>
              <p className="text-white/90">{t("knowmore.superiorRawMaterialsDesc")}</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl border-2 border-white backdrop-blur-lg">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold mb-2">{t("knowmore.advancedTechnology")}</h3>
              <p className="text-white/90">{t("knowmore.advancedTechnologyDesc") }</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl border-2 border-white backdrop-blur-lg">
              <div className="text-4xl mb-4">🔎</div>
              <h3 className="text-xl font-semibold mb-2">{t("knowmore.qualityChecks") }</h3>
              <p className="text-white/90">{t("knowmore.qualityChecksDesc")}</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl border-2 border-white backdrop-blur-lg">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-2">{t("knowmore.sustainablePractice")}</h3>
              <p className="text-white/90">{t("knowmore.sustainablePracticeDesc")}</p>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl border-2 border-white backdrop-blur-lg">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">{t("knowmore.nationwideReach")}</h3>
              <p className="text-white/90">{t("knowmore.nationwideReachDesc")}</p>
            </div>
          </div>
        </div>
      </section>



      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* Left */}
          <div className="w-full lg:w-2/5 items-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">{t("knowmore.teamHeading")}<br />{t("knowmore.teamSubheading")}</h2>
            <p className="text-gray-600 text-base">{t("knowmore.teamPara")}</p>
            <button className="mt-4 bg-[#6B21A8] text-white text-md px-6 py-3 rounded-full hover:bg-[#4C1D95] transition-all"
              onClick={() => navigate('/login')}
              >
              {t("knowmore.joinJourney")}
            </button>
          </div>

          {/* Right */}
          <div className="w-full lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Expertise 1 - Active */}
            <div className="p-6 rounded-xl bg-[#6B21A8] text-white shadow-lg transition-all">
              <div className="text-5xl font-bold mb-4 bg-gradient-to-br from-white to-purple-200 text-transparent bg-clip-text">1</div>
              <h3 className="text-2xl font-semibold mb-2">{t("knowmore.expertise1Title")}</h3>
              <p className="text-md leading-relaxed text-white/90">
                {t("knowmore.expertise1Desc")}
              </p>
            </div>

            {/* Expertise 2 */}
            <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition-all">
              <div className="text-5xl font-bold mb-4 bg-gradient-to-br from-[#6B21A8] to-[#A78BFA] text-transparent bg-clip-text opacity-30">2</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{t("knowmore.expertise2Title") }</h3>
              <p className="text-md leading-relaxed text-gray-600">
                {t("knowmore.expertise2Desc")}
              </p>
            </div>

            {/* Expertise 3 */}
            <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition-all">
              <div className="text-5xl font-bold mb-4 bg-gradient-to-br from-[#6B21A8] to-[#A78BFA] text-transparent bg-clip-text opacity-30">3</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{t("knowmore.expertise3Title")}</h3>
              <p className="text-md leading-relaxed text-gray-600">
                {t("knowmore.expertise3Desc")}
              </p>
            </div>

            {/* Expertise 4 */}
            <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition-all">
              <div className="text-5xl font-bold mb-4 bg-gradient-to-br from-[#6B21A8] to-[#A78BFA] text-transparent bg-clip-text opacity-30">4</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{t("knowmore.expertise4Title")}</h3>
              <p className="text-md leading-relaxed text-gray-600">
                {t("knowmore.expertise4Desc")}
              </p>
            </div>
          </div>
        </div>
      </section>


    {/* 7. Key Metrics / Social Proof */}
      <section className="py-6 px-6 bg-amber-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-12 text-center">{t("knowmore.impactHeading")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8  mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-800 mb-2">5K+</div>
                  <div className="text-gray-600">{t("knowmore.impactCustomers")}</div>
                </div>
                <div className="text-center"> 
                  <div className="text-4xl font-bold text-purple-800 mb-2">25+</div>
                  <div className="text-gray-600">{t("knowmore.impactStates")}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-800 mb-2">98%</div>
                  <div className="text-gray-600">{t("knowmore.impactSatisfaction")}</div>
                </div>
              </div>
        </div>
      </section>


      {/* 6. Meet the Founder */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3">
            <img 
              src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Avi_CEO.png?updatedAt=1749872370942" 
              alt="Founder" 
              className="rounded-full w-64 h-64 object-cover mx-auto border-4 border-purple-200 shadow-lg"
            />
          </div>
          <div className="lg:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">{t("knowmore.founderHeading")}</h2>
            <blockquote className="text-xl italic mb-6 text-gray-700">
             {t("knowmore.founderQuote")}
            </blockquote>
            <div>
              <p className="text-lg font-semibold">{t("knowmore.founderName")}</p>
              <p className="text-purple-800">{t("knowmore.founderDesignation")}</p>
            </div>
          </div>
        </div>
      </section>

  

    <div className='px-6 md:px-14 py-3 mt-10'><Cta></Cta></div>
        <div className='px-6 md:px-14 py-3'> <Footer></Footer></div>
        
    </div>
  );
};


export default MainKnowMore

