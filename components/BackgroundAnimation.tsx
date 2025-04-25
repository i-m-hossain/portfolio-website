'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const codeLines = [
  'const user = "Md Imran Hossain";',
  'let skill = ["React", "Node.js", "Docker", "PHP", "Laravel"];',
  'function codeSkills() { return skill.join(", "); }',
  'console.log("Skills:", codeSkills());',
  'const project = { name: "Portfolio", status: "In Progress" };',
  'project.addFeature("Dark Mode Toggle");',
  'export default project;',
]

export default function BackgroundAnimation() {
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % codeLines.length)
    }, 2000) // Change line every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Animated background */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-mono text-xl"
        animate={{
          opacity: [0, 1, 0],
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'loop' }}
      >
        <pre className="whitespace-nowrap">{codeLines[lineIndex]}</pre>
      </motion.div>
    </div>
  )
}
