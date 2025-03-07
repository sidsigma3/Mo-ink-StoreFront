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
      {number} Countries
    </p>

    {/* <span
      className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900"
    >
      Learn More
    </span> */}
  </div>

  <img
    src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt=""
    className="h-80 w-full rounded-tr-3xl object-cover"
    style={{height:'10rem'}}
  />

  
</a>
  )
}

export default FeturedBox