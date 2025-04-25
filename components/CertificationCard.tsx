import Link from 'next/link'
import React from 'react'
import {motion} from "framer-motion" 
interface Certification {
  certificationName: string
  certificationLink: string
  issued: string
  credentialId: string
  issuedBy: string
}

const CertificationCard: React.FC<{ certification: Certification }> = ({
  certification,
}) => {
  return (
    <>
    <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1 * 0.1 }}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md"
            >
              <h3 className="text-xl dark:text-gray-100 font-semibold text-gray-800">{certification.certificationName}</h3>
              <p className="text-sm dark:text-gray-100 text-gray-600 mt-1">Issued: {certification.issued}</p>
              <p className="text-sm dark:text-gray-100 text-gray-600 mt-1">Issued By: {certification.issuedBy}</p>
              <Link
                href={certification.certificationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 mt-3 inline-block"
              >
                View Certificate
              </Link>
            </motion.div>
    </>
  )
}

export default CertificationCard
