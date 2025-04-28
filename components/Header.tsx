// components/Header.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useUser } from '@/context/userContext'

export default function Header() {
  const {user} = useUser()
  console.log(user);
  const logo="Md Imran Hossain"
  return (
    <header className="sticky top-0 z-10 bg-white  shadow-md dark:shadow-[0_1px_1px_-1px_rgba(255,255,255,0.8)] transition-colors duration-300 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-xl font-bold text-gray-800 dark:text-gray-100">{logo}</Link>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-x-6"
        >
          <Link href="/#about" className="text-gray-600 hover:text-blue-600 dark:text-gray-100">About</Link>
          <Link href="/#skills" className="text-gray-600 hover:text-blue-600 dark:text-gray-100">Skills</Link>
          <Link href="/#experience" className="text-gray-600 hover:text-blue-600 dark:text-gray-100">Experience</Link>
          <Link href="/#education" className="text-gray-600 hover:text-blue-600 dark:text-gray-100">Education</Link>
          <Link href="/#certification" className="text-gray-600 hover:text-blue-600 dark:text-gray-100">Certification</Link>
          <Link  href={'/blog'} className="text-gray-600 hover:text-blue-600 dark:text-gray-100">Blog</Link>
          <Link  href={'/recommendation'} className="text-gray-600 hover:text-blue-600 dark:text-gray-100">Recommendations</Link>
          <Link  href={'/contact'} className="text-gray-600 hover:text-blue-600 dark:text-gray-100">Contact</Link>
          {!user && <Link  href={'/login'} className="text-gray-600 hover:text-blue-600 dark:text-gray-100">Login</Link>}
          {user && <Link  href={'/profile'} className="text-gray-600 hover:text-blue-600 dark:text-gray-100">Profile</Link>}
        </motion.nav>
        <ThemeToggle></ThemeToggle>
      </div>
    </header>
  )
}
