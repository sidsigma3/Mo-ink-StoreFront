import React, { useState } from 'react';
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


const Blog4 = () => {
  const breadcrumbs = [
    { label: "Home", link: "/home" },
    { label: "Blogs", link: "/Blogs" },
    { label: "Cone vs. Hank", link: "/Blog4" },
  ];

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'> <NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'> <Navbar /></div>

      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
        <HeroSection productName={'The Journey of Yarn:'} breadcrumbs={breadcrumbs} />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12">
  <div className="bg-white rounded-5 p-6 md:p-10">
    <div className="mb-8">
      <h1 className="text-xl md:text-2xl font-semibold  text-gray-900 mb-6">
        Cone vs. Hank: Choosing the Right Yarn Format for Your Weaving Needs
      </h1>

      <div className="mb-12">
        <img
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/WhatsApp%20Image%202025-05-01%20at%205.15.45%20PM.jpeg?updatedAt=1746100149336"
                alt="Yarn Cone vs Hank"
          className="w-full h-[500px] object-cover rounded-2xl"
        />
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Not all yarn formats are created equal. The choice between a yarn cone and a hank may seem minor, but it can greatly impact your production efficiency, dyeing precision, and weaving style.
        </p>

        <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">What is a Yarn Cone?</h2>
        <p className="text-gray-600 mb-6">
          A yarn cone is a tightly wound spool designed for high-speed machines and continuous weaving. It provides consistent tension, which is ideal for:
        </p>
        <ul className="list-disc list-inside space-y-4 text-gray-600 mb-8">
          <li>Industrial weaving machines</li>
          <li>High-volume fabric production</li>
          <li>Automated knitting and stitching lines</li>
        </ul>
        <p className="text-gray-600 mb-6">
          Cones are efficient, tangle-free, and reduce downtime in large-scale manufacturing setups.
        </p>

        <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">What is a Yarn Hank?</h2>
        <p className="text-gray-600 mb-6">
          A yarn hank is a loosely coiled bundle that is more flexible and ideal for manual use. Hanks are perfect for:
        </p>
        <ul className="list-disc list-inside space-y-4 text-gray-600 mb-8">
          <li>Hand dyeing processes</li>
          <li>Artisanal weaving</li>
          <li>Small-batch custom production</li>
        </ul>
        <p className="text-gray-600 mb-6">
          They offer easier handling for specialty applications, and they allow dyes to penetrate more evenly in small batches.
        </p>

        <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">Cone vs. Hank: Which One Should You Choose?</h2>
        <p className="text-gray-600 mb-4">
          <strong>Choose cones if:</strong>
        </p>
        <ul className="list-disc list-inside space-y-4 text-gray-600 mb-6">
          <li>You're working with industrial looms</li>
          <li>You need large quantities with minimal breaks</li>
          <li>You prioritize speed and efficiency</li>
        </ul>

        <p className="text-gray-600 mb-4">
          <strong>Choose hanks if:</strong>
        </p>
        <ul className="list-disc list-inside space-y-4 text-gray-600 mb-8">
          <li>You’re experimenting with colors</li>
          <li>You run a boutique or artisanal workshop</li>
          <li>You prefer flexibility and traditional dyeing</li>
        </ul>

        <h2 className="text-xl md:text-2xl  font-semibold text-gray-900 mt-12 mb-6">Why It Matters for Weavers and Manufacturers</h2>
        <p className="text-gray-600 mb-6">
          The correct yarn format directly influences dye uptake, weaving flow, and fabric quality. At Ink n Dyes, we offer both formats so you can choose what best suits your business model—whether you're mass-producing fabrics or crafting exclusive textiles.
        </p>

        <p className="text-xl font-medium text-gray-800 mt-10">
          Efficiency or artistry? Choose the yarn form that supports your process best.
        </p>
        <p className="text-gray-600 mt-4">
          With Ink n Dyes, you get flexibility, quality, and consistency—no matter your scale.
        </p>
      </div>
    </div>
  </div>
</main>

<div className=''>
         <h3 className='text-2xl text-center md:text-left md:2xl font-medium py-4'>Recent Articles</h3>

        <div className="flex justify-center px-3">
          <div className="max-w-8xl w-full overflow-x-auto scrollbar-hide">
            <ul className="flex space-x-4 sflex lg:justify-center overflow-x-auto pb-4">
              <li className="snap-start shrink-0 w-80">
                <BlogBox1 />
              </li>
              <li className="snap-start shrink-0 w-80">
                <BlogBox2 />
              </li>
            
              <li className="snap-start shrink-0 w-80">
                <BlogBox3 />
              </li>
              <li className="snap-start shrink-0 w-80">
                <BlogBox4 />
              </li>
              
              </ul>
          </div>
        </div>

    </div>
    

      <div className='px-6 md:px-14 py-3 mt-10'><Cta /></div>
      <div className='px-6 md:px-14 py-3'> <Footer /></div>
      <BottomNav />
    </div>
  );
};

export default Blog4;
