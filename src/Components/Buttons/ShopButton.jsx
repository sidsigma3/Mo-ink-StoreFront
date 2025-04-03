import React from 'react'


const ShopButton = ({click,status}) => {
  return (
    <button
    href="#"
    className="inline-block rounded bg-white px-4 md:px-12 p-2 text-sm font-medium text-purple-700 transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400 "
    style={{width:"max-content"}}
    onClick={click}
    >
    SHOP NOW
    </button>
  )
}

export default ShopButton