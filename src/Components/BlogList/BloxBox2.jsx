import React from 'react'

const BlogBox2 = () => {
  return (
    <div>
       <a href="/Blog2" className="block">
        <article className="bg-white border border-grey-100 rounded-2xl overflow-hidden transition-transform transform hover:scale-95">
            <img
                alt="Blog Image"
                src="https://images.pexels.com/photos/4492073/pexels-photo-4492073.jpeg"
                className="w-full h-32 md:w-full md:h-48 object-cover"
            />

            <div className="p-3">
                <a href="#">
                <h3 className="text-md line-clamp-2 md:text-xl font-semibold text-gray-900">
                How Quality Yarn is Manufactured from Start to Finish
                </h3>
                </a>

                <p className="hidden sm:block mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                At Ink n Dyes, we believe in quality from the first strand. Our yarn manufacturing process is a finely tuned combination of craftsmanship and innovation, designed to produce yarns that deliver strength, consistency, and visual perfection.
                </p>

                <a href="/Blog2" className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-purple-800">
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
