import React from 'react'


const ShopButton = ({click,status}) => {
  return (
    <button
    href="#"
    className="inline-block rounded bg-purple-800 py-2 px-4 md:px-14 p-2 text-sm font-medium text-white transition hover:bg-purple-500 focus:outline-none focus:ring focus:ring-yellow-400 "
    style={{width:"max-content"}}
    onClick={click}
    >
    SHOP NOW
    </button>
  )
}

export default ShopButton