'use client'

import BackgroundAnimation from './BackgroundAnimation'
import Header from './Header'
import ParticleBackground from './ParticleBackground'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <Header />
      <ParticleBackground />
      <main>{children}</main>
    </div>
  )
}
