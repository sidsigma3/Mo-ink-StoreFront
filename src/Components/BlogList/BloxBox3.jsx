import React from 'react'
import { useTranslation } from "react-i18next";

const BloxBox3 = () => {
  const { t } = useTranslation();

   function truncateWords(text, wordLimit) {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
}

  return (
    <div>
       <a href="/Blog3" className="block">
        <article className="bg-white border border-grey-100 rounded-2xl overflow-hidden transition-transform transform hover:scale-95">
            <img
                alt={t("blog.blog3.imageAlt")}
                src="https://images.pexels.com/photos/14115141/pexels-photo-14115141.jpeg"
                className="w-full h-32 md:w-full md:h-48 object-cover"
            />

            <div className="p-3">
                <a href="#">
                <h3 className="text-md line-clamp-2 md:text-xl font-semibold text-gray-900">
                  {t("blog.blog3.title")}
                </h3>
                </a>

                <p className="hidden sm:block mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                  {truncateWords(t("blog.blog3.description"), 20)}
                </p>

                <a href="/Blog3" className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-purple-800">
                  {t("blog.readMore")}

                <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                    &rarr;
                </span>
                </a>
            </div>
            </article>
            </a>
    </div>
  )
}

export default BloxBox3