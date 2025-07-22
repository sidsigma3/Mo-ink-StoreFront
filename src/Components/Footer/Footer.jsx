import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {

  const navigate=useNavigate();
  return (
   <footer className="bg-white">
  {/* Mobile Footer */}
  <div className="lg:hidden">
    <div className="mx-auto space-y-8 py-8 px-6">
      <div className="text-center">
        <div className="text-teal-600 flex justify-center">
          <a href="/home">
            <img src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/image%202.png?updatedAt=1746846159615" width="80" height="80" alt="Ink n Dyes Logo" />
          </a>
        </div>

        <p className="mt-4 text-gray-500">
          Spinning Quality, Weaving Trust – Delivering Premium Yarns for a Sustainable Future.
        </p>

      <ul className="mt-8 flex gap-6 justify-center md:justify-start">
          <li>
            <a 
              href="https://www.facebook.com/yourpage" 
              onClick={(e) => {
                e.preventDefault();
                window.open('https://www.facebook.com/yourpage', '_blank');
              }}
              rel="noreferrer" 
              className="text-gray-700 transition hover:opacity-75"
            >
              <span className="sr-only">Facebook</span>
              <FaFacebook className="size-6" />
            </a>
          </li>

          <li>
            <a 
              href="https://www.instagram.com/yourpage" 
              onClick={(e) => {
                e.preventDefault();
                window.open('https://www.instagram.com/yourpage', '_blank');
              }}
              rel="noreferrer" 
              className="text-gray-700 transition hover:opacity-75"
            >
              <span className="sr-only">Instagram</span>
              <FaInstagram className="size-6" />
            </a>
          </li>

          <li>
            <a 
              href="https://twitter.com/yourpage" 
              onClick={(e) => {
                e.preventDefault();
                window.open('https://twitter.com/yourpage', '_blank');
              }}
              rel="noreferrer" 
              className="text-gray-700 transition hover:opacity-75"
            >
              <span className="sr-only">Twitter</span>
              <FaTwitter className="size-6" />
            </a>
          </li>

          <li>
            <a 
              href="https://www.linkedin.com/company/inkndyes/?originalSubdomain=in" 
              onClick={(e) => {
                e.preventDefault();
                window.open('https://www.linkedin.com/company/inkndyes/?originalSubdomain=in', '_blank');
              }}
              rel="noreferrer" 
              className="text-gray-700 transition hover:opacity-75"
            >
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin className="size-6" />
            </a>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-8 text-center">
        <div>
          <p className="text-lg font-semibold">Helpful Links</p>
          <ul className="mt-6 space-y-4">
            <li><a href="#" className="text-gray-700 transition hover:opacity-75" onClick={() => navigate("/contact")}>Contact</a></li>
            <li><a href="#" className="text-gray-700 transition hover:opacity-75" onClick={() => navigate("/FAQs")}>FAQs</a></li>
            <li><a href="#" className="text-gray-700 transition hover:opacity-75" onClick={() => navigate("/termsofuse")}>Terms of Use</a></li>
          </ul>
        </div>

        <div>
          <p className="text-lg font-semibold">Policy</p>
          <ul className="mt-6 space-y-4">
            <li><a href="#" className="text-gray-700 transition hover:opacity-75" onClick={() => navigate("/returnPolicy")}>Return Policy</a></li>
            <li><a href="#" className="text-gray-700 transition hover:opacity-75" onClick={() => navigate("/refundPolicy")}>Refund Policy</a></li>
            <li><a href="#" className="text-gray-700 transition hover:opacity-75" onClick={() => navigate("/shippingPolicy")}>Shipping Policy</a></li>
            <li><a href="#" className="text-gray-700 transition hover:opacity-75" onClick={() => navigate("/privacyPolicy")}>Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Download Our App</h3>
        <p className="text-md text-gray-600 mb-6">Get our app for the best shopping experience</p>
        <div className="flex justify-center space-x-4">
          <img src="/images/playstore.png" alt="Google Play" className="h-12"/>
          <img src="/images/appstore.png" alt="App Store" className="h-12"/>
        </div>
      </div>

     <div className="text-center">
        <h3 className="text-lg font-semibold mb-6">We Assure With</h3>
        <div className="flex flex-col items-center space-y-8">

          <div className="flex flex-col items-center">
            <img src="/images/original-icon.png" alt="100% Original" className="h-12 w-12 mb-2" />
            <div className="text-center">
              <h4 className="text-md font-semibold">100% Original</h4>
              <p className="text-md text-gray-600 mt-1">Guarantee for all products</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img src="/images/return-icon.png" alt="3-Day Return" className="h-12 w-12 mb-2" />
            <div className="text-center">
              <h4 className="text-md font-semibold">3-Day Return</h4>
              <p className="text-md text-gray-600 mt-1">Hassle-Free Returns process</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img src="/images/secure-icon.png" alt="Secure Payments" className="h-12 w-12 mb-2" />
            <div className="text-center">
              <h4 className="text-md font-semibold">Secure Payments</h4>
              <p className="text-md text-gray-600 mt-1">Trusted payment gateways</p>
            </div>
          </div>
        </div>
      </div>

       <div>
      <div className="text-center mt-8">
        <p className="text-lg text-gray-700">
          Made with ❤️ in India 
          {/* by <a href="https://www.aivorntech.com" target="_blank" rel="noopener noreferrer" className="text-black hover:underline font-semibold">Aivorn Tech</a> */}
        </p>
        <p className="text-sm text-gray-500 mt-1 mb-2">
          &copy; 2025. Ink n Dyes. All rights reserved.
        </p>
      </div>
      <div className="flex justify-center items-center gap-2 mt-4 mb-5">
            <img src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Visa.png?updatedAt=1751275517161" alt="VISA" className="h-8" />
            <img src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Amex.png?updatedAt=1751275517116" alt="AMEX" className="h-8" />
            <img src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Mastercard.png?updatedAt=1751275517304" alt="Mastercard" className="h-8" />
            <img src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Group%2064.png?updatedAt=1751275538588" alt="UPI" className="h-8" />
            <img src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/GooglePay.png?updatedAt=1751275517303" alt="GPay" className="h-8" />
            <img src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/ApplePay.png?updatedAt=1751275517145" alt="Apple Pay" className="h-8" />
          </div>
        </div>
    </div>
  </div>

  {/* Desktop Footer */}
  <div className="hidden lg:block">
    <div className="mx-auto space-y-8 py-8 sm:px-6 lg:space-y-16 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 col-span-1">
        <div className="">
          <div className="text-teal-600 flex justify-center md:block">
            <a href="/home">
              <img src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/image%202.png?updatedAt=1746846159615" width="80" height="80" alt="Ink n Dyes Logo" />
            </a>
          </div>

          <p className="mt-4 sm:text-center md:text-left text-gray-500">
            Spinning Quality, Weaving Trust – Delivering Premium Yarns for a Sustainable Future.
          </p>

          <ul className="mt-8 flex gap-6 justify-center md:justify-start">
             <li>
            <a 
              href="https://www.facebook.com/yourpage" 
              onClick={(e) => {
                e.preventDefault();
                window.open('https://www.facebook.com/yourpage', '_blank');
              }}
              rel="noreferrer" 
              className="text-gray-700 transition hover:opacity-75"
            >
              <span className="sr-only">Facebook</span>
              <FaFacebook className="size-6" />
            </a>
          </li>

          <li>
            <a 
              href="https://www.instagram.com/yourpage" 
              onClick={(e) => {
                e.preventDefault();
                window.open('https://www.instagram.com/yourpage', '_blank');
              }}
              rel="noreferrer" 
              className="text-gray-700 transition hover:opacity-75"
            >
              <span className="sr-only">Instagram</span>
              <FaInstagram className="size-6" />
            </a>
          </li>

          <li>
            <a 
              href="https://twitter.com/yourpage" 
              onClick={(e) => {
                e.preventDefault();
                window.open('https://twitter.com/yourpage', '_blank');
              }}
              rel="noreferrer" 
              className="text-gray-700 transition hover:opacity-75"
            >
              <span className="sr-only">Twitter</span>
              <FaTwitter className="size-6" />
            </a>
          </li>

          <li>
            <a 
              href="https://www.linkedin.com/company/inkndyes/?originalSubdomain=in" 
              onClick={(e) => {
                e.preventDefault();
                window.open('https://www.linkedin.com/company/inkndyes/?originalSubdomain=in', '_blank');
              }}
              rel="noreferrer" 
              className="text-gray-700 transition hover:opacity-75"
            >
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin className="size-6" />
            </a>
          </li>
          </ul>
        </div>

        <div className="pl-4 grid gap-50 lg:grid-cols-2 grid-cols-2">
          {/* Helpful Links Section (original) */}
          <div>
            <p className="text-lg font-semibold">Helpful Links</p>
            <ul className="mt-6 mb-6 space-y-4 ">
            <li><a href="#" className="text-gray-700 transition hover:opacity-75" onClick={() => navigate("/contact")}>Contact</a></li>
            <li><a href="#" className="text-gray-700 transition hover:opacity-75" onClick={() => navigate("/FAQs")}>FAQs</a></li>
            <li><a href="#" className="text-gray-700 transition hover:opacity-75" onClick={() => navigate("/termsofuse")}>Terms of Use</a></li>
          </ul>
          </div>

          <div>
            <p className="text-lg font-semibold">Policy</p>
            <ul className="mt-6 space-y-4 ">
            <li><a href="#" className="text-gray-700 transition hover:opacity-75" onClick={() => navigate("/returnPolicy")}>Return Policy</a></li>
            <li><a href="#" className="text-gray-700 transition hover:opacity-75" onClick={() => navigate("/refundPolicy")}>Refund Policy</a></li>
            <li><a href="#" className="text-gray-700 transition hover:opacity-75" onClick={() => navigate("/shippingPolicy")}>Shipping Policy</a></li>
            <li><a href="#" className="text-gray-700 transition hover:opacity-75" onClick={() => navigate("/privacyPolicy")}>Privacy Policy</a></li>
              {/* Other policies... */}
            </ul>
          </div>
        </div>

        <div className='justify-center items-center'>
          <h3 className="text-lg text-center font-semibold mb-4">Download Our App</h3>
          <p className="text-md text-center text-gray-600 mb-6">Get our app for the best shopping experience</p>
          <div className="flex justify-center space-x-4">
            <img src="/images/playstore.png" alt="Google Play" className="h-12"/>
            <img src="/images/appstore.png" alt="App Store" className="h-12"/>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">We Assure With</h3>
          <div className="flex items-center mb-3">
            <img src="/images/original-icon.png" alt="100% Original" className="h-8 w-8" />
            <div className="ms-2">
              <h4 className="text-md font-semibold">100% Original</h4>
              <p className="text-md text-gray-600">Guarantee for all products</p>
            </div>
          </div>
             <div className="flex justify-center lg:justify-start items-center mb-3">
            <img src="/images/return-icon.png" alt="100% Original" className="h-8 w-8" />
            <div className="ms-2">
              <h4 className="text-md font-semibold">3-Day Return</h4>
              <p className="text-md text-gray-600">Hassle-Free Returns process</p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-start items-center">
            <img src="/images/secure-icon.png" alt="100% Original" className="h-8 w-8" />
            <div className="ms-2">
              <h4 className="text-md font-semibold">Secure Payments</h4>
              <p className="text-md text-gray-600">Trusted payment gateways</p>
            </div>
          </div>
        </div>
      </div>

        <div className="flex flex-row justify-between mt-8">
          {/* Footer Text Section */}
          <div className="text-start">
            <p className="text-lg text-gray-700">
              Made with ❤️ in India
              {/* <a
                href="https://www.aivorntech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:underline font-semibold"
              >
                Aivorn Tech
              </a> */}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              &copy; 2025. Ink n Dyes. All rights reserved.
            </p>
          </div>

          {/* Payment Icons Section */}
          <div className="flex justify-end items-center gap-2 mt-4">
            <img src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Visa.png?updatedAt=1751275517161" alt="VISA" className="h-8" />
            <img src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Amex.png?updatedAt=1751275517116" alt="AMEX" className="h-8" />
            <img src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Mastercard.png?updatedAt=1751275517304" alt="Mastercard" className="h-8" />
            <img src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/Group%2064.png?updatedAt=1751275538588" alt="UPI" className="h-8" />
            <img src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/GooglePay.png?updatedAt=1751275517303" alt="GPay" className="h-8" />
            <img src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/ApplePay.png?updatedAt=1751275517145" alt="Apple Pay" className="h-8" />
          </div>
        </div>
    </div>
  </div>
</footer>
  )
}

export default Footer