'use client'

import { Summary } from '@/types/notion'
import { motion } from 'framer-motion'

export default function AboutContent({ summary }: { summary: Summary }) {
    return (
        <section className="bg-gray-50 py-8 dark:bg-gray-900 shadow-md dark:shadow-[0_4px_6px_1px_rgba(255,255,255,0.8)] transition-colors duration-300" id="about">
            <div className="max-w-6xl mx-auto p-6">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-bold mb-4 dark:text-gray-100"
                >
                    About Me
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-lg text-gray-700 dark:text-gray-100 mb-4"
                >
                    {summary.summary}
                </motion.p>

            </div>
        </section>
    )
}