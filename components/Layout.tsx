'use client'


import { useEffect } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ParticleBackground from './ParticleBackground'

export default function Layout({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    const script = document.createElement('script')
    script.src = process.env.NEXT_PUBLIC_TAWKTO_URL || ''
    script.async = true
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    document.body.appendChild(script)
  }, [])
  
  return (
    <div className="relative">
      <Header />
      <ParticleBackground />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
