'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {  useUser } from '@/context/userContext'
import Sidebar from '@/components/dashboard/Sidebar'


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser()
  const router = useRouter()
  useEffect(() => {
    if (!loading && (!user || user.user_metadata.role !== 'admin')) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || !user) return <div className="p-4"> Loading....</div>

  return (
    <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
          {children}
        </main>
    </div>
  )
}
