'use client'

import { motion } from 'framer-motion'
import data from '../data/blogs.json'
import Link from 'next/link'

export default function Blog() {
  return (
    <>
    <section className="bg-white py-8 dark:bg-gray-900 dark:text-gray-100  shadow-md dark:shadow-[0_4px_6px_1px_rgba(255,255,255,0.8)] transition-colors duration-300" id="skills ">
      <div className="max-w-6xl mx-auto p-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-4"
        >
          Blog
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.blogs.map((blog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="p-4 border rounded-lg shadow-sm hover:shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  <Link href={blog.url} target="_blank" className="text-gray-900 dark:text-gray-100 hover:underline">
                    {blog.title}
                  </Link>
                </h3>
                <Link href={blog.url} target="_blank" className='button bg-gray-100 dark:bg-gray-900 dark:text-white p-2 dark:border dark: border-gray-800  rounded cursor-pointer'>Read the topic on {blog.publishedAt} </Link>
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    
              </>
  )
}
