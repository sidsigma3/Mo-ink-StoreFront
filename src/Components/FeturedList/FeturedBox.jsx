import React from 'react'

const FeturedBox = ({productName,number}) => {
  return (
    <a href="#" className="relative block bg-white rounded-tr-3xl border border-gray-100" style={{width:'20rem'}}>
  <span
    className="absolute -left-px -top-px rounded-bl-3xl rounded-tr-3xl bg-yellow-300 px-6 py-2 font-medium uppercase tracking-widest text-black"
  >
    Best Seller
  </span>

  <div className="p-4 text-center mt-14">
    <strong className="text-xl font-medium text-gray-900"> {productName} </strong>

    <p className="mt-2 text-pretty text-gray-700">
      {number} Counters
    </p>

    {/* <span
      className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900"
    >
      Learn More
    </span> */}
  </div>

  <img
    src="/images/Picture2.png"
    alt=""
    className="h-80 w-full rounded-tr-3xl object-cover"
    style={{height:'10rem'}}
  />

  
</a>
  )
}

export default FeturedBox