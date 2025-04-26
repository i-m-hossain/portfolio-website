'use client'


import { useEffect } from 'react'
import Footer from './Footer'
import Header from './Header'
import ParticleBackground from './ParticleBackground'

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(()=>{
    const script = document.createElement('script')
    script.src = 'https://embed.tawk.to/680bc3a422d1d91910dd362f/1ipmv8f15'
    script.async = true
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    document.body.appendChild(script)
  },[])
  return (
    <div className="relative">
      <Header />
      <ParticleBackground />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
