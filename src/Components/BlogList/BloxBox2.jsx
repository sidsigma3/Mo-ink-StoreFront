import React from 'react'

const BlogBox2 = () => {
  return (
    <div>
       <a href="/Blog2" className="block">
        <article className= "bg-white border border-grey-100 rounded-2xl overflow-hidden transition-transform transform hover:scale-95">
            <img
                alt="Blog Image"
                src="https://ik.imagekit.io/mediadata/Mo%20Ink%20n%20Dyes/WhatsApp%20Image%202025-05-01%20at%205.15.45%20PM%20(1).jpeg?updatedAt=1746100085378"
                className="w-full h-48 object-cover"
            />

            <div className="p-3">
                <a href="#">
                <h3 className="text-lg font-medium text-gray-900">
                How Quality Yarn is Manufactured 
                                </h3>
                </a>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                At Mo Ink & Dyes, we believe in quality from the first strand. Our yarn manufacturing process is a finely tuned combination of craftsmanship and innovation, designed to produce yarns that deliver strength, consistency, and visual perfection.                </p>

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

export default BlogBox2