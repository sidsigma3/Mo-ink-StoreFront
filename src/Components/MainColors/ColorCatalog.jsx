import React from "react";
import { Image } from 'react-bootstrap';


const colorData = [
    { name: "BLEACH WHITE", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/BLEACH%20WHITE.png?updatedAt=1745923388867" },
    { name: "OFF WHITE", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/OFF%20WHITE.png?updatedAt=1745923408844" },
    { name: "RASUN KORA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/RASUN%20KORA.png?updatedAt=1745923416999" },
    { name: "MUGA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/MUGA.png?updatedAt=1745923407815" },
    { name: "SHEED NO-35", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/SHEED%20NO-35.png?updatedAt=1745923420392" },
    { name: "SHEED NO-22", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/SHEED%20NO-22.png?updatedAt=1745923420097" },
    { name: "BUP", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/BUP.png?updatedAt=1745923389025" },
    { name: "AIU", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/AIU.png?updatedAt=1745923389011" },
    { name: "ROSAGULLA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/ROSAGULLA.png?updatedAt=1745923418003" },
    { name: "STILL GREY", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/STILL%20GREY.png?updatedAt=1745923427805" },
    { name: "LIGHT PINK", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/LIGHT%20PINK.png?updatedAt=1745923400421" },
    { name: "DEEP PINK", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/DEEP%20PINK.png?updatedAt=1745923389248" },
    { name: "RANI", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/RANI.png?updatedAt=1745923412844" },
    { name: "BASANTI", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/BASANTI.png?updatedAt=1745923388903" },
    { name: "GOYEL", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/GOYEL.png?updatedAt=1745923398833" },
    { name: "ORANGE", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/ORANGE.png?updatedAt=1745923408609" },
    { name: "RED", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/RED.png?updatedAt=1745923416185" },
    { name: "MAROON", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/MAROON.png?updatedAt=1745923400512" },
    { name: "MADAVI", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/MADHAVI.png?updatedAt=1745923400757" },
    { name: "PADAMO GOLAP", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/PADAMO%20GOLAP.png?updatedAt=1745923409773" },
    { name: "TOMATO", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/TOMATO.png?updatedAt=1745923427947" },
    { name: "ASHMANI", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/ASHMANI.png?updatedAt=1745923389094" },
    { name: "FARAZA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/FARAZA.png?updatedAt=1745923389179" },
    { name: "TUTEA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/TUTEA.png?updatedAt=1745923428583" },
    { name: "SEA GREEN", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/SEA%20GREEN.png?updatedAt=1745923419918" },
    { name: "KACHI KALAPATA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/KACHI%20KALAPATA.png?updatedAt=1745923399868" },
    { name: "KARCHERCARI", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/KARCHERCARI.png?updatedAt=1745923400099" },
    { name: "JAL PAI", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/JAL%20PAI.png?updatedAt=1745923399449" },
    { name: "PAKKA NABU", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/PAKKA%20NABU.png?updatedAt=1745923409439" },
    { name: "MOTER SUTEE", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/MOTER%20SUTEE.png?updatedAt=1745923403807" },
    { name: "SHARSHEE FULL", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/SHARSHEE%20FULL.png?updatedAt=1745923419983" },
    { name: "MASTER", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/MASTER.png?updatedAt=1745923405203" },
    { name: "ROYAL BLUE", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/ROYAL%20BLUE.png?updatedAt=1745923419608" },
    { name: "PACHA PATA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/PACHA%20PATA.png?updatedAt=1745923410073" },
    { name: "MAGENTA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/MAGENTA.png?updatedAt=1745923400753" },
    { name: "PEYAZI", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/PEYAZI.png?updatedAt=1745923411210" },
    { name: "PANA FULL", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/PANA%20FULL.png?updatedAt=1745923410518" },
    { name: "PESTA", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/PESTA.png?updatedAt=1745923410356" },
    { name: "RUST", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/RUST.png?updatedAt=1745923419533" },
    { name: "SHEED NO-290", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/SHEED%20NO-290.png?updatedAt=1745923419999" },
    { name: "KRISHNO NIL", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/KRISHNO%20NIL.png?updatedAt=1745923400940" },
    { name: "RAJA GREEN", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/RAJA%20GREEN.png?updatedAt=1745923411266" },
    { name: "TIYA GREEN", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/TIYA%20GREEN.png?updatedAt=1745923428622" },
    { name: "BOTTLE GREEN", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/BOTTLE%20GREEN.png?updatedAt=1745923389382" },
    { name: "SHEED NO-543", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/SHEED%20NO-543.png?updatedAt=1745923422991" },
    { name: "BLACK", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/BLACK.png?updatedAt=1745923389252" },
    { name: "GHEE", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/GHEE.png?updatedAt=1745923398605" },
    { name: "CHANDAN", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/CHANDAN.png?updatedAt=1745923389379" },
    { name: "SHYAMOCY", image: "https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Color%20Palette_MoINK/SHYAMOCY.png?updatedAt=1745923424821" }
  

];


  const generateRandomPrice = () => {
    return `₹${Math.floor(Math.random() * (689 - 350 + 1)) + 350} per kg`;
  };
  
  const products = colorData.map(item => ({
    name: item.name,
    image: item.image,
    price: generateRandomPrice(),
  }));

const ColorCatalog = () => {
  return (
    <section className="min-h-screen">
      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-purple-800 text-lg uppercase tracking-widest font-bold mb-2">
          The Color Library
        </p>
        <h2 className="text-3xl md:text-5xl font-bold mb-3">
        A World of {' '}
          <span className="bg-gradient-to-r from-purple-700 via-pink-600 to-yellow-500 text-transparent bg-clip-text">
           Color Without Limits
          </span>
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          From bold to subtle, we offer colors that inspire, blend, and stand out.
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-10 relative z-10">
  {products.map((item, index) => (
    <div
      key={index}
      className="flex flex-col items-center p-4 rounded-2xl border border-gray-100 shadow-lg bg-white"
    >
      <div className="w-full h-full rounded-md overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          width={400}
          height={240}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <h3 className="text-sm md:text-lg font-semibold text-gray-900 mt-4 w-full text-center">
      {item.name}
      </h3>
      <div className="flex flex-col items-center justify-center w-full mt-2">
      <span className="text-sm text-gray-500">{item.price}</span>
     <span className="text-sm font-medium rounded-full bg-[#FFEE9A] text-purple-800 mt-3 px-3 py-1">
    Cone/Hank
  </span>
</div>

    </div>
  ))}
</div>

    </section>
  );
};

export default ColorCatalog;
