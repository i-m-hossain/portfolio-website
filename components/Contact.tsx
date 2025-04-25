'use client'

import { motion } from 'framer-motion'
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'
import Link from 'next/link'
import data from '@/data/personalInfo.json'

export default function ConnectMe() {
  return (
    <section
      id="connect"
      className="bg-white dark:bg-gray-900 py-12 px-6 transition-colors duration-300 shadow-md dark:shadow-[0_4px_6px_1px_rgba(255,255,255,0.8)]"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-4 dark:text-gray-100"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Connect with Me
        </motion.h2>

        <motion.p
          className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Whether you have a question, a project idea, or just want to say hello — I’d love to hear from you!
        </motion.p>

        <motion.div
          className="flex justify-center gap-6 text-2xl text-blue-500 dark:text-blue-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link href={`mailto:${data.personalInfo.email}`} aria-label="Email">
            <FaEnvelope className="hover:text-blue-700 transition-colors duration-200" />
          </Link>
          <Link href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="hover:text-blue-700 transition-colors duration-200" />
          </Link>
          <Link href={data.personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="hover:text-blue-700 transition-colors duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
