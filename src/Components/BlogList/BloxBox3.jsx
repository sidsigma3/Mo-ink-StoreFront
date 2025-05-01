import React from 'react'

const BloxBox3 = () => {
  return (
    <div>
       <a href="/Blog1" className="block">
        <article className= "bg-white border border-grey-100 rounded-2xl overflow-hidden transition-transform transform hover:scale-95">
            <img
                alt="Blog Image"
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/WhatsApp%20Image%202025-05-01%20at%205.15.48%20PM.jpeg?updatedAt=1746100087071"
                className="w-full h-48 object-cover"
            />

            <div className="p-3">
                <a href="#">
                <h3 className="text-lg font-medium text-gray-900">
                The Journey of Yarn: From Raw Fiber to High-Quality Thread.
                </h3>
                </a>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                A behind-the-scenes look at how raw materials like cotton, silk, and polyester are transformed into premium yarns. Highlight the production process, quality control, and sustainability efforts.
                </p>

                <a href="#" className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-purple-800">
                Read more

                <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                    &rarr;
                </span>
                </a>
            </div>
            </article>
            </a>
    </div>
  )
}

export default BloxBox3