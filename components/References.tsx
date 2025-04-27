// components/References.tsx
'use client'

import { motion } from 'framer-motion'
import data from '../data/references.json'
import { Reference } from '@/types/notion'

export default function References({referenceList}: {referenceList: Reference[]}) {
  return (
    <section className="bg-white  py-8 pb-16 shadow-md dark:shadow-[0_4px_6px_1px_rgba(255,255,255,0.8)] transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100" id="references">
      <div className="max-w-6xl mx-auto p-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-4"
        >
          References
        </motion.h2>
        
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {referenceList.map((ref, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md"
            >
              <h3 className="font-semibold text-lg">{ref.name}</h3>
              <p className="text-gray-600 dark:text-gray-100">{ref.title}</p>
              <p className="text-gray-600 dark:text-gray-100">
                Email: <a href={`mailto:${ref.email}`} className="text-blue-600 dark:text-gray-100">{ref.email}</a></p>
              <p className="text-gray-600 dark:text-gray-100">Phone: {ref.phone}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
