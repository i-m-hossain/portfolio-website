'use client'
import CertificationCard from './CertificationCard'
import data from "../data/certification.json"
import { motion } from 'framer-motion'

export default function Certifications() {
  return (
    <section 
        className="py-8 shadow-md border-b-gray-300 dark:shadow-[0_4px_6px_1px_rgba(255,255,255,0.8)] transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100" 
        id="certification"
    >
        <div className="max-w-6xl mx-auto p-6">
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold mb-4"
            >
                Certification
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.certifications.map((certification, index) => (
                    <CertificationCard
                        key={index}
                        certification={certification}
                    />
                ))}
            </div>
        </div>
    </section>
  )
}

