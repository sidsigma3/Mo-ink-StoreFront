import React from 'react'

const HeroSection = ({ productName, breadcrumbs = [] }) => {
  return (
    <div className=''>
        <div className=''>
      <div
        className='p-5 rounded-5'
        style={{
          height: '15rem',
          backgroundImage: "url('/images/cta-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h3 className='text-4xl text-white font-bold mb-8 text-center'>{productName}</h3>

        <nav aria-label="Breadcrumb" className='flex justify-center'>
          <ol className="flex items-center gap-1 text-sm text-white">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={index} className="flex items-center">
                {/* Breadcrumb Link */}
                <a href={breadcrumb.link || '#'} className="block transition hover:text-gray-400">
                  {breadcrumb.label}
                </a>

                {/* Show Arrow Unless It's the Last Item */}
                {index < breadcrumbs.length - 1 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 mx-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
    </div>
  )
}

export default HeroSection