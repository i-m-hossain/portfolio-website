// components/Skills.tsx
'use client'

import { motion } from 'framer-motion'
import data from '../data/skill.json'

export default function Skills() {
  return (
    <section className="bg-white py-8 dark:bg-gray-900 dark:text-gray-100  shadow-md dark:shadow-[0_4px_6px_1px_rgba(255,255,255,0.8)] transition-colors duration-300" id="skills ">
      <div className="max-w-6xl mx-auto p-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-4"
        >
          Skills
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(data.skills).map(([category, skills], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="p-4 border rounded-lg shadow-sm hover:shadow-md">
                <h3 className="font-semibold text-lg mb-2">{category}</h3>
                <ul className="list-disc pl-5">
                  {skills.map((skill, idx) => (
                    <li key={idx} className="text-gray-600 dark:text-gray-100">{skill}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
