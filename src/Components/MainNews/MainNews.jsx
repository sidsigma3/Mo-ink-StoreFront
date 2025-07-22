import React from 'react';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MainNews = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section
      id="news"
      className="bg-[#FFFBED] py-28 bg-cover bg-center relative"
      style={{
        backgroundImage: `url('/images/Rectangle 3462389 (1).png')`,
      }}
    >
      <div className="container mx-auto lg:max-w-screen-xl px-8 md:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="w-full flex justify-center">
            <div className="max-w-auto w-full">
              <Image
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Screenshot%202025-06-14%20115658.png?updatedAt=1749882502369"
                alt="News"
                width={600}
                height={800}
                className="w-full h-auto object-contain rounded-3xl border-4 border-[#ffe382]"
              />
            </div>
          </div>

          {/* Right - Text */}
          <div>
            <p className="text-purple-800 text-lg font-bold tracking-widest uppercase mb-3">
              {t('mainNews.subtitle')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
              {t('mainNews.title')}
            </h2>
            <p className="mb-8">{t('mainNews.description')}</p>

            <ul className="text-left text-gray-700 text-base space-y-4 max-w-2xl mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-purple-800 text-xl">✔</span>
                <span>
                  <strong>{t('mainNews.points.trends.title')}:</strong>{' '}
                  {t('mainNews.points.trends.text')}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-800 text-xl">✔</span>
                <span>
                  <strong>{t('mainNews.points.launches.title')}:</strong>{' '}
                  {t('mainNews.points.launches.text')}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-800 text-xl">✔</span>
                <span>
                  <strong>{t('mainNews.points.success.title')}:</strong>{' '}
                  {t('mainNews.points.success.text')}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-800 text-xl">✔</span>
                <span>
                  <strong>{t('mainNews.points.tips.title')}:</strong>{' '}
                  {t('mainNews.points.tips.text')}
                </span>
              </li>
            </ul>

            <button
              className="bg-purple-800 text-[#FFEE9A] font-medium mt-10 py-3 px-12 rounded-full border hover:bg-purple-400 transition-all"
              onClick={() => navigate('/news')}
            >
              {t('mainNews.button')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainNews;
