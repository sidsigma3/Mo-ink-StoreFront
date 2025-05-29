import React from 'react'

const BloxBox4 = () => {
  return (
    <div>
       <a href="/Blog4" className="block">
        <article className= "bg-white border border-grey-100 rounded-2xl overflow-hidden transition-transform transform hover:scale-95">
            <img
                alt="Blog Image"
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/WhatsApp%20Image%202025-05-01%20at%205.15.45%20PM.jpeg?updatedAt=1746100149336"
                className="w-full h-48 object-cover"
            />

            <div className="p-3">
                <a href="#">
                <h3 className="text-xl font-semibold text-gray-900">
                Cone vs. Hank: Choosing the Right Yarn Format for Your Needs   </h3>
                </a>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                Not all yarn formats are created equal. The choice between a yarn cone and a hank may seem minor, but it can greatly impact your production efficiency, dyeing precision, and weaving style.                </p>

                <a href="/Blog4" className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-purple-800">
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

export default BloxBox4