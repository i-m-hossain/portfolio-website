// components/Experience.tsx
'use client'

import { motion } from 'framer-motion'
import { ExperienceData } from '@/types/notion'

export default function Experience({experiences}: {experiences: ExperienceData[]}) {
  return (
    <section className="bg-gray-50 py-8 dark:bg-gray-900 dark:text-gray-100  shadow-md dark:shadow-[0_4px_6px_1px_rgba(255,255,255,0.8)] transition-colors duration-300" id="experience">
      <div className="max-w-6xl mx-auto p-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-4"
        >
          Experience
        </motion.h2>
        
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md"
            >
              <h3 className="font-semibold text-lg">{exp.title} - {exp.company}</h3>
              <p className="text-gray-600 dark:text-gray-100">{exp.location} | {exp.duration}</p>
              <ul className="list-disc pl-5 mt-2">
                {exp.description.map((desc, idx) => (
                  <li key={idx} className="text-gray-600 dark:text-gray-100">{desc}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
