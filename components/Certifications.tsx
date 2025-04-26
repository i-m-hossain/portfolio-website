'use client'
import CertificationCard from './CertificationCard'
import { motion } from 'framer-motion'
import { Certification } from '@/types/notion';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut',
    }
  })
};

export default async function Certifications({certifications}: {certifications: Certification[]}) {
  return (
    <section
      className="py-8 shadow-md border-b-gray-300 dark:shadow-[0_4px_6px_1px_rgba(255,255,255,0.8)] transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100"
      id="certification"
    >
      <div className="max-w-6xl mx-auto p-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl font-bold mb-4"
        >
          Certification
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {certifications.map((certification, index) => (
            <motion.div
              key={index}
              className="flex flex-col justify-between bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm hover:shadow-md transition"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
            >
              <CertificationCard certification={certification} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
