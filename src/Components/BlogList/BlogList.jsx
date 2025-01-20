import React from 'react'
import BlogBox from './BlogBox'

const BlogList = () => {
  return (
    <div className=''>
         <h3 className='text-3xl font-medium'>Read Article</h3>

        <ul className='d-flex overflow-auto gap-4 mt-3'>
            <li>
                <BlogBox></BlogBox>
            </li>

            <li>
                <BlogBox></BlogBox>
            </li>

            <li>
                <BlogBox></BlogBox>
            </li>

            <li>
                <BlogBox></BlogBox>
            </li>


        </ul>

    </div>
  )
}

export default BlogList