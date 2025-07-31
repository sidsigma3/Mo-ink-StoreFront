import React from "react";
import { Image } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../Components/LanguageSwitcher/LanguageSwitcher";

const colorData = [
    { key: "color.BLEACH_WHITE", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/BLEACH%20WHITE.png?updatedAt=1745923388867" },
    { key: "color.OFF_WHITE", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/OFF%20WHITE.png?updatedAt=1745923408844" },
    { key: "color.RASUN_KORA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/RASUN%20KORA.png?updatedAt=1745923416999" },
    { key: "color.MUGA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/MUGA.png?updatedAt=1745923407815" },
    { key: "color.SHEED_NO_35", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/SHEED%20NO-35.png?updatedAt=1745923420392" },
    { key: "color.SHEED_NO_22", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/SHEED%20NO-22.png?updatedAt=1745923420097" },
    { key: "color.BUP", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/BUP.png?updatedAt=1745923389025" },
    { key: "color.AIU", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/AIU.png?updatedAt=1745923389011" },
    { key: "color.ROSAGULLA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/ROSAGULLA.png?updatedAt=1745923418003" },
    { key: "color.STILL_GREY", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/STILL%20GREY.png?updatedAt=1745923427805" },
    { key: "color.LIGHT_PINK", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/LIGHT%20PINK.png?updatedAt=1745923400421" },
    { key: "color.DEEP_PINK", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/DEEP%20PINK.png?updatedAt=1745923389248" },
    { key: "color.RANI", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/RANI.png?updatedAt=1745923412844" },
    { key: "color.BASANTI", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/BASANTI.png?updatedAt=1745923388903" },
    { key: "color.GOYEL", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/GOYEL.png?updatedAt=1745923398833" },
    { key: "color.ORANGE", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/ORANGE.png?updatedAt=1745923408609" },
    { key: "color.RED", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/RED.png?updatedAt=1745923416185" },
    { key: "color.MAROON", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/MAROON.png?updatedAt=1745923400512" },
    { key: "color.MADAVI", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/MADHAVI.png?updatedAt=1745923400757" },
    { key: "color.PADAMO_GOLAP", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/PADAMO%20GOLAP.png?updatedAt=1745923409773" },
    { key: "color.TOMATO", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/TOMATO.png?updatedAt=1745923427947" },
    { key: "color.ASHMANI", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/ASHMANI.png?updatedAt=1745923389094" },
    { key: "color.FARAZA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/FARAZA.png?updatedAt=1745923389179" },
    { key: "color.TUTEA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/TUTEA.png?updatedAt=1745923428583" },
    { key: "color.SEA_GREEN", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/SEA%20GREEN.png?updatedAt=1745923419918" },
    { key: "color.KACHI_KALAPATA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/KACHI%20KALAPATA.png?updatedAt=1745923399868" },
    { key: "color.KARCHERCARI", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/KARCHERCARI.png?updatedAt=1745923400099" },
    { key: "color.JAL_PAI", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/JAL%20PAI.png?updatedAt=1745923399449" },
    { key: "color.PAKKA_NABU", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/PAKKA%20NABU.png?updatedAt=1745923409439" },
    { key: "color.MOTER_SUTEE", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/MOTER%20SUTEE.png?updatedAt=1745923403807" },
    { key: "color.SHARSHEE_FULL", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/SHARSHEE%20FULL.png?updatedAt=1745923419983" },
    { key: "color.MASTER", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/MASTER.png?updatedAt=1745923405203" },
    { key: "color.ROYAL_BLUE", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/ROYAL%20BLUE.png?updatedAt=1745923419608" },
    { key: "color.PACHA_PATA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/PACHA%20PATA.png?updatedAt=1745923410073" },
    { key: "color.MAGENTA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/MAGENTA.png?updatedAt=1745923400753" },
    { key: "color.PEYAZI", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/PEYAZI.png?updatedAt=1745923411210" },
    { key: "color.PANA_FULL", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/PANA%20FULL.png?updatedAt=1745923410518" },
    { key: "color.PESTA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/PESTA.png?updatedAt=1745923410356" },
    { key: "color.RUST", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/RUST.png?updatedAt=1745923419533" },
    { key: "color.SHEED_NO_290", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/SHEED%20NO-290.png?updatedAt=1745923419999" },
    { key: "color.KRISHNO_NIL", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/KRISHNO%20NIL.png?updatedAt=1745923400940" },
    { key: "color.RAJA_GREEN", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/RAJA%20GREEN.png?updatedAt=1745923411266" },
    { key: "color.TIYA_GREEN", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/TIYA%20GREEN.png?updatedAt=1745923428622" },
    { key: "color.BOTTLE_GREEN", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/BOTTLE%20GREEN.png?updatedAt=1745923389382" },
    { key: "color.SHEED_NO_543", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/SHEED%20NO-543.png?updatedAt=1745923422991" },
    { key: "color.BLACK", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/BLACK.png?updatedAt=1745923389252" },
    { key: "color.GHEE", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/GHEE.png?updatedAt=1745923398605" },
    { key: "color.CHANDAN", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/CHANDAN.png?updatedAt=1745923389379" },
    { key: "color.SHYAMOCY", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/SHYAMOCY.png?updatedAt=1745923424821" },
];

const generateRandomPrice = () => {
    return `₹${Math.floor(Math.random() * (689 - 350 + 1)) + 350} per kg `;
};

const products = colorData.map(item => ({
    key: item.key,
    image: item.image,
    price: generateRandomPrice(),
}));

const ColorCatalog = () => {
    const { t } = useTranslation();
    return (
        <section className="min-h-screen">
            {/* Heading */}
            <div className="text-center mb-10">
                <p className="text-purple-800 text-lg uppercase tracking-widest font-bold mb-2">
                    {t("colorCatalog.headingTop")}
                </p>
                <h2 className="text-3xl md:text-5xl font-bold mb-3">
                    {t("colorCatalog.headingMain1")} {' '}
                    <span className="bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-500 text-transparent bg-clip-text">
                        {t("colorCatalog.headingMain2")}
                    </span>
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                    {t("colorCatalog.subText")}
                </p>
            </div>

            {/* Product Grid */}
            <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-10 relative z-10">
                {products.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-3 rounded-2xl border border-gray-100 shadow-lg bg-white"
                    >
                        <div className="w-full h-full rounded-md overflow-hidden">
                            <Image
                                src={item.image}
                                alt={t(item.key)}
                                width={400}
                                height={240}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        <h3 className="text-sm md:text-lg font-semibold text-gray-900 mt-4 w-full text-center">
                            {t(item.key)}
                        </h3>
                        <div className="flex flex-col items-center justify-center w-full mt-2">
                            <span className="text-sm text-gray-500">{item.price}</span>
                            <span className="text-sm font-medium rounded-full bg-[#FFEE9A] text-purple-800 mt-3 px-3 py-1">
                                {t("colorCatalog.tag")}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ColorCatalog;