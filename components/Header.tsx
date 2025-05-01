'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const links = [
  { title: "About", url: "/#about" },
  { title: "Skills", url: "/#skills" },
  { title: "Experience", url: "/#experience" },
  { title: "Education", url: "/#education" },
  { title: "Certification", url: "/#certification" },
  { title: "Blog", url: "/blog" },
  { title: "Recommendation", url: "/recommendation" },
  { title: "Contact", url: "/contact" },
]

export default function Header() {
  const logo = "Md Imran Hossain"
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState('/');
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const fullPath = hash ? `/${hash}` : '/';
      
      // Check if we're on the home page and the hash matches a link
      if (pathname === '/' && hash) {
        const matchingItem = links.find(item => item.url === fullPath);
        if (matchingItem) {
          setActiveItem(fullPath);
          return;
        }
      }
      
      // For non-hash paths
      setActiveItem(pathname);
    };

    // Set initial active item
    handleHashChange();
    
    // Listen to hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // This is a workaround since Next.js doesn't expose route change events directly
    // We'll use an interval to check for changes (not ideal but works)
    const intervalId = setInterval(() => {
      if (window.location.hash !== activeItem.replace('/', '#') && 
          pathname === '/' &&   
          window.location.hash) {
        handleHashChange();
      }
    }, 100);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearInterval(intervalId);
    };
  }, [pathname, activeItem]);

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md dark:shadow-[0_1px_1px_-1px_rgba(255,255,255,0.8)] transition-colors duration-300 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-4 md:p-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-xl font-bold text-gray-800 dark:text-gray-100">{logo}</Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex space-x-6"
        >
          {
            links.map(link =>
              <Link
                key={link.url}
                href={link.url}
                className={`${activeItem === link.url 
                  ? 'border-b dark:border-white border-gray-900 font-bold' 
                  : 'border-b-0 border-transparent  hover:border-transparent'} 
                  text-gray-600 hover:text-blue-600 dark:text-gray-100`}
                style={{textDecoration:"none"}}
                >
                {link.title}
              </Link>
            )
          }
        </motion.nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center text-gray-700 dark:text-gray-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-800 shadow-lg"
        >
          <div className="flex flex-col px-4 pt-2 pb-4 space-y-3">
            {
              links.map(link => (
                <Link
                  key={link.url}
                  href={link.url}
                  className={`${activeItem === link.url ? 'border-b dark:border-white border-gray-900 font-bold' : ''} text-gray-900 dark:text-white hover:text-blue-600 py-2 border-b border-gray-100 dark:border-gray-700`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{textDecoration:"none"}}
                >
                  {link.title}
                </Link>
              ))
            }
          </div>
        </motion.div>
      )}
    </header>
  )
}