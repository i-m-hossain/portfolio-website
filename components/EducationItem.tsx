'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Education } from '@/types/notion'
type Props = {
    educationList: Education[]
}

export default function EducationItem({ educationList }: Props) {
    return (
        <section
            className="py-8 shadow-md dark:shadow-[0_4px_6px_1px_rgba(255,255,255,0.8)] transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100"
            id="education"
        >
            <div className="max-w-6xl mx-auto p-6">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-bold mb-4"
                >
                    Education
                </motion.h2>

                <div className="space-y-8">
                    {educationList.map((education, i) =>
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 1 * 0.1 }}
                            className="p-4 border rounded-lg shadow-sm hover:shadow-md"
                        >
                            <h3 className="font-semibold text-lg">{education.degree} </h3>
                            <p> {education.institution}</p>
                            <p className="text-gray-600 dark:text-gray-100">{education.duration}</p>

                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    )
}