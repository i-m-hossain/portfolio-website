'use client'

import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

interface Certification {
  certificationName: string
  certificationLink: string
  issued: string
  credentialId: string
  issuedBy: string
}

const cardAnimation = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: 0.1 },
}

const CertificationCard: React.FC<{ certification: Certification }> = ({ certification }) => {
  return (
    <motion.div
      initial={cardAnimation.initial}
      animate={cardAnimation.animate}
      transition={cardAnimation.transition}
      className="p-4  bg-white dark:bg-gray-800 transition"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        {certification.certificationName}
      </h3>
      <p className="text-sm mt-1 text-gray-600 dark:text-gray-100">
        Issued: {certification.issued}
      </p>
      <p className="text-sm mt-1 text-gray-600 dark:text-gray-100">
        Issued By: {certification.issuedBy}
      </p>
      <Link
        href={certification.certificationLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline mt-3 inline-block"
      >
        View Certificate
      </Link>
    </motion.div>
  )
}

export default CertificationCard
