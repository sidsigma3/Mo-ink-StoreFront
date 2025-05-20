import React from 'react';
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

const Blog3 = () => {

  const breadcrumbs = [
    { label: "Home", link: "/home" },
    { label: "Blogs", link: "/Blogs" },
    { label: "The Art of Dyeing", link: "/Blog3" },
  ];

  return (
    <div>
      <div className='px-6 md:px-14 py-1 md:py-3'><NavbarHeader /></div>
      <div className='px-6 md:px-14 py-3 hidden md:block'><Navbar /></div>

      <div className='px-6 md:px-14 py-3 mt-0 md:mt-10 md:text-md'>
        <HeroSection productName={'The Art of Dyeing'} breadcrumbs={breadcrumbs} />
      </div>

      <main className="max-w-7xl mx-auto py-12">
        <div className="bg-white rounded-5 p-6 md:p-10">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              The Art of Dyeing: How Color Brings Yarn to Life
            </h1>

            <div className="mb-12">
              <img
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/WhatsApp%20Image%202025-05-01%20at%205.15.48%20PM.jpeg?updatedAt=1746100087071"
                alt="Colored Yarn Dyeing"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Color isn't just added—it’s curated. At Ink n Dyes the yarn dyeing process is an artful fusion of chemical mastery and creative vision. With over 1,000 vibrant yarn colors, we empower textile designers and manufacturers to bring imagination to life—one strand at a time.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">Choosing the Right Dye for Every Fiber</h2>
              <p className="text-gray-600 mb-6">
                Our dyeing experts use specialized dye types tailored to each fiber:
              </p>
              <ul className="list-disc list-inside space-y-4 text-gray-600 mb-8">
                <li>Reactive dyes for cotton</li>
                <li>Acid dyes for silk and nylon</li>
                <li>Disperse dyes for polyester</li>
              </ul>
              <p className="text-gray-600 mb-6">
                This ensures optimal penetration, long-lasting colorfastness, and consistent results across batches.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">Laboratory Precision Meets Bulk Dyeing</h2>
              <p className="text-gray-600 mb-6">
                Every shade starts in our dye lab, where expert technicians develop exact formulas to match your custom requirements. Once perfected, the recipe is scaled to production levels using jet dyeing machines and high-efficiency dye baths, ensuring uniformity and reducing waste.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">Eco-Conscious Coloration</h2>
              <p className="text-gray-600 mb-6">
                We're committed to sustainable yarn dyeing. Our facility follows stringent water treatment protocols, and we use low-impact dyes to reduce environmental stress. By optimizing temperatures and cycle times, we minimize resource use without compromising color brilliance.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">Use Cases: From Fashion to Furnishing</h2>
              <p className="text-gray-600 mb-6">
                Our colored yarns are used across:
              </p>
              <ul className="list-disc list-inside space-y-4 text-gray-600 mb-8">
                <li>Fashion garments and ethnic wear</li>
                <li>Upholstery and home textiles</li>
                <li>Embroidery threads</li>
                <li>Customized branding and merchandise</li>
              </ul>
              <p className="text-gray-600 mb-6">
                Whether you need a Pantone match or a completely new palette, our team delivers with speed and accuracy.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-6">Bringing Yarn to Life</h2>
              <p className="text-gray-600 mb-6">
                Color adds emotion, identity, and market appeal. At Ink n Dyes, our yarn isn't just dyed—it’s designed to inspire. Trust our expertise to bring your fabrics the vivid touch they deserve.
              </p>

              <p className="text-gray-600 font-semibold mt-8">
                Vibrant. Reliable. Environmentally Responsible.
              </p>
              <p className="text-gray-600 mt-4">
                Join the color revolution in textiles—discover how our dyeing process transforms raw threads into brilliant, ready-to-weave stories.
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

export default Blog3;
