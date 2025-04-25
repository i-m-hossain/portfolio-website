'use client'

import { motion } from 'framer-motion'
import data from '../data/skill.json'

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

export default function Skills() {
  return (
    <section
      className="bg-white py-8 dark:bg-gray-900 dark:text-gray-100 shadow-md dark:shadow-[0_4px_6px_1px_rgba(255,255,255,0.8)] transition-colors duration-300"
      id="skills"
    >
      <div className="max-w-6xl mx-auto p-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-4"
        >
          Skills
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {Object.entries(data.skills).map(([category, skills], i) => (
            <motion.div key={i} variants={itemVariants}>
              <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-lg mb-2">{category}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {skills.map((skill, idx) => (
                    <li key={idx} className="text-gray-600 dark:text-gray-100">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
