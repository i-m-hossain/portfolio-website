'use client'

import { motion } from 'framer-motion'
import { SkillData } from '@/types/notion'
import { skillDisplayNames } from '@/config/keyMapping'

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

export default function Skills({ skillData }: { skillData: SkillData }) {
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
          {Object.entries(skillData as SkillData).map(([category, skills], i) => {
            const typedCategory = category as keyof SkillData;
            if (!skills || skills.length === 0) return null;
            return (<motion.div key={i} variants={itemVariants}>
              <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-lg mb-2">{skillDisplayNames[typedCategory]}</h3>
                {skills.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {skills.map((skill: string) => (
                      <li
                        key={skill}
                        className="text-gray-600 dark:text-gray-100"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No skills listed</p>
                )}
              </div>
            </motion.div>)
          })}
        </motion.div>
      </div>
    </section>
  )
}
