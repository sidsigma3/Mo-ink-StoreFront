import React , {useState}from 'react'
import { FaRegPaperPlane } from "react-icons/fa6";


const Cta = () => {

  const [email, setEmail] = useState("");  // State for email input
  const [showPopup, setShowPopup] = useState(false);  // State for popup

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter your email!");
      return;
    }

    // Simulate API call (Replace with actual API request)
    console.log("Subscribing with email:", email);

    // Show the Thank You popup
    setShowPopup(true);

    // Clear email input after submission
    setEmail("");
  };


  return (
    <div
      className="position-relative"
    >
      <div
        className='p-5 rounded-5'
        style={{
          backgroundImage: "url('/images/cta-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h3 className='text-xl md:text-xl lg:text-4xl font-bold text-white text-center md:text-left'>
          Stay updated with our <br />
          latest products and offers.
        </h3>

        <p className='text-xl lg:text-2xl text-white mt-5 text-center md:text-left'>Subscribe to Mo Ink n Dyes and get notified</p>


        <div className='hidden md:block'>
          <div className='flex justify-center'>
          <div className="mt-5 bg-white rounded-pill d-flex align-items-center justify-content-between w-full h-10 md:h-10 lg:w-1/2 md:w-75 max-w-md">
              <h4 className="ps-3 text-md lg:text-md font-medium d-flex gap-3 align-items-center col-7">
                <span>
                  <FaRegPaperPlane />
                </span>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-none outline-none bg-transparent w-full"
                />
              </h4>
              <button
                className="text-md lg:text-md col-4 bg-violet-800 rounded-pill text-white font-medium h-100 w-2xl lg:w-md"
                onClick={handleSubscribe}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className='block md:hidden'>
          <div className='flex justify-center'>
          <div className="mt-5 bg-white rounded-pill d-flex flex-col align-items-center justify-content-between w-full h-10 md:h-10 lg:w-1/2 md:w-75 max-w-md">
              <h4 className="text-md lg:text-md font-medium d-flex justify-center items-center col-12 w-full text-center pt-2 gap-1">
                <span>
                  <FaRegPaperPlane />
                </span>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-none outline-none bg-transparent w-full text-center"
                />
              </h4>
              <button
                className="mt-3 text-md lg:text-md col-12 bg-violet-800 rounded-pill text-white font-medium h-100 w-2xl lg:w-md"
                onClick={handleSubscribe}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

      </div>

      {showPopup && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded text-center">
              <h3 className="text-lg font-bold">Thank you for subscribing!</h3>
              <p className="text-gray-600 mt-2">You'll now receive updates.</p>
              <button
                className="mt-3 bg-violet-800 text-white px-4 py-2 rounded"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}


    </div>
  )
}

export default Cta