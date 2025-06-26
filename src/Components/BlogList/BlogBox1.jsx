import React from 'react'

const BlogBox1 = () => {
  return (
    <div>
       <a href="/Blog1" className="block">
        <article className= "bg-white border border-grey-100 rounded-2xl overflow-hidden transition-transform transform hover:scale-95">
            <img
                alt="Blog Image"
                src="https://images.pexels.com/photos/4219611/pexels-photo-4219611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="w-30 h-32 md:w-full md:h-48 object-cover
"
            />

            <div className="p-3">
                <a href="#">
                <h3 className="text-md line-clamp-2 md:text-xl font-semibold text-gray-900">
                The Journey of Yarn: From Raw Fiber to High-Quality Thread.
                </h3>
                </a>

                <p className="hidden sm:block mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                A behind-the-scenes look at how raw materials like cotton, silk, and polyester are transformed into premium yarns. Highlight the production process, quality control, and sustainability efforts.
                </p>

                <a href="/Blog1" className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-purple-800">
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

export default BlogBox1