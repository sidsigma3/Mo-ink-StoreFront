import React, { useState, useEffect } from 'react';
import TopNavigation from '../../Components/TopNavigation/TopNavigation';
import NavbarHeader from '../../Components/NavbarHeader/NavbarHeader';
import Navbar from '../../Components/Navbar/Navbar';
import Cta from '../../Components/CTA/Cta';
import Footer from '../../Components/Footer/Footer';
import HeroSection from '../../Components/HeroSection/HeroSection';
import BottomNav from '../../Components/BottomNav/BottomNav';
import BlogBox1 from '../../Components/BlogList/BlogBox1';
import BlogBox2 from '../../Components/BlogList/BloxBox2';
import BlogBox3 from '../../Components/BlogList/BloxBox3';
import BlogBox4 from '../../Components/BlogList/BloxBox4';


const Blog2 = () => {
  const breadcrumbs = [
    { label: "Home", link: "/home" },
    { label: "Blogs", link: "/Blogs" },
    { label: "Behind the Thread", link: "/Blog2" },
  ];

      useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'><NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'><Navbar /></div>

      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
        <HeroSection productName={'Behind the Thread:'} breadcrumbs={breadcrumbs} />
      </div>

      <main className="max-w-7xl mx-auto py-12">
        <div className="bg-white rounded-5 p-6 md:p-10">

          <div className="mb-8">
            <h1 className="text-xl font-semibold md:text-2xl text-gray-900 mb-6">
              Behind the Thread: How Quality Yarn is Manufactured from Start to Finish
            </h1>

            <div className="mb-12">
              <img
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/WhatsApp%20Image%202025-05-01%20at%205.15.45%20PM%20(1).jpeg?updatedAt=1746100085378"
                alt="Yarn Production Process"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8 leading-relaxed">
                Yarn isn't just spun—it’s engineered. At Ink n Dyes, we believe in quality from the first strand. Our yarn manufacturing process is a finely tuned combination of craftsmanship and innovation, designed to produce yarns that deliver strength, consistency, and visual perfection.
              </p>

              <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">Step 1: Sourcing Premium Fibers</h2>
              <p className="text-gray-600 mb-6">
                It all starts with selecting the right raw materials. We use high-grade cotton, silk, polyester, and nylon, each fiber selected for its unique strength, softness, and performance. Whether you're looking for breathable yarn for apparel or strong, durable yarn for home textiles, the base matters.
              </p>

              <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">Step 2: Carding and Combing</h2>
              <p className="text-gray-600 mb-6">
                Once fibers are selected, they undergo carding, a process that detangles and aligns the fibers into a soft web. Then comes combing, which removes shorter fibers and ensures smoother, more uniform threads—essential for premium-quality yarns.
              </p>

              <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">Step 3: Precision Spinning</h2>
              <p className="text-gray-600 mb-6">
                The next stage is spinning, where fibers are twisted into threads using advanced spinning machines. The spinning technique and twist level are customized depending on whether the yarn is for fine weaving, knitting, or heavy-duty fabric production.
              </p>

              <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">Step 4: Cones vs. Hanks — Choosing the Right Format</h2>
              <p className="text-gray-600 mb-6">
                Once spun, the yarn is wound into cones or hanks. Cones are perfect for industrial weaving machines, offering high efficiency and tension control. Hanks, on the other hand, are loosely wound—ideal for hand dyeing, custom projects, and artisan weaves.
              </p>

              <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">Step 5: Quality Testing & Control</h2>
              <p className="text-gray-600 mb-6">
                Every batch of yarn goes through rigorous quality checks. We test for:
              </p>
              <ul className="list-disc list-inside space-y-4 text-gray-600 mb-8">
                <li>Tensile strength</li>
                <li>Dye absorption</li>
                <li>Yarn count consistency</li>
                <li>Friction resistance and elongation</li>
              </ul>

              <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">Why It Matters: The Perfect Thread Every Time</h2>
              <p className="text-gray-600 mb-6">
                Our yarn is trusted by textile manufacturers, export houses, and fabric designers across India and abroad. Whether you're crafting high-end sarees, woven home furnishings, or industrial-grade fabric, our process ensures you receive the best quality yarn every single time.
              </p>
            </div>
          </div>
        </div>
      </main>

      <div>
        <h3 className='text-2xl text-center md:text-left md:2xl font-medium py-4'>Recent Articles</h3>
        <div className="flex justify-center px-3">
          <div className="max-w-8xl w-full overflow-x-auto scrollbar-hide">
            <ul className="flex space-x-4 sflex lg:justify-center overflow-x-auto pb-4">
              <li className="snap-start shrink-0 w-80"><BlogBox1 /></li>
              <li className="snap-start shrink-0 w-80"><BlogBox2 /></li>
              <li className="snap-start shrink-0 w-80"><BlogBox3 /></li>
              <li className="snap-start shrink-0 w-80"><BlogBox4 /></li>
            </ul>
          </div>
        </div>
      </div>

      <div className='px-6 md:px-14 py-3 mt-10'><Cta /></div>
      <div className='px-6 md:px-14 py-3'><Footer /></div>
      <BottomNav />
    </div>
  );
};

export default Blog2;
